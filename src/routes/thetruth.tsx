import { createFileRoute } from "@tanstack/react-router";
import { LeadMagnetPage } from "@/components/leadMagnet/LeadMagnetPage";
import { ultraProcessedFoodTrap as config } from "@/content/leadMagnets/ultraProcessedFoodTrap";

export const Route = createFileRoute("/thetruth")({
  head: () => ({
    meta: [
      { title: "The Ultra-Processed Food Trap — Free Brickland Field Guide" },
      { name: "description", content: config.hero.subtitle },
      { property: "og:title", content: "The Food System Isn't Broken. It's Built This Way." },
      { property: "og:description", content: config.hero.subtitle },
      { property: "og:image", content: config.hero.image.src },
      { property: "og:url", content: "https://thewellnessbrckdown.com/thetruth" },
      { property: "og:site_name", content: "The Wellness Brickdown" },
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
          mainEntity: config.faq.map((f) => ({
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
