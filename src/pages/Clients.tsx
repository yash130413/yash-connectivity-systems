import { Link } from 'react-router-dom';
import { PageHero } from '@/components/site/SectionHeader';
import { ClientCarousel } from '@/components/site/ClientCarousel';
import { CLIENTS, TESTIMONIALS } from '@/lib/site-data';

const INDUSTRY_VERTICALS = [
  {
    title: 'E-Commerce & Logistics',
    clients: ['Amazon'],
  },
  {
    title: 'Appliances & White Goods',
    clients: ['Haier', 'Carrier', 'Hitachi'],
  },
  {
    title: 'Electrical & Energy',
    clients: ['Schneider Electric', 'Revolt'],
  },
  {
    title: 'Automotive & Components',
    clients: ['Minda'],
  },
  {
    title: 'Exports & Trading',
    clients: ['Richaglobal'],
  },
];

const SUCCESS_STORIES = [
  {
    title: 'Standardized heat shrink supply across 4 plants',
    description: 'Replaced fragmented vendors with annual rate contract — reduced procurement cycle time by 60%.',
    tag: 'Tier-1 Automotive Supplier',
  },
  {
    title: 'Same-day thermal label dispatch',
    description: 'Buffer stock model ensures zero label-out events across a 100,000 sqft DC.',
    tag: 'E-Commerce Fulfilment Centre',
  },
  {
    title: 'Compliant export packaging program',
    description: 'Carton specs aligned with destination regulations and on-time vessel cut-offs.',
    tag: 'Export House',
  },
];

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Trusted by India's most demanding buyers"
        subtitle="From appliance giants to fulfilment leaders — purchase teams choose us for consistency, not promises."
      />

      {/* Logo Carousel */}
      <section className="section pt-12">
        <div className="container-page mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Trusted By
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Brands that rely on us</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            From Fortune 500 companies to fast-growing manufacturers — our clients trust us for consistent quality and reliable delivery.
          </p>
        </div>
        <ClientCarousel speed={30} />
      </section>

      {/* Industry Verticals */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Industry-Wise
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Across the verticals we serve</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_VERTICALS.map((vertical) => (
              <div key={vertical.title} className="card-surface rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  {vertical.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vertical.clients.map((client) => (
                    <span
                      key={client}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section">
        <div className="container-page">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Success Stories
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              What our work looks like in production
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUCCESS_STORIES.map((story) => (
              <div key={story.title} className="card-surface rounded-2xl p-8">
                <div className="text-4xl text-accent-orange mb-4">"</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {story.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {story.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {story.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-muted/40">
        <div className="container-page">
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Testimonials
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Words from procurement teams
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="card-surface rounded-2xl p-8">
                <div className="text-4xl text-accent-orange mb-4">"</div>
                <blockquote className="text-foreground/85 leading-relaxed mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="pt-4 border-t border-border">
                  <div className="font-display text-sm font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.24_0.13_268)] p-10 md:p-14 text-primary-foreground text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Join 100+ companies that trust us</h2>
            <Link to="/contact" className="btn-accent mt-7 inline-flex items-center gap-2">
              Become a Client <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
