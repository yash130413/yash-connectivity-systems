import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/SectionHeader";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Yash Connectivity Systems" },
      { name: "description", content: "Browse our range of barcode labels, thermal ribbons, packing materials, cable ties, connectors, heat shrink sleeves and conduit plastics." },
      { property: "og:title", content: "Industrial Product Catalogue" },
      { property: "og:description", content: "Seven categories. Hundreds of SKUs. All available in bulk." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

function ProductsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q === "" || (p.name + " " + p.short + " " + p.description).toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <>
      <PageHero eyebrow="Products" title="Industrial product catalogue" subtitle="Filter by category or search across the full range. Every product ships with bulk pricing and lead time on request." />

      <section className="section">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="input-field pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                    cat === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground/75 border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.slug} className="card-surface overflow-hidden flex flex-col">
                <Link to="/products/$slug" params={{ slug: p.slug }} className="aspect-[5/3] overflow-hidden bg-muted block">
                  <img src={p.image} alt={p.name} loading="lazy" width={800} height={480} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{p.short}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent-orange">
                      Details <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link to="/contact" className="btn-accent px-4 py-2 text-sm">Request Quote</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-20 text-center text-muted-foreground">No products match your search.</div>
          )}
        </div>
      </section>
    </>
  );
}
