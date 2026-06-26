import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeToList } from "@/lib/subscribe";

import titleReceiptsAsset from "@/assets/receipts/title_receipts.jpg.asset.json";
import f01Asset from "@/assets/receipts/F01.jpg.asset.json";
import aisleAsset from "@/assets/receipts/aisle.jpg.asset.json";
import f03Asset from "@/assets/receipts/F03.jpg.asset.json";
import f05Asset from "@/assets/receipts/F05.jpg.asset.json";
import wallAsset from "@/assets/receipts/wall.jpg.asset.json";
import conclusionAsset from "@/assets/receipts/conclusion.jpg.asset.json";
import elaraAsset from "@/assets/receipts/elara2.jpg.asset.json";

const IMG = {
  titleReceipts: titleReceiptsAsset.url,
  f01: f01Asset.url,
  aisle: aisleAsset.url,
  f03: f03Asset.url,
  f05: f05Asset.url,
  wall: wallAsset.url,
  conclusion: conclusionAsset.url,
  elara: elaraAsset.url,
};

const LEAD_MAGNET_ID = "the-receipts";

export const Route = createFileRoute("/the-receipts/")({
  head: () => ({
    meta: [
      { title: "The Receipts — free field report | The Wellness Brickdown" },
      {
        name: "description",
        content:
          "A free 12-page evidence guide: six documented cases of how diet advice was shaped by funding, marketing and lobbying. Every figure sourced.",
      },
      { property: "og:title", content: "The Receipts — free field report" },
      {
        property: "og:description",
        content:
          "Six documented cases — what you were told, and who paid for it. Follow the money, then decide for yourself.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TheReceiptsIndex,
});

type FormState = "idle" | "submitting" | "success" | "error";

function ReceiptsForm({ idSuffix }: { idSuffix: string }) {
  const subscribe = useServerFn(subscribeToList);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    if (!consent) {
      setState("error");
      setErrorMsg("Please tick the consent box to continue.");
      return;
    }
    setState("submitting");
    setErrorMsg(null);
    try {
      await subscribe({
        data: {
          name: name.trim() || "Friend",
          email: email.trim(),
          consent: true,
          leadMagnetId: LEAD_MAGNET_ID,
        },
      });
      setState("success");
      navigate({ to: "/the-receipts/confirm" });
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="trust" style={{ fontSize: 15, color: "#15695a", padding: "12px 4px" }}>
        ✓ Check your inbox — The Receipts is on its way.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="First name"
        aria-label="First name"
        id={`name-${idSuffix}`}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your email"
        aria-label="Your email"
        id={`email-${idSuffix}`}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label
        htmlFor={`consent-${idSuffix}`}
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          fontSize: 12.5,
          color: "#4a463c",
          lineHeight: 1.45,
          margin: "4px 0 12px",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          id={`consent-${idSuffix}`}
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ width: 16, height: 16, marginTop: 2, flex: "none", accentColor: "#c0432a" }}
        />
        <span>
          I agree to receive the free guide and occasional emails from Vital Living Ltd / The Wellness Brickdown, including educational content, free resources, updates, and promotional emails about courses, programmes, apps, services and related offers. I understand I can unsubscribe at any time.
        </span>
      </label>
      <button className="btn" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send me The Receipts →"}
      </button>
      {errorMsg && (
        <div className="trust" style={{ color: "#c0432a", marginTop: 8 }}>
          {errorMsg}
        </div>
      )}
    </form>
  );
}

function TheReceiptsIndex() {
  return (
    <div className="receipts-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="top">
        <div className="wrap">
          <div className="brand">
            <span className="t1">THE</span>
            <span className="t2">
              WELLNESS
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="6.4" stroke="currentColor" strokeWidth="2.6" />
                <line x1="14.7" y1="14.7" x2="21" y2="21" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
              <span className="r">BRICKDOWN</span>
            </span>
          </div>
          <div className="nav">Field report · free</div>
        </div>
      </div>

      <header className="hero">
        <div className="wrap">
          <div className="grid">
            <div>
              <span className="case">THE ADVICE HAD A SPONSOR</span>
              <div className="plate" style={{ maxWidth: 420, marginBottom: 18 }}>
                <img src={IMG.titleReceipts} alt="The Receipts" />
              </div>
              <h1>
                The diet advice you grew up with <em>had a sponsor.</em>
              </h1>
              <p className="sub">
                A free field report: six documented cases — what you were told, and who paid for it. Follow the money, then decide for yourself.
              </p>
            </div>
            <div className="form" id="get">
              <h3>Get The Receipts — free</h3>
              <p className="small">A 12-page evidence guide. Every figure sourced. Straight to your inbox.</p>
              <ReceiptsForm idSuffix="hero" />
              <div className="trust">
                No spam. Unsubscribe anytime. Education, not medical advice. <a href="/privacy">See our Privacy Policy.</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="band">
        <div className="wrap">
          <span className="kicker">Why this matters</span>
          <h2>You were up against more than yourself.</h2>
          <p className="lead">
            For decades, the food you were told was "healthy" was shaped by funding, marketing and lobbying — decisions made long before it reached your plate. <strong>The Receipts</strong> lays six of those cases side by side: the documents, the cheques, and the strategies. No conspiracy theories — just what's on the record, with every source listed so you can check it yourself.
          </p>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <span className="kicker">What's inside</span>
          <h2>Six receipts. Follow the money.</h2>
          <p className="lead">Each one shows what you were told, what the files show, and — honestly — what it does and doesn't prove.</p>
          <div className="cards">
            <ReceiptCard img={IMG.f01} title="The funded verdict" body="The 1967 review that blamed fat — paid for by the sugar industry, hidden for ~50 years." stat="$6,500 · 49 yrs hidden" statColor="var(--rc-red)" />
            <ReceiptCard img={IMG.aisle} title="The low-fat trap" body='Strip the fat, pour in sugar — how "low-fat" so often just meant high-sugar.' stat="sold as settled" statColor="var(--rc-amber)" />
            <ReceiptCard img={IMG.f03} title="The 'independent' voice" body={`The group that said "just move more" — and the drinks giant that quietly funded it.`} stat="$118.6m" statColor="var(--rc-teal)" />
            <ReceiptCard img={IMG.f05} title="The access gap" body="Who gets heard by government: industry vs public-health charities." stat="1,408 vs ~35" statColor="var(--rc-red)" />
            <ReceiptCard img={IMG.wall} title="The funding effect" body="The measurable pattern: industry-funded studies tilt toward the sponsor." stat="4–8× more likely" statColor="var(--rc-teal)" />
            <ReceiptCard img={IMG.conclusion} title="The pledge that missed" body="Voluntary promises barely moved sugar; a binding rule cut it by a third." stat="3% vs ~38%" statColor="var(--rc-amber)" />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="two">
            <div>
              <span className="kicker">What you'll take away</span>
              <h2>Spot the playbook anywhere.</h2>
              <ul className="ticks">
                <li>How to find who funded a study — in two questions.</li>
                <li>What "independent" actually requires.</li>
                <li>The five quiet moves used to keep you blaming yourself.</li>
                <li>Why a true fact can still be used to distract you.</li>
                <li>A simple filter before you trust any health claim.</li>
              </ul>
            </div>
            <div>
              <span className="kicker">Who it's for</span>
              <h2>Anyone who's been told it was their fault.</h2>
              <p className="lead">
                If you've ever followed the "official" diet advice and felt like you failed — this is for you. It's calm, sourced and practical: built to make you harder to fool, not to scare you or sell you a supplement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="about">
            <img src={IMG.elara} alt="Dr Elara Vital, Lead Investigator" />
            <div>
              <span className="kicker">Who's behind it</span>
              <h2>The Wellness Brickdown</h2>
              <p className="lead">
                An evidence-led investigation into the systems and incentives shaping your health — rebuilt in brick so the boardrooms, lobbies and lab reports are easy to see. Your guide is <strong>Dr Elara Vital</strong>, our Lead Investigator: calm, forensic, interested only in what the evidence actually supports. Every figure in The Receipts carries its source.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <span className="kicker">Before you ask</span>
          <h2>Honest answers.</h2>
          <div className="faq">
            <div className="q">
              <h3>Is this just more diet advice?</h3>
              <p>No. It doesn't tell you what to eat. It shows you how the advice itself was shaped — so you can judge any claim for yourself.</p>
            </div>
            <div className="q">
              <h3>Is it trustworthy, or just clickbait?</h3>
              <p>Every figure is from a documented, published source, listed at the back. We're explicit about what each case does and doesn't prove. No scare tactics.</p>
            </div>
            <div className="q">
              <h3>I don't have time.</h3>
              <p>Skim the first two pages. Each receipt is one page — what you were told, what the files show, the verdict.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="finalcta">
        <div className="wrap">
          <h2>Read the files. Check the incentive.</h2>
          <p>Get the free 12-page report and see the receipts for yourself.</p>
          <div className="form">
            <ReceiptsForm idSuffix="final" />
            <div className="trust">
              No spam. Unsubscribe anytime. Education, not medical advice. <a href="/privacy">See our Privacy Policy.</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <strong style={{ color: "#e8dcbf" }}>THE WELLNESS BRICKDOWN</strong> · Follow the evidence.
          <p className="disc">
            This report describes specific documented cases and a measurable pattern. It is not a claim that all nutrition science is bought, or that any named company changed any specific government policy. Companies named appear only in connection with documented, published facts. Brick-built images are a fictional dramatisation. Education and commentary only — not medical advice; consult a qualified professional before major health changes.
          </p>
          <p className="disc" style={{ marginTop: 14 }}>
            <a href="/privacy">Privacy Policy</a> · <a href="/yourvoice">Your Voice</a> · <a href="mailto:info@vitalliving.co.uk">Contact</a>
          </p>
          <p className="disc" style={{ marginTop: 6 }}>
            © 2026 The Wellness Brickdown · Vital Living Ltd · We will never sell, rent or share your details. Unsubscribe anytime.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ReceiptCard({
  img,
  title,
  body,
  stat,
  statColor,
}: {
  img: string;
  title: string;
  body: string;
  stat: string;
  statColor: string;
}) {
  return (
    <div className="rc">
      <img src={img} alt="" />
      <div className="bd">
        <h3>{title}</h3>
        <p>{body}</p>
        <span className="stat" style={{ color: statColor }}>{stat}</span>
      </div>
    </div>
  );
}

const CSS = `
.receipts-root {
  --rc-green:#1f3a2e; --rc-green2:#15402f; --rc-cream:#f1e8d2; --rc-cream2:#f6edd3; --rc-card:#faf4e1;
  --rc-red:#c0432a; --rc-teal:#15695a; --rc-amber:#c0892a; --rc-gold:#e8c96b; --rc-ink:#16140e; --rc-body:#332f27;
  --rc-line:#d9ca9f;
  font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  color:var(--rc-body);
  background:var(--rc-cream);
  background-image:radial-gradient(#e7dcbd 1px,transparent 1px);
  background-size:6px 6px;
  line-height:1.55;
}
.receipts-root * { box-sizing:border-box; margin:0; padding:0; }
.receipts-root .wrap { max-width:1080px; margin:0 auto; padding:0 22px; }
.receipts-root h1, .receipts-root h2, .receipts-root h3 {
  font-family:'Arial Black','Helvetica Neue',Arial,sans-serif;
  font-weight:900; line-height:1.08; color:var(--rc-green);
}
.receipts-root a { color:var(--rc-teal); }

/* top bar */
.receipts-root .top { background:var(--rc-green); color:#f4ecd9; }
.receipts-root .top .wrap { display:flex; align-items:center; justify-content:space-between; padding:11px 22px; }
.receipts-root .brand { display:flex; flex-direction:column; line-height:1; }
.receipts-root .brand .t1 { font-size:10px; letter-spacing:.22em; font-weight:800; color:#cdbf9c; }
.receipts-root .brand .t2 { font-family:'Arial Black',Arial,sans-serif; font-weight:900; font-size:18px; display:flex; align-items:center; gap:6px; }
.receipts-root .brand .t2 .r { color:var(--rc-red); }
.receipts-root .brand svg { width:15px; height:15px; color:var(--rc-gold); }
.receipts-root .top .nav { font-size:13px; color:#cdbf9c; font-weight:700; }

/* hero */
.receipts-root .hero { background:var(--rc-green); color:#f4ecd9; padding:30px 0 46px; border-bottom:5px solid var(--rc-gold); }
.receipts-root .hero .grid { display:grid; grid-template-columns:1.1fr .9fr; gap:34px; align-items:center; }
.receipts-root .plate { background:var(--rc-cream2); border:2px solid #e4d6ab; border-radius:16px; padding:18px; text-align:center; box-shadow:0 12px 30px rgba(0,0,0,.3); }
.receipts-root .plate img { max-width:100%; height:auto; display:block; margin:0 auto; mix-blend-mode:multiply; }
.receipts-root .hero h1 { color:#f4ecd9; font-size:40px; margin:4px 0 12px; }
.receipts-root .hero h1 em { color:var(--rc-gold); font-style:normal; }
.receipts-root .hero p.sub { font-size:18px; color:#e8dcbf; margin-bottom:8px; }
.receipts-root .hero .case { display:inline-block; border:1.5px solid var(--rc-gold); color:var(--rc-gold); border-radius:30px; padding:5px 15px; font-size:12.5px; font-weight:800; letter-spacing:.06em; margin-bottom:14px; }

/* form */
.receipts-root .form { background:var(--rc-card); border-radius:14px; padding:20px; border:1px solid var(--rc-line); box-shadow:0 8px 22px rgba(0,0,0,.18); }
.receipts-root .form h3 { font-size:19px; margin-bottom:4px; }
.receipts-root .form p.small { font-size:13px; color:#6f6651; margin-bottom:12px; }
.receipts-root .form input { width:100%; padding:13px 14px; border:1.5px solid var(--rc-line); border-radius:9px; font-size:15px; margin-bottom:10px; background:#fff; color:var(--rc-body); font-family:inherit; }
.receipts-root .btn { display:inline-block; width:100%; text-align:center; background:var(--rc-red); color:#fff; font-weight:800; font-size:16px; padding:14px 18px; border:0; border-radius:9px; cursor:pointer; text-decoration:none; box-shadow:0 5px 0 #8f3120; font-family:inherit; }
.receipts-root .btn:hover { filter:brightness(1.05); }
.receipts-root .btn:disabled { opacity:.7; cursor:not-allowed; }
.receipts-root .trust { font-size:12.5px; color:#7a6f57; text-align:center; margin-top:9px; }

/* sections */
.receipts-root section.band { padding:48px 0; }
.receipts-root section.alt { background:var(--rc-green); color:#ede4cf; }
.receipts-root section.alt h2 { color:#fff; }
.receipts-root section.alt p { color:#dcd2ba; }
.receipts-root .kicker { display:block; font-size:13px; letter-spacing:.14em; text-transform:uppercase; color:var(--rc-red); font-weight:800; margin-bottom:8px; }
.receipts-root section.alt .kicker { color:var(--rc-gold); }
.receipts-root h2 { font-size:30px; margin-bottom:14px; }
.receipts-root .lead { font-size:18px; max-width:760px; }

/* receipts cards */
.receipts-root .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:26px; }
.receipts-root .rc { background:var(--rc-card); border:1px solid var(--rc-line); border-radius:13px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,.08); }
.receipts-root .rc img { width:100%; height:128px; object-fit:cover; display:block; border-bottom:3px solid var(--rc-green); background:#e4d6ab; }
.receipts-root .rc .bd { padding:13px 15px 16px; }
.receipts-root .rc h3 { font-size:16px; color:var(--rc-green); margin-bottom:5px; }
.receipts-root .rc p { font-size:13.5px; color:#4a463c; line-height:1.45; }
.receipts-root .rc .stat { font-family:'Arial Black',Arial,sans-serif; font-weight:900; font-size:15px; margin-top:8px; display:block; }

/* benefits / who */
.receipts-root .two { display:grid; grid-template-columns:1fr 1fr; gap:30px; margin-top:18px; }
.receipts-root ul.ticks { list-style:none; margin-top:6px; }
.receipts-root ul.ticks li { position:relative; padding-left:30px; margin-bottom:11px; font-size:16px; }
.receipts-root ul.ticks li::before { content:""; position:absolute; left:0; top:3px; width:18px; height:18px; border-radius:4px; background:var(--rc-teal); }
.receipts-root ul.ticks li::after { content:""; position:absolute; left:5px; top:7px; width:5px; height:9px; border:solid #fff; border-width:0 2.5px 2.5px 0; transform:rotate(45deg); }
.receipts-root section.alt ul.ticks li::before { background:var(--rc-gold); }
.receipts-root section.alt ul.ticks li::after { border-color:var(--rc-green); }

/* about */
.receipts-root .about { display:grid; grid-template-columns:.8fr 1.2fr; gap:30px; align-items:center; }
.receipts-root .about img { width:100%; border-radius:13px; border:3px solid var(--rc-green); box-shadow:0 6px 16px rgba(0,0,0,.18); }

/* faq */
.receipts-root .faq { margin-top:20px; max-width:820px; }
.receipts-root .faq .q { background:var(--rc-card); border:1px solid var(--rc-line); border-radius:11px; padding:15px 18px; margin-bottom:12px; }
.receipts-root .faq .q h3 { font-size:16.5px; color:var(--rc-green); margin-bottom:5px; }
.receipts-root .faq .q p { font-size:14.5px; color:#4a463c; }

/* final cta */
.receipts-root .finalcta { background:var(--rc-red); color:#fff; text-align:center; padding:50px 0; }
.receipts-root .finalcta h2 { color:#fff; font-size:30px; }
.receipts-root .finalcta p { color:#ffe3d8; font-size:17px; margin:10px auto 22px; max-width:620px; }
.receipts-root .finalcta .form { max-width:440px; margin:0 auto; color:var(--rc-body); }

/* footer */
.receipts-root footer { background:var(--rc-ink); color:#bcae8e; padding:30px 0; font-size:13px; }
.receipts-root footer .disc { font-size:12px; color:#9b8f70; line-height:1.6; max-width:900px; margin-top:10px; }
.receipts-root footer a { color:var(--rc-gold); }

@media (max-width:840px) {
  .receipts-root .hero .grid,
  .receipts-root .two,
  .receipts-root .about { grid-template-columns:1fr; }
  .receipts-root .cards { grid-template-columns:1fr 1fr; }
  .receipts-root .hero h1 { font-size:32px; }
  .receipts-root h2 { font-size:25px; }
}
@media (max-width:560px) {
  .receipts-root .cards { grid-template-columns:1fr; }
}
`;
