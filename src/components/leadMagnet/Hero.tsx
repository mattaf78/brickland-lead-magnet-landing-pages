import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";
import { OptInForm } from "./OptInForm";

export function Hero({ config }: { config: LeadMagnetConfig }) {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="order-1">
            <FieldReportTag>{config.hero.eyebrow}</FieldReportTag>
            <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-brand-green sm:text-5xl md:text-6xl">
              {config.hero.titleLine1}
              <br />
              <span className="text-brand-red">{config.hero.titleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
              {config.hero.subtitle}
            </p>

            <div className="relative mt-6 border-2 border-brand-green bg-panel-cream">
              <div className="absolute -top-3 left-4 bg-brand-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-cream">
                Free guide
              </div>
              <div className="p-5 sm:p-6">
                <OptInForm
                  formId="hero"
                  form={config.form}
                  privacyLine={config.hero.privacyLine}
                  privacyPolicyText={config.hero.privacyPolicyText}
                />
              </div>
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-brown">
              {config.hero.trustLine}
            </p>
          </div>

          <div className="order-2 lg:pl-4">
            <div className="relative border-2 border-brand-green bg-panel-cream p-3 shadow-[6px_6px_0_0_var(--brand-green)]">
              <div className="pointer-events-none absolute inset-1 border border-brand-brown/40" />
              <img
                src={config.hero.image.src}
                alt={config.hero.image.alt}
                className="relative w-full"
                loading="eager"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-brand-brown">
              <span>Exhibit 001</span>
              <span>{config.countyName}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
