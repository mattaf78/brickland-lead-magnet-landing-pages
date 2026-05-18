import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { OptInForm } from "./OptInForm";

export function FinalCta({ config }: { config: LeadMagnetConfig }) {
  return (
    <section id="final-cta" className="scroll-mt-24 bg-brand-green text-panel-cream">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="relative border-2 border-panel-cream/70 bg-brand-green p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-2 border border-panel-cream/30" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brick-yellow">
                {config.finalCta.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-panel-cream sm:text-4xl md:text-5xl">
                {config.finalCta.titleLine1}
                <br />
                <span className="text-brick-yellow">{config.finalCta.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-panel-cream/85 sm:text-lg">
                {config.finalCta.body}
              </p>
            </div>
            <div className="relative border-2 border-panel-cream bg-panel-cream text-foreground">
              <div className="absolute -top-3 left-4 bg-brand-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-cream">
                Free guide
              </div>
              <div className="p-5 sm:p-6">
                <OptInForm
                  formId="final"
                  form={config.form}
                  privacyLine={config.hero.privacyLine}
                  privacyPolicyText={config.hero.privacyPolicyText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
