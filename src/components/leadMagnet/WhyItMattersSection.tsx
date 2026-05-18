import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { EvidenceCard } from "./EvidenceCard";
import { FieldReportTag } from "./FieldReportTag";

export function WhyItMattersSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FieldReportTag>Field Observations</FieldReportTag>
        <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
          {config.whyItMatters.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base text-foreground/85 sm:text-lg">{config.whyItMatters.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.whyItMatters.cards.map((card, i) => (
            <EvidenceCard key={card.title} card={card} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
