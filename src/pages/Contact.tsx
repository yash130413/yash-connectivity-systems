import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/site/SectionHeader';
import { QuoteForm } from '@/components/site/QuoteForm';
import { FAQ } from '@/components/site/FAQ';
import { COMPANY } from '@/lib/site-data';
import { GENERAL_FAQS } from '@/lib/faq-data';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your requirement"
        subtitle="Send us your specifications — we respond fast, quote fair and ship on time."
      />

      <section className="section pt-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Contact Info & Map */}
            <div className="space-y-3">
              {/* Office Address */}
              <div className="card-surface rounded-xl p-4 flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Office Address
                  </h3>
                  <p className="text-sm text-foreground leading-snug">
                    2880, Lane-4, Laxman Vihar, Phase-2, Gurugram – 122001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="card-surface rounded-xl p-4 flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone
                  </h3>
                  <a href="tel:9015669917" className="text-sm text-foreground hover:text-primary">
                    9015669917
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="card-surface rounded-xl p-4 flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Email
                  </h3>
                  <a href="mailto:yash.consys@gmail.com" className="text-sm text-foreground hover:text-primary break-all">
                    yash.consys@gmail.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="card-surface rounded-xl p-4 flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Business Hours
                  </h3>
                  <p className="text-sm text-foreground">
                    Mon – Sat · 9:30 AM – 7:00 PM
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366] p-4 text-white hover:bg-[#20BA5A] transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <div>
                  <div className="font-display text-sm font-bold">Chat on WhatsApp</div>
                  <div className="text-xs text-white/80">Fastest response · Mon-Sat</div>
                </div>
              </a>

              {/* Map */}
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Office Location"
                  className="h-64 w-full lg:h-80"
                  loading="lazy"
                  src="https://www.google.com/maps?q=Laxman+Vihar+Phase+2+Gurugram&output=embed"
                />
              </div>
            </div>

            {/* Right Side - Quote Form */}
            <div className="card-surface rounded-xl p-6 lg:p-8 h-fit">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Request a quote
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Send your requirement — we'll come back with pricing, MOQs and lead times.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ 
        items={GENERAL_FAQS} 
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our products and services"
      />
    </>
  );
}
