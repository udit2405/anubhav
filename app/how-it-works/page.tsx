import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Interactive";
import { Disclaimer, PageHeader } from "@/components/ui";
import { prettyPhone, telLink } from "@/lib/contact";
export const metadata: Metadata = { title: "How It Works", description: "How to list your experience on Anubhav, free." };
const A = [
  ["📝", "Register for free", "Fill in a simple form and send it to us on WhatsApp or email, or request a call and we will fill it with you. No payment is ever needed to join.", "About 10 minutes"],
  ["💼", "Add your career details", "Your department (with smart search), designation, years of service and specialisations. Choose whether you offer free guidance, paid work, or both.", "Included in the form"],
  ["✅", "Get verified (optional)", "Send your retirement proof and our team checks it. Verified profiles get a badge that builds trust.", "Checked within 2 working days"],
  ["🔎", "Be found, and you decide", "We publish your profile. When people look for your skills, they ask for you through Anubhav, and you choose whether to reply and whether it is free or paid.", "You stay in control"],
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
    <PageHeader eyebrow="Simple and free" title="How It Works" sub="Four easy steps to list your experience on Anubhav." icon="🧭" />
    <div className="container-x py-12 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
      <ol className="relative space-y-6">
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-navy-200" aria-hidden />
        {A.map(([i, h, d, t], k) => (
          <li key={h} className="relative flex gap-5">
            <span className="relative z-10 h-14 w-14 shrink-0 rounded-full bg-navy-800 text-white font-serif text-2xl font-bold flex items-center justify-center border-4 border-cream" aria-hidden>{k + 1}</span>
            <div className="card p-6 flex-1"><div className="flex items-center gap-3"><span className="text-3xl" aria-hidden>{i}</span><h2 className="text-2xl">{h}</h2></div><p className="mt-3 text-lg text-slate-700">{d}</p><p className="mt-3 inline-block rounded-md bg-gold-100 px-3 py-1 text-base font-bold text-saffron-700">{t}</p></div>
          </li>
        ))}
      </ol>
      <aside className="space-y-5 lg:sticky lg:top-32">
        <div className="card bg-gold-50 p-6"><h2 className="text-2xl">Ready to start?</h2><p className="mt-2 text-lg text-slate-700">It is free and takes about 10 minutes.</p><Link href="/register" className="btn-gold mt-4 w-full">List my expertise</Link></div>
        <div className="card p-6"><h2 className="text-xl">Prefer to talk?</h2><p className="mt-2 text-lg text-slate-700">Call us and we will fill in the form with you.</p><a href={telLink} className="btn-primary mt-4 w-full">📞 {prettyPhone()}</a></div>
        <div className="card bg-mint-100 p-6"><h2 className="text-xl">Need help at home?</h2><p className="mt-2 text-lg text-slate-700">Verified young helpers for hospital visits, errands and phone lessons.</p><Link href="/saathi" className="btn-outline mt-4 w-full">Explore Saathi</Link></div>
      </aside>
    </div>
    <section className="bg-white border-y border-navy-200"><div className="container-x py-12 max-w-3xl"><h2 className="text-3xl">Common questions</h2><div className="mt-6"><Faq items={faq} /></div><Disclaimer className="mt-8" /></div></section>
  </>);
}
