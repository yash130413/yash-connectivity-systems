import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Clock, CheckCircle2, ArrowRight, Package, ShoppingBag } from 'lucide-react';
import { fetchLeads, fetchProducts, type Lead } from '@/lib/admin/auth';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  closed: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  closed: 'Closed',
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activeProducts, setActiveProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchLeads({ page: 1 }),
      fetchProducts({ page: 1 }),
    ]).then(([leadsData, productsData]) => {
      setLeads(leadsData.leads);
      setTotalLeads(leadsData.total);
      setTotalProducts(productsData.total);
    }).catch(console.error).finally(() => setLoading(false));

    // fetch active products count
    fetchProducts({ page: 1 }).then((data) => {
      setActiveProducts(data.products.filter((p) => p.active).length);
    }).catch(console.error);
  }, []);

  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const STATS = [
    { label: 'Total Leads', value: totalLeads, icon: Users, color: 'text-primary bg-primary/10', to: '/admin/leads' },
    { label: 'New Leads', value: counts['new'] || 0, icon: TrendingUp, color: 'text-blue-600 bg-blue-50', to: '/admin/leads' },
    { label: 'In Progress', value: (counts['contacted'] || 0) + (counts['quoted'] || 0), icon: Clock, color: 'text-yellow-600 bg-yellow-50', to: '/admin/leads' },
    { label: 'Closed', value: counts['closed'] || 0, icon: CheckCircle2, color: 'text-green-600 bg-green-50', to: '/admin/leads' },
    { label: 'Total Products', value: totalProducts, icon: ShoppingBag, color: 'text-violet-600 bg-violet-50', to: '/admin/products' },
    { label: 'Active Products', value: activeProducts, icon: Package, color: 'text-emerald-600 bg-emerald-50', to: '/admin/products' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of leads and product catalogue</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {STATS.map(({ label, value, icon: Icon, color, to }) => (
          <Link key={label} to={to} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {loading ? '—' : value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display font-bold text-foreground">Recent Leads</h2>
          <Link to="/admin/leads" className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-4 flex gap-4 items-center">
                <div className="skeleton h-9 w-9 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-36 rounded" />
                  <div className="skeleton h-3 w-52 rounded" />
                </div>
                <div className="skeleton h-6 w-16 rounded-full" />
              </div>
            ))
          ) : leads.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">No leads yet</p>
          ) : (
            leads.slice(0, 6).map((lead) => (
              <div key={lead._id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-sm">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.company} · {lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-xs text-muted-foreground hidden md:block truncate max-w-[160px]">{lead.productRequirement}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS[lead.status]}
                  </span>
                  <span className="text-xs text-muted-foreground hidden lg:block whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
