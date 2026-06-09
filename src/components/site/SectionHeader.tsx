export function SectionHeader({
  eyebrow, title, subtitle, center = false,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-[oklch(0.24_0.13_268)] text-primary-foreground">
      <div className="container-page py-16 md:py-24">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-orange">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-display text-4xl font-bold md:text-5xl lg:text-6xl max-w-3xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base md:text-lg text-primary-foreground/80 leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
