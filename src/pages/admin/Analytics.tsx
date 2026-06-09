import { useEffect, useState, useCallback } from 'react';
import {
  Users, TrendingUp, Clock, CheckCircle2, Download, RefreshCw,
  BarChart2, Calendar, Building2, Package, Activity, ArrowUp, ArrowDown,
} from 'lucide-react';
import { fetchAnalytics, type AnalyticsData } from '@/lib/admin/auth';

// ── Date Range Presets ─────────────────────────────────────────────────────
const PRESETS = [
  { label: 'Today', days: 0 },
  { label: 'Last 7 Days', days: 7 },
  { label: 'Last 30 Days', days: 30 },
  { label: 'Last 90 Days', days: 90 },
] as const;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; bar: string }> = {
  new:        { label: 'New',       color: 'text-blue-700',   bg: 'bg-blue-100',   bar: 'bg-blue-500' },
  contacted:  { label: 'Contacted', color: 'text-yellow-700', bg: 'bg-yellow-100', bar: 'bg-yellow-500' },
  quoted:     { label: 'Quoted',    color: 'text-purple-700', bg: 'bg-purple-100', bar: 'bg-purple-500' },
  closed:     { label: 'Closed',    color: 'text-green-700',  bg: 'bg-green-100',  bar: 'bg-green-500' },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function fmtFull(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Mini Bar Chart ─────────────────────────────────────────────────────────
function MiniBarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-0.5 h-24 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
          <div
            className="w-full rounded-sm bg-primary/70 hover:bg-primary transition-all duration-200 cursor-pointer"
            style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none">
            {fmt(d.date)}: {d.count}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Horizontal Bar ─────────────────────────────────────────────────────────
function HBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-foreground font-medium">{label}</span>
        <span className="text-sm font-bold text-foreground">{count} <span className="text-xs font-normal text-muted-foreground">({pct}%)</span></span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, sub }: {
  label: string; value: string | number; icon: React.ElementType; color: string; sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="font-display text-3xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

// ── Export CSV ─────────────────────────────────────────────────────────────
function exportCSV(data: AnalyticsData, label: string) {
  const sections: string[] = [];

  sections.push('OVERVIEW');
  sections.push('Metric,Value');
  const ov = data.overview;
  sections.push(`Total Leads,${ov.total}`);
  sections.push(`Today,${ov.today}`);
  sections.push(`This Week,${ov.thisWeek}`);
  sections.push(`This Month,${ov.thisMonth}`);
  sections.push(`Converted,${ov.converted}`);
  sections.push(`Pending,${ov.pending}`);
  sections.push(`Conversion Rate,${ov.conversionRate}%`);

  sections.push('');
  sections.push('STATUS DISTRIBUTION');
  sections.push('Status,Count,Percentage');
  data.statusDistribution.forEach((s) => sections.push(`${s.status},${s.count},${s.percentage}%`));

  sections.push('');
  sections.push('PRODUCT INQUIRIES');
  sections.push('Product,Count');
  data.productInquiries.forEach((p) => sections.push(`${p.product},${p.count}`));

  sections.push('');
  sections.push('TOP COMPANIES');
  sections.push('Company,Inquiries');
  data.topCompanies.forEach((c) => sections.push(`"${c.company}",${c.count}`));

  sections.push('');
  sections.push('DAILY TREND');
  sections.push('Date,Leads');
  data.dailyTrend.forEach((d) => sections.push(`${d.date},${d.count}`));

  const csv = sections.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ycs-analytics-${label}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activePreset, setActivePreset] = useState<number>(2); // default: Last 30 Days
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const getDateRange = useCallback(() => {
    if (isCustom && customFrom && customTo) {
      return { from: customFrom, to: customTo };
    }
    const to = new Date();
    const from = new Date();
    const days = PRESETS[activePreset].days;
    if (days === 0) {
      return { from: to.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
    }
    from.setDate(from.getDate() - days);
    return { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
  }, [activePreset, isCustom, customFrom, customTo]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { from, to } = getDateRange();
      const result = await fetchAnalytics(from, to);
      setData(result);
    } catch (e) {
      setError('Failed to load analytics. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  }, [getDateRange]);

  useEffect(() => { load(); }, [load]);

  const presetLabel = isCustom ? `${customFrom} → ${customTo}` : PRESETS[activePreset].label;
  const totalInquiries = data?.productInquiries.reduce((s, p) => s + p.count, 0) || 1;
  const maxCompany = Math.max(...(data?.topCompanies.map((c) => c.count) || [1]));

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Lead performance and inquiry insights</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          {data && (
            <button
              onClick={() => exportCSV(data, presetLabel.replace(/\s+/g, '-').toLowerCase())}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* ── Date Range Filters ── */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => { setActivePreset(i); setIsCustom(false); }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  !isCustom && activePreset === i
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => { setCustomFrom(e.target.value); setIsCustom(true); }}
              className="input-field text-xs py-1.5 w-36"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => { setCustomTo(e.target.value); setIsCustom(true); }}
              className="input-field text-xs py-1.5 w-36"
            />
            {isCustom && customFrom && customTo && (
              <button
                onClick={load}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl px-5 py-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* ── Overview Stats ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-8 w-16 rounded" />
            </div>
          ))
        ) : data ? (
          <>
            <StatCard label="Total Leads" value={data.overview.total} icon={Users} color="text-primary bg-primary/10" />
            <StatCard label="Today" value={data.overview.today} icon={Activity} color="text-blue-600 bg-blue-50" sub="new inquiries" />
            <StatCard label="This Week" value={data.overview.thisWeek} icon={TrendingUp} color="text-violet-600 bg-violet-50" sub="last 7 days" />
            <StatCard label="This Month" value={data.overview.thisMonth} icon={BarChart2} color="text-indigo-600 bg-indigo-50" sub="current month" />
            <StatCard label="Converted" value={data.overview.converted} icon={CheckCircle2} color="text-green-600 bg-green-50" sub="closed leads" />
            <StatCard label="Pending" value={data.overview.pending} icon={Clock} color="text-yellow-600 bg-yellow-50" sub="new + contacted" />
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground font-medium">Conversion Rate</p>
                <span className="grid h-9 w-9 place-items-center rounded-lg text-emerald-600 bg-emerald-50">
                  {data.overview.conversionRate >= 50 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </span>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">{data.overview.conversionRate}%</p>
              <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                  style={{ width: `${data.overview.conversionRate}%` }}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* ── Lead Trend Chart ── */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-foreground">Lead Trend</h2>
          <span className="ml-auto text-xs text-muted-foreground">{presetLabel}</span>
        </div>
        {loading ? (
          <div className="skeleton h-24 w-full rounded" />
        ) : data && data.dailyTrend.length > 0 ? (
          <>
            <MiniBarChart data={data.dailyTrend} />
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
              <span>{fmt(data.dailyTrend[0].date)}</span>
              <span>{fmt(data.dailyTrend[data.dailyTrend.length - 1].date)}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No data for selected range</p>
        )}
      </div>

      {/* ── Status Distribution + Product Inquiries ── */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-foreground">Lead Status Distribution</h2>
          </div>
          {loading ? (
            <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-8 w-full rounded" />)}</div>
          ) : data && data.statusDistribution.length > 0 ? (
            <div className="space-y-4">
              {data.statusDistribution.map((s) => {
                const cfg = STATUS_CONFIG[s.status] ?? { label: s.status, color: 'text-foreground', bg: 'bg-muted', bar: 'bg-muted-foreground' };
                return (
                  <div key={s.status}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{s.count} <span className="text-xs font-normal text-muted-foreground">({s.percentage}%)</span></span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`} style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No data available</p>
          )}
        </div>

        {/* Product Inquiries */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-foreground">Product Inquiries</h2>
          </div>
          {loading ? (
            <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-8 w-full rounded" />)}</div>
          ) : data && data.productInquiries.length > 0 ? (
            <div className="space-y-4">
              {data.productInquiries.map((p) => (
                <HBar key={p.product} label={p.product} count={p.count} total={totalInquiries} color="bg-accent-orange" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No inquiries in this range</p>
          )}
        </div>
      </div>

      {/* ── Top Companies + Recent Activity ── */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Top Companies */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-foreground">Top Companies</h2>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-8 w-full rounded" />)}</div>
          ) : data && data.topCompanies.length > 0 ? (
            <div className="divide-y divide-border">
              {data.topCompanies.map((c, i) => (
                <div key={c.company} className="flex items-center gap-4 px-6 py-3">
                  <span className="font-display text-sm font-bold text-muted-foreground w-5 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.company || 'Unknown'}</p>
                    <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60" style={{ width: `${(c.count / maxCompany) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground shrink-0">{c.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">No data available</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="font-display font-bold text-foreground">Recent Activity</h2>
          </div>
          {loading ? (
            <div className="p-6 space-y-4">{Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="skeleton h-8 w-8 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="skeleton h-3.5 w-32 rounded" />
                  <div className="skeleton h-3 w-48 rounded" />
                </div>
              </div>
            ))}</div>
          ) : data && data.recentActivity.length > 0 ? (
            <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
              {data.recentActivity.map((a) => {
                const cfg = STATUS_CONFIG[a.status] ?? { label: a.status, color: 'text-foreground', bg: 'bg-muted', bar: '' };
                return (
                  <div key={String(a._id)} className="flex items-start gap-3 px-6 py-3.5">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-xs">
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{a.name}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{a.company} · {a.productRequirement}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{fmtFull(a.createdAt)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}
