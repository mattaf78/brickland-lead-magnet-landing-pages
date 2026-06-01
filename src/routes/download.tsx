import { createFileRoute, Link } from "@tanstack/react-router";

// ================================================================
// DOWNLOAD PAGE — /download
// Shown after a subscriber signs up for the lead magnet.
// They land here from the email platform confirmation link.
//
// PDF FILE: Upload your PDF to public/lead-magnets/ and update
// PDF_HREF below. The file will be served at /lead-magnets/<name>.
// ================================================================
const PDF_HREF = "/lead-magnets/They%20Knew%20Lead%20Magnet.pdf";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
});

// Brand colours
const C = {
  beige:    "#E8D8B8",
  cream:    "#FFF3D6",
  green:    "#173F2A",
  red:      "#A8322D",
  charcoal: "#202020",
  brown:    "#6F5C45",
  yellow:   "#D9A441",
};

const bodyFont  = { fontFamily: "Georgia, 'Times New Roman', serif" };
const monoFont  = { fontFamily: "'Courier New', Courier, monospace" };
const container = { maxWidth: 880, margin: "0 auto", padding: "0 1.5rem" };
const narrowContainer = { maxWidth: 680, margin: "0 auto", padding: "0 1.5rem" };

function SectionLabel({ children, colour = C.green, textColour = C.cream }: { children: React.ReactNode; colour?: string; textColour?: string }) {
  return (
    <div style={{ display: "inline-block", background: colour, color: textColour, fontSize: "0.65rem", ...monoFont, letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.25rem 0.8rem", marginBottom: "1.25rem" }}>
      {children}
    </div>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: `4px solid ${C.green}`, margin: 0 }} />;
}

function DownloadPage() {
  return (
    <div style={{ ...bodyFont, fontSize: 17, lineHeight: 1.75, color: C.charcoal, backgroundColor: C.beige, minHeight: "100vh" }}>

      {/* Classification bar */}
      <div style={{ background: C.charcoal, color: "rgba(255,243,214,0.6)", textAlign: "center", padding: "0.35rem 1rem", ...monoFont, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" as const }}>
        Wellness Brickdown &mdash; Field Report LP001 &mdash; Guide Access &mdash; Educational Content Only
      </div>

      {/* Navbar */}
      <nav style={{ background: C.green, borderBottom: `4px solid ${C.yellow}`, padding: "0.9rem 0" }} aria-label="Site navigation">
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "0.5rem" }}>
          <Link to="/" style={{ color: C.cream, fontSize: "0.95rem", fontWeight: "bold", textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
            The Wellness Brickdown
          </Link>
          <span style={{ background: C.yellow, color: C.charcoal, fontSize: "0.62rem", ...monoFont, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "0.2rem 0.65rem", fontWeight: "bold" }}>
            Download Ready
          </span>
        </div>
      </nav>

      <Divider />

      {/* ── Confirmation hero ── */}
      <section style={{ background: C.green, borderBottom: `4px solid ${C.yellow}`, padding: "3rem 0 3.5rem" }} aria-labelledby="confirm-heading">
        <div style={narrowContainer}>
          <SectionLabel colour={C.yellow} textColour={C.charcoal}>Field Report Cleared &mdash; Access Granted</SectionLabel>
          <h1 id="confirm-heading" style={{ ...bodyFont, fontSize: "clamp(1.9rem, 4.5vw, 2.9rem)", color: C.cream, marginBottom: "1rem", fontWeight: "bold", lineHeight: 1.15 }}>
            You are in.<br />
            <span style={{ color: C.yellow }}>Your field guide is ready.</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,243,214,0.88)", lineHeight: 1.8, maxWidth: 580 }}>
            The Brickland Field Guide is ready to download below. Click the button, save the file, and read it whenever you are ready. There is no time limit and no expiry.
          </p>
        </div>
      </section>

      <Divider />

      {/* ── Download panel ── */}
      <section style={{ background: C.beige, padding: "4rem 0" }} id="download" aria-labelledby="download-heading">
        <div style={narrowContainer}>
          <SectionLabel colour={C.yellow} textColour={C.charcoal}>Your Download</SectionLabel>

          <div style={{ background: C.cream, border: `3px solid ${C.green}`, borderTop: `7px solid ${C.yellow}`, padding: "2.25rem", boxShadow: "6px 6px 0 rgba(23,63,42,0.2)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "2.5rem", alignItems: "center" }}>

              {/* Cover */}
              <div>
                <img
                  src="/lead-magnets/cover.png"
                  alt="Cover of the Brickland field guide"
                  style={{ border: `3px solid ${C.green}`, boxShadow: `4px 4px 0 ${C.charcoal}`, width: "100%", display: "block" }}
                />
              </div>

              {/* Copy + button */}
              <div>
                <p style={{ ...monoFont, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.brown, marginBottom: "0.5rem" }}>
                  Brickland Field Guide &mdash; LM001
                </p>
                <h2 id="download-heading" style={{ ...bodyFont, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: "bold", color: C.green, lineHeight: 1.25, marginBottom: "0.75rem" }}>
                  The Food System Isn&rsquo;t Broken.<br />It&rsquo;s Built This Way.
                </h2>
                <p style={{ ...monoFont, fontSize: "0.78rem", color: C.brown, letterSpacing: "0.06em", borderLeft: `3px solid ${C.yellow}`, paddingLeft: "0.75rem", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                  PDF &mdash; Free &mdash; Brickland Field Report Series<br />
                  Approximately 10&ndash;15 minutes to read
                </p>

                <a
                  href={PDF_HREF}
                  download
                  aria-label="Download the Brickland Field Guide PDF"
                  style={{ display: "block", width: "100%", background: C.yellow, color: C.charcoal, ...bodyFont, fontSize: "1.2rem", fontWeight: "bold", textDecoration: "none", padding: "1.1rem 2rem", border: `3px solid ${C.charcoal}`, textAlign: "center" as const, lineHeight: 1.3, boxSizing: "border-box" as const }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#c49238")}
                  onMouseLeave={e => (e.currentTarget.style.background = C.yellow)}
                >
                  Download Your Free Guide ↓
                </a>

                <p style={{ ...monoFont, fontSize: "0.78rem", color: C.brown, letterSpacing: "0.04em", marginTop: "0.85rem" }}>
                  PDF file &mdash; opens in any PDF viewer &mdash; safe to save and share.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── What happens next ── */}
      <section style={{ background: "rgba(255,243,214,0.5)", padding: "3.5rem 0" }} id="next" aria-labelledby="next-heading">
        <div style={container}>
          <SectionLabel>What Happens Next</SectionLabel>
          <h2 id="next-heading" style={{ ...bodyFont, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, color: C.charcoal }}>
            Three things to do now
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginTop: "2rem" }}>
            {[
              {
                num: "Step 01",
                title: "Download the guide",
                body: "Click the yellow button above and save the PDF somewhere you will find it. Read it at your own pace — there is no rush and no expiry date.",
              },
              {
                num: "Step 02",
                title: "Check your inbox",
                body: "A confirmation email is on its way. It includes a link back to this page in case you need to download the guide again later.",
              },
              {
                num: "Step 03",
                title: "Tell us what you want next",
                body: "Help us decide what to expose, explain or build next. It takes less than 60 seconds and your answers directly shape what we produce.",
              },
            ].map((card) => (
              <div key={card.num} style={{ background: C.cream, border: `2px solid ${C.green}`, borderTop: `5px solid ${C.red}`, padding: "1.5rem 1.35rem" }}>
                <span style={{ display: "block", ...monoFont, fontSize: "0.6rem", color: C.red, letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.5rem" }}>
                  {card.num}
                </span>
                <div style={{ fontWeight: "bold", fontSize: "1rem", color: C.green, marginBottom: "0.5rem" }}>
                  {card.title}
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: C.charcoal, marginBottom: 0 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Contents reminder ── */}
      <section style={{ background: C.beige, padding: "3.5rem 0" }} id="contents" aria-labelledby="contents-heading">
        <div style={narrowContainer}>
          <SectionLabel>Inside Your Guide</SectionLabel>
          <h2 id="contents-heading" style={{ ...bodyFont, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, color: C.charcoal }}>
            What you are about to read
          </h2>
          <p style={{ marginTop: "1rem" }}>
            A quick reminder of what the guide covers &mdash; so you know where to start.
          </p>

          <div style={{ background: C.cream, border: `3px solid ${C.green}`, borderLeft: `7px solid ${C.green}`, padding: "2rem 2rem 1.5rem", boxShadow: "5px 5px 0 rgba(23,63,42,0.18)", marginTop: "1.5rem" }}>
            <p style={{ ...monoFont, fontSize: "0.7rem", color: C.green, textTransform: "uppercase" as const, letterSpacing: "0.12em", fontWeight: "bold", marginBottom: "1.25rem" }}>
              The field guide shows you:
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Why willpower is not fighting in a neutral environment — and why that changes everything.",
                "How shelf design, packaging and discount cues can nudge behaviour before conscious thought kicks in.",
                "How labels and health claims can shape perception in ways that may not match the evidence.",
                "Why deals, placement and convenience can quietly dominate food choices throughout the day.",
                "What the research supports, and what it does not prove — stated clearly and fairly.",
                "How to rebuild your setup so that better choices require less force and less self-blame.",
                "How to spot the system around you without turning it into a source of guilt.",
              ].map((item, i, arr) => (
                <li key={i} style={{ padding: "0.65rem 0 0.65rem 2rem", position: "relative", borderBottom: i < arr.length - 1 ? "1px solid rgba(23,63,42,0.15)" : "none", fontSize: "0.97rem", lineHeight: 1.65 }}>
                  <span style={{ position: "absolute", left: 0, color: C.red, fontWeight: "bold", fontSize: "1rem" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Survey nudge banner ── */}
      <section style={{ background: C.green, borderTop: `4px solid ${C.yellow}`, borderBottom: `4px solid ${C.yellow}`, padding: "2.25rem 0" }} aria-labelledby="survey-heading">
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" as const }}>
          <div>
            <p style={{ ...monoFont, fontSize: "0.68rem", color: C.yellow, letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>
              Your Voice &mdash; 60 Seconds
            </p>
            <p id="survey-heading" style={{ color: C.cream, fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: "bold", lineHeight: 1.3, maxWidth: 520, marginBottom: 0 }}>
              What do you want The Wellness Brickdown to expose, explain or build next?
            </p>
          </div>
          <Link
            to="/yourvoice"
            style={{ display: "inline-block", background: C.green, color: C.cream, ...bodyFont, fontSize: "1.05rem", fontWeight: "bold", textDecoration: "none", padding: "0.9rem 1.8rem", border: `3px solid ${C.yellow}`, letterSpacing: "0.02em", textAlign: "center" as const, lineHeight: 1.3 }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1d5334")}
            onMouseLeave={e => (e.currentTarget.style.background = C.green)}
          >
            Share Your Answer
          </Link>
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer style={{ background: C.charcoal, color: "rgba(255,243,214,0.65)", padding: "2.5rem 0" }}>
        <div style={container}>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
            <strong style={{ color: C.cream, display: "block", marginBottom: "0.75rem" }}>The Wellness Brickdown</strong>
            Brickland is a fictional satirical world created for educational commentary. All characters, institutions and locations within Brickland are fictional.
          </p>
          <div style={{ borderTop: "1px solid rgba(255,243,214,0.18)", marginTop: "1.5rem", paddingTop: "1.5rem", ...monoFont, fontSize: "0.7rem", color: "rgba(255,243,214,0.42)", lineHeight: 1.7 }}>
            <p>
              <strong style={{ color: "rgba(255,243,214,0.6)" }}>Educational content only. Not medical advice.</strong>{" "}
              This material is provided for education and general commentary only. It is not a substitute for professional medical, nutritional or psychological advice, diagnosis or treatment. Always speak to a qualified health professional before making significant changes to your diet, lifestyle or health routines.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              &copy; The Wellness Brickdown. Brickland is a fictional satirical world. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
