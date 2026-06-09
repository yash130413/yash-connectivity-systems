import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Award, TrendingUp, Users, Factory, ArrowRight } from "lucide-react";
import factory from "@/assets/factory.jpg";
import { PageHero, SectionHeader } from "@/components/site/SectionHeader";
import { STATS, INDUSTRIES } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Yash Connectivity Systems" },
      { name: "description", content: "A decade of supplying barcode labels, ribbons, packaging and connectivity products to India's leading manufacturers and exporters." },
      { property: "og:title", content: "About Yash Connectivity Systems" },
      { property: "og:description", content: "Our story, mission and the industries we serve." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { y: "2014", t: "Founded in Gurugram", d: "Started as a focused supplier of barcode labels and ribbons." },
  { y: "2017", t: "Expanded into packaging", d: "Added cartons, films and tapes for e-commerce and export." },
  { y: "2020", t: "Connectivity range launched", d: "Cable ties, sleeves and connectors for auto and white goods." },
  { y: "2024", t: "100+ active clients", d: "Pan-India delivery network with same-day dispatch capability." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="A decade of dependable industrial supply" subtitle="Yash Connectivity Systems is a Gurugram-based supplier and trader serving manufacturers, exporters and fulfilment centres across India." />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Built on quality, priced for production</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We started in 2014 with a single mission — make industrial consumables effortlessly available to factories
              and exporters. A decade later we serve more than 100 active clients across automotive, white goods, food,
              garments, packaging and e-commerce — supplying barcode labels, thermal ribbons, cable ties, heat shrink
              sleeves, insulated connectors, conduit plastics and packing materials.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our edge is straightforward: audited sourcing, transparent quotations, and a supply chain that doesn't blink.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elevated)]">
            <img src={factory} alt="Modern manufacturing facility" loading="lazy" width={1280} height={720} className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { Icon: Target, t: "Our Mission", d: "Empower Indian manufacturers and exporters with reliable, audited industrial consumables — delivered on time, at the right price." },
            { Icon: Eye, t: "Our Vision", d: "Become the most trusted single-window source for labeling, connectivity and packaging across South Asia." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="card-surface p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Why Customers Trust Us" title="Four pillars of every supply relationship" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Award, t: "Audited Quality", d: "Spec-controlled batches with first-article inspection." },
              { Icon: TrendingUp, t: "Stable Pricing", d: "Annual rate contracts shield you from price swings." },
              { Icon: Users, t: "Dedicated Service", d: "A named account manager for every key client." },
              { Icon: Factory, t: "Production-Aware", d: "We understand line stoppages — and prevent them." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="card-surface p-6">
                <Icon className="h-7 w-7 text-accent-orange" />
                <h3 className="mt-4 font-display text-base font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page">
          <SectionHeader eyebrow="Industries Served" title="Trusted across seven verticals" />
          <div className="mt-10 flex flex-wrap gap-3">
            {INDUSTRIES.map((i) => (
              <Link key={i.slug} to="/industries" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors">
                {i.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Growth Timeline" title="A decade in the making" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((m) => (
              <div key={m.y} className="card-surface p-6">
                <div className="font-display text-2xl font-bold text-accent-orange">{m.y}</div>
                <h3 className="mt-2 font-display text-base font-bold">{m.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-bold text-accent-orange">{s.value}</div>
              <div className="mt-1 text-sm text-primary-foreground/75">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.24_0.13_268)] p-10 md:p-14 text-primary-foreground text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to standardize your supply?</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/80">Let's talk about your annual requirement and put a quote in your hands today.</p>
            <Link to="/contact" className="btn-accent mt-7">Request Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
