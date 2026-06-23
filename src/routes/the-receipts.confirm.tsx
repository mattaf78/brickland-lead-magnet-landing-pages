import { createFileRoute, Link } from "@tanstack/react-router";
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
      <section className="stage center">
        <div className="wrap">
          <div className="mail-icon" aria-hidden="true">
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
          <p className="fineprint">
            Didn't get it within a few minutes? Check your spam or promotions folder, or reply to any of our emails and we'll sort it.
          </p>
          <p className="fineprint" style={{ marginTop: 18 }}>
            <Link to="/the-receipts" style={{ color: "#e8c96b", fontWeight: 700 }}>← Back to The Receipts</Link>
          </p>
        </div>
      </section>
    </ReceiptsShell>
  );
}