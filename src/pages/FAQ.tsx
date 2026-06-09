import { useEffect } from 'react';
import { PageHero } from '@/components/site/SectionHeader';
import { FAQ } from '@/components/site/FAQ';
import { ALL_FAQS, GENERAL_FAQS, PRODUCT_FAQS } from '@/lib/faq-data';
import { Package, Truck, FileText, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  { icon: HelpCircle, title: "General", count: GENERAL_FAQS.length },
  { icon: Package, title: "Products", count: PRODUCT_FAQS.length },
  { icon: FileText, title: "Orders & Quotes", count: 3 },
  { icon: Truck, title: "Delivery", count: 2 }
];

export default function FAQPage() {
  useEffect(() => {
    document.title = 'FAQ - Yash Connect Systems';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Frequently asked questions about barcode labels, thermal ribbons, cable ties, heat shrink sleeves, and our services.');
    }
  }, []);
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our products, services, and processes."
      />

      {/* Category Overview */}
      <section className="section pt-12">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto mb-12">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="card-surface rounded-xl p-5 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.count} questions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All FAQs */}
      <FAQ 
        items={ALL_FAQS}
        title="All Questions"
        subtitle="Browse through our complete FAQ collection"
      />

      {/* Still Have Questions CTA */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center card-surface rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="btn-primary">
                Contact Us
              </a>
              <a 
                href="https://wa.me/919015669917" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-accent"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
