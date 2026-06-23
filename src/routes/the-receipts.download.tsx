import { createFileRoute } from "@tanstack/react-router";
import { ReceiptsShell } from "@/components/ReceiptsShell";
import titleReceiptsAsset from "@/assets/receipts/title_receipts.jpg.asset.json";

/**
 * Thank-you / download page. The PDF asset isn't uploaded yet — drop the
 * `.asset.json` for the report into `src/assets/receipts/` and swap PDF_URL.
 */
const PDF_URL = "#"; // TODO: replace with The Receipts PDF asset URL when supplied.

export const Route = createFileRoute("/the-receipts/download")({
  head: () => ({
    meta: [
      { title: "Your Receipts are ready | The Wellness Brickdown" },
      {
        name: "description",
        content:
          "Download The Receipts — a free 12-page field report. Six documented cases, every figure sourced.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Your Receipts are ready" },
      {
        property: "og:description",
        content: "One short report, six documented cases. About ten minutes to skim.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <ReceiptsShell navLabel="Your download">
      <section className="stage center">
        <div className="wrap">
          <div className="plate dl-plate">
            <img src={titleReceiptsAsset.url} alt="The Receipts" />
          </div>
          <h1>Your Receipts are ready.</h1>
          <p>
            One short report, six documented cases. Open it now while it's fresh — it takes about ten minutes to skim.
          </p>
          <p style={{ marginTop: 18 }}>
            <a
              className="dl-btn"
              href={PDF_URL}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download The Receipts (PDF) →
            </a>
          </p>
          <p className="fineprint">We've also emailed you a copy. Check your inbox (and spam, just in case).</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <span className="kicker">What to look for first</span>
          <h2>Three things that will stick with you.</h2>
          <ul className="stick-list">
            <li><strong>The funded verdict</strong> — the 1967 review that blamed fat was paid for, and stayed hidden for nearly 50 years.</li>
            <li><strong>The 'independent' voice</strong> — follow the money behind "just move more."</li>
            <li><strong>The pledge that missed</strong> — why "trust us to fix it ourselves" deserves a receipt.</li>
          </ul>

          <div className="panel">
            <h3>A tiny action before you go</h3>
            <p>
              Just read the first two pages now. That's enough to start seeing the pattern — and you'll know whether the rest is worth your ten minutes (it is).
            </p>
          </div>

          <div className="nextstep">
            <p>
              This is a Brickdown Alliance field report — built for you, not at you.
            </p>
            <p style={{ marginTop: 8 }}>
              What should we open next? <a href="https://thewellnessbrickdown.com/yourvoice">thewellnessbrickdown.com/yourvoice</a>
            </p>
          </div>
        </div>
      </section>
    </ReceiptsShell>
  );
}