import { createFileRoute } from "@tanstack/react-router";
import { ReceiptsShell } from "@/components/ReceiptsShell";

export const Route = createFileRoute("/the-receipts/confirm")({
  head: () => ({
    meta: [
      { title: "Almost there — confirm your email | The Wellness Brickdown" },
      {
        name: "description",
        content:
          "Confirm your email to receive The Receipts — a free 12-page evidence guide from The Wellness Brickdown.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Confirm your email — The Receipts" },
      {
        property: "og:description",
        content: "Click the confirmation link in your inbox and your copy of The Receipts is on its way.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ConfirmPage,
});

function ConfirmPage() {
  return (
    <ReceiptsShell navLabel="One quick step">
      <header className="hero hero-confirm">
        <div className="wrap">
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
          <h1>
            Almost there — <em>confirm your email.</em>
          </h1>
          <p>
            We've just sent a confirmation link to your inbox. Click it, and your copy of <strong>The Receipts</strong> is on its way.
          </p>
          <p>It takes ten seconds — and it keeps your copy out of spam.</p>
          <div className="small">
            Didn't get it within a few minutes? Check your spam or promotions folder, or reply to any of our emails and we'll sort it.
          </div>
        </div>
      </header>
    </ReceiptsShell>
  );
}