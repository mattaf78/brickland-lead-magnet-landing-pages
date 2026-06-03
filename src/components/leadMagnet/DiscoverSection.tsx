import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";

export function DiscoverSection({ config }: { config: LeadMagnetConfig }) {
  const sectionLabel = config.sectionLabels?.discover ?? "Evidence Panel";
  const title = config.discover.title;
  // When the title is absent or identical to the section label, treat the
  // section label itself as the primary heading (larger, with red dot).
  const titleIsRedundant = !title || title === sectionLabel;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        {titleIsRedundant ? (
          <h2 className="inline-flex items-center gap-3 font-display text-2xl uppercase leading-tight text-brand-green sm:text-3xl md:text-4xl">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-brand-red" />
            {sectionLabel}
          </h2>
        ) : (
          <>
            <FieldReportTag>{sectionLabel}</FieldReportTag>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
              {title}
            </h2>
          </>
        )}
        {config.discover.intro && (
          <p className="mt-5 max-w-3xl text-base text-foreground/85 sm:text-lg">{config.discover.intro}</p>
        )}

        <div className="relative mt-8 border-2 border-brand-green bg-panel-cream">
          <div className="pointer-events-none absolute inset-1.5 border border-brand-brown/40" />
          <div className="relative p-6 sm:p-8">
            <ul className="space-y-4">
              {config.discover.bullets.map((b, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] items-start gap-3 border-l-4 border-brand-red pl-4">
                  <span className="font-mono text-sm font-bold leading-7 text-brand-red">{String(i + 1).padStart(2, "0")} ›</span>
                  <span className="text-base leading-relaxed text-foreground sm:text-[17px]">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
