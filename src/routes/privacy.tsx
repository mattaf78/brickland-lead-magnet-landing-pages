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


      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-4xl mb-1">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted-foreground mb-10 tracking-wider uppercase">
          The Wellness Brickdown — Last updated 20 May 2026
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
            <li>Deliver the free field guide you requested</li>
            <li>Send you educational email content related to health, food, energy and behaviour</li>
            <li>
              Occasionally promote relevant courses, programmes, apps and other information-based
              content from Vital Living Ltd / The Wellness Brickdown
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
          <p>
            This site currently uses only the essential functionality required to operate the
            sign-up form. We do not intentionally use non-essential analytics or tracking cookies,
            and we have not installed third-party analytics tools such as Google Analytics, Meta
            Pixel or similar services.
          </p>
          <p className="mt-3">
            Your hosting or content-delivery infrastructure may set limited technical cookies as
            part of normal operation; these are not used to track your behaviour or identify you
            personally.
          </p>
        </Section>

        <Section heading="7. Third-Party Email Provider">
          <p>
            We use <strong>Systeme.io</strong> as our email and marketing platform. When you
            submit the sign-up form, your name and email address are transmitted to and stored by
            Systeme.io, who process your data on our behalf in accordance with their privacy policy
            and applicable data-protection legislation.
          </p>
          <p className="mt-3">
            The free guide is delivered via a Systeme.io campaign email. All subsequent emails also
            come through Systeme.io and include an unsubscribe link you can use at any time.
          </p>
        </Section>

        <Section heading="8. Data Retention">
          <p>
            We retain your personal data for as long as you remain subscribed to our email list.
            If you unsubscribe or request deletion, we will remove your details from our active
            list promptly. We may retain a minimal suppression record (your email address only) to
            honour your unsubscribe request and prevent accidental re-subscription.
          </p>
          <p className="mt-3">
            We may also retain records where required by law or for legitimate administrative
            purposes (for example, accounting or legal obligations). To request deletion of your
            data, please contact us at{" "}
            <a
              href="mailto:info@vitalliving.co.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              info@vitalliving.co.uk
            </a>
            .
          </p>
        </Section>

        <Section heading="9. Your Rights">
          <p>
            Under the UK GDPR and the Data Protection Act 2018 you have the right to access the
            personal data we hold about you, to have it corrected or erased, to restrict or object
            to its processing, to data portability, and to withdraw consent at any time. To exercise
            any of these rights, contact us at{" "}
            <a
              href="mailto:info@vitalliving.co.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              info@vitalliving.co.uk
            </a>
            . You also have the right to lodge a complaint with the UK's supervisory authority, the
            Information Commissioner's Office (ICO), at{" "}
            <a
              href="https://www.ico.org.uk"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>
            .
          </p>
        </Section>

        <Section heading="10. Contact">
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

        <Section heading="11. Medical Disclaimer">
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
