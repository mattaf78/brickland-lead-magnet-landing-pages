import { createFileRoute } from "@tanstack/react-router";
import { LeadMagnetPage } from "@/components/leadMagnet/LeadMagnetPage";
import { ultraProcessedFoodTrap as config } from "@/content/leadMagnets/ultraProcessedFoodTrap";

export const Route = createFileRoute("/thetruth")({
  head: () => ({
    meta: [
      { title: config.seo?.pageTitle ?? config.brandName },
      { name: "description", content: config.seo?.metaDescription ?? config.hero.subtitle },
      { property: "og:title", content: config.seo?.ogTitle ?? config.hero.titleLine1 },
      { property: "og:description", content: config.seo?.ogDescription ?? config.hero.subtitle },
      { property: "og:image", content: config.hero.image.src },
      { property: "og:url", content: `https://thewellnessbrckdown.com${config.seo?.canonicalPath ?? "/thetruth"}` },
      { property: "og:site_name", content: config.brandName },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: config.hero.image.src },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: config.faq.items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: TheTruth,
});

function TheTruth() {
  return <LeadMagnetPage config={config} />;
}
