import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Scissorhands Barbershop",
  description: "How Scissorhands Barbershop collects, uses, and protects your information.",
};

const UPDATED = "September 11, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout eyebrow="LEGAL" title="PRIVACY POLICY" updated={UPDATED}>
      <LegalSection heading="Who we are">
        <p>
          {SHOP.name} ({SHOP.address}) operates this website and the online
          booking system on it. For questions about this policy or your
          data, contact us at{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>{" "}
          or {SHOP.phone}.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>We only collect what we need to book and manage your appointment:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Your name, email address, and phone number</li>
          <li>The service, barber, date, and time you select</li>
          <li>Any optional notes you leave for your barber</li>
          <li>
            Basic technical data (like page views) generated automatically
            by hosting your appointment request — we do not use analytics
            or advertising trackers on this site
          </li>
        </ul>
        <p>
          We do not collect or store your card number. Card payments are
          entered directly into Stripe&apos;s secure checkout and never
          touch our servers — see{" "}
          <span className="text-bone">Payments</span> below.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <ul className="list-disc space-y-1 pl-5">
          <li>To create, confirm, and remind you about your appointment</li>
          <li>To contact you about a booking (e.g. a schedule change)</li>
          <li>To respond if you email or call us</li>
          <li>To keep basic business and payment records as required by law</li>
        </ul>
        <p>We do not sell your information or use it for advertising.</p>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Online payments are processed by Stripe, Inc. When you pay
          online, you&apos;re entering your card details directly into
          Stripe&apos;s checkout, governed by{" "}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood-light underline"
          >
            Stripe&apos;s privacy policy
          </a>
          . We only receive confirmation that payment succeeded and the
          amount charged.
        </p>
      </LegalSection>

      <LegalSection heading="Where it's stored">
        <p>
          Booking information is stored in a secured database (hosted by
          Supabase) that only shop staff can access, protected by a login
          and database-level access rules. We keep booking records for as
          long as needed for scheduling, customer service, and our
          bookkeeping and tax obligations.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site uses only cookies that are strictly necessary to run
          it — see our{" "}
          <Link href="/cookies" className="text-blood-light underline">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us to access, correct, or delete the personal
          information we hold about you at any time by emailing{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>
          . We&apos;ll respond within a reasonable time. Deleting records
          tied to a past appointment may be limited where we&apos;re
          required to keep them for tax or legal purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from them. A
          parent/guardian may book or check in a child for a haircut in
          person.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we change how we handle your information, we&apos;ll update
          this page and the date at the top.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
