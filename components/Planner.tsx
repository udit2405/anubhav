"use client";
import { useEffect, useMemo, useState } from "react";
import { BASE } from "@/lib/base";
import { CheckGroup, Field } from "./ui";
import { SendButtons } from "./Send";
import { AGE_BANDS, CORPUS_BANDS, GOALS, INTERESTS, RISK, SOURCES, TIMELINES, buildMap, lakhs, scoreLead } from "@/lib/plan";
import { LEADS_URL, submitLead } from "@/lib/leads";
import { NOTICE } from "@/lib/legal";

const STEPS = ["About you", "Your savings", "Your goals", "Your Money Map"];
interface S { name: string; age: string; city: string; corpusIdx: number; source: string; pension: string; goals: string[]; interests: string[]; risk: string; timeline: string; phone: string; email: string; callTime: string; lang: string; consent: boolean; consentWa: boolean }
const blank: S = { name: "", age: "", city: "", corpusIdx: -1, source: "", pension: "", goals: [], interests: [], risk: "balanced", timeline: "", phone: "", email: "", callTime: "Morning (9–12)", lang: "Hindi", consent: false, consentWa: true };

export function Planner() {
  const [s, setS] = useState<S>(blank); const [step, setStep] = useState(0); const [err, setErr] = useState<Record<string, string>>({}); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false);
  const set = <K extends keyof S>(k: K, v: S[K]) => { setS((p) => ({ ...p, [k]: v })); setErr((e) => (Object.keys(e).length ? {} : e)); };
  useEffect(() => { document.getElementById("pl-top")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [step, sent]);
  const map = useMemo(() => (s.corpusIdx >= 0 ? buildMap({ age: s.age, risk: s.risk, goals: s.goals, interests: s.interests, corpusIdx: s.corpusIdx }) : []), [s.age, s.risk, s.goals, s.interests, s.corpusIdx]);
  const score = s.corpusIdx >= 0 && s.timeline ? scoreLead(s.corpusIdx, s.timeline) : "";

  const validate = (st: number) => {
    const e: Record<string, string> = {};
    if (st === 0) { if (s.name.trim().length < 2) e.name = "Please tell us your first name."; if (!s.age) e.age = "Please choose your age."; if (!s.city.trim()) e.city = "Please enter your city."; }
    if (st === 1) { if (s.corpusIdx < 0) e.corpus = "Please choose a range. An approximate figure is fine."; if (!s.source) e.source = "Please choose one."; }
    if (st === 2) { if (!s.goals.length) e.goals = "Choose at least one goal."; if (!s.interests.length) e.interests = "Choose at least one area."; if (!s.timeline) e.timeline = "Please choose when you plan to decide."; }
    if (st === 3) { if (!/^[6-9]\d{9}$/.test(s.phone)) e.phone = "Enter a valid 10-digit mobile number."; if (s.email && !/^\S+@\S+\.\S+$/.test(s.email)) e.email = "Please check the email address."; if (!s.consent) e.consent = "Please tick to allow us to call you."; }
    return e;
  };
  const next = () => { const e = validate(step); setErr(e); if (!Object.keys(e).length) { setStep(step + 1); } };
  const payload = () => ({ name: s.name, phone: s.phone, email: s.email, age_band: s.age, city: s.city, corpus: CORPUS_BANDS[s.corpusIdx]?.label, corpus_source: s.source, pension: s.pension, goals: s.goals, interests: s.interests, risk: s.risk, decide_by: s.timeline, call_time: s.callTime, language: s.lang, whatsapp_ok: s.consentWa, lead_score: score, consent: "Agreed to be contacted about investment & real-estate guidance and introduced to registered partners" });
  const body = `NEW RETIREMENT PLAN LEAD (Anubhav)\nLead score: ${score}\nName: ${s.name} (${s.age}), ${s.city}\nPhone: ${s.phone}${s.email ? "\nEmail: " + s.email : ""}\nInvestable: ${CORPUS_BANDS[s.corpusIdx]?.label} (${s.source})\nPension: ${s.pension || "-"}\nGoals: ${s.goals.join("; ")}\nInterested in: ${s.interests.join("; ")}\nRisk: ${s.risk} · Decide: ${s.timeline}\nBest time to call: ${s.callTime} in ${s.lang}`;
  const submit = async () => { const e = validate(3); setErr(e); if (Object.keys(e).length) return; setBusy(true); await submitLead("plan", payload()); setBusy(false); setSent(true); };
  const E = (k: string) => err[k];

  if (sent) return (
    <div id="pl-top" className="max-w-2xl mx-auto text-center space-y-6 py-4" role="status">
      <div className="mx-auto h-20 w-20 rounded-full bg-mint-500 border border-navy-300 shadow-hard flex items-center justify-center text-4xl text-white">✓</div>
      <h2 className="text-3xl sm:text-4xl font-bold">Thank you, {s.name.split(" ")[0]}!</h2>
      <p className="text-xl text-slate-700">{LEADS_URL ? "Your Money Map request has reached our team." : "One last tap sends your request to our team."} A retirement specialist will call you on <strong>{s.phone}</strong> in the <strong>{s.callTime.toLowerCase()}</strong> to walk you through it. No cost, no obligation.</p>
      <SendButtons subject={`Retirement plan lead: ${s.name}`} body={body} filename="anubhav-plan" />
      <p className="text-sm text-slate-600">{LEADS_URL ? "WhatsApp is optional and gets you a faster reply." : "Please send it so we receive your details."}</p>
    </div>);

  return (
    <div id="pl-top" className="scroll-mt-24">
      <nav aria-label="Progress" className="mb-8"><ol className="grid grid-cols-4 gap-2">{STEPS.map((l, i) => (
        <li key={l}><div className={`h-3 rounded-full border border-navy-300 transition-colors ${i <= step ? "bg-gold-500" : "bg-white"}`} /><span className={`mt-2 block text-xs sm:text-sm font-bold ${i === step ? "text-navy-900" : "text-slate-500"}`}>{i + 1}. {l}</span></li>))}</ol></nav>

      {step === 0 && (<div className="space-y-6"><div><h2 className="text-3xl font-bold">Let’s start with you</h2><p className="mt-1 text-lg text-slate-600">Three quick questions. It takes about 2 minutes.</p></div>
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Your first name" required error={E("name")} htmlFor="p-name"><input id="p-name" className="input" autoComplete="given-name" value={s.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Your city" required error={E("city")} htmlFor="p-city"><input id="p-city" className="input" autoComplete="address-level2" value={s.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Jaipur" /></Field>
        </div>
        <div><p className="label">Your age <span className="text-coral-600">*</span></p><div className="flex flex-wrap gap-3">{AGE_BANDS.map((a) => <Pill key={a} on={s.age === a} onClick={() => set("age", a)}>{a}</Pill>)}</div>{E("age") && <p role="alert" className="text-sm text-coral-600 font-bold mt-2">{E("age")}</p>}</div></div>)}

      {step === 1 && (<div className="space-y-6"><div><h2 className="text-3xl font-bold">About your savings</h2><p className="mt-1 text-lg text-slate-600">An approximate range is fine. This only helps us suggest the right options.</p></div>
        <div><p className="label">How much do you have available to invest? <span className="text-coral-600">*</span></p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{CORPUS_BANDS.map((c, i) => <Pill key={c.label} big on={s.corpusIdx === i} onClick={() => set("corpusIdx", i)}>{c.label}</Pill>)}</div>{E("corpus") && <p role="alert" className="text-sm text-coral-600 font-bold mt-2">{E("corpus")}</p>}</div>
        <Field label="Where does this money mainly come from?" required error={E("source")} htmlFor="p-src"><select id="p-src" className="input" value={s.source} onChange={(e) => set("source", e.target.value)}><option value="">Choose…</option>{SOURCES.map((x) => <option key={x}>{x}</option>)}</select></Field>
        <div><p className="label">Do you receive a regular pension? <span className="text-slate-500 font-normal text-sm">(optional)</span></p><div className="flex flex-wrap gap-3">{["Yes", "No", "Partly"].map((a) => <Pill key={a} on={s.pension === a} onClick={() => set("pension", a)}>{a}</Pill>)}</div></div></div>)}

      {step === 2 && (<div className="space-y-7"><div><h2 className="text-3xl font-bold">What matters most to you?</h2><p className="mt-1 text-lg text-slate-600">Choose as many as you like.</p></div>
        <div><p className="label">Your goals <span className="text-coral-600">*</span></p><CheckGroup legend="Goals" options={GOALS} value={s.goals} onChange={(v) => set("goals", v)} />{E("goals") && <p role="alert" className="text-sm text-coral-600 font-bold mt-2">{E("goals")}</p>}</div>
        <div><p className="label">Areas you would like to explore <span className="text-coral-600">*</span></p><CheckGroup legend="Interests" options={INTERESTS} value={s.interests} onChange={(v) => set("interests", v)} />{E("interests") && <p role="alert" className="text-sm text-coral-600 font-bold mt-2">{E("interests")}</p>}</div>
        <div><p className="label">How do you feel about risk?</p><div className="grid sm:grid-cols-3 gap-3">{RISK.map(([k, h, d]) => <button type="button" key={k} onClick={() => set("risk", k)} aria-pressed={s.risk === k} className={`text-left rounded-2xl border border-navy-300 p-4 transition-all ${s.risk === k ? "bg-gold-500 shadow-hard " : "bg-white hover:bg-gold-50"}`}><span className="block font-bold text-lg">{h}</span><span className={`text-base ${s.risk === k ? "text-navy-100" : "text-slate-700"}`}>{d}</span></button>)}</div></div>
        <div><p className="label">When do you plan to decide? <span className="text-coral-600">*</span></p><div className="flex flex-wrap gap-3">{TIMELINES.map((t) => <Pill key={t} on={s.timeline === t} onClick={() => set("timeline", t)}>{t}</Pill>)}</div>{E("timeline") && <p role="alert" className="text-sm text-coral-600 font-bold mt-2">{E("timeline")}</p>}</div></div>)}

      {step === 3 && (<div className="space-y-8">
        <div><p className="eyebrow">Your result</p><h2 className="mt-3 text-3xl sm:text-4xl font-bold">{s.name.split(" ")[0]}’s Retirement Money Map</h2>
          <p className="mt-2 text-lg text-slate-700">A starting point for a <strong>{lakhs(CORPUS_BANDS[s.corpusIdx].mid)}</strong> corpus, a <strong>{RISK.find((r) => r[0] === s.risk)![1].toLowerCase()}</strong> approach, age {s.age}. It is illustrative. A specialist will tailor it to you.</p></div>
        <div className="card p-5 sm:p-7">
          <div className="flex h-12 rounded-xl overflow-hidden border border-navy-300" role="img" aria-label="Allocation bar">{map.map((b) => <div key={b.key} style={{ width: `${b.pct}%`, background: b.color }} className="transition-all duration-500" title={`${b.name} ${b.pct}%`} />)}</div>
          <ul className="mt-6 grid md:grid-cols-2 gap-4">{map.map((b) => (
            <li key={b.key} className="rounded-xl border border-navy-200 p-4"><div className="flex items-baseline justify-between gap-3"><span className="flex items-center gap-2 font-bold text-lg"><span className="h-4 w-4 rounded border border-navy-900" style={{ background: b.color }} />{b.name}</span><span className="font-serif text-2xl font-bold tabular-nums">{b.pct}%</span></div>
              <p className="text-sm text-slate-600 mt-1">≈ {lakhs(b.amount)} · {b.blurb}</p><p className="text-sm mt-2"><span className="font-bold">Ask your specialist:</span> {b.ask}</p></li>))}</ul>
          <p className="mt-5 text-xs text-slate-500">Illustrative allocation based on your answers, not a recommendation of any product. No returns are promised or implied.</p>
        </div>
        <div className="card p-5 sm:p-8 bg-gold-50"><h3 className="text-2xl font-bold">Get your personalised plan, free</h3><p className="mt-1 text-lg text-slate-700">A retirement specialist will call you for a free 20-minute walk-through, with property and investment options that fit your Money Map.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <Field label="Your mobile number" required error={E("phone")} htmlFor="p-ph"><input id="p-ph" className="input" inputMode="numeric" autoComplete="tel-national" value={s.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} /></Field>
            <Field label="Email" error={E("email")} htmlFor="p-em" hint="To send your Money Map in writing"><input id="p-em" type="email" className="input" value={s.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="Best time to call" htmlFor="p-ct"><select id="p-ct" className="input" value={s.callTime} onChange={(e) => set("callTime", e.target.value)}>{["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)"].map((x) => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Preferred language" htmlFor="p-lg"><select id="p-lg" className="input" value={s.lang} onChange={(e) => set("lang", e.target.value)}>{["Hindi", "English", "Marathi", "Gujarati", "Punjabi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam"].map((x) => <option key={x}>{x}</option>)}</select></Field>
          </div>
          <div className="mt-5 space-y-3">{E("consent") && <p role="alert" className="text-sm text-coral-600 font-bold">{E("consent")}</p>}
            <label className="flex gap-3 items-start"><input type="checkbox" className="h-5 w-5 mt-1 accent-[#0F1226]" checked={s.consent} onChange={(e) => set("consent", e.target.checked)} /><span>I agree that Anubhav and its registered partners may call, WhatsApp or email me about investment and real-estate guidance, even if my number is on DND. I can withdraw consent any time. I have read the <a className="underline font-bold" href={BASE + "/privacy/"} target="_blank">Privacy Policy</a>.</span></label>
            <label className="flex gap-3 items-start"><input type="checkbox" className="h-5 w-5 mt-1 accent-[#0F1226]" checked={s.consentWa} onChange={(e) => set("consentWa", e.target.checked)} /><span>Send my Money Map on WhatsApp too.</span></label></div>
          <button type="button" className="btn-gold !text-lg !min-h-[60px] w-full sm:w-auto mt-6" onClick={submit} disabled={busy}>{busy ? "Sending…" : "Send me my free plan"}</button>
          <p className="mt-4 text-xs text-slate-500">{NOTICE}</p></div></div>)}

      {step < 3 && <div className="mt-10 flex flex-wrap gap-3 justify-between border-t-2 border-navy-900/10 pt-6"><button type="button" className="btn-outline" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button><button type="button" className="btn-gold" onClick={next}>{step === 2 ? "See my Money Map →" : "Next →"}</button></div>}
      {step === 3 && <button type="button" className="mt-6 underline font-bold" onClick={() => setStep(2)}>← Change my answers</button>}
    </div>
  );
}
function Pill({ on, onClick, children, big }: { on: boolean; onClick: () => void; children: React.ReactNode; big?: boolean }) {
  return <button type="button" aria-pressed={on} onClick={onClick} className={`rounded-full border border-navy-300 font-bold transition-all ${big ? "px-5 min-h-[60px] text-lg" : "px-5 min-h-[48px]"} ${on ? "bg-gold-500 shadow-hard-sm " : "bg-white hover:bg-gold-50"}`}>{on ? "✓ " : ""}{children}</button>;
}
