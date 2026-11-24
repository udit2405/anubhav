import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHeader } from "@/components/ui";
export const metadata: Metadata = { title: "How It Works", description: "How to list your experience on Anubhav, free." };
const A = [
  ["Register for free", "Fill in a simple form and send it to us on WhatsApp or email, or request a call and we will fill it with you. No payment is ever needed to join."],
  ["Add career details", "Your department (with smart search), designation, years of service and specialisations."],
  ["Verify (optional)", "Send your retirement proof to earn a Verified badge after our team checks it."],
  ["Be found, and you decide", "We publish your profile. When people look for your skills, they ask for you through Anubhav, and you choose whether to reply and whether it is free or paid."],
];
const faq = [
  ["Is it free for retired professionals?", "Yes. Registration and a basic profile are free, always. Optional paid extras (like a featured listing) may be offered later."],
  ["Do I have to charge money?", "No. You can offer free guidance, paid services or both, and change it any time."],
  ["Are phone numbers and emails public?", "No. They stay private. People contact experts through the Anubhav team, who connect them only with the expert’s consent."],
  ["What does “Verified” mean?", "Our team has checked the expert’s uploaded retirement or experience document. It does not mean endorsement by any government department."],
  ["How do I report a suspicious profile?", "Use the “Report this profile” link on any profile page. Our team reviews every report."],
];
export default function Page() {
  return (<>
    <PageHeader title="How It Works" sub="Simple steps to list your experience on Anubhav." />
    <div className="container-x py-12 max-w-3xl">
      <section className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">For retired professionals</h2>
        <ol className="mt-6 space-y-5">{A.map(([h, d], i) => <li key={h} className="flex gap-4"><span className="h-11 w-11 shrink-0 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center">{i + 1}</span><div><h3 className="text-lg font-bold">{h}</h3><p className="text-slate-600">{d}</p></div></li>)}</ol>
        <Link href="/register" className="btn-gold mt-8">List Your Expertise</Link></section>
    </div>
    <div className="container-x pb-14 max-w-3xl"><h2 className="text-3xl font-bold mb-6">Common questions</h2>
      <div className="space-y-3">{faq.map(([q, a]) => <details key={q} className="card p-5"><summary className="font-semibold text-lg cursor-pointer">{q}</summary><p className="mt-2 text-slate-700">{a}</p></details>)}</div><Disclaimer className="mt-8" /></div>
  </>);
}
