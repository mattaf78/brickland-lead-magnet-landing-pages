import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";

// ================================================================
// SUBMISSION ENDPOINT
// Set this before deploying to production.
// Leave empty to run in demo mode (logs payload to console).
//
// Option A — Cloudflare Worker (already in this project):
//   const FORM_ENDPOINT = "/api/your-voice-submit";
//
// Option B — Supabase Edge Function:
//   const FORM_ENDPOINT = "https://YOUR_PROJECT.supabase.co/functions/v1/your-voice-submit";
//
// DATABASE TABLE SCHEMA (paste into Supabase SQL editor or Postgres):
//   CREATE TABLE your_voice_responses (
//     id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     created_at     timestamptz DEFAULT now(),
//     source_page    text DEFAULT '/yourvoice',
//     lead_magnet    text DEFAULT 'they_knew',
//     identity_mode  text CHECK (identity_mode IN ('anonymous','email_revealed')),
//     email          text,
//     expose_topics      jsonb,
//     content_types      jsonb,
//     support_interests  jsonb,
//     health_goals       jsonb,
//     stuck_points       jsonb,
//     other_expose_topic     text,
//     other_content_type     text,
//     other_support_interest text,
//     other_health_goal      text,
//     other_stuck_point      text,
//     utm_source    text,
//     utm_medium    text,
//     utm_campaign  text,
//     utm_content   text,
//     utm_term      text,
//     referrer      text,
//     user_agent    text
//   );
// ================================================================
const FORM_ENDPOINT = "";

// Brand colour values
const C = {
  beige:    "#E8D8B8",
  cream:    "#FFF3D6",
  green:    "#173F2A",
  red:      "#A8322D",
  charcoal: "#202020",
  brown:    "#6F5C45",
  yellow:   "#D9A441",
};

// Question definitions
type QuestionKey = "expose_topics" | "content_types" | "support_interests" | "health_goals" | "stuck_points";
type OtherKey    = "other_expose_topic" | "other_content_type" | "other_support_interest" | "other_health_goal" | "other_stuck_point";

const QUESTIONS: Array<{
  key:   QuestionKey;
  otherKey: OtherKey;
  num:   string;
  title: string;
  options: Array<{ value: string; label: string }>;
}> = [
  {
    key:      "expose_topics",
    otherKey: "other_expose_topic",
    num:      "01 of 05",
    title:    "What exposé-style topics would you like us to investigate?",
    options: [
      { value: "big_food_ultra_processed",                       label: "Big Food and ultra-processed food" },
      { value: "food_labels_supermarket_tricks",                 label: 'Food labels, "healthy" junk and supermarket tricks' },
      { value: "sugar_snacks_cereals_cravings",                  label: "Sugar, snacks, cereals and cravings" },
      { value: "big_pharma_medicine_chronic_disease",            label: "Big Pharma, medicine and chronic disease" },
      { value: "fitness_myths_fat_loss_transformations",         label: "Fitness myths, fat-loss claims and body transformations" },
      { value: "supplements_exaggerated_wellness_claims",        label: "Supplements and exaggerated wellness claims" },
      { value: "wellness_influencers_fake_expertise_fear_marketing", label: "Wellness influencers, fake expertise and fear-based marketing" },
      { value: "stress_burnout_sleep_caffeine",                  label: "Stress, burnout, sleep and caffeine dependence" },
      { value: "body_image_beauty_anti_ageing",                  label: "Body image, beauty pressure and anti-ageing claims" },
      { value: "plastics_toxins_environmental_health",           label: "Plastics, toxins, household chemicals and environmental health" },
      { value: "childrens_food_family_health",                   label: "Children's food and family health" },
      { value: "corporate_wellness_workplace_health",            label: "Corporate wellness and workplace health culture" },
    ],
  },
  {
    key:      "content_types",
    otherKey: "other_content_type",
    num:      "02 of 05",
    title:    "What would you like to receive from us?",
    options: [
      { value: "expose_style_videos",        label: "Exposé-style videos" },
      { value: "short_practical_videos",     label: "Short practical videos" },
      { value: "email_breakdowns",           label: "Email breakdowns" },
      { value: "downloadable_guides",        label: "Downloadable guides" },
      { value: "checklists_cheat_sheets",    label: "Checklists and cheat sheets" },
      { value: "visual_system_maps",         label: "Visual system maps" },
      { value: "step_by_step_action_plans",  label: "Step-by-step action plans" },
      { value: "practical_challenges",       label: "Practical challenges" },
      { value: "courses_programmes",         label: "Courses or programmes" },
      { value: "apps_digital_tools",         label: "Apps or digital tools" },
      { value: "live_sessions_qas",          label: "Live sessions or Q&As" },
    ],
  },
  {
    key:      "support_interests",
    otherKey: "other_support_interest",
    num:      "03 of 05",
    title:    "What kind of practical support would interest you most?",
    options: [
      { value: "food_label_tools",                        label: "Food label tools" },
      { value: "supermarket_shopping_tools",              label: "Supermarket shopping tools" },
      { value: "energy_reset_plans",                      label: "Energy reset plans" },
      { value: "sleep_stress_plans",                      label: "Sleep and stress plans" },
      { value: "cravings_appetite_support",               label: "Cravings or appetite support" },
      { value: "weight_loss_without_industry_nonsense",   label: "Weight-loss support without industry nonsense" },
      { value: "family_food_resources",                   label: "Family food resources" },
      { value: "supplement_claim_checkers",               label: "Supplement claim checkers" },
      { value: "simple_habit_trackers",                   label: "Simple habit trackers" },
      { value: "structured_course_programme",             label: "A structured course or programme" },
      { value: "practical_app_digital_tool",              label: "A practical app or digital tool" },
    ],
  },
  {
    key:      "health_goals",
    otherKey: "other_health_goal",
    num:      "04 of 05",
    title:    "What are your main health goals right now?",
    options: [
      { value: "more_energy",                   label: "More energy" },
      { value: "better_sleep",                  label: "Better sleep" },
      { value: "less_stress",                   label: "Less stress" },
      { value: "fewer_cravings",                label: "Fewer cravings" },
      { value: "better_food_choices",           label: "Better food choices" },
      { value: "weight_loss_body_composition",  label: "Weight loss or better body composition" },
      { value: "better_digestion",              label: "Better digestion" },
      { value: "lower_inflammation",            label: "Lower inflammation" },
      { value: "better_fitness_strength",       label: "Better fitness or strength" },
      { value: "better_family_food_choices",    label: "Better family food choices" },
      { value: "less_confused_health_advice",   label: "Feeling less confused about health advice" },
    ],
  },
  {
    key:      "stuck_points",
    otherKey: "other_stuck_point",
    num:      "05 of 05",
    title:    "Where do you feel most stuck?",
    options: [
      { value: "struggle_to_stay_consistent",      label: "I know what to do but struggle to stay consistent" },
      { value: "overwhelmed_by_conflicting_advice", label: "I feel overwhelmed by conflicting advice" },
      { value: "do_not_know_who_to_trust",          label: "I do not know who or what to trust" },
      { value: "cravings_emotional_eating",         label: "I struggle with cravings or emotional eating" },
      { value: "tired_stressed_burnt_out",          label: "I am tired, stressed or burnt out" },
      { value: "food_labels_ingredients_confusing", label: "I find food labels and ingredients confusing" },
      { value: "healthy_choices_when_busy",         label: "I struggle to make healthy choices when busy" },
      { value: "need_simple_plan",                  label: "I want better habits but need a simple plan" },
      { value: "support_for_family",                label: "I want support for my family, not just myself" },
    ],
  },
];

// Route
export const Route = createFileRoute("/yourvoice")({
  head: () => ({
    meta: [
      { title: "Your Voice | The Wellness Brickdown" },
      {
        name: "description",
        content:
          "Tell us what you want The Wellness Brickdown to expose, explain or build next. Takes less than 60 seconds.",
      },
      { property: "og:title",       content: "Your Voice | The Wellness Brickdown" },
      { property: "og:description", content: "Shape future videos, guides, tools, courses, programmes and practical resources." },
      { property: "og:url",         content: "https://thewellnessbrickdown.com/yourvoice" },
      { property: "og:site_name",   content: "The Wellness Brickdown" },
      { property: "og:type",        content: "website" },
      { name: "twitter:card",       content: "summary" },
      { name: "robots",             content: "noindex, nofollow" },
    ],
  }),
  component: YourVoicePage,
});

// ================================================================
// Helpers
// ================================================================
function getUtmParams(): Record<string, string | null> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get("utm_source"),
    utm_medium:   p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_content:  p.get("utm_content"),
    utm_term:     p.get("utm_term"),
  };
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ================================================================
// Sub-components
// ================================================================

function OptionTile({
  id,
  checked,
  label,
  onChange,
}: {
  id: string;
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.6rem",
        padding: "0.7rem 0.85rem",
        background: checked ? C.green : C.beige,
        border: `2px solid ${checked ? C.green : "rgba(23,63,42,0.3)"}`,
        cursor: "pointer",
        fontSize: "0.9rem",
        lineHeight: 1.45,
        color: checked ? C.cream : C.charcoal,
        transition: "background 0.12s, border-color 0.12s, color 0.12s",
        minHeight: "44px",
        userSelect: "none",
      }}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 18,
          height: 18,
          marginTop: 2,
          border: `2px solid ${checked ? C.cream : C.brown}`,
          background: checked ? C.red : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          fontWeight: "bold",
          color: checked ? C.cream : "transparent",
        }}
      >
        ✓
      </span>
      {label}
    </label>
  );
}

function QuestionBlock({
  questionKey,
  otherKey,
  num,
  title,
  options,
  selections,
  otherText,
  onToggle,
  onAllToggle,
  onOtherToggle,
  onOtherText,
}: {
  questionKey: QuestionKey;
  otherKey: OtherKey;
  num: string;
  title: string;
  options: Array<{ value: string; label: string }>;
  selections: string[];
  otherText: string;
  onToggle: (key: QuestionKey, value: string, checked: boolean) => void;
  onAllToggle: (key: QuestionKey, checked: boolean, allValues: string[]) => void;
  onOtherToggle: (key: QuestionKey, checked: boolean) => void;
  onOtherText: (key: OtherKey, value: string) => void;
}) {
  const allValues = options.map((o) => o.value);
  const allChecked =
    allValues.length > 0 && allValues.every((v) => selections.includes(v));
  const otherChecked = selections.includes("other");

  return (
    <div
      style={{
        background: C.cream,
        border: `3px solid ${C.green}`,
        borderTop: `6px solid ${C.red}`,
        padding: "1.75rem 1.75rem 1.5rem",
        marginBottom: "1.5rem",
        boxShadow: `4px 4px 0 rgba(23,63,42,0.15)`,
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            display: "block",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.6rem",
            color: C.red,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          Question {num}
        </div>
        <div
          style={{
            fontSize: "1.08rem",
            fontWeight: "bold",
            color: C.green,
            lineHeight: 1.35,
            marginBottom: "0.3rem",
            fontFamily: "Georgia, serif",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: C.brown,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Tick any that apply.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.6rem",
        }}
      >
        {options.map((opt) => (
          <OptionTile
            key={opt.value}
            id={`${questionKey}_${opt.value}`}
            checked={selections.includes(opt.value)}
            label={opt.label}
            onChange={(checked) => onToggle(questionKey, opt.value, checked)}
          />
        ))}

        {/* All of the above */}
        <div style={{ gridColumn: "1 / -1" }}>
          <OptionTile
            id={`${questionKey}_all`}
            checked={allChecked}
            label="All of the above"
            onChange={(checked) => onAllToggle(questionKey, checked, allValues)}
          />
        </div>

        {/* Other */}
        <div style={{ gridColumn: "1 / -1" }}>
          <OptionTile
            id={`${questionKey}_other`}
            checked={otherChecked}
            label="Other"
            onChange={(checked) => onOtherToggle(questionKey, checked)}
          />
        </div>

        {otherChecked && (
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              htmlFor={`${questionKey}_other_text`}
              style={{
                display: "block",
                fontSize: "0.68rem",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.brown,
                marginBottom: "0.4rem",
              }}
            >
              Please tell us more
            </label>
            <input
              type="text"
              id={`${questionKey}_other_text`}
              value={otherText}
              onChange={(e) => onOtherText(otherKey, e.target.value)}
              maxLength={300}
              placeholder="Tell us more..."
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                border: `2px solid ${C.green}`,
                background: "#fff",
                fontFamily: "Georgia, serif",
                fontSize: "0.92rem",
                color: C.charcoal,
                outline: "none",
                minHeight: 44,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ================================================================
// Main page component
// ================================================================
function YourVoicePage() {
  type Selections = Record<QuestionKey, string[]>;
  type OtherTexts  = Record<OtherKey, string>;

  const [selections, setSelections] = useState<Selections>({
    expose_topics:     [],
    content_types:     [],
    support_interests: [],
    health_goals:      [],
    stuck_points:      [],
  });

  const [otherTexts, setOtherTexts] = useState<OtherTexts>({
    other_expose_topic:     "",
    other_content_type:     "",
    other_support_interest: "",
    other_health_goal:      "",
    other_stuck_point:      "",
  });

  const [identityMode, setIdentityMode] = useState<"anonymous" | "email_revealed">("anonymous");
  const [email,          setEmail]          = useState("");
  const [emailError,     setEmailError]     = useState("");
  const [validationMsg,  setValidationMsg]  = useState("");
  const [status,         setStatus]         = useState<"idle" | "submitting" | "success" | "error">("idle");
  // Honeypot
  const [hp, setHp] = useState("");

  // Toggle a single option
  const handleToggle = useCallback(
    (key: QuestionKey, value: string, checked: boolean) => {
      setSelections((prev) => {
        const current = prev[key];
        const next = checked
          ? [...current, value]
          : current.filter((v) => v !== value);
        return { ...prev, [key]: next };
      });
      setValidationMsg("");
    },
    []
  );

  // "All of the above"
  const handleAllToggle = useCallback(
    (key: QuestionKey, checked: boolean, allValues: string[]) => {
      setSelections((prev) => {
        const current = prev[key];
        const withoutStandard = current.filter(
          (v) => v === "other"
        );
        const next = checked ? [...allValues, ...withoutStandard] : withoutStandard;
        return { ...prev, [key]: next };
      });
      setValidationMsg("");
    },
    []
  );

  // "Other" toggle
  const handleOtherToggle = useCallback(
    (key: QuestionKey, checked: boolean) => {
      setSelections((prev) => {
        const current = prev[key];
        const next = checked
          ? [...current, "other"]
          : current.filter((v) => v !== "other");
        return { ...prev, [key]: next };
      });
      if (!checked) {
        const otherKeyMap: Record<QuestionKey, OtherKey> = {
          expose_topics:     "other_expose_topic",
          content_types:     "other_content_type",
          support_interests: "other_support_interest",
          health_goals:      "other_health_goal",
          stuck_points:      "other_stuck_point",
        };
        setOtherTexts((prev) => ({ ...prev, [otherKeyMap[key]]: "" }));
      }
    },
    []
  );

  const handleOtherText = useCallback((key: OtherKey, value: string) => {
    setOtherTexts((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Honeypot check
      if (hp) return;

      // Validate: at least one checkbox
      const anySelected = Object.values(selections).some((arr) => arr.length > 0);
      if (!anySelected) {
        setValidationMsg("Please select at least one option before submitting.");
        return;
      }

      // Validate email if revealed
      if (identityMode === "email_revealed") {
        if (!email.trim() || !isValidEmail(email.trim())) {
          setEmailError("Please enter a valid email address.");
          return;
        }
      }
      setEmailError("");
      setValidationMsg("");
      setStatus("submitting");

      const payload = {
        source_page:   "/yourvoice",
        lead_magnet:   "they_knew",
        identity_mode: identityMode,
        email:         identityMode === "email_revealed" ? email.trim() : null,
        ...selections,
        ...Object.fromEntries(
          Object.entries(otherTexts).map(([k, v]) => [k, v.trim() || null])
        ),
        referrer:   typeof document !== "undefined" ? document.referrer || null : null,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent || null : null,
        ...getUtmParams(),
      };

      if (!FORM_ENDPOINT) {
        console.log("[Your Voice] Demo mode — payload:", JSON.stringify(payload, null, 2));
        await new Promise((r) => setTimeout(r, 600));
        setStatus("success");
        return;
      }

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        setStatus("success");
      } catch (err) {
        console.error("[Your Voice] Submission error:", err);
        setStatus("error");
      }
    },
    [hp, selections, identityMode, email, otherTexts]
  );

  // ----------------------------------------------------------------
  // Shared style objects
  // ----------------------------------------------------------------
  const bodyFont  = { fontFamily: "Georgia, 'Times New Roman', serif" };
  const monoFont  = { fontFamily: "'Courier New', Courier, monospace" };

  const pageStyle: React.CSSProperties = {
    ...bodyFont,
    fontSize: 17,
    lineHeight: 1.75,
    color: C.charcoal,
    backgroundColor: C.beige,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
    minHeight: "100vh",
  };

  const container: React.CSSProperties = {
    maxWidth: 880,
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  const narrowContainer: React.CSSProperties = {
    maxWidth: 680,
    margin: "0 auto",
    padding: "0 1.5rem",
  };

  // ----------------------------------------------------------------
  // Success screen
  // ----------------------------------------------------------------
  if (status === "success") {
    return (
      <div style={pageStyle}>
        {/* Classification bar */}
        <div style={{ ...monoFont, background: C.charcoal, color: "rgba(255,243,214,0.6)", textAlign: "center", padding: "0.35rem 1rem", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Wellness Brickdown — Audience Intelligence — Your Voice — Educational Content Only
        </div>

        {/* Navbar */}
        <nav style={{ background: C.green, borderBottom: `4px solid ${C.yellow}`, padding: "0.9rem 0" }}>
          <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ color: C.cream, fontSize: "0.95rem", fontWeight: "bold", letterSpacing: "0.07em", textTransform: "uppercase" }}>The Wellness Brickdown</span>
            <span style={{ ...monoFont, background: C.red, color: C.cream, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.65rem" }}>Audience Survey</span>
          </div>
        </nav>

        <hr style={{ border: "none", borderTop: `4px solid ${C.green}`, margin: 0 }} />

        <div style={{ padding: "3.5rem 0 4rem" }}>
          <div style={narrowContainer}>
            <div style={{ background: C.green, border: `4px solid ${C.yellow}`, padding: "2.5rem 2rem", boxShadow: `6px 6px 0 ${C.charcoal}`, textAlign: "center" }}>
              <span style={{ ...monoFont, display: "inline-block", background: C.red, color: C.cream, fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.25rem 0.8rem", marginBottom: "1.25rem" }}>
                Truth Desk — Response Received
              </span>
              <h2 style={{ ...bodyFont, fontSize: "clamp(1.2rem, 3vw, 1.7rem)", color: C.yellow, fontWeight: "bold", marginBottom: "0.75rem", lineHeight: 1.25 }}>
                Your answer has been sent to The Truth Desk.
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,243,214,0.88)", marginBottom: "1.75rem", lineHeight: 1.75 }}>
                Thank you. Your answers help us decide what to expose, explain and build next.
              </p>
              <div style={{ borderTop: `1px solid rgba(217,164,65,0.35)`, paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
                {["Expose the hidden systems.", "Make the tactics visible.", "Turn awareness into action."].map((line) => (
                  <p key={line} style={{ ...monoFont, fontSize: "0.88rem", color: "rgba(255,243,214,0.72)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    {line}
                  </p>
                ))}
              </div>
              <p style={{ ...bodyFont, fontSize: "1rem", color: C.yellow, fontWeight: "bold", letterSpacing: "0.04em", marginBottom: "1.75rem" }}>
                Brick by brick.
              </p>
              <a
                href="/thetruth"
                style={{ display: "inline-block", background: C.green, color: C.cream, ...bodyFont, fontSize: "1.05rem", fontWeight: "bold", textDecoration: "none", padding: "0.9rem 1.8rem", border: `3px solid ${C.yellow}`, letterSpacing: "0.02em" }}
              >
                Return to The Wellness Brickdown
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: C.charcoal, color: "rgba(255,243,214,0.65)", padding: "2.5rem 0" }}>
          <div style={narrowContainer}>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
              <strong style={{ color: C.cream, display: "block", marginBottom: "0.75rem" }}>The Wellness Brickdown</strong>
              Educational content only. Not medical advice.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // Main form
  // ----------------------------------------------------------------
  return (
    <div style={pageStyle}>
      {/* Global responsive grid fix */}
      <style>{`
        @media (max-width: 600px) {
          .yv-option-grid { grid-template-columns: 1fr !important; }
          .yv-identity-grid { grid-template-columns: 1fr !important; }
        }
        .yv-tile-label:hover { border-color: #173F2A !important; background: rgba(255,243,214,0.8) !important; }
        .yv-tile-input:focus-visible + .yv-tile-label { outline: 3px solid #D9A441; outline-offset: 1px; }
      `}</style>

      {/* Classification bar */}
      <div aria-hidden="true" style={{ ...monoFont, background: C.charcoal, color: "rgba(255,243,214,0.6)", textAlign: "center", padding: "0.35rem 1rem", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Wellness Brickdown — Audience Intelligence — Your Voice — Educational Content Only
      </div>

      {/* Navbar */}
      <nav aria-label="Site navigation" style={{ background: C.green, borderBottom: `4px solid ${C.yellow}`, padding: "0.9rem 0" }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "0.5rem" }}>
          <a href="/thetruth" style={{ color: C.cream, fontSize: "0.95rem", fontWeight: "bold", textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase" as const, ...bodyFont }}>
            The Wellness Brickdown
          </a>
          <span aria-hidden="true" style={{ ...monoFont, background: C.red, color: C.cream, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "0.2rem 0.65rem" }}>
            Audience Survey
          </span>
        </div>
      </nav>

      <hr style={{ border: "none", borderTop: `4px solid ${C.green}`, margin: 0 }} />

      {/* Hero */}
      <section style={{ background: C.green, borderBottom: `4px solid ${C.yellow}`, padding: "3rem 0 3.5rem" }}>
        <div style={narrowContainer}>
          <div style={{ ...monoFont, display: "inline-block", background: C.red, color: C.cream, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, padding: "0.25rem 0.8rem", marginBottom: "1.25rem" }}>
            Your Voice — Audience Intelligence
          </div>
          <h1 style={{ ...bodyFont, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", color: C.cream, fontWeight: "bold", lineHeight: 1.15, marginBottom: "1.25rem" }}>
            Tell us what you want The Wellness Brickdown to{" "}
            <span style={{ color: C.yellow }}>expose, explain or build next</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,243,214,0.88)", marginBottom: "1.5rem", lineHeight: 1.8, maxWidth: 640 }}>
            This takes less than 60 seconds. Your answers help shape future videos, guides, tools, courses, programmes, apps and practical resources.
          </p>
          <p style={{ ...monoFont, fontSize: "0.82rem", color: "rgba(255,243,214,0.7)", letterSpacing: "0.06em", borderLeft: `3px solid ${C.yellow}`, paddingLeft: "0.75rem", lineHeight: 1.65 }}>
            You can complete this anonymously, or share your email address if you want us to connect your answers to your existing subscription.
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: `4px solid ${C.green}`, margin: 0 }} />

      {/* Form section */}
      <section style={{ background: C.beige, padding: "3.5rem 0 4rem" }}>
        <div style={narrowContainer}>
          <form onSubmit={handleSubmit} noValidate aria-label="Your Voice audience preference form">

            {/* Honeypot */}
            <div style={{ position: "absolute", left: -9999, top: -9999, visibility: "hidden" }} aria-hidden="true">
              <label htmlFor="hp_website">Leave this blank</label>
              <input type="text" id="hp_website" name="hp_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
            </div>

            {/* Questions */}
            {QUESTIONS.map((q) => (
              <QuestionBlock
                key={q.key}
                questionKey={q.key}
                otherKey={q.otherKey}
                num={q.num}
                title={q.title}
                options={q.options}
                selections={selections[q.key]}
                otherText={otherTexts[q.otherKey]}
                onToggle={handleToggle}
                onAllToggle={handleAllToggle}
                onOtherToggle={handleOtherToggle}
                onOtherText={handleOtherText}
              />
            ))}

            {/* Identity */}
            <div style={{ background: C.cream, border: `3px solid ${C.green}`, borderTop: `6px solid ${C.green}`, padding: "1.75rem 1.75rem 1.5rem", marginBottom: "1.5rem", boxShadow: `4px 4px 0 rgba(23,63,42,0.15)` }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ ...monoFont, display: "block", fontSize: "0.6rem", color: C.green, letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>
                  Identity
                </div>
                <div style={{ ...bodyFont, fontSize: "1.08rem", fontWeight: "bold", color: C.charcoal, lineHeight: 1.35 }}>
                  Would you like to complete this anonymously or share your email?
                </div>
              </div>

              <div className="yv-identity-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1rem" }}>
                {[
                  { value: "anonymous"      as const, title: "Complete anonymously",  helper: "We’ll use your answers in aggregate, but we won’t connect them to your email address." },
                  { value: "email_revealed" as const, title: "Share my email",        helper: "Use this if you want us to connect your answers to your existing subscription or preferences." },
                ].map((opt) => {
                  const selected = identityMode === opt.value;
                  return (
                    <label
                      key={opt.value}
                      htmlFor={`identity_${opt.value}`}
                      style={{ display: "block", padding: "1rem 1.1rem", background: selected ? C.green : C.beige, border: `2px solid ${selected ? C.green : "rgba(23,63,42,0.3)"}`, cursor: "pointer", userSelect: "none" as const, transition: "background 0.12s, border-color 0.12s" }}
                    >
                      <input
                        type="radio"
                        id={`identity_${opt.value}`}
                        name="identity_mode"
                        value={opt.value}
                        checked={selected}
                        onChange={() => { setIdentityMode(opt.value); setEmailError(""); }}
                        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                      />
                      <div style={{ fontWeight: "bold", fontSize: "0.97rem", marginBottom: "0.3rem", color: selected ? C.cream : C.charcoal, ...bodyFont }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: selected ? "rgba(255,243,214,0.78)" : C.brown, lineHeight: 1.5 }}>
                        {opt.helper}
                      </div>
                    </label>
                  );
                })}
              </div>

              {identityMode === "email_revealed" && (
                <div style={{ marginTop: "1.25rem" }}>
                  <label htmlFor="respondent-email" style={{ ...monoFont, display: "block", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.brown, marginBottom: "0.4rem" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    id="respondent-email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    style={{ width: "100%", padding: "0.75rem 1rem", minHeight: 44, border: `2px solid ${emailError ? C.red : C.green}`, background: "#fff", ...bodyFont, fontSize: "1rem", color: C.charcoal, outline: "none" }}
                  />
                  <p style={{ fontSize: "0.78rem", color: C.brown, ...monoFont, letterSpacing: "0.04em", marginTop: "0.3rem" }}>
                    Only add this if you want us to connect your answers to your existing subscription.
                  </p>
                  {emailError && (
                    <p role="alert" style={{ ...monoFont, fontSize: "0.8rem", color: C.red, marginTop: "0.3rem" }}>
                      {emailError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Privacy note */}
            <div role="note" style={{ background: "rgba(23,63,42,0.06)", border: `1px solid rgba(23,63,42,0.2)`, borderLeft: `4px solid ${C.green}`, padding: "1rem 1.1rem", fontSize: "0.82rem", color: C.brown, lineHeight: 1.65, marginBottom: "1.5rem", ...monoFont, letterSpacing: "0.02em" }}>
              We&rsquo;ll use your answers to understand what future content, resources and programmes people want from The Wellness Brickdown. Anonymous responses will be analysed in aggregate. If you choose to share your email, we may connect your answers to your existing subscription preferences.
            </div>

            {/* Validation message */}
            {validationMsg && (
              <div role="alert" style={{ background: "#fff3cd", border: `2px solid ${C.yellow}`, borderLeft: `5px solid ${C.yellow}`, padding: "0.85rem 1rem", fontSize: "0.88rem", color: C.charcoal, marginBottom: "1rem", ...monoFont }}>
                {validationMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              style={{ display: "block", width: "100%", background: status === "submitting" ? "#6b1e1a" : C.red, color: C.cream, ...bodyFont, fontSize: "1.2rem", fontWeight: "bold", padding: "1.1rem 2rem", border: `3px solid ${C.charcoal}`, cursor: status === "submitting" ? "not-allowed" : "pointer", letterSpacing: "0.02em", textAlign: "center" as const, lineHeight: 1.3, opacity: status === "submitting" ? 0.75 : 1, transition: "background 0.15s" }}
            >
              {status === "submitting" ? "Sending to The Truth Desk…" : "Submit to The Truth Desk"}
            </button>

            {status === "error" && (
              <div role="alert" style={{ background: C.red, color: C.cream, padding: "0.75rem 1rem", fontSize: "0.9rem", marginTop: "0.85rem", ...monoFont, letterSpacing: "0.03em" }}>
                Something went wrong. Please try again.
              </div>
            )}

          </form>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: `4px solid ${C.green}`, margin: 0 }} />

      {/* Footer */}
      <footer style={{ background: C.charcoal, color: "rgba(255,243,214,0.65)", padding: "2.5rem 0" }}>
        <div style={narrowContainer}>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>
            <strong style={{ color: C.cream, display: "block", marginBottom: "0.75rem" }}>The Wellness Brickdown</strong>
            Educational content only. Not medical advice.
          </p>
          <div style={{ borderTop: "1px solid rgba(255,243,214,0.18)", marginTop: "1.5rem", paddingTop: "1.5rem", ...monoFont, fontSize: "0.7rem", color: "rgba(255,243,214,0.42)", lineHeight: 1.7 }}>
            The Wellness Brickdown provides educational content about food systems, health marketing and wellness industry practices. Nothing on this page constitutes medical, nutritional or therapeutic advice. Always consult a qualified healthcare professional before making changes to your diet, exercise routine or health management.
          </div>
        </div>
      </footer>
    </div>
  );
}
