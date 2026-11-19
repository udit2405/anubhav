"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CATEGORIES } from "@/lib/data";

/* ---------- Scroll reveal (respects reduced motion via CSS) */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/* ---------- Earnings estimator */
const PRESETS = [["Light", 3, 1500], ["Regular", 8, 2000], ["Active", 16, 2500]] as const;
const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export function EarningsEstimator() {
  const [n, setN] = useState(8); const [fee, setFee] = useState(2000);
  const month = n * fee;
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-7">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Quick presets">
          {PRESETS.map(([l, a, b]) => <button key={l} type="button" onClick={() => { setN(a); setFee(b); }} aria-pressed={n === a && fee === b} className={`rounded-full px-5 min-h-[44px] font-semibold border-2 transition-colors ${n === a && fee === b ? "bg-gold-500 border-gold-500 text-white" : "border-navy-600 text-navy-100 hover:border-gold-300"}`}>{l}</button>)}
        </div>
        <div>
          <div className="flex justify-between items-baseline"><label htmlFor="es-n" className="text-lg font-semibold">Consultations per month</label><span className="font-serif text-3xl font-bold text-gold-300">{n}</span></div>
          <input id="es-n" type="range" min={1} max={30} value={n} onChange={(e) => setN(Number(e.target.value))} className="range w-full" />
          <div className="flex justify-between text-sm text-navy-300"><span>1</span><span>30</span></div>
        </div>
        <div>
          <div className="flex justify-between items-baseline"><label htmlFor="es-f" className="text-lg font-semibold">Your fee per consultation</label><span className="font-serif text-3xl font-bold text-gold-300">{inr(fee)}</span></div>
          <input id="es-f" type="range" min={500} max={10000} step={250} value={fee} onChange={(e) => setFee(Number(e.target.value))} className="range w-full" />
          <div className="flex justify-between text-sm text-navy-300"><span>₹500</span><span>₹10,000</span></div>
        </div>
      </div>
      <div className="rounded-2xl bg-white text-navy-900 p-7 sm:p-9">
        <p className="text-slate-600 font-semibold uppercase tracking-wide text-sm">You could earn about</p>
        <p className="font-serif text-5xl sm:text-6xl font-bold mt-2 tabular-nums" aria-live="polite">{inr(month)}<span className="text-2xl text-slate-500 font-sans font-normal"> / month</span></p>
        <p className="mt-2 text-xl text-slate-700">That is <strong className="tabular-nums">{inr(month * 12)}</strong> a year, on your schedule.</p>
        <div className="mt-6 h-3 rounded-full bg-navy-100 overflow-hidden" aria-hidden><div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${Math.min(100, (month / 150000) * 100)}%` }} /></div>
        <p className="mt-5 text-sm text-slate-500">An illustration using your own numbers, not a promise of income. You set your fees and choose how much work to take. Many experts also mentor for free.</p>
        <Link href="/register" className="btn-gold w-full mt-6">Start earning from your experience</Link>
      </div>
    </div>
  );
}

/* ---------- Field explorer */
const FIELD: Record<string, { roles: string[]; asks: string[] }> = {
  admin: { roles: ["IAS / RAS / state service officers", "Collectors, SDMs, tehsildars", "Secretariat officers"], asks: ["Understanding approval processes", "Land and revenue matters", "Mentoring civil services aspirants"] },
  eng: { roles: ["PWD / CPWD / PHED engineers", "Irrigation and power engineers", "PSU project engineers"], asks: ["Estimates and BOQ checks", "Tender documents for works", "Quality audits on site"] },
  fin: { roles: ["Bank managers and officers", "Auditors and accounts officers", "Income tax and GST officers"], asks: ["Bank-ready project reports", "Audit preparation for NGOs", "Tax and compliance guidance"] },
  def: { roles: ["Army, Navy and Air Force officers", "Paramilitary officers", "Defence logistics specialists"], asks: ["Security audits for factories", "Leadership training", "Logistics and discipline systems"] },
  legal: { roles: ["Retired judges", "Law officers and legal advisers", "Vigilance officers"], asks: ["Contract and arbitration advice", "Internal inquiry processes", "Compliance reviews"] },
  health: { roles: ["Government doctors and CMOs", "Hospital administrators", "Public health officers"], asks: ["NABH preparation", "Clinic set-up and administration", "Health programme guidance"] },
  edu: { roles: ["Professors and principals", "Teachers", "Scientists (DRDO, ISRO, CSIR, ICAR)"], asks: ["Mentoring and tuition", "Research guidance", "Curriculum design"] },
  rail: { roles: ["Railway engineers and officers", "Roadways and transport officials", "Aviation and port staff"], asks: ["Rail siding approvals", "Freight and logistics planning", "Transport safety audits"] },
  proc: { roles: ["Purchase and stores officers", "GeM / DGS&D specialists", "FCI and warehousing officers"], asks: ["GeM registration and bidding", "Understanding tender conditions", "Vendor empanelment"] },
  it: { roles: ["NIC officers", "BSNL / DoT engineers", "e-Governance specialists"], asks: ["IT RFP preparation", "System reviews", "Digital transformation advice"] },
  hr: { roles: ["Personnel and training officers", "Labour department officers", "EPFO officials"], asks: ["HR policies and service rules", "Recruitment frameworks", "Labour law compliance"] },
  consult: { roles: ["Planning and policy officers", "Statisticians", "Senior generalists"], asks: ["Business strategy advice", "Policy research", "One-on-one mentoring"] },
};
export function FieldExplorer() {
  const [sel, setSel] = useState(CATEGORIES[1].id); const c = CATEGORIES.find((x) => x.id === sel)!; const f = FIELD[sel];
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="tablist" aria-label="Fields">
        {CATEGORIES.map((x) => (
          <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}
            className={`text-left rounded-xl border-2 p-4 min-h-[92px] transition-all ${sel === x.id ? "border-navy-800 bg-navy-800 text-white shadow-lg -translate-y-0.5" : "border-slate-200 bg-white hover:border-navy-300"}`}>
            <span className="text-2xl" aria-hidden>{x.icon}</span><span className="block mt-1 font-semibold leading-snug">{x.name}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" key={sel} className="card p-7 fade-in border-t-4 border-t-gold-500 h-fit lg:sticky lg:top-28">
        <p className="text-4xl" aria-hidden>{c.icon}</p>
        <h3 className="text-2xl font-bold mt-2">{c.name}</h3>
        <p className="text-slate-600 mt-1">{c.blurb}</p>
        <h4 className="mt-5 font-bold text-navy-900">Who we are looking for</h4>
        <ul className="mt-2 space-y-1.5">{f.roles.map((r) => <li key={r} className="flex gap-2"><span className="text-gold-600" aria-hidden>●</span>{r}</li>)}</ul>
        <h4 className="mt-5 font-bold text-navy-900">What clients will ask for</h4>
        <ul className="mt-2 space-y-1.5">{f.asks.map((r) => <li key={r} className="flex gap-2"><span className="text-gold-600" aria-hidden>→</span>{r}</li>)}</ul>
        <Link href="/register" className="btn-primary mt-6 w-full">I have this experience</Link>
      </div>
    </div>
  );
}

/* ---------- Step guide */
const STEPS = [
  { h: "Fill a simple form", d: "Tell us about your career: department, designation, years of service and what you can help with.", t: "About 10 minutes", icon: "📝" },
  { h: "Send it on WhatsApp or email", d: "One tap sends your details to our team. No app to install, no password to remember.", t: "One tap", icon: "📲" },
  { h: "We publish your profile", d: "We check your details and publish your profile page. Send your retirement proof to earn a Verified badge.", t: "Within 2 working days", icon: "✅" },
  { h: "Get enquiries and earn", d: "Businesses and individuals ask for you. We pass on each request and you decide whether to take it.", t: "Your choice, always", icon: "🤝" },
];
export function StepGuide() {
  const [i, setI] = useState(0); const s = STEPS[i];
  return (
    <div>
      <ol className="relative grid grid-cols-4 gap-2" aria-label="Steps">
        <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 bg-slate-200 rounded" aria-hidden><div className="h-full bg-gold-500 rounded transition-all duration-500" style={{ width: `${(i / 3) * 100}%` }} /></div>
        {STEPS.map((x, k) => (
          <li key={x.h} className="relative flex flex-col items-center text-center">
            <button type="button" onClick={() => setI(k)} aria-current={i === k ? "step" : undefined} aria-label={`Step ${k + 1}: ${x.h}`}
              className={`h-14 w-14 rounded-full font-bold text-xl border-4 transition-all ${k <= i ? "bg-navy-800 border-gold-500 text-white" : "bg-white border-slate-200 text-slate-500 hover:border-navy-300"} ${k === i ? "scale-110" : ""}`}>{k + 1}</button>
            <span className={`mt-3 text-sm sm:text-base font-semibold leading-tight ${k === i ? "text-navy-900" : "text-slate-500"}`}>{x.h}</span>
          </li>
        ))}
      </ol>
      <div key={i} className="fade-in mt-8 card p-7 sm:p-9 grid sm:grid-cols-[auto_1fr_auto] gap-6 items-center">
        <span className="text-5xl" aria-hidden>{s.icon}</span>
        <div><p className="text-sm font-semibold text-gold-700 uppercase tracking-wide">Step {i + 1} · {s.t}</p><h3 className="text-2xl font-bold mt-1">{s.h}</h3><p className="text-lg text-slate-700 mt-2">{s.d}</p></div>
        <div className="flex sm:flex-col gap-2">
          <button className="btn-outline btn-sm" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>← Back</button>
          {i < 3 ? <button className="btn-primary btn-sm" onClick={() => setI(i + 1)}>Next →</button> : <Link href="/register" className="btn-gold btn-sm">Start now</Link>}
        </div>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion */
export function Faq({ items }: { items: string[][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map(([q, a], k) => (
        <div key={q}>
          <h3><button type="button" className="w-full flex justify-between items-center gap-4 py-5 text-left text-xl font-semibold text-navy-900 hover:text-navy-600" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>
            {q}<span className={`h-9 w-9 shrink-0 rounded-full border-2 border-navy-800 flex items-center justify-center text-xl transition-transform ${open === k ? "rotate-45 bg-navy-800 text-white" : ""}`} aria-hidden>+</span></button></h3>
          <div className={`grid transition-all duration-300 ${open === k ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="pb-5 text-lg text-slate-700 max-w-3xl">{a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Sticky mobile CTA */
export function MobileCta({ href = "/register", label = "List Your Expertise — Free" }: { href?: string; label?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 600); h(); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 p-3 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}>
      <Link href={href} className="btn-gold w-full">{label}</Link>
    </div>
  );
}
