"use client";
import Link from "next/link";
import { useState } from "react";
import { Disclaimer, PageHeader } from "@/components/ui";
import { Recommended, RequirementForm, SendButtons, sendRequirementText } from "@/components/Requirements";
import type { Requirement } from "@/lib/types";
import { useTable } from "@/lib/app";
import { RuleMatcher, type MatchResult } from "@/lib/match";

export default function Hire() {
  const [posted, setPosted] = useState<Requirement | null>(null); const { rows: pros } = useTable("professionals"); const matches = posted ? (RuleMatcher.match(posted, pros) as MatchResult[]) : [];
  return (<>
    <PageHeader title="Hire an Expert" sub="Tell us what you need. Experts offer free guidance, paid services or both. We recommend the retired professionals whose experience fits best." />
    <div className="container-x py-10 grid gap-10 lg:grid-cols-[1fr_340px]">
      <div>
        {posted ? (
          <div role="status"><div className="rounded-xl bg-green-50 border border-green-300 p-5 mb-8"><h2 className="text-2xl font-bold">Your best-matched experts</h2><p className="mt-1 text-slate-700">For “{posted.title}”. Open a profile to contact an expert, or send your requirement to our team and we will connect you.</p></div>
            <h2 className="text-2xl font-bold mb-4">Recommended experts</h2><Recommended req={posted} limit={8} /><div className="card p-5 mt-8 space-y-3"><h3 className="text-xl font-bold">Want us to connect you?</h3><p className="text-slate-700">Send your requirement to our team. Add your name and phone number in the message, and we will introduce you to suitable experts.</p><SendButtons subject={`Requirement: ${posted.title}`} body={sendRequirementText(posted, matches)} filename="anubhav-requirement" /></div><button className="btn-outline mt-8" onClick={() => setPosted(null)}>Post another requirement</button></div>
        ) : (<><h2 className="text-2xl font-bold mb-5">Post your requirement</h2><RequirementForm onPosted={setPosted} /></>)}
        <Disclaimer className="mt-10" />
      </div>
      <aside className="space-y-5 h-fit">
        <div className="card p-5"><h2 className="text-xl font-bold">How matching works</h2><p className="mt-2 text-slate-700">Experts are ranked by specialization, department, skills, location, years of experience, availability and budget fit. Each gets a match percentage.</p></div>
        <div className="card p-5"><h2 className="text-xl font-bold">Prefer to browse?</h2><p className="mt-2 text-slate-700">No account needed to search and read profiles.</p><Link href="/experts" className="btn-outline mt-3 w-full">Browse experts</Link></div>
              </aside>
    </div>
  </>);
}
