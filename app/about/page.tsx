import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { prettyPhone, telLink } from "@/lib/contact";
export const metadata: Metadata = { title: "About Us", description: "Why we built Anubhav: because experience doesn’t retire." };
const promises = [
  ["🎁", "Free for professionals", "We will never charge a retired professional to register or to be listed."],
  ["🔒", "Privacy first", "Phone numbers, emails and documents are never shown publicly."],
  ["✅", "Honest claims", "Profiles are self-declared unless they carry a Verified badge, which we give only after checking documents. Anyone can report a profile."],
  ["🤝", "Independence", "Experts are independent individuals. They do not represent, and are not endorsed by, their former departments."],
];
export default function Page() {
  return (<>
    <PageHeader eyebrow="Our story" title="About Anubhav" sub="Experience doesn’t retire." icon="🪔" />
    <section className="container-x py-12 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
      <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
        <p>Every year, thousands of people retire from government departments, banks, railways, the armed forces and public-sector companies after 25 to 40 years of specialised work. They know how approvals really move, how tenders are really evaluated, how a bridge is actually inspected.</p>
        <p>Yet there is no organised place where a start-up, a small contractor or a family can find these people. Most of that knowledge goes unused, while many retirees want to stay active and respected.</p>
        <p><strong className="text-navy-900">Anubhav</strong> (Hindi for “experience”) is built to change that: a platform for India’s retired to share their experience, free or paid, and to get trusted help at home.</p>
      </div>
      <div className="card bg-gold-50 p-7"><p className="text-4xl" aria-hidden>💡</p><p className="mt-3 font-serif text-2xl font-bold text-navy-900 leading-snug">A lifetime of knowing how things really get done should not retire with the person who earned it.</p></div>
    </section>

    <section className="bg-white border-y border-navy-200"><div className="container-x py-12">
      <h2 className="text-3xl">What we promise</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{promises.map(([i, h, d]) => <div key={h} className="card p-6"><span className="h-12 w-12 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center text-2xl" aria-hidden>{i}</span><h3 className="mt-4 text-xl">{h}</h3><p className="mt-2 text-slate-700">{d}</p></div>)}</div>
    </div></section>

    <section className="container-x py-12">
      <h2 className="text-3xl">What you can do here</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card bg-mint-100 p-7"><span className="text-4xl" aria-hidden>🎓</span><h3 className="mt-3 text-2xl">List your expertise</h3><p className="mt-2 text-lg text-slate-800">Create a free profile. Offer free guidance, paid services or both, and keep your phone number private.</p><Link href="/register" className="btn-primary mt-5">List my expertise</Link></div>
        <div className="card bg-gold-100 p-7"><span className="text-4xl" aria-hidden>🤝</span><h3 className="mt-3 text-2xl">Anubhav Saathi</h3><p className="mt-2 text-lg text-slate-800">Verified young helpers for hospital visits, errands and phone lessons, bookable by the family from anywhere.</p><Link href="/saathi" className="btn-primary mt-5">Explore Saathi</Link></div>
      </div>
    </section>

    <section className="bg-white border-y border-navy-200"><div className="container-x py-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
      <div><h2 className="text-2xl">How we keep running</h2><p className="mt-2 text-lg text-slate-700 max-w-3xl">Optional featured profiles, a small fee on paid engagements and Saathi bookings, and subscriptions for businesses later. Joining and a basic listing stay free for professionals.</p></div>
    </div></section>

    <section className="hero-pattern text-white"><div className="container-x py-12 text-center">
      <h2 className="text-3xl !text-white">Questions? Talk to a real person.</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-4"><a href={telLink} className="btn bg-white text-navy-900 hover:bg-navy-50">📞 {prettyPhone()}</a><Link href="/contact" className="btn-gold">Send a message</Link></div>
    </div></section>
  </>);
}
