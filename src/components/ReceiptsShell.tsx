import type { ReactNode } from "react";

/**
 * Shared chrome + scoped CSS for the WB004 "The Receipts" funnel pages
 * (`/the-receipts`, `/the-receipts/confirm`, `/the-receipts/download`).
 *
 * All styles live under `.receipts-root` so they cannot leak.
 */

export function ReceiptsShell({
  children,
  navLabel,
}: {
  children: ReactNode;
  navLabel: string;
}) {
  return (
    <div className="receipts-root">
      <style dangerouslySetInnerHTML={{ __html: RECEIPTS_CSS }} />
      <ReceiptsTopBar navLabel={navLabel} />
      {children}
      <ReceiptsFooter />
    </div>
  );
}

function ReceiptsTopBar({ navLabel }: { navLabel: string }) {
  return (
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
        <div className="nav">{navLabel}</div>
      </div>
    </div>
  );
}

function ReceiptsFooter() {
  return (
    <footer>
      <div className="wrap">
        <strong style={{ color: "#e8dcbf" }}>THE WELLNESS BRICKDOWN</strong> · Follow the evidence.
        <p className="disc">
          Education and commentary only — not medical advice; consult a qualified professional before major health changes.
        </p>
      </div>
    </footer>
  );
}

export const RECEIPTS_CSS = `
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
  min-height:100vh;
  display:flex;
  flex-direction:column;
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
.receipts-root .top .wrap { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:14px; padding:11px 22px; }
.receipts-root .brand { display:flex; flex-direction:column; line-height:1; min-width:0; }
.receipts-root .brand .t1 { font-size:10px; letter-spacing:.22em; font-weight:800; color:#cdbf9c; }
.receipts-root .brand .t2 { font-family:'Arial Black',Arial,sans-serif; font-weight:900; font-size:18px; display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.receipts-root .brand .t2 .r { color:var(--rc-red); }
.receipts-root .brand svg { width:15px; height:15px; color:var(--rc-gold); flex:none; }
.receipts-root .top .nav { font-size:13px; color:#cdbf9c; font-weight:700; text-align:right; }

/* hero (index page) */
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

/* confirm page: full-height centred hero */
.receipts-root .hero-confirm {
  background: var(--rc-green);
  color: #f4ecd9;
  border-bottom: 5px solid var(--rc-gold);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 22px;
  min-height: calc(100vh - 55px - 90px);
}
.receipts-root .hero-confirm .wrap { width: 100%; }
.receipts-root .hero-confirm .badge {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: var(--rc-gold);
  color: var(--rc-green);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  box-shadow: 0 10px 24px rgba(0,0,0,.25);
}
.receipts-root .hero-confirm .badge svg { width: 36px; height: 36px; }
.receipts-root .hero-confirm h1 { color: #f4ecd9; font-size: 42px; margin-bottom: 18px; }
.receipts-root .hero-confirm h1 em { color: var(--rc-gold); font-style: normal; }
.receipts-root .hero-confirm p { color: #e8dcbf; font-size: 17px; max-width: 640px; margin: 0 auto 14px; }
.receipts-root .hero-confirm p strong { color: #fff; }
.receipts-root .hero-confirm .small { color: #bdb191; font-size: 13.5px; max-width: 560px; margin: 24px auto 0; }

/* confirm + download shared (legacy .stage, kept for download page) */
.receipts-root .stage { background:var(--rc-green); color:#f4ecd9; min-height:62vh; padding:80px 0; border-bottom:5px solid var(--rc-gold); }
.receipts-root .stage.center { text-align:center; }
.receipts-root .stage h1 { color:#f4ecd9; font-size:42px; margin-bottom:18px; }
.receipts-root .stage h1 em { color:var(--rc-gold); font-style:normal; }
.receipts-root .stage p { color:#e8dcbf; font-size:17px; max-width:640px; margin:0 auto 14px; }
.receipts-root .stage p strong { color:#fff; }
.receipts-root .stage .fineprint { color:#bdb191; font-size:13.5px; max-width:560px; margin:24px auto 0; }
.receipts-root .mail-icon { width:78px; height:78px; border-radius:50%; background:var(--rc-gold); color:var(--rc-green); display:inline-flex; align-items:center; justify-content:center; margin-bottom:22px; box-shadow:0 10px 24px rgba(0,0,0,.25); }
.receipts-root .mail-icon svg { width:36px; height:36px; }

/* download page */
.receipts-root .dl-plate { max-width:420px; margin:0 auto 22px; }
.receipts-root .dl-btn { display:inline-block; background:var(--rc-red); color:#fff; font-weight:800; font-size:18px; padding:16px 28px; border:0; border-radius:11px; cursor:pointer; text-decoration:none; box-shadow:0 5px 0 #8f3120; font-family:inherit; margin-top:6px; }
.receipts-root .dl-btn:hover { filter:brightness(1.05); }
.receipts-root .panel { background:var(--rc-card); border:1px solid var(--rc-line); border-left:5px solid var(--rc-gold); border-radius:13px; padding:22px 24px; max-width:820px; margin:30px auto 0; }
.receipts-root .panel h3 { font-size:19px; margin-bottom:6px; }
.receipts-root .panel p { font-size:15px; color:#4a463c; }
.receipts-root .nextstep { background:var(--rc-red); color:#fff; border-radius:13px; padding:22px 24px; max-width:820px; margin:22px auto 0; text-align:center; }
.receipts-root .nextstep p { color:#ffe3d8; margin:0; }
.receipts-root .nextstep a { color:#fff; text-decoration:underline; font-weight:800; }
.receipts-root .stick-list { list-style:none; max-width:820px; margin:18px auto 0; }
.receipts-root .stick-list li { position:relative; padding-left:34px; margin-bottom:12px; font-size:16px; }
.receipts-root .stick-list li::before { content:""; position:absolute; left:0; top:3px; width:20px; height:20px; border-radius:5px; background:var(--rc-teal); }
.receipts-root .stick-list li::after { content:""; position:absolute; left:6px; top:7px; width:6px; height:11px; border:solid #fff; border-width:0 2.5px 2.5px 0; transform:rotate(45deg); }

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
  .receipts-root .stage h1 { font-size:32px; }
  .receipts-root h2 { font-size:25px; }
}
@media (max-width:560px) {
  .receipts-root .cards { grid-template-columns:1fr; }
}
`;