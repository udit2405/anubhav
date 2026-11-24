"use client";
import { useState } from "react";
import { Field, CheckGroup, TagInput } from "./ui";
import { SendButtons } from "./Send";
import { LEADS_URL, submitLead } from "@/lib/leads";
import { DAYS, HELPER_LANGS, LAUNCH_CITIES, PLATFORM_FEE_PCT, SERVICES } from "@/lib/saathi";

interface F { name: string; age: string; gender: string; mobile: string; email: string; city: string; area: string; occupation: string; services: string[]; langs: string[]; days: string[]; vehicle: string; experience: string; why: string; c1: boolean; c2: boolean; c3: boolean }
const blank: F = { name: "", age: "", gender: "", mobile: "", email: "", city: LAUNCH_CITIES[0], area: "", occupation: "", services: [], langs: ["Hindi"], days: [], vehicle: "None", experience: "", why: "", c1: false, c2: false, c3: false };

export function HelperForm() {
  const [f, setF] = useState<F>(blank); const [err, setErr] = useState<Record<string, string>>({}); const [done, setDone] = useState(false);
  const set = <K extends keyof F>(k: K, v: F[K]) => { setF((p) => ({ ...p, [k]: v })); setErr((e) => (Object.keys(e).length ? {} : e)); };
  const submit = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 3) e.name = "Please enter your full name.";
    if (!f.age || Number(f.age) < 18 || Number(f.age) > 60) e.age = "Helpers must be 18 to 60 years old.";
    if (!f.gender) e.gender = "Please choose one.";
    if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
    if (!f.area.trim()) e.area = "Please enter your area / colony.";
    if (!f.occupation.trim()) e.occupation = "Tell us if you are a student or what you do.";
    if (!f.services.length) e.services = "Select at least one service you can do.";
    if (!f.days.length) e.days = "Select when you are available.";
    if (!f.c1 || !f.c2 || !f.c3) e.consent = "Please tick all three confirmations.";
    setErr(e); if (Object.keys(e).length) { document.getElementById("hf-top")?.scrollIntoView({ behavior: "smooth" }); return; }
    submitLead("saathi_helper", { name: f.name, age: f.age, gender: f.gender, phone: f.mobile, email: f.email, city: f.city, area: f.area, occupation: f.occupation, services: f.services, languages: f.langs, available: f.days, vehicle: f.vehicle, experience: f.experience, why: f.why });
    setDone(true); document.getElementById("hf-top")?.scrollIntoView({ behavior: "smooth" });
  };
  const body = `NEW HELPER APPLICATION (Anubhav Saathi)
Name: ${f.name}
Age / gender: ${f.age} / ${f.gender}
Mobile (private): ${f.mobile}
Email (private): ${f.email}
City / area: ${f.city}, ${f.area}
Occupation: ${f.occupation}
Services willing to do: ${f.services.join("; ")}
Languages: ${f.langs.join("; ")}
Available: ${f.days.join("; ")}
Own vehicle: ${f.vehicle}
Experience with elders: ${f.experience || "-"}
Why I want to be a helper: ${f.why || "-"}
Confirmed: willing to submit ID + address proof + police verification; attend interview and training; behave respectfully, never ask elders for money or gifts.`;
  if (done) return (
    <div id="hf-top" className="space-y-6" role="status">
      <div className="rounded-xl bg-green-50 border border-green-300 p-6"><h2 className="text-2xl font-bold">Thank you, {f.name.split(" ")[0]}! {LEADS_URL ? "Application received." : "Send your application to us."}</h2><p className="mt-2 text-lg text-slate-700">Tap WhatsApp or email. Our team will call you to schedule a short interview and explain the verification steps. You start taking bookings only after verification.</p></div>
      <SendButtons subject={`Saathi helper application: ${f.name}`} body={body} filename="anubhav-saathi-helper" />
      <details className="card p-5"><summary className="font-semibold cursor-pointer">Preview what will be sent</summary><pre className="mt-3 whitespace-pre-wrap text-sm">{body}</pre></details>
      <button className="btn-outline" onClick={() => setDone(false)}>← Edit my application</button>
    </div>);
  const chk = "h-5 w-5 mt-1 accent-[#183358]";
  return (
    <div id="hf-top" className="scroll-mt-24 space-y-6">
      <p className="text-slate-600">Fields marked <span className="text-red-700">*</span> are required. Your phone and email are kept private.</p>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full name" required error={err.name} htmlFor="h-n"><input id="h-n" className="input" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age" required error={err.age} htmlFor="h-a"><input id="h-a" className="input" inputMode="numeric" value={f.age} onChange={(e) => set("age", e.target.value.replace(/\D/g, "").slice(0, 2))} /></Field>
          <Field label="Gender" required error={err.gender} htmlFor="h-g"><select id="h-g" className="input" value={f.gender} onChange={(e) => set("gender", e.target.value)}><option value="">Choose…</option>{["Female", "Male", "Other"].map((x) => <option key={x}>{x}</option>)}</select></Field>
        </div>
        <Field label="Mobile number" required error={err.mobile} htmlFor="h-m"><input id="h-m" className="input" inputMode="numeric" autoComplete="tel-national" value={f.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} /></Field>
        <Field label="Email" required error={err.email} htmlFor="h-e"><input id="h-e" type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="City" required htmlFor="h-c"><select id="h-c" className="input" value={f.city} onChange={(e) => set("city", e.target.value)}>{[...LAUNCH_CITIES, "Other city (we will keep you on the list)"].map((c) => <option key={c}>{c}</option>)}</select></Field>
        <Field label="Area / colony" required error={err.area} htmlFor="h-ar"><input id="h-ar" className="input" value={f.area} onChange={(e) => set("area", e.target.value)} /></Field>
      </div>
      <Field label="What do you do?" required error={err.occupation} htmlFor="h-o" hint="e.g. B.Com student, B.Tech student, nursing student, part-time worker"><input id="h-o" className="input" value={f.occupation} onChange={(e) => set("occupation", e.target.value)} /></Field>
      <div><p className="label">Which services can you do? <span className="text-red-700">*</span></p><CheckGroup legend="Services" options={SERVICES.map((s) => s.name)} value={f.services} onChange={(v) => set("services", v)} />{err.services && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err.services}</p>}</div>
      <div><p className="label">When are you available? <span className="text-red-700">*</span></p><CheckGroup legend="Availability" options={DAYS} value={f.days} onChange={(v) => set("days", v)} columns="sm:grid-cols-3" />{err.days && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err.days}</p>}</div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Languages you speak" htmlFor="h-l"><TagInput id="h-l" value={f.langs} onChange={(v) => set("langs", v)} placeholder="Add a language" suggestions={HELPER_LANGS} /></Field>
        <Field label="Do you have a vehicle?" htmlFor="h-v"><select id="h-v" className="input" value={f.vehicle} onChange={(e) => set("vehicle", e.target.value)}>{["None", "Two-wheeler", "Car"].map((x) => <option key={x}>{x}</option>)}</select></Field>
      </div>
      <Field label="Any experience helping elders or family members?" htmlFor="h-x"><textarea id="h-x" rows={3} className="input" value={f.experience} onChange={(e) => set("experience", e.target.value)} /></Field>
      <Field label="Why do you want to be a helper?" htmlFor="h-w"><textarea id="h-w" rows={3} className="input" value={f.why} onChange={(e) => set("why", e.target.value)} /></Field>
      <div className="space-y-3 rounded-xl border border-slate-300 p-5"><p className="font-semibold">Please confirm <span className="text-red-700">*</span></p>{err.consent && <p role="alert" className="text-sm text-red-700 font-medium">{err.consent}</p>}
        <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={f.c1} onChange={(e) => set("c1", e.target.checked)} /><span>I will submit my ID, address proof and a police verification certificate, and attend an interview and short training before taking any booking.</span></label>
        <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={f.c2} onChange={(e) => set("c2", e.target.checked)} /><span>I will treat every elder with respect and patience, and will never ask for money, gifts or personal favours, or take bookings outside Anubhav.</span></label>
        <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={f.c3} onChange={(e) => set("c3", e.target.checked)} /><span>I understand Anubhav keeps a {PLATFORM_FEE_PCT}% platform fee on each booking and that I am an independent part-time helper, not an employee.</span></label></div>
      <button type="button" className="btn-gold" onClick={submit}>Continue to send</button>
    </div>
  );
}
