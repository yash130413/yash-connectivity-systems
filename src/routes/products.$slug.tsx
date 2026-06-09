import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";
import { PRODUCTS, COMPANY, type Product } from "@/lib/site-data";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product" }] };
    return {
      meta: [
        { title: `${p.name} — Yash Connectivity Systems` },
        { name: "description", content: p.short },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${p.slug}` },
        { property: "og:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: `/products/${p.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/products" className="btn-primary mt-6"><ArrowLeft className="h-4 w-4" /> Back to products</Link>
    </div>
  ),
  component: ProductDetailPage,
});

const FAQ = [
  { q: "What is the minimum order quantity?", a: "MOQs vary by SKU and material. Most fast-moving items are available from small pilot runs to full container loads." },
  { q: "Do you ship pan-India?", a: "Yes. We ship across India via reputed transporters and offer same-day dispatch on in-stock SKUs." },
  { q: "Can you customize sizes / specs?", a: "Absolutely — share your drawing or sample and we'll quote custom dimensions, colors and printing." },
  { q: "What payment terms do you offer?", a: "First orders are typically advance. We extend credit terms for repeat clients after KYC." },
];

function ProductDetailPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="container-page py-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="inline h-3.5 w-3.5 mx-1" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
              <img src={product.image} alt={product.name} width={800} height={640} className="aspect-[5/4] w-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-card">
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">{product.category}</span>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#quote" className="btn-accent">Request Quote</a>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Specifications</h3>
              <dl className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 gap-3 px-5 py-3 text-sm">
                    <dt className="font-semibold text-foreground/70">{s.label}</dt>
                    <dd className="col-span-2 text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Applications</h3>
                <ul className="mt-3 space-y-2">
                  {product.applications.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Benefits</h3>
                <ul className="mt-3 space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent-orange mt-0.5" />{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">Industries Using This Product</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.industries.map((i) => (
                  <span key={i} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{i}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-[var(--shadow-card)]">
                <summary className="cursor-pointer list-none flex items-center justify-between font-display text-base font-bold">
                  {f.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Request Quote</span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Get a quote for {product.name}</h2>
            <p className="mt-4 text-muted-foreground">Share your sizes, volumes and printing requirements — we'll get back within 2 business hours.</p>
          </div>
          <div className="card-surface p-6 md:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Related Products</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="card-surface overflow-hidden group">
                <div className="aspect-[5/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
