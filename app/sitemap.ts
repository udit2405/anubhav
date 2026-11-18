import type { MetadataRoute } from "next";
import { fetchPublicPros } from "@/lib/server";
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3210";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pros = await fetchPublicPros();
  const pages = ["", "/experts", "/how-it-works", "/hire", "/about", "/contact", "/register", "/privacy"].map((p) => ({ url: site + p, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
  return [...pages, ...pros.map((p) => ({ url: `${site}/experts/${p.id}`, changeFrequency: "monthly" as const, priority: 0.6 }))];
}
