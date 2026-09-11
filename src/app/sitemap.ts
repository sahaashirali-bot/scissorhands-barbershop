import type { MetadataRoute } from "next";
import { createAnonClient } from "@/lib/supabase/anon";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const supabase = createAnonClient();
  const { data: barbers } = await supabase
    .from("barbers")
    .select("slug")
    .eq("active", true);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/barbers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/book`, changeFrequency: "monthly", priority: 0.9 },
    ...(barbers ?? []).map((b) => ({
      url: `${siteUrl}/barbers/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
