"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CORPUS_BANDS, RISK, buildMap, lakhs } from "@/lib/plan";

/** Hero widget: instant taste of the Money Map. Drives visitors into the full planner. */
export function MiniMap() {
  const [idx, setIdx] = useState(2); const [risk, setRisk] = useState("balanced");
  const map = useMemo(() => buildMap({ age: "60–65", risk, goals: [], interests: [], corpusIdx: idx }), [risk, idx]);
  return (
    <div className="card p-5 sm:p-6 bg-white relative">
      <p className="font-bold text-sm uppercase tracking-wide text-coral-600">Try it now · free</p>
      <h2 className="mt-1 text-2xl font-bold leading-tight">See how your savings could be balanced</h2>
      <div className="mt-5">
        <div className="flex justify-between items-baseline"><label htmlFor="mm-c" className="font-bold">I have about</label><span className="font-serif text-3xl font-bold tabular-nums">{lakhs(CORPUS_BANDS[idx].mid)}</span></div>
        <input id="mm-c" type="range" min={0} max={CORPUS_BANDS.length - 1} step={1} value={idx} onChange={(e) => setIdx(Number(e.target.value))} className="range w-full" style={{ background: "#0F1226" }} />
        <div className="flex justify-between text-xs text-slate-500"><span>₹15 L</span><span>₹7 Cr+</span></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Comfort with risk">{RISK.map(([k, h]) => <button type="button" key={k} aria-pressed={risk === k} onClick={() => setRisk(k)} className={`rounded-xl border border-navy-300 py-2.5 text-sm font-bold transition-all ${risk === k ? "bg-gold-500 shadow-hard-sm " : "bg-white hover:bg-gold-50"}`}>{h}</button>)}</div>
      <div className="mt-5 flex h-10 rounded-lg overflow-hidden border border-navy-300" role="img" aria-label="Illustrative allocation">{map.map((b) => <div key={b.key} style={{ width: `${b.pct}%`, background: b.color }} className="transition-all duration-500" />)}</div>
      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">{map.slice(0, 4).map((b) => <li key={b.key} className="flex items-center gap-2"><span className="h-3 w-3 shrink-0 rounded-sm border border-navy-900" style={{ background: b.color }} /><span className="truncate">{b.name.split(" (")[0]}</span><strong className="ml-auto tabular-nums">{b.pct}%</strong></li>)}</ul>
      <Link href="/plan" className="btn-gold w-full mt-5 !text-lg">Get my full Money Map →</Link>
      <p className="mt-2 text-center text-xs text-slate-500">Illustrative only. 2 minutes. No payment.</p>
    </div>
  );
}
