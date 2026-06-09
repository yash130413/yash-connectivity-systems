import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Truck, ShieldCheck, Headphones, Factory, BadgePercent, Sparkles, MapPin, Phone, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-products.jpg";
import { COMPANY, PRODUCTS, INDUSTRIES, CLIENTS, STATS, WHY_US, STEPS, TESTIMONIALS } from "@/lib/site-data";
import { SectionHeader } from "@/components/site/SectionHeader";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Connectivity Systems — Industrial Labeling & Packaging" },
      { name: "description", content: "B2B supplier of barcode labels, thermal ribbons, cable ties, heat shrink sleeves, connectors and packaging materials for manufacturers and exporters." },
      { property: "og:title", content: "Yash Connectivity Systems" },
      { property: "og:description", content: "Industrial labeling, connectivity and packaging solutions for modern businesses." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const WHY_ICONS = [ShieldCheck, BadgePercent, Truck, Headphones, Factory, Sparkles];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-soft via-background to-background">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="animate-fade-up">
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Trusted B2B Supplier · Est. 2014</span>
            <h1 className="mt-5 font-display text-4xl font-bold text-foreground leading-[1.05] md:text-5xl lg:text-6xl">
              Industrial Labeling & Packaging Solutions for <span className="text-primary">Modern Businesses</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg max-w-xl leading-relaxed">
              Trusted supplier of Barcode Labels, Thermal Ribbons, Cable Ties, Heat Shrink Sleeves and Packaging
              Materials for manufacturing and export industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-accent">Request Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MessageCircle className="h-4 w-4" /> WhatsApp Now
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Pan-India delivery", "Bulk MOQs", "Same-day quote"].map((x) => (
                <span key={x} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> {x}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent-orange/20 via-primary/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
              <img src={heroImg} alt="Industrial products — barcode labels, thermal ribbons, cable ties and heat shrink tubing" width={1280} height={1024} className="aspect-[5/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] hidden md:block">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Same-day dispatch</p>
              <p className="font-display text-base font-bold text-primary">In-stock SKUs</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="border-y border-border bg-muted/60">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section">
        <div className="container-page">
          <SectionHeader center eyebrow="Trusted by" title="Industry leaders rely on us" subtitle="A decade of supplying mission-critical consumables to India's top manufacturers and exporters." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {CLIENTS.slice(0, 7).map((c) => (
              <div key={c} className="grid h-20 place-items-center rounded-xl border border-border bg-card px-3 text-center font-display text-sm font-bold text-foreground/75 hover:text-primary hover:border-primary/40 transition-colors">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <SectionHeader eyebrow="Why Choose Us" title="A supply partner built for industrial uptime" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={w.title} className="card-surface p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <SectionHeader eyebrow="Product Range" title="Engineered for the production floor" subtitle="Seven categories. Hundreds of SKUs. All available in bulk." />
            <Link to="/products" className="btn-ghost hidden md:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="card-surface group overflow-hidden flex flex-col">
                <div className="aspect-[5/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" width={800} height={480} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent-orange">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">Industries Served</span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">From auto OEMs to e-commerce fulfilment</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((i) => (
              <Link key={i.slug} to="/industries" className="group rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 hover:bg-primary-foreground/10 transition-colors">
                <Factory className="h-6 w-6 text-accent-orange" />
                <h3 className="mt-4 font-display text-base font-bold">{i.name}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">{i.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section">
        <div className="container-page">
          <SectionHeader center eyebrow="How We Work" title="A four-step path from RFQ to delivery" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative card-surface p-6">
                <span className="font-display text-5xl font-bold text-primary/15">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <SectionHeader eyebrow="Testimonials" title="What procurement teams say" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card-surface p-7 flex flex-col">
                <div className="font-display text-3xl text-accent-orange leading-none">“</div>
                <blockquote className="mt-2 text-base text-foreground/85 leading-relaxed flex-1">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-display text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD GEN */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow="Get In Touch" title="Get a free quote" subtitle="Tell us what you need — we'll respond within 2 business hours with pricing, MOQs and lead times." />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-accent-orange mt-0.5" /><span className="text-sm text-foreground/85">{COMPANY.address}</span></div>
              <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-accent-orange mt-0.5" /><a href={`tel:${COMPANY.phone}`} className="text-sm text-foreground/85 hover:text-primary">{COMPANY.phone}</a></div>
              <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-accent-orange mt-0.5" /><a href={`mailto:${COMPANY.email}`} className="text-sm text-foreground/85 hover:text-primary">{COMPANY.email}</a></div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe title="Map" className="h-64 w-full" loading="lazy" src="https://www.google.com/maps?q=Laxman+Vihar+Phase+2+Gurugram&output=embed" />
            </div>
          </div>
          <div className="card-surface p-6 md:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
