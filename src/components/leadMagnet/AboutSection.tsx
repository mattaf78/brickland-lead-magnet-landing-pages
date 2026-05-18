import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";

export function AboutSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <FieldReportTag>{config.sectionLabels?.about ?? "About the Investigators"}</FieldReportTag>
        <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
          {config.about.title}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {config.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-6 inline-block border-2 border-brand-red bg-panel-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red">
          Educational content only · Not medical advice
        </p>
      </div>
    </section>
  );
}
