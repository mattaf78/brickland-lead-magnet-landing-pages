import type { LeadMagnetConfig } from "@/content/leadMagnets/types";

export function MidCtaBand({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="bg-brand-green text-panel-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brick-yellow">{config.midCta.eyebrow}</p>
          <h3 className="mt-1 font-display text-2xl uppercase text-panel-cream sm:text-3xl">{config.midCta.headline}</h3>
        </div>
        <a
          href="#final-cta"
          className="inline-flex min-h-[52px] items-center bg-brand-red px-6 font-display text-base uppercase tracking-wider text-panel-cream shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
        >
          {config.midCta.buttonLabel}
        </a>
      </div>
    </section>
  );
}
