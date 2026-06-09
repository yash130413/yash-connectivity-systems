import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item border border-border rounded-xl bg-card overflow-hidden transition-all duration-200 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/30"
        aria-expanded={isOpen}
      >
        <h3 className="font-display text-base font-semibold text-foreground pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`faq-content overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQ({ items, title = "Frequently Asked Questions", subtitle }: FAQProps) {
  return (
    <section className="section bg-muted/40">
      <div className="container-page">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <FAQAccordion key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
