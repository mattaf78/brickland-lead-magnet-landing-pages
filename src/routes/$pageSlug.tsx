import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { LeadMagnetPage } from "@/components/leadMagnet/LeadMagnetPage";
import { getPublishedPageBySlug } from "@/lib/leadMagnetPages.functions";
import type { LeadMagnetConfig } from "@/content/leadMagnets/types";

const pageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["lead-magnet-page", slug],
    queryFn: () => getPublishedPageBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/$pageSlug")({
  loader: async ({ params, context }) => {
    const row = await context.queryClient.ensureQueryData(pageQuery(params.pageSlug));
    if (!row) throw notFound();
    return row;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const config = loaderData.config as LeadMagnetConfig;
    const slug = loaderData.slug;
    return {
      meta: [
        { title: config.seo?.pageTitle ?? config.brandName },
        { name: "description", content: config.seo?.metaDescription ?? config.hero?.subtitle },
        { property: "og:title", content: config.seo?.ogTitle ?? config.hero?.titleLine1 },
        { property: "og:description", content: config.seo?.ogDescription ?? config.hero?.subtitle },
        { property: "og:image", content: config.hero?.image?.src },
        { property: "og:url", content: `https://thewellnessbrickdown.com${config.seo?.canonicalPath ?? `/${slug}`}` },
        { property: "og:site_name", content: config.brandName },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: config.hero?.image?.src },
      ],
      ...(config.faq?.visible !== false && (config.faq?.items?.length ?? 0) > 0
        ? {
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
          }
        : {}),
    };
  },
  component: PublicLeadMagnet,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <p className="text-muted-foreground">Couldn't load this page: {error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <p className="text-muted-foreground">Page not found.</p>
    </div>
  ),
});

function PublicLeadMagnet() {
  const { pageSlug } = Route.useParams();
  const { data } = useSuspenseQuery(pageQuery(pageSlug));
  if (!data) return null;
  return <LeadMagnetPage config={data.config as LeadMagnetConfig} />;
}