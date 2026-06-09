import { Link } from 'react-router-dom';
import { Factory, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/site/SectionHeader';
import { useEffect, useState } from 'react';
import { fetchProducts, type DBProduct, getProductImage } from '@/lib/api/products.functions';

const INDUSTRIES = [
  {
    name: 'Automotive',
    description: 'Wire harness terminals, heat shrink, cable ties & barcode labels for OEMs and Tier-1 suppliers.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Cable Ties', 'Heat Shrink Sleeves', 'Insulated Connectors', 'Conduit Plastics', 'Barcode Labels'],
  },
  {
    name: 'Food Industry',
    description: 'Food-grade packing materials and cold-chain labels for processing & distribution.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Barcode Labels', 'Thermal Transfer Ribbons', 'Packing Materials'],
  },
  {
    name: 'Garment Industry',
    description: 'Care labels, price tags, ribbons and packaging for domestic and export garment makers.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Barcode Labels', 'Thermal Transfer Ribbons', 'Packing Materials'],
  },
  {
    name: 'Packaging Industry',
    description: 'Cartons, films, tapes and barcode labels for converters and contract packers.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Packing Materials', 'Barcode Labels', 'Cable Ties'],
  },
  {
    name: 'Export Houses',
    description: 'Compliant shipping marks, barcode labels and export-grade packaging.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Barcode Labels', 'Packing Materials', 'Thermal Transfer Ribbons'],
  },
  {
    name: 'White Goods',
    description: 'Connectors, sleeves, ties and barcode labels for appliance manufacturers.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Insulated Connectors', 'Heat Shrink Sleeves', 'Cable Ties', 'Barcode Labels'],
  },
  {
    name: 'E-Commerce',
    description: 'Direct thermal labels, polybags, tapes and void fill for fulfilment centres.',
    applications: [
      { label: 'Production line', icon: CheckCircle },
      { label: 'QA / dispatch', icon: CheckCircle },
      { label: 'Wire harnessing', icon: CheckCircle },
      { label: 'Final packing', icon: CheckCircle },
    ],
    products: ['Barcode Labels', 'Thermal Transfer Ribbons', 'Packing Materials'],
  },
];

export default function IndustriesPage() {
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    fetchProducts().then(setDbProducts).catch(() => {});
  }, []);

  const getProduct = (name: string) => dbProducts.find(p => p.name === name);
  const getImage = (name: string) => {
    const p = getProduct(name);
    return p ? getProductImage(p.imageUrl) : undefined;
  };

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industrial supply, vertical by vertical"
        subtitle="Each industry has its own quality, compliance and lead-time expectations. Here's how we serve yours."
      />

      <section className="section">
        <div className="container-page">
          <div className="space-y-16">
            {INDUSTRIES.map((industry, index) => (
              <div
                key={industry.name}
                className="grid gap-6 lg:grid-cols-[1fr,1.2fr]"
              >
                {/* Industry Info Card */}
                <div className="card-surface rounded-2xl p-6 md:p-10 shadow-sm">
                  <div className="grid h-12 w-12 md:h-14 md:w-14 place-items-center rounded-xl md:rounded-2xl bg-primary text-primary-foreground mb-5">
                    <Factory className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {industry.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {industry.description}
                  </p>
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Common Applications
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {industry.applications.map((app) => (
                        <div key={app.label} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground">{app.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/contact" className="btn-accent inline-flex items-center gap-2 text-sm">
                    Discuss Requirement <span>→</span>
                  </Link>
                </div>

                {/* Products Used Card */}
                <div className="bg-muted/30 rounded-2xl p-6 md:p-10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                    Products Used
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {industry.products.map((productName) => {
                      const image = getImage(productName);
                      const product = getProduct(productName);
                      return (
                        <Link
                          key={productName}
                          to={product ? `/products/${product.slug}` : '/products'}
                          className="card-surface group flex items-center gap-3 p-3 md:p-4 rounded-xl hover:shadow-sm transition-all"
                        >
                          {image && (
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <img src={image} alt={productName} className="h-full w-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {productName}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">{product?.category}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.24_0.13_268)] p-10 md:p-14 text-primary-foreground text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Serving a different vertical?</h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/80">
              We work across manufacturing, export and fulfilment. Tell us your industry and we'll map the right products.
            </p>
            <Link to="/contact" className="btn-accent mt-7">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
