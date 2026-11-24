"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DEPARTMENTS, DESIGNATIONS } from "@/lib/data";
import { makeDeptRank, PREFILL_KEY } from "@/lib/dept";
import { Autocomplete, initials } from "./ui";

const QUICK = ["Project Management", "Government Tendering", "Financial Advisory", "Training", "Civil Engineering", "Mentoring & Career Guidance", "Regulatory Compliance", "Administration"];

export function ProfilePreview() {
  const router = useRouter();
  const [name, setName] = useState(""); const [dept, setDept] = useState(""); const [desig, setDesig] = useState(""); const [years, setYears] = useState(30); const [city, setCity] = useState(""); const [specs, setSpecs] = useState<string[]>([]);
  const deptOpts = useMemo(() => DEPARTMENTS.map((d) => ({ value: d.name, hint: d.category })), []);
  const rank = useMemo(() => makeDeptRank(DEPARTMENTS), []);
  const toggle = (s: string) => setSpecs((x) => (x.includes(s) ? x.filter((y) => y !== s) : x.length >= 3 ? x : [...x, s]));
  const go = () => {
    const d = DEPARTMENTS.find((x) => x.name === dept);
    try { sessionStorage.setItem(PREFILL_KEY, JSON.stringify({ name, department: dept, designation: desig, yearsService: String(years), city, category: d?.category ?? "", specializations: specs })); } catch {}
    router.push("/register");
  };
  const filled = [name, dept, desig, city].filter(Boolean).length + (specs.length ? 1 : 0);

  return (
    <div className="rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/5 overflow-hidden">
      <div className="bg-gold-500 text-navy-900 px-5 py-3 flex items-center justify-between gap-3">
        <p className="font-semibold">Try it: see your profile in 30 seconds</p>
        <span className="text-sm bg-white/20 rounded-full px-2.5 py-0.5" aria-live="polite">{filled}/5</span>
      </div>

      {/* live card */}
      <div className="p-5 border-b border-slate-200 bg-navy-50">
        <div className="card p-4 flex gap-4 items-start transition-all">
          <div className="h-16 w-16 shrink-0 rounded-full bg-navy-800 text-gold-300 font-serif font-bold text-2xl flex items-center justify-center">{name ? initials(name) : "?"}</div>
          <div className="min-w-0">
            <p className={`font-serif text-xl font-bold leading-tight ${name ? "text-navy-900" : "text-slate-400"}`}>{name || "Your Name"}</p>
            <p className={desig ? "text-slate-700" : "text-slate-400"}>Retired {desig || "Designation"}</p>
            <p className={`font-semibold ${dept ? "text-navy-800" : "text-slate-400"}`}>{dept || "Department / organisation"}</p>
            <p className="text-sm text-slate-600 mt-1"><span className="font-semibold text-navy-900">{years} years</span> experience{city && <> · {city}</>}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{specs.length ? specs.map((s) => <span key={s} className="chip">{s}</span>) : <span className="chip !bg-white !text-slate-400 border-dashed">Your specialisations</span>}</div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="text-sm font-semibold text-navy-900" htmlFor="pv-name">Your name</label><input id="pv-name" className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. R. K. Sharma" /></div>
          <div><label className="text-sm font-semibold text-navy-900" htmlFor="pv-city">City</label><input id="pv-city" className="input mt-1" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur" /></div>
        </div>
        <div><label className="text-sm font-semibold text-navy-900" htmlFor="pv-dept">Department (try typing “Rail” or “Bank”)</label><div className="mt-1"><Autocomplete id="pv-dept" value={dept} onChange={setDept} options={deptOpts} rank={rank} max={6} placeholder="Start typing…" customLabel="Use" /></div></div>
        <div><label className="text-sm font-semibold text-navy-900" htmlFor="pv-desig">Last designation</label><div className="mt-1"><Autocomplete id="pv-desig" value={desig} onChange={setDesig} options={DESIGNATIONS.map((d) => ({ value: d }))} max={6} placeholder="e.g. Executive Engineer" customLabel="Use" /></div></div>
        <div>
          <div className="flex justify-between"><label className="text-sm font-semibold text-navy-900" htmlFor="pv-yrs">Years of service</label><span className="font-serif font-bold text-navy-800">{years}</span></div>
          <input id="pv-yrs" type="range" min={5} max={45} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[#123C2D] h-8" />
        </div>
        <fieldset><legend className="text-sm font-semibold text-navy-900 mb-1.5">Pick up to 3 strengths</legend>
          <div className="flex flex-wrap gap-2">{QUICK.map((s) => <button type="button" key={s} onClick={() => toggle(s)} aria-pressed={specs.includes(s)} className={`rounded-full px-3 min-h-[40px] text-sm font-medium border transition-colors ${specs.includes(s) ? "bg-navy-800 text-white border-navy-800" : "bg-white border-slate-300 hover:border-navy-500"}`}>{specs.includes(s) ? "✓ " : ""}{s}</button>)}</div>
        </fieldset>
        <button type="button" onClick={go} className="btn-gold w-full !text-lg">Continue to full registration →</button>
        <p className="text-xs text-slate-500 text-center">Nothing is sent yet. What you typed is carried into the form.</p>
      </div>
    </div>
  );
}
