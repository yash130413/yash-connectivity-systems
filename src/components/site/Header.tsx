import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import logo from "@/assets/ycs-logo-design.jpg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/clients", label: "Clients" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "glass shadow-[var(--shadow-elevated)] backdrop-blur-xl" 
          : "bg-background border-b border-border"
      }`}
    >
      <div className={`container-page flex items-center justify-between transition-all duration-300 ${
        scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
      }`}>
        <Link 
          to="/" 
          className={`flex items-center gap-2 transition-all duration-300 ${
            scrolled ? "scale-95" : "scale-100"
          }`}
          onClick={() => setOpen(false)}
          aria-label="Yash Connectivity Systems Home"
        >
          <img
            src={logo}
            alt="YCS Logo"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-7 w-auto" : "h-10 sm:h-15 w-auto"
            }`}
          />
          <span className="flex flex-col leading-tight">
            <span className={`font-display font-bold text-primary transition-all duration-300 ${
              scrolled ? "text-base sm:text-xs md:text-sm" : "text-xl sm:text-sm md:text-[22px]"
            }`}>
              <span className="hidden sm:inline">{COMPANY.short}</span>
              <span className="sm:hidden">YCS</span>
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative px-3 transition-all duration-200 rounded-md ${
                  scrolled ? "py-1.5 text-xs" : "py-2 text-sm"
                } font-medium ${
                  active
                    ? 'text-primary font-semibold bg-primary/5'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link 
            to="/contact" 
            className={`btn-accent transition-all duration-300 ${
              scrolled ? "text-xs py-2 px-4" : "text-sm py-3 px-5"
            }`}
          >
            Request Quote
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile navigation">
            {NAV.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-4 py-3 text-base font-medium border-b border-border last:border-0 rounded-md transition-all ${
                    active
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                  {item.label}
                </Link>
              );
            })}
            <Link to="/contact" className="btn-accent mt-3">
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
