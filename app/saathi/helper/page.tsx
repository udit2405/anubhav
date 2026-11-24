import type { Metadata } from "next";
import { HelperEarnings } from "@/components/SaathiParts";
import { HelperForm } from "@/components/HelperForm";
import { PageHeader } from "@/components/ui";
import { PLATFORM_FEE_PCT, SAFETY } from "@/lib/saathi";
export const metadata: Metadata = { title: "Become a helper | Anubhav Saathi", description: "Earn on your own schedule helping senior citizens with hospital visits, errands and phone lessons." };
const perks = [["🕒", "Your hours", "Take bookings that fit around your studies or job."], ["💰", "Fair pay", `You keep ${100 - PLATFORM_FEE_PCT}% of every booking. Our fee is shown openly.`], ["🎓", "Free training", "We teach you how to assist elders safely and respectfully."], ["❤️", "Real impact", "Make someone’s week easier and learn life lessons on the way."]];
export default function Page() {
  return (<>
    <PageHeader eyebrow="Anubhav Saathi" icon="🙌" title="Become a Saathi helper" sub="Earn for your time while helping senior citizens with hospital visits, errands, phone lessons and company." />
    <section className="container-x py-12"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{perks.map(([i, h, d]) => <div key={h} className="card p-6"><span className="text-3xl" aria-hidden>{i}</span><h3 className="mt-3 text-xl font-bold">{h}</h3><p className="mt-1 text-slate-700">{d}</p></div>)}</div></section>
    <section className="bg-navy-900 text-white py-14"><div className="container-x"><h2 className="text-3xl font-bold !text-white">What could you earn?</h2><div className="mt-8"><HelperEarnings /></div></div></section>
    <section className="container-x py-14 max-w-3xl"><h2 className="text-3xl font-bold">How we keep elders safe</h2><p className="mt-2 text-slate-600">Every helper goes through these steps. It protects elders and it protects you.</p>
      <ul className="mt-6 space-y-3">{SAFETY.map(([i, h, d]) => <li key={h} className="flex gap-4 card p-4"><span className="text-2xl" aria-hidden>{i}</span><span><strong>{h}.</strong> {d}</span></li>)}</ul></section>
    <section className="bg-navy-50 py-14"><div className="container-x max-w-3xl"><h2 className="text-3xl font-bold mb-6">Apply now</h2><div className="card p-6 sm:p-8"><HelperForm /></div></div></section>
  </>);
}
