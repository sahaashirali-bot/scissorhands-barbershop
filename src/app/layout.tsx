import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Scissorhands Barbershop | League City, TX";
const description =
  "Razor fades, hot towel shaves, and fresh cuts in League City, TX. Book your barber online in under a minute.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "barbershop League City TX",
    "haircut League City",
    "barber near me",
    "hot towel shave",
    "fade haircut League City",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Scissorhands Barbershop",
    locale: "en_US",
    type: "website",
    images: ["/images/shop-front.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/shop-front.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LocalBusinessSchema />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
