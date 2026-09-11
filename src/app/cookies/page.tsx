import type { Metadata } from "next";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Scissorhands Barbershop",
  description: "What cookies this site uses and why.",
};

const UPDATED = "September 11, 2026";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout eyebrow="LEGAL" title="COOKIE POLICY" updated={UPDATED}>
      <LegalSection heading="Short version">
        <p>
          We don&apos;t use tracking or advertising cookies. The only
          cookie this site sets is a strictly-necessary one that keeps
          shop staff logged into the admin dashboard.
        </p>
      </LegalSection>

      <LegalSection heading="What cookies are">
        <p>
          Cookies are small text files a website stores in your browser to
          remember information between visits.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies we use">
        <table className="mt-2 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-line text-xs uppercase tracking-wider text-steel">
              <th className="py-2 pr-4">Cookie</th>
              <th className="py-2 pr-4">Purpose</th>
              <th className="py-2">Who</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            <tr>
              <td className="py-2 pr-4 text-bone">sb-* (session)</td>
              <td className="py-2 pr-4">
                Keeps a logged-in staff member signed into the admin
                dashboard. Strictly necessary — not used on customer-facing
                pages.
              </td>
              <td className="py-2">Us (via Supabase)</td>
            </tr>
          </tbody>
        </table>
        <p>
          When you pay online, Stripe&apos;s own checkout page (hosted on
          stripe.com, not this site) may set its own cookies to process
          your payment securely and prevent fraud — those are governed by{" "}
          <a
            href="https://stripe.com/cookies-policy/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood-light underline"
          >
            Stripe&apos;s cookie policy
          </a>
          , not ours.
        </p>
      </LegalSection>

      <LegalSection heading="No analytics or advertising cookies">
        <p>
          We don&apos;t run Google Analytics, Facebook/Meta Pixel, or any
          other tracking or ad-targeting script on this site.
        </p>
      </LegalSection>

      <LegalSection heading="Managing cookies">
        <p>
          Because we only use a strictly-necessary session cookie, there&apos;s
          nothing to opt out of on this site. You can still clear or block
          cookies at any time in your browser settings — doing so will
          just sign staff out of the admin dashboard.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions?{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
