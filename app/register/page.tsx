import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ProfileForm } from "@/components/ProfileForm";
import { prettyPhone, telLink } from "@/lib/contact";
export const metadata: Metadata = { title: "List Your Expertise", description: "List your expertise on Anubhav for free." };
const perks = [["🎁", "Free, always", "Never any fee to register or be listed."], ["🔒", "Phone stays private", "Never shown on the website."], ["💰", "Free or paid, you choose", "Set your own fees and hours."], ["✅", "Verified badge", "Optional. Builds trust."]];
export default function Register() {
  return (<>
    <PageHeader eyebrow="Free to join" title="List Your Expertise" sub="About 10 minutes. We are happy to help you by phone." icon="🎓" />
    <div className="container-x py-10 grid lg:grid-cols-[1fr_330px] gap-8 items-start">
      <div className="card p-5 sm:p-8"><ProfileForm /></div>
      <aside className="space-y-5 lg:sticky lg:top-32">
        <div className="card bg-gold-50 p-6"><h2 className="text-xl">Why list yourself?</h2>
          <ul className="mt-4 space-y-4">{perks.map(([i, h, d]) => <li key={h} className="flex gap-3"><span className="h-10 w-10 shrink-0 rounded-lg bg-white border border-navy-200 flex items-center justify-center text-xl" aria-hidden>{i}</span><div><p className="font-bold leading-tight">{h}</p><p className="text-base text-slate-700">{d}</p></div></li>)}</ul></div>
        <div className="card p-6"><h2 className="text-xl">Prefer to do it by phone?</h2><p className="mt-2 text-base text-slate-700">Call us and we will fill in the form with you.</p><a href={telLink} className="btn-primary mt-4 w-full">📞 {prettyPhone()}</a></div>
      </aside>
    </div>
  </>);
}
