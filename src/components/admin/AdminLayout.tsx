import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Package, BarChart2, Menu, X } from 'lucide-react';
import { logout, getAdminInfo } from '@/lib/admin/auth';
import logo from '@/assets/ycs-logo-design.jpg';

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/leads', icon: Users, label: 'Leads' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const admin = getAdminInfo();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-primary-foreground/10">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="YCS Logo" className="h-9 w-9 object-contain rounded" />
          <div className="leading-tight">
            <p className="font-display text-sm font-bold">YCS Admin</p>
            <p className="text-[10px] text-primary-foreground/60 uppercase tracking-wider">Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden grid h-8 w-8 place-items-center rounded-lg hover:bg-primary-foreground/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-foreground/15 text-primary-foreground'
                  : 'text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div className="px-3 py-4 border-t border-primary-foreground/10">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs text-primary-foreground/50 truncate">{admin?.email}</p>
          <p className="text-[10px] text-accent-orange uppercase tracking-wider font-semibold">{admin?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-muted/40">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on mobile, static on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 lg:w-60 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground border-b border-primary-foreground/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src={logo} alt="YCS" className="h-7 w-7 object-contain rounded" />
          <span className="font-display font-bold text-sm">YCS Admin</span>
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
