import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer, PageHeader } from "@/components/ui";
export const metadata: Metadata = { title: "About Us", description: "Why we built Anubhav: because experience doesn’t retire." };
export default function Page() {
  return (<>
    <PageHeader title="About Anubhav" sub="Experience doesn’t retire." />
    <div className="container-x py-12 max-w-3xl space-y-6 text-lg text-slate-700 leading-relaxed">
      <p>Every year, thousands of people retire from government departments, banks, railways, the armed forces and public-sector companies after 25 to 40 years of specialised work. They know how approvals really move, how tenders are really evaluated, how a bridge is actually inspected.</p>
      <p>Yet there is no organised place where a start-up, a small contractor or a family can find and hire these people. Most of that knowledge goes unused, while many retirees want to stay professionally active and respected.</p>
      <p><strong className="text-navy-900">Anubhav</strong> (Hindi for “experience”) is that place: a free-to-join marketplace that connects retired professionals with the people who need their guidance, at fees far below traditional consulting firms.</p>
      <h2 className="text-3xl font-bold !mt-10">What we promise</h2>
      <ul className="list-disc pl-6 space-y-2"><li><strong>Free for professionals.</strong> We will never charge a retired professional to register.</li><li><strong>Privacy first.</strong> Phone numbers, emails and documents are never shown publicly.</li><li><strong>Honest claims.</strong> Profiles are self-declared unless they carry a Verified badge, which we award only after checking documents. Anyone can report a profile.</li><li><strong>Independence.</strong> Experts are independent individuals. They do not represent, and are not endorsed by, their former departments.</li></ul>
      <h2 className="text-3xl font-bold !mt-10">How we keep running</h2>
      <p>Optional featured profiles, a small fee on successful paid engagements, subscriptions for businesses that hire frequently, and verified-profile upgrades. Joining and basic listing stay free.</p>
      <div className="flex flex-wrap gap-4 pt-4"><Link href="/register" className="btn-gold">List Your Expertise</Link><Link href="/experts" className="btn-outline">Find an Expert</Link></div>
      <Disclaimer />
    </div>
  </>);
}
