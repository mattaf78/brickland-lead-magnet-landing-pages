import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Wellness Brickdown" },
      {
        name: "description",
        content:
          "Privacy policy for The Wellness Brickdown — how we collect, use and protect your personal information.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary px-6 py-4 flex items-center justify-between">
        <span className="font-display text-sm font-semibold tracking-widest uppercase text-primary-foreground">
          The Wellness Brickdown
        </span>
        <Link
          to="/"
          className="text-sm text-primary-foreground/80 hover:text-primary-foreground underline underline-offset-2 transition-colors"
        >
          ← Back to guide
        </Link>
      </header>

      <div className="bg-accent/30 border-b border-accent px-6 py-3 text-center">
        <p className="font-mono text-xs text-foreground">
          <strong>DRAFT NOTICE —</strong> This privacy policy has not yet been reviewed by a legal professional. Do not publish publicly without obtaining legal review first.
        </p>
      </div>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-4xl mb-1">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted-foreground mb-10 tracking-wider uppercase">
          The Wellness Brickdown — Last updated [date]
        </p>

        <Section heading="1. Who We Are">
          <p>
            The Wellness Brickdown is an independent educational media project operated by{" "}
            <strong>Vital Living Ltd</strong>. We create satirical, field-report-style content to
            help people understand the systems that shape modern health, food, energy and behaviour.
            We are not a medical practice, health service or clinical provider.
          </p>
          <p className="mt-3">
            Vital Living Ltd is the data controller responsible for your personal data collected
            through this website.
          </p>
          <address className="mt-3 not-italic text-muted-foreground">
            Vital Living Ltd<br />
            45 Ranelagh Gardens<br />
            Newport Pagnell<br />
            Bucks<br />
            MK16 0JP<br />
            Contact: Matt Farr<br />
            Email:{" "}
            <a
              href="mailto:info@vitalliving.co.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              info@vitalliving.co.uk
            </a>
          </address>
        </Section>

        <Section heading="2. What Information We Collect">
          <p>When you sign up to receive a free Brickland field guide, we collect:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your first name</li>
            <li>Your email address</li>
          </ul>
          <p className="mt-3">
            We do not collect payment information, health data, or any other personal details
            through this website.
          </p>
        </Section>

        <Section heading="3. Why We Collect It">
          <p>We collect your name and email address in order to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Send you the free guide you requested</li>
            <li>
              Occasionally send you related educational content and updates from The Wellness
              Brickdown
            </li>
          </ul>
          <p className="mt-3">
            We process this data on the basis of your consent. You provide consent by completing the
            sign-up form and ticking the consent checkbox before submitting. You may withdraw your
            consent at any time by unsubscribing.
          </p>
        </Section>

        <Section heading="4. Email List and Free Guide Delivery">
          <p>
            Once you submit the sign-up form, your details are added to our email list and the free
            guide is sent to the address you provided. By subscribing, you may receive:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The free guide you requested</li>
            <li>Educational content and commentary</li>
            <li>Free resources</li>
            <li>Updates and new field reports</li>
            <li>Invitations to events or programmes</li>
            <li>
              Occasional promotional emails about courses, programmes, apps, services and other
              information-based products from Vital Living Ltd / The Wellness Brickdown
            </li>
          </ul>
          <p className="mt-3">
            We will never sell, rent or share your personal details with third parties for their own
            marketing purposes.
          </p>
        </Section>

        <Section heading="5. Unsubscribing">
          <p>
            You can unsubscribe from our email list at any time by clicking the unsubscribe link
            included in every email we send, or by emailing us directly at{" "}
            <a
              href="mailto:info@vitalliving.co.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              info@vitalliving.co.uk
            </a>
            .
          </p>
          <p className="mt-3">
            Once you unsubscribe, we will stop sending you marketing or newsletter emails. We may
            retain a minimal record of your email address solely to honour your unsubscribe request
            and prevent accidental re-subscription.
          </p>
        </Section>

        <Section heading="6. Cookies and Analytics">
          <Placeholder>
            Describe what cookies or analytics tools are used on this site. If no analytics are in
            use, state that clearly. If a tool such as Fathom, Plausible or Google Analytics is
            used, name it and link to its privacy policy. Update before launch.
          </Placeholder>
          <p>
            At present, this website does not use third-party tracking or analytics cookies beyond
            any that may be set automatically by the hosting or content-delivery infrastructure.
          </p>
        </Section>

        <Section heading="7. Third-Party Email Provider">
          <Placeholder>
            Insert the name of the email service provider used (for example: ConvertKit, Mailchimp,
            Kit). Include a link to their privacy policy and confirm that a data-processing
            agreement is in place. Update before launch.
          </Placeholder>
          <p>
            Your name and email address are stored with our email service provider, who processes
            your data on our behalf. They operate in accordance with their own privacy policy and
            applicable data-protection legislation.
          </p>
        </Section>

        <Section heading="8. Data Retention">
          <Placeholder>
            Specify how long personal data is retained — for example: "We retain your data for as
            long as you remain subscribed. If you unsubscribe, we retain only the minimum
            information necessary to honour your unsubscribe request." Confirm retention practices
            with your email provider before launch.
          </Placeholder>
          <p>
            We retain your personal data for as long as necessary to fulfil the purposes described
            in this policy or as required by applicable law.
          </p>
        </Section>

        <Section heading="9. Contact">
          <p>
            If you have any questions about this privacy policy or how we handle your personal data,
            please contact:
          </p>
          <address className="mt-3 not-italic text-muted-foreground">
            Matt Farr<br />
            Vital Living Ltd<br />
            45 Ranelagh Gardens<br />
            Newport Pagnell<br />
            Bucks<br />
            MK16 0JP<br />
            Email:{" "}
            <a
              href="mailto:info@vitalliving.co.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              info@vitalliving.co.uk
            </a>
          </address>
        </Section>

        <Section heading="10. Medical Disclaimer">
          <p>
            All content produced by The Wellness Brickdown — including field guides, landing pages
            and associated materials — is provided for educational and general commentary purposes
            only. It does not constitute medical, nutritional or clinical advice, and it is not a
            substitute for professional medical advice, diagnosis or treatment.
          </p>
          <p className="mt-3">
            Nothing in this content should be taken as a recommendation to change your diet,
            medication, lifestyle or healthcare routine without first consulting a qualified health
            professional. If you have any concerns about your health, please speak to your GP or a
            registered healthcare provider.
          </p>
        </Section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          ← Return to The Wellness Brickdown
        </Link>
        <p className="mt-2 font-mono text-xs text-muted-foreground tracking-wider uppercase">
          © The Wellness Brickdown
        </p>
      </footer>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl mb-3 pb-1 border-b border-border">{heading}</h2>
      <div className="text-sm leading-relaxed space-y-0">{children}</div>
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 rounded border border-accent bg-accent/20 px-4 py-3 font-mono text-xs text-foreground/70">
      <strong className="text-foreground block mb-1">[ PLACEHOLDER — review before launch ]</strong>
      {children}
    </div>
  );
}
