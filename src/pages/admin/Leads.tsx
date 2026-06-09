import { useEffect, useState, useCallback } from 'react';
import { Phone, Mail, Building2, Package, MessageSquare, ChevronDown, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchLeads, updateLeadStatus, type Lead } from '@/lib/admin/auth';

const STATUSES = ['all', 'new', 'contacted', 'quoted', 'closed'];
const PAGE_SIZE = 10;

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  quoted: 'bg-purple-100 text-purple-700 border-purple-200',
  closed: 'bg-green-100 text-green-700 border-green-200',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  closed: 'Closed',
};

function exportToCSV(leads: Lead[], filter: string) {
  const headers = ['Name', 'Company', 'Phone', 'Email', 'Product Requirement', 'Message', 'Status', 'Date'];
  const rows = leads.map((l) =>
    [l.name, l.company, l.phone, l.email, l.productRequirement, l.message || '', l.status,
      new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`)
  );
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: { status?: string; page: number } = { page };
      if (filter !== 'all') params.status = filter;
      const data = await fetchLeads(params);
      setLeads(data.leads);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => { load(); }, [load]);

  // client-side search filter
  const filtered = search.trim()
    ? leads.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        l.productRequirement.toLowerCase().includes(search.toLowerCase())
      )
    : leads;

  async function handleStatusChange(id: string, status: string) {
    setUpdatingId(id);
    try {
      await updateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status: status as Lead['status'] } : l));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">{total} total quote requests</p>
        </div>
        <button
          onClick={() => exportToCSV(leads, filter)}
          disabled={leads.length === 0 || loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email..."
            className="input-field pl-9"
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setFilter(s); setPage(1); setExpandedId(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                filter === s ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-2">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex gap-4 items-center">
                <div className="skeleton h-10 w-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-40 rounded" />
                  <div className="skeleton h-3 w-56 rounded" />
                </div>
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground text-sm">No leads found</p>
          </div>
        ) : (
          filtered.map((lead) => (
            <div key={lead._id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              {/* Lead Row */}
              <div
                className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(expandedId === lead._id ? null : lead._id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-sm">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-xs text-muted-foreground hidden md:block truncate max-w-[180px]">{lead.productRequirement}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${expandedId === lead._id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === lead._id && (
                <div className="border-t border-border px-5 py-5 bg-muted/20">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5">
                      <Phone className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Phone</p>
                        <a href={`tel:${lead.phone}`} className="text-sm text-foreground hover:text-primary">{lead.phone}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Mail className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Email</p>
                        <a href={`mailto:${lead.email}`} className="text-sm text-foreground hover:text-primary break-all">{lead.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Building2 className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Company</p>
                        <p className="text-sm text-foreground">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Package className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Product Requirement</p>
                        <p className="text-sm text-foreground">{lead.productRequirement}</p>
                      </div>
                    </div>
                    {lead.message && (
                      <div className="flex items-start gap-2.5 sm:col-span-2">
                        <MessageSquare className="h-4 w-4 text-accent-orange mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Message</p>
                          <p className="text-sm text-foreground">{lead.message}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update Status:</p>
                      {['new', 'contacted', 'quoted', 'closed'].map((s) => (
                        <button
                          key={s}
                          disabled={lead.status === s || updatingId === lead._id}
                          onClick={() => handleStatusChange(lead._id, s)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border capitalize transition-colors disabled:opacity-50 ${
                            lead.status === s
                              ? `${STATUS_COLORS[s]} cursor-default`
                              : 'bg-background border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 ml-auto">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-orange/10 text-accent-orange text-xs font-semibold hover:bg-accent-orange/20 transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" /> Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                page === n ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted text-foreground'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
