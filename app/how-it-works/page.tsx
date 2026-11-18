import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHeader } from "@/components/ui";
export const metadata: Metadata = { title: "How It Works", description: "How Anubhav connects retired professionals with businesses, startups and individuals." };
const A = [["Register for free", "Fill in a simple form and send it to us on WhatsApp or email. No payment is ever needed to join."], ["Add career details", "Your department (with smart search), designation, years of service and specialisations."], ["Verify (optional)", "Send your retirement proof to earn a Verified badge after our team checks it."], ["Get discovered and earn", "We add your profile to the site. Clients find you, and our team passes on their enquiries."]];
const B = [["Search", "Use the search bar or filters: department, skills, city, experience, fees."], ["Review profiles", "See career history, services, fees and reviews. Look for the Verified badge."], ["Send an enquiry or post a requirement", "Send an enquiry; our team connects you. Post a requirement to see best-matched experts instantly."], ["Agree and work together", "Settle scope and fees directly with the expert. Leave a review afterwards."]];
const faq = [["Is it free for retired professionals?", "Yes. Registration and a basic profile are free, always. Optional paid extras (like a featured listing) may be offered later."], ["Are phone numbers and emails public?", "No. They stay private. Clients contact experts through the Anubhav team, who connect them only with the expert’s consent."], ["What does “Verified” mean?", "Our team has checked the expert’s uploaded retirement or experience document. It does not mean endorsement by any government department."], ["Who pays whom?", "Clients and experts agree fees directly. Anubhav does not hold money at this stage."], ["How do I report a suspicious profile?", "Use the “Report this profile” link on any profile page. Our team reviews every report."]];
export default function Page() {
  return (<>
    <PageHeader title="How It Works" sub="Simple steps for experts and for the people who hire them." />
    <div className="container-x py-12 grid gap-8 lg:grid-cols-2">
      {[["For retired professionals", A, "/register", "List Your Expertise"], ["For businesses, startups and individuals", B, "/experts", "Find an Expert"]].map(([t, steps, href, cta]) => (
        <section key={t as string} className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">{t as string}</h2>
          <ol className="mt-6 space-y-5">{(steps as string[][]).map(([h, d], i) => <li key={h} className="flex gap-4"><span className="h-11 w-11 shrink-0 rounded-full bg-navy-800 text-gold-300 font-bold flex items-center justify-center">{i + 1}</span><div><h3 className="text-lg font-bold">{h}</h3><p className="text-slate-600">{d}</p></div></li>)}</ol>
          <Link href={href as string} className="btn-gold mt-8">{cta as string}</Link></section>))}
    </div>
    <div className="container-x pb-14 max-w-3xl"><h2 className="text-3xl font-bold mb-6">Common questions</h2>
      <div className="space-y-3">{faq.map(([q, a]) => <details key={q} className="card p-5"><summary className="font-semibold text-lg cursor-pointer">{q}</summary><p className="mt-2 text-slate-700">{a}</p></details>)}</div><Disclaimer className="mt-8" /></div>
  </>);
}
