import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FieldReportTag } from "./FieldReportTag";

export function FaqSection({ config }: { config: LeadMagnetConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <FieldReportTag>{config.sectionLabels?.faq?.eyebrow ?? "Frequently Asked"}</FieldReportTag>
        <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
          {config.sectionLabels?.faq?.heading ?? "Questions from the Field"}
        </h2>
        <div className="mt-8 border-2 border-brand-green bg-panel-cream">
          <Accordion type="single" collapsible className="divide-y divide-brand-brown/30">
            {config.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-5 sm:px-6">
                <AccordionTrigger className="py-5 text-left font-display text-base uppercase tracking-wide text-brand-green hover:text-brand-red sm:text-lg">
                  <span className="mr-3 font-mono text-xs text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-foreground/85">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
