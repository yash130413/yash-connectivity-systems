import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/SectionHeader";
import { QuoteForm } from "@/components/site/QuoteForm";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Yash Connectivity Systems" },
      { name: "description", content: "Request a quote, call us or WhatsApp now. Gurugram-based supplier serving manufacturers and exporters across India." },
      { property: "og:title", content: "Contact Yash Connectivity Systems" },
      { property: "og:description", content: "Talk to our team for quotations, samples and supply enquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const FAQ = [
  { q: "How fast will I get a quote?", a: "Within 2 business hours for in-range items. Custom items may take up to 1 business day." },
  { q: "Do you offer samples?", a: "Yes — sample policy depends on the product. Most labels, ribbons and ties are available as paid samples." },
  { q: "What's your delivery coverage?", a: "Pan-India by surface and air. NCR deliveries within 24–48 hours from in-stock SKUs." },
  { q: "Do you accept GST invoices?", a: "Every dispatch is invoiced with full GST compliance and e-way bill where applicable." },
];

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your requirement" subtitle="Send us your specifications — we respond fast, quote fair and ship on time." />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-6">
            {[
              { Icon: MapPin, t: "Office Address", v: COMPANY.address },
              { Icon: Phone, t: "Phone", v: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              { Icon: Mail, t: "Email", v: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { Icon: Clock, t: "Business Hours", v: COMPANY.hours },
            ].map(({ Icon, t, v, href }) => (
              <div key={t} className="card-surface p-5 flex gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary shrink-0"><Icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t}</div>
                  {href ? <a href={href} className="mt-1 block text-sm text-foreground hover:text-primary">{v}</a> : <div className="mt-1 text-sm text-foreground">{v}</div>}
                </div>
              </div>
            ))}
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#25D366] p-5 text-white shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition">
              <MessageCircle className="h-6 w-6" />
              <div>
                <div className="font-display text-base font-bold">Chat on WhatsApp</div>
                <div className="text-xs opacity-90">Fastest response · Mon–Sat</div>
              </div>
            </a>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe title="Map" className="h-64 w-full" loading="lazy" src="https://www.google.com/maps?q=Laxman+Vihar+Phase+2+Gurugram&output=embed" />
            </div>
          </aside>

          <div className="lg:col-span-3 card-surface p-6 md:p-9">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Request a quote</h2>
            <p className="mt-2 text-muted-foreground">Send your requirement — we'll come back with pricing, MOQs and lead times.</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl font-bold">FAQs</h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-[var(--shadow-card)]">
                <summary className="cursor-pointer list-none font-display text-base font-bold">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
