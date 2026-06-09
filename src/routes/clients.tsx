import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/site/SectionHeader";
import { CLIENTS, TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Yash Connectivity Systems" },
      { name: "description", content: "Trusted by Amazon, Haier, Carrier, Schneider Electric, Hitachi, Minda, Revolt and other industry leaders." },
      { property: "og:title", content: "Our Clients" },
      { property: "og:description", content: "A decade of supplying India's top manufacturers and exporters." },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: ClientsPage,
});

const GROUPS = [
  { name: "E-Commerce & Logistics", logos: ["Amazon"] },
  { name: "Appliances & White Goods", logos: ["Haier", "Carrier", "Hitachi"] },
  { name: "Electrical & Energy", logos: ["Schneider Electric", "Revolt"] },
  { name: "Automotive & Components", logos: ["Minda"] },
  { name: "Exports & Trading", logos: ["Richaglobal"] },
];

const STORIES = [
  { client: "Tier-1 Automotive Supplier", title: "Standardized heat shrink supply across 4 plants", body: "Replaced fragmented vendors with annual rate contract — reduced procurement cycle time by 60%." },
  { client: "E-Commerce Fulfilment Centre", title: "Same-day thermal label dispatch", body: "Buffer stock model ensures zero label-out events across a 100,000 sqft DC." },
  { client: "Export House", title: "Compliant export packaging program", body: "Carton specs aligned with destination regulations and on-time vessel cut-offs." },
];

function ClientsPage() {
  return (
    <>
      <PageHero eyebrow="Clients" title="Trusted by India's most demanding buyers" subtitle="From appliance giants to fulfilment leaders — purchase teams choose us for consistency, not promises." />

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Logo Wall" title="Brands that rely on us" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c) => (
              <div key={c} className="grid h-24 place-items-center rounded-2xl border border-border bg-card font-display text-base font-bold text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page">
          <SectionHeader eyebrow="Industry-wise" title="Across the verticals we serve" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((g) => (
              <div key={g.name} className="card-surface p-6">
                <h3 className="font-display text-lg font-bold">{g.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.logos.map((l) => (
                    <span key={l} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground/75">{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Success Stories" title="What our work looks like in production" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {STORIES.map((s) => (
              <article key={s.title} className="card-surface p-7">
                <Quote className="h-6 w-6 text-accent-orange" />
                <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                <div className="mt-5 border-t border-border pt-4 text-xs font-semibold uppercase tracking-wider text-primary">{s.client}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page">
          <SectionHeader eyebrow="Testimonials" title="Words from procurement teams" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card-surface p-7 flex flex-col">
                <div className="font-display text-3xl text-accent-orange leading-none">“</div>
                <blockquote className="mt-2 text-base text-foreground/85 leading-relaxed flex-1">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-display text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page rounded-3xl bg-primary p-10 md:p-14 text-primary-foreground text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Join 100+ companies that trust us</h2>
          <Link to="/contact" className="btn-accent mt-7">Become a Client <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
