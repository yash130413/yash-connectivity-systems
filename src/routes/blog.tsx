import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/SectionHeader";
import { BLOG_POSTS } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Industrial Resources & Blog — Yash Connectivity Systems" },
      { name: "description", content: "Buyer guides on barcode labels, thermal transfer printing, cable ties, heat shrink sleeves and packaging materials." },
      { property: "og:title", content: "Industrial Resource Center" },
      { property: "og:description", content: "Practical guides for procurement and production teams." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [feature, ...rest] = BLOG_POSTS;
  return (
    <>
      <PageHero eyebrow="Blog" title="Industrial resource center" subtitle="Buyer guides, application notes and product explainers — written for procurement and production teams." />

      <section className="section">
        <div className="container-page">
          <Link to="/blog" className="card-surface grid overflow-hidden lg:grid-cols-2">
            <div className="bg-gradient-to-br from-primary to-[oklch(0.24_0.13_268)] p-10 md:p-14 text-primary-foreground flex flex-col justify-end aspect-[16/10] lg:aspect-auto">
              <span className="inline-flex w-fit rounded-full bg-accent-orange/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-orange">Featured · {feature.tag}</span>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{feature.title}</h2>
              <p className="mt-3 text-primary-foreground/80 max-w-md">{feature.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {feature.read}</span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold">Read the full guide</h3>
              <p className="mt-3 text-muted-foreground">Specifications, materials and selection criteria explained in plain language for buyers.</p>
              <span className="btn-primary mt-6 w-fit">Read article <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article key={p.slug} className="card-surface flex flex-col p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">{p.tag}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.read}</span>
                  <Link to="/blog" className="font-semibold text-primary hover:text-accent-orange">Read →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
