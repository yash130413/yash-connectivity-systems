import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/SectionHeader";
import { INDUSTRIES, PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries Served — Yash Connectivity Systems" },
      { name: "description", content: "Supplying automotive, food, garment, packaging, white goods, export houses and e-commerce companies across India." },
      { property: "og:title", content: "Industries We Serve" },
      { property: "og:description", content: "From auto OEMs to e-commerce fulfilment centres." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const INDUSTRY_PRODUCTS: Record<string, string[]> = {
  automotive: ["cable-ties", "heat-shrink-sleeves", "insulated-connectors", "conduit-plastics", "barcode-labels"],
  food: ["barcode-labels", "thermal-transfer-ribbons", "packing-materials"],
  garment: ["barcode-labels", "thermal-transfer-ribbons", "packing-materials"],
  packaging: ["packing-materials", "barcode-labels", "cable-ties"],
  export: ["barcode-labels", "packing-materials", "thermal-transfer-ribbons"],
  "white-goods": ["insulated-connectors", "heat-shrink-sleeves", "cable-ties", "barcode-labels"],
  ecommerce: ["barcode-labels", "thermal-transfer-ribbons", "packing-materials"],
};

function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Industrial supply, vertical by vertical" subtitle="Each industry has its own quality, compliance and lead-time expectations. Here's how we serve yours." />

      <section className="section">
        <div className="container-page space-y-10">
          {INDUSTRIES.map((ind, idx) => {
            const used = (INDUSTRY_PRODUCTS[ind.slug] || []).map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);
            return (
              <article key={ind.slug} className={`grid gap-8 lg:grid-cols-2 lg:items-center ${idx % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="card-surface p-7 md:p-10">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Factory className="h-6 w-6" /></div>
                  <h2 className="mt-5 font-display text-2xl font-bold md:text-3xl">{ind.name}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{ind.desc}</p>

                  <h3 className="mt-6 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">Common Applications</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {["Production line", "QA / dispatch", "Wire harnessing", "Final packing"].map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />{a}</li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn-accent mt-7">Discuss Requirement <ArrowRight className="h-4 w-4" /></Link>
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Products Used</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {used.map((p) => (
                      <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="card-surface flex items-center gap-3 p-3">
                        <img src={p.image} alt={p.name} loading="lazy" className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <div className="font-display text-sm font-bold">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
