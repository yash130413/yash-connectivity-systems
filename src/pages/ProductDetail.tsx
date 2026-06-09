import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Wrench, Building2, Award } from 'lucide-react';
import { QuoteForm } from '@/components/site/QuoteForm';
import { fetchProducts, fetchProductBySlug, type DBProduct, getProductImage } from '@/lib/api/products.functions';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<DBProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([fetchProductBySlug(slug), fetchProducts()])
      .then(([prod, all]) => {
        setProduct(prod);
        setRelatedProducts(all.filter((p) => p.slug !== slug).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="container-page py-16"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="container-page py-16">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-soft via-background to-background py-12">
        <div className="container-page">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent-orange mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">{product.category}</span>
              <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">
                {product.description}
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
              <img 
                src={getProductImage(product.imageUrl)} 
                alt={product.name}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6 md:space-y-8">
              {/* Specs */}
              <div className="card-surface rounded-xl md:rounded-2xl p-5 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Technical Specifications</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="border-l-2 border-primary pl-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {spec.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="card-surface rounded-xl md:rounded-2xl p-5 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Common Applications</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.applications.map((app) => (
                    <div key={app} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="card-surface rounded-xl md:rounded-2xl p-5 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Industries Served</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.industries.map((industry) => (
                    <span
                      key={industry}
                      className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="card-surface rounded-xl md:rounded-2xl p-5 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Key Benefits</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent-orange shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - shown below content on mobile, sticky on desktop */}
            <div className="lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
              <div className="card-surface rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Request a quote
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Get pricing and lead times for {product.name}
                </p>
                <QuoteForm compact source={`product-${product.slug}`} />
              </div>

              {/* Quick Info */}
              <div className="mt-6 card-surface rounded-2xl p-6">
                <h4 className="font-display text-sm font-bold text-foreground mb-4">
                  Why choose us?
                </h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Bulk MOQs available</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Same-day dispatch for stock items</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Pan-India delivery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Quality assured batches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <h2 className="font-display text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.filter(p => p.slug !== slug).slice(0, 3).map((relatedProduct) => (
              <Link
                key={relatedProduct.slug}
                to={`/products/${relatedProduct.slug}`}
                className="card-surface group overflow-hidden flex flex-col rounded-2xl"
              >
                <div className="aspect-[5/3] overflow-hidden bg-muted">
                  <img
                    src={getProductImage(relatedProduct.imageUrl)}
                    alt={relatedProduct.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent-orange mb-2">
                    {relatedProduct.category}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{relatedProduct.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{relatedProduct.short}</p>
                  <span className="mt-4 text-sm font-semibold text-primary group-hover:text-accent-orange transition-colors">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
