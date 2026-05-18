import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { EvidenceCard } from "./EvidenceCard";
import { FieldReportTag } from "./FieldReportTag";

export function ProblemSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FieldReportTag>{config.sectionLabels?.problem ?? "Case File 01"}</FieldReportTag>
        <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
          {config.problem.title}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base text-foreground/85 sm:text-lg">
          {config.problem.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {config.problem.cards.map((card, i) => (
            <EvidenceCard key={card.title} card={card} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
