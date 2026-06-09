import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from "lucide-react";
import { COMPANY } from "@/lib/site-data";
import logo from "@/assets/ycs-logo-design.jpg";
import { fetchProducts, type DBProduct } from "@/lib/api/products.functions";

export function Footer() {
  const [products, setProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    fetchProducts().then((p) => setProducts(p.slice(0, 6))).catch(() => {});
  }, []);
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="YCS Logo" className="h-10 w-10 object-contain" />
            <span className="font-display text-lg font-bold">{COMPANY.short}</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">
            Trusted supplier of barcode labels, thermal ribbons, cable ties, heat shrink sleeves and packaging
            materials across India.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" aria-label="social"
                 className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            {[
              ["/about", "About Us"],
              ["/industries", "Industries"],
              ["/clients", "Clients"],
              ["/faq", "FAQ"],
              ["/blog", "Blog"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to as string} className="hover:text-accent-orange">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Products</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="hover:text-accent-orange">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-accent-orange shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-accent-orange shrink-0" /><a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-accent-orange shrink-0" /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-page py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-primary-foreground/65">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Industrial Labeling · Packaging · Connectivity</p>
            <Link to="/admin/login" className="hover:text-accent-orange transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
