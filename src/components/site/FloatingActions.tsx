import { Link } from 'react-router-dom';
import { MessageCircle, FileText } from "lucide-react";
import { COMPANY } from "@/lib/site-data";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:bottom-6 md:right-6">
      <Link
        to="/contact"
        className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] hover:translate-y-[-1px] transition"
      >
        <FileText className="h-4 w-4" /> Request Quote
      </Link>
      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-elevated)] hover:scale-105 transition"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
