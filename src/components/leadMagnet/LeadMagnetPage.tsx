import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { ClassificationBar } from "./ClassificationBar";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { MechanismSection } from "./MechanismSection";
import { DiscoverSection } from "./DiscoverSection";
import { MidCtaBand } from "./MidCtaBand";
import { PreviewSection } from "./PreviewSection";
import { WhyItMattersSection } from "./WhyItMattersSection";
import { AboutSection } from "./AboutSection";
import { FinalCta } from "./FinalCta";
import { FaqSection } from "./FaqSection";
import { Footer } from "./Footer";

/** Set visible: false on any section in the content config to hide it. */
const show = (flag: boolean | undefined) => flag !== false;

export function LeadMagnetPage({ config }: { config: LeadMagnetConfig }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ClassificationBar text={config.classificationBarText} />
      <Navbar
        brandName={config.brandName}
        fieldReportLabel={config.fieldReportLabel}
        leadMagnetId={config.leadMagnetId}
        logoMonogram={config.navbar?.logoMonogram}
        ctaLabel={config.navbar?.ctaLabel}
      />
      <main>
        {show(config.hero.visible) && <Hero config={config} />}
        {show(config.problem.visible) && <ProblemSection config={config} />}
        {show(config.mechanism.visible) && <MechanismSection config={config} />}
        {show(config.discover.visible) && <DiscoverSection config={config} />}
        {show(config.midCta.visible) && <MidCtaBand config={config} />}
        {show(config.preview.visible) && <PreviewSection config={config} />}
        {show(config.whyItMatters.visible) && <WhyItMattersSection config={config} />}
        {show(config.about.visible) && <AboutSection config={config} />}
        {show(config.finalCta.visible) && <FinalCta config={config} />}
        {show(config.faq.visible) && <FaqSection config={config} />}
      </main>
      {show(config.footer.visible) && <Footer config={config} />}
    </div>
  );
}
