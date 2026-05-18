import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";

export function PreviewSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FieldReportTag>{config.sectionLabels?.preview ?? "Inside the Report"}</FieldReportTag>
        <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
          {config.preview.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base text-foreground/85 sm:text-lg">{config.preview.intro}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.preview.items.map((item, i) => (
            <figure key={item.label} className="relative">
              <div className="relative border-2 border-brand-green bg-panel-cream p-2 shadow-[4px_4px_0_0_var(--brand-green)]">
                <div className="pointer-events-none absolute inset-1 border border-brand-brown/40" />
                <img src={item.image.src} alt={item.image.alt} className="relative w-full" loading="lazy" />
              </div>
              <figcaption className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-brand-brown">
                <span>Page {String(i + 1).padStart(2, "0")}</span>
                <span className="text-brand-red">{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
