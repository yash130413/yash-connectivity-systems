import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { PageHero } from '@/components/site/SectionHeader';
import { SkeletonProductCard } from '@/components/ui/skeleton';
import { fetchProducts, type DBProduct, getProductImage } from '@/lib/api/products.functions';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Barcode Labels', label: 'Barcode Labels' },
  { id: 'Ribbons', label: 'Ribbons' },
  { id: 'Packing Materials', label: 'Packing Materials' },
  { id: 'Cable Ties', label: 'Cable Ties' },
  { id: 'Insulated Connectors', label: 'Insulated Connectors' },
  { id: 'Heat Shrink Sleeves', label: 'Heat Shrink Sleeves' },
  { id: 'Conduit Plastics', label: 'Conduit Plastics' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.short.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Industrial product catalogue"
        subtitle="Filter by category or search across the full range. Every product ships with bulk pricing and lead time on request."
      />

      {/* Search & Filter */}
      <section className="section pt-8">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md md:flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            {/* Category Filter — scrollable on mobile */}
            <div className="-mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto pb-1">
              <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground/70 hover:bg-muted/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section pt-8">
        <div className="container-page">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="card-surface group overflow-hidden flex flex-col"
                >
                  <div className="aspect-[5/3] overflow-hidden bg-muted">
                    <img
                      src={getProductImage(product.imageUrl)}
                      alt={product.name}
                      loading="lazy"
                      width={800}
                      height={480}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent-orange mb-2">
                      {product.category}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{product.name}</h3>
                    <p className="mt-3 text-sm text-muted-foreground flex-1 leading-relaxed">
                      {product.short}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent-orange transition-colors">
                        Details <ChevronRight className="h-4 w-4" />
                      </span>
                      <button className="btn-accent text-sm py-2 px-4">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.24_0.13_268)] p-10 md:p-14 text-primary-foreground text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Can't find what you need?</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/80">
              We source custom products for bulk orders. Share your requirement and we'll get back with options.
            </p>
            <Link to="/contact" className="btn-accent mt-7">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
