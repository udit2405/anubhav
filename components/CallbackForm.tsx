"use client";
import { useState } from "react";
import { Field } from "./ui";
import { SendButtons } from "./Send";
import { LEADS_URL, submitLead } from "@/lib/leads";
import { prettyPhone, telLink } from "@/lib/contact";
import { BASE } from "@/lib/base";

/** The simplest possible lead form for seniors: a name, a number, and a time. */
export function CallbackForm({ title = "Request a free call back", sub = "Tell us your number and we will call you. No cost, no obligation.", compact = false }: { title?: string; sub?: string; compact?: boolean }) {
  const [f, setF] = useState({ name: "", phone: "", time: "Morning (9–12)", lang: "Hindi", about: "Retirement plan (property, safe income, investments)", consent: false });
  const [err, setErr] = useState<Record<string, string>>({}); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const set = (k: string, v: string | boolean) => { setF((p) => ({ ...p, [k]: v })); setErr({}); };
  const submit = async () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Please enter your 10-digit mobile number.";
    if (!f.consent) e.consent = "Please tick the box so we may call you.";
    setErr(e); if (Object.keys(e).length) return;
    setBusy(true); await submitLead("callback", { name: f.name, phone: f.phone, best_time: f.time, language: f.lang, interested_in: f.about, consent: "Agreed to be called about investment & real-estate guidance by Anubhav and registered partners" }); setBusy(false); setDone(true);
  };
  const body = `CALL-BACK REQUEST (Anubhav)\nName: ${f.name}\nPhone: ${f.phone}\nBest time: ${f.time} · Language: ${f.lang}\nInterested in: ${f.about}`;
  if (done) return (
    <div className="card p-6 sm:p-8 border-mint-500 border-2" role="status"><p className="text-4xl" aria-hidden>✅</p><h2 className="mt-2 text-2xl">Thank you, {f.name.split(" ")[0]}.</h2>
      <p className="mt-2 text-lg">{LEADS_URL ? "We have received your request." : "Please tap a button below to send your request to us."} We will call you on <strong>{f.phone}</strong> in the <strong>{f.time.toLowerCase()}</strong>.</p>
      <div className="mt-5"><SendButtons subject={`Call-back request: ${f.name}`} body={body} filename="anubhav-callback" /></div>
      <p className="mt-4 text-base text-slate-600">Prefer to speak now? Call <a className="font-bold underline" href={telLink}>{prettyPhone()}</a>.</p></div>);
  return (
    <form className={`card ${compact ? "p-5" : "p-6 sm:p-8"}`} noValidate onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <h2 className={compact ? "text-xl" : "text-2xl"}>{title}</h2><p className={`mt-1 text-slate-700 ${compact ? "text-base" : "text-lg"}`}>{sub}</p>
      <div className={`mt-4 ${compact ? "space-y-3.5" : "space-y-5"}`}>
        <div className={compact ? "grid sm:grid-cols-2 gap-3.5" : "space-y-5"}>
        <Field label="Your name" required error={err.name} htmlFor="cb-n"><input id="cb-n" className="input" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Your mobile number" required error={err.phone} htmlFor="cb-p"><input id="cb-p" className="input" inputMode="numeric" autoComplete="tel-national" value={f.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" /></Field>
        </div>
        <div className={compact ? "hidden" : "grid sm:grid-cols-2 gap-5"}>
          <Field label="Best time to call" htmlFor="cb-t"><select id="cb-t" className="input" value={f.time} onChange={(e) => set("time", e.target.value)}>{["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)"].map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Language" htmlFor="cb-l"><select id="cb-l" className="input" value={f.lang} onChange={(e) => set("lang", e.target.value)}>{["Hindi", "English", "Marathi", "Gujarati", "Punjabi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam"].map((x) => <option key={x}>{x}</option>)}</select></Field>
        </div>
        <label className="flex gap-3 items-start">{err.consent && <span className="sr-only">{err.consent}</span>}<input type="checkbox" className="h-6 w-6 mt-1 accent-[#1F3B5C] shrink-0" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} /><span className={compact ? "text-sm leading-snug" : "text-base"}>I agree that Anubhav and its registered partners may call or WhatsApp me about investment, property and related guidance, even if my number is on DND. I can ask them to stop at any time. <a className="underline font-bold" href={BASE + "/privacy/"} target="_blank">Privacy Policy</a></span></label>
        {err.consent && <p role="alert" className="text-base text-coral-600 font-bold -mt-3">{err.consent}</p>}
        <button className="btn-gold w-full !text-base !min-h-[46px]" disabled={busy}>{busy ? "Sending…" : "Call me back"}</button>
        <p className={`text-center text-slate-600 ${compact ? "text-sm" : "text-base"}`}>Or call us now: <a className="font-bold underline text-navy-800" href={telLink}>{prettyPhone()}</a></p>
      </div>
    </form>
  );
}
