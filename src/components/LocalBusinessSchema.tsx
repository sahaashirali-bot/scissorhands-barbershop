import { SHOP } from "@/lib/shop";

function to24Hour(time: string): string {
  const match = time.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function LocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const openingHoursSpecification = SHOP.hours.map(({ day, hours }) => {
    const [opens, closes] = hours.split("–").map((s) => to24Hour(s));
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens,
      closes,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SHOP.name,
    image: `${siteUrl}/images/shop-front.jpg`,
    url: siteUrl,
    telephone: SHOP.phone,
    email: SHOP.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "194 Gulf Fwy S Suite D1",
      addressLocality: "League City",
      addressRegion: "TX",
      postalCode: "77573",
      addressCountry: "US",
    },
    openingHoursSpecification,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
