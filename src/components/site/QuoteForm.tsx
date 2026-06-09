import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/api/leads.functions";

type Status = "idle" | "sending" | "sent" | "error";

export function QuoteForm({ compact = false, source = "website" }: { compact?: boolean; source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      requirement: String(fd.get("requirement") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      source,
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      await submitLead(data);
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Couldn't send right now. Please WhatsApp or call us.");
    }
  }

  const disabled = status === "sending" || status === "sent";

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-success/20 bg-gradient-to-br from-success/5 to-success/10 p-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 animate-bounce-in">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Thank You for Your Request!</h3>
        <p className="text-sm text-muted-foreground">Our team will contact you shortly with a detailed quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
        <input name="name" required maxLength={120} className="input-field mt-1.5" placeholder="Your full name" disabled={disabled} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
        <input name="company" required maxLength={160} className="input-field mt-1.5" placeholder="Company / firm" disabled={disabled} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
        <input name="phone" required type="tel" maxLength={40} className="input-field mt-1.5" placeholder="+91 99999 99999" disabled={disabled} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
        <input name="email" required type="email" maxLength={200} className="input-field mt-1.5" placeholder="you@company.com" disabled={disabled} />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Requirement</label>
        <input name="requirement" required maxLength={1000} className="input-field mt-1.5" placeholder="e.g. 100×50 mm chromo barcode labels, 50,000 nos" disabled={disabled} />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
        <textarea name="message" rows={4} maxLength={2000} className="input-field mt-1.5 resize-none" placeholder="Share specs, sample images or delivery timelines" disabled={disabled} />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <button type="submit" disabled={disabled} className="btn-accent w-full md:w-auto disabled:opacity-70">
          {status === "sending" && (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>)}
          {status === "error" && (<><AlertCircle className="h-4 w-4" /> Try again</>)}
          {status === "idle" && (<><Send className="h-4 w-4" /> Request Quote</>)}
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          {status === "error"
            ? errorMsg
            : "We typically respond within 2 business hours. Your details go straight to our sales team."}
        </p>
      </div>
    </form>
  );
}
