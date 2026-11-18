import type { Metadata } from "next";
import { PROS } from "@/lib/static";
import { ExpertProfile } from "@/components/ExpertProfile";
import { fetchPublicPro } from "@/lib/server";

export const dynamicParams = false;
// Static export needs at least one page; "_" renders "profile not available" until experts are added.
export function generateStaticParams() { return PROS.length ? PROS.map((p) => ({ id: p.id })) : [{ id: "_" }]; }
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await fetchPublicPro(params.id);
  if (!p) return { title: "Expert profile" };
  const title = `${p.name}, retired ${p.designation} (${p.department}) in ${p.city}`;
  const description = `${p.yearsService} years of experience in ${p.specializations.slice(0, 3).join(", ")}. Available for ${p.services.slice(0, 3).join(", ")}. ${p.summary.slice(0, 120)}`;
  return { title, description, alternates: { canonical: `/experts/${p.id}` }, openGraph: { title, description, type: "profile" }, robots: p.sample ? { index: true, follow: true } : undefined };
}
export default async function Page({ params }: { params: { id: string } }) {
  const p = await fetchPublicPro(params.id);
  const ld = p && { "@context": "https://schema.org", "@type": "Person", name: p.name, jobTitle: `Retired ${p.designation}`, address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: p.state, addressCountry: "IN" }, knowsAbout: p.specializations, description: p.summary };
  return (<>{ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}<ExpertProfile id={params.id} /></>);
}
