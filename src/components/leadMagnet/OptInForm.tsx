import { useState, type FormEvent } from "react";
import type { LeadMagnetConfig } from "@/content/leadMagnets/types";

/*
 * LEAD MAGNET INTEGRATION
 * -----------------------
 * Replace the body of handleSubmit() to POST to your provider.
 *   - MailerLite:   POST https://api.mailerlite.com/api/v2/subscribers
 *   - ConvertKit:   POST https://api.convertkit.com/v3/forms/<id>/subscribe
 *   - Beehiiv:      POST https://api.beehiiv.com/v2/publications/<id>/subscriptions
 *   - Mailchimp:    POST https://<dc>.api.mailchimp.com/3.0/lists/<id>/members
 * Store the API key as a Lovable Cloud secret and route the request through
 * a createServerFn so the key never reaches the browser. When wired, change
 * the consent checkbox to `required` (see TODO below).
 */

type Props = {
  form: LeadMagnetConfig["form"];
  privacyLine: string;
  privacyPolicyText: string;
  privacyPolicyUrl?: string;
  variant?: "cream" | "green";
  formId: string;
};

export function OptInForm({ form, privacyLine, privacyPolicyText, privacyPolicyUrl, variant = "cream", formId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGreen = variant === "green";
  const labelColor = onGreen ? "text-panel-cream" : "text-brand-green";
  const inputBase =
    "w-full min-h-[48px] border-2 border-brand-green bg-panel-cream px-3 py-2 text-base text-foreground placeholder:text-brand-brown/60 focus:outline-none focus:ring-2 focus:ring-brand-red";
  const helperColor = onGreen ? "text-panel-cream/80" : "text-brand-brown";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // TODO: integrate with email provider — see top of file
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`border-2 border-brand-green ${onGreen ? "bg-panel-cream text-foreground" : "bg-brand-green text-panel-cream"} p-6`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]">{form.successEyebrow ?? "Field report dispatched"}</p>
        <p className="mt-2 font-display text-2xl uppercase">{form.successHeading ?? "Check your inbox."}</p>
        <p className="mt-2 text-sm opacity-90">
          {form.successBody ?? "Your free Brickland field guide is on its way. If it doesn’t arrive within a few minutes, check spam or promotions."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor={`${formId}-name`} className={`block font-mono text-[11px] uppercase tracking-[0.18em] ${labelColor}`}>
          {form.nameLabel}
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 ${inputBase}`}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-email`} className={`block font-mono text-[11px] uppercase tracking-[0.18em] ${labelColor}`}>
          {form.emailLabel}
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 ${inputBase}`}
        />
      </div>
      <label className={`flex items-start gap-2 text-[13px] leading-snug ${helperColor}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          // TODO: when an email provider is connected, add `required`
          className="mt-1 h-5 w-5 shrink-0 accent-brand-red"
        />
        <span>{form.consentLabel}</span>
      </label>
      {error && (
        <p className="font-mono text-xs uppercase tracking-wider text-brand-red">{error}</p>
      )}
      <button
        type="submit"
        className="inline-flex w-full min-h-[52px] items-center justify-center bg-brand-red px-6 font-display text-base uppercase tracking-wider text-panel-cream shadow-[3px_3px_0_0_var(--brand-green)] transition-transform hover:-translate-y-0.5"
      >
        {form.submitLabel}
      </button>
      <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${helperColor}`}>{privacyLine}</p>
      <p className={`text-[12px] ${helperColor}`}>
        <a href={privacyPolicyUrl ?? "#"} className="underline underline-offset-2">{privacyPolicyText}</a>
      </p>
    </form>
  );
}
