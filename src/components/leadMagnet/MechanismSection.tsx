import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { EvidenceCard } from "./EvidenceCard";

export function MechanismSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="relative bg-brand-green text-brand-green-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-brand-red" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-panel-cream/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brick-yellow" />
          {config.sectionLabels?.mechanism ?? "Hidden Mechanism"}
        </span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-panel-cream sm:text-4xl">
          {config.mechanism.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base text-panel-cream/85 sm:text-lg">
          {config.mechanism.intro}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {config.mechanism.cards.map((card, i) => (
            <EvidenceCard key={card.title} card={card} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
