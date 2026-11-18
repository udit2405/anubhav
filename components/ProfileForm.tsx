"use client";
import { useEffect, useMemo, useState } from "react";
import { makeDeptRank, PREFILL_KEY } from "@/lib/dept";
import { useTable } from "@/lib/app";
import { AVAILABILITY, CATEGORY_NAMES, DESIGNATIONS, PRICING, QUALIFICATIONS, SERVICES, STATES } from "@/lib/data";
import { Autocomplete, CheckGroup, Field, TagInput, type Option } from "./ui";
import { SendButtons } from "./Send";

interface FormState {
  name: string; mobile: string; email: string; age: string; city: string; state: string;
  department: string; designation: string; lastPosted: string; yearsService: string; retirementYear: string; education: string;
  category: string; specializations: string[]; skills: string[]; summary: string;
  services: string[]; pricingModels: string[]; fee: string; feeNote: string; availability: string[]; languages: string[];
  consentTrue: boolean; consentPrivacy: boolean; consentNoEndorse: boolean;
}
const blank: FormState = { name: "", mobile: "", email: "", age: "", city: "", state: "", department: "", designation: "", lastPosted: "", yearsService: "", retirementYear: "", education: "", category: "", specializations: [], skills: [], summary: "", services: [], pricingModels: [], fee: "", feeNote: "", availability: [], languages: ["Hindi", "English"], consentTrue: false, consentPrivacy: false, consentNoEndorse: false };
const STEPS = ["About you", "Career", "Expertise", "Services & fees", "Review & send"];

function validate(s: FormState, step: number): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0) {
    if (s.name.trim().length < 3) e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(s.mobile.trim())) e.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(s.email.trim())) e.email = "Enter a valid email address.";
    if (s.age && (Number(s.age) < 40 || Number(s.age) > 100)) e.age = "Age should be between 40 and 100.";
    if (!s.city.trim()) e.city = "Please enter your city."; if (!s.state) e.state = "Please choose your state.";
  }
  if (step === 1) {
    if (!s.department.trim()) e.department = "Please choose or type your department."; if (!s.designation.trim()) e.designation = "Please enter your previous designation.";
    const y = Number(s.yearsService); if (!y || y < 1 || y > 50) e.yearsService = "Enter years of service (1 to 50).";
    const r = Number(s.retirementYear); if (!r || r < 1985 || r > 2026) e.retirementYear = "Enter a valid retirement year (1985–2026).";
    if (!s.education) e.education = "Please choose your highest qualification.";
  }
  if (step === 2) {
    if (!s.category) e.category = "Please choose the closest category."; if (!s.specializations.length) e.specializations = "Select at least one specialization.";
    if (s.summary.trim().length < 40) e.summary = "Please write at least 40 characters about your experience (a few sentences).";
  }
  if (step === 3) {
    if (!s.services.length) e.services = "Select at least one service."; if (!s.pricingModels.length) e.pricingModels = "Select at least one pricing option.";
    if (s.fee && isNaN(Number(s.fee))) e.fee = "Enter fees as a number, e.g. 1500."; if (!s.availability.length) e.availability = "Select your availability.";
  }
  if (step === 4 && (!s.consentTrue || !s.consentPrivacy || !s.consentNoEndorse)) e.consent = "Please tick all three declarations to continue.";
  return e;
}
const list = (a: string[]) => a.join("; ");
export function buildMessage(s: FormState) {
  return `NEW EXPERT REGISTRATION (Anubhav)
Name: ${s.name}
Mobile (private): ${s.mobile}
Email (private): ${s.email}
Age (private): ${s.age || "-"}
City: ${s.city}
State: ${s.state}
Department: ${s.department}
Designation: ${s.designation}
Last posted: ${s.lastPosted || "-"}
Years of service: ${s.yearsService}
Retirement year: ${s.retirementYear}
Education: ${s.education}
Category: ${s.category}
Specializations: ${list(s.specializations)}
Skills: ${list(s.skills) || "-"}
Services: ${list(s.services)}
Pricing: ${list(s.pricingModels)}
Starting fee (Rs): ${s.fee || "-"} ${s.feeNote}
Availability: ${list(s.availability)}
Languages: ${list(s.languages)}
Summary: ${s.summary.trim()}
Declarations accepted: information is true; independent professional, no department endorsement; privacy consent.
(I will send my photograph and verification documents separately.)`;
}

export function ProfileForm() {
  const { rows: depts } = useTable("departments"); const { rows: specs } = useTable("specializations");
  const [s, setS] = useState<FormState>(blank); const [step, setStep] = useState(0); const [errors, setErrors] = useState<Record<string, string>>({}); const [done, setDone] = useState(false);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setS((p) => ({ ...p, [k]: v }));
  const deptOptions: Option[] = useMemo(() => depts.map((d) => ({ value: d.name, hint: d.category })), [depts]);
  const deptRank = useMemo(() => makeDeptRank(depts), [depts]);
  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => { try { const raw = sessionStorage.getItem(PREFILL_KEY); if (!raw) return; sessionStorage.removeItem(PREFILL_KEY); const p = JSON.parse(raw); setS((x) => ({ ...x, ...Object.fromEntries(Object.entries(p).filter(([, v]) => v !== "" && !(Array.isArray(v) && !v.length))) })); setPrefilled(true); } catch {} }, []);
  const go = (n: number) => { setErrors({}); setStep(n); document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth" }); };
  const next = () => { const e = validate(s, step); setErrors(e); if (Object.keys(e).length) { document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth" }); return; } go(step + 1); };
  const finish = () => { const e = validate(s, 4); setErrors(e); if (!Object.keys(e).length) { setDone(true); document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth" }); } };
  const err = (k: string) => errors[k];
  const chk = "h-5 w-5 mt-1 accent-[#183358]";

  if (done) return (
    <div id="form-top" className="space-y-6" role="status">
      <div className="rounded-xl bg-green-50 border border-green-300 p-6"><h2 className="text-2xl font-bold">Almost done, {s.name.split(" ")[0]}! Send your details to us.</h2>
        <p className="mt-2 text-lg text-slate-700">Choose how you would like to send them. Our team adds your profile to the site, usually within 2 working days, and you will get a confirmation. <strong>Please also send your photograph</strong> and, if you want a Verified badge, a photo or PDF of your retirement proof. Reply to the same message with these.</p></div>
      <SendButtons subject={`Anubhav expert registration: ${s.name}`} body={buildMessage(s)} filename={`anubhav-${s.name.toLowerCase().replace(/\W+/g, "-")}`} />
      <details className="card p-5"><summary className="font-semibold cursor-pointer">Preview what will be sent</summary><pre className="mt-3 whitespace-pre-wrap text-sm">{buildMessage(s)}</pre></details>
      <button className="btn-outline" onClick={() => setDone(false)}>← Edit my details</button>
    </div>);

  return (
    <div id="form-top" className="scroll-mt-24">
      <nav aria-label="Form progress" className="mb-8"><ol className="flex flex-wrap gap-2">{STEPS.map((l, i) => (
        <li key={l}><button type="button" disabled={i > step} onClick={() => i < step && go(i)} aria-current={i === step ? "step" : undefined} className={`rounded-full px-4 min-h-[44px] text-sm font-semibold border ${i === step ? "bg-navy-800 text-white border-navy-800" : i < step ? "bg-navy-50 text-navy-800 border-navy-200" : "bg-white text-slate-500 border-slate-300"}`}><span className="mr-1.5">{i + 1}.</span>{l}</button></li>))}</ol>
        {prefilled && <p role="status" className="mt-4 rounded-lg bg-green-50 border border-green-300 p-3">We have filled in what you typed on the homepage. Please check it and complete the rest.</p>}
        <p className="mt-3 text-slate-600">Step {step + 1} of {STEPS.length}. Fields marked <span className="text-red-700">*</span> are required.</p></nav>

      <div className="space-y-6">
        {step === 0 && (<>
          <h2 className="text-2xl font-bold">About you</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name" required error={err("name")} htmlFor="f-name"><input id="f-name" className="input" autoComplete="name" value={s.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Rajesh Kumar Sharma" /></Field>
            <Field label="Age" error={err("age")} htmlFor="f-age" hint="Optional. Kept private."><input id="f-age" className="input" inputMode="numeric" value={s.age} onChange={(e) => set("age", e.target.value.replace(/\D/g, "").slice(0, 3))} /></Field>
            <Field label="Mobile number" required error={err("mobile")} htmlFor="f-mobile" hint="Kept private. Never shown on the website."><div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-400 bg-slate-50">+91</span><input id="f-mobile" className="input !rounded-l-none" inputMode="numeric" autoComplete="tel-national" value={s.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} /></div></Field>
            <Field label="Email address" required error={err("email")} htmlFor="f-email" hint="Kept private."><input id="f-email" type="email" className="input" autoComplete="email" value={s.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="City" required error={err("city")} htmlFor="f-city"><input id="f-city" className="input" autoComplete="address-level2" value={s.city} onChange={(e) => set("city", e.target.value)} /></Field>
            <Field label="State" required error={err("state")} htmlFor="f-state"><select id="f-state" className="input" value={s.state} onChange={(e) => set("state", e.target.value)}><option value="">Choose state…</option>{STATES.map((x) => <option key={x}>{x}</option>)}</select></Field>
          </div>
          <p className="hint">You will send your profile photograph at the last step, on WhatsApp or email.</p>
        </>)}
        {step === 1 && (<>
          <h2 className="text-2xl font-bold">Your career</h2>
          <Field label="Government department / organisation" required error={err("department")} htmlFor="f-dept" hint="Start typing, for example “Rail”, “Def” or “Bank”, and pick from the list. If yours is missing, just type it in.">
            <Autocomplete id="f-dept" value={s.department} onChange={(v) => set("department", v)} options={deptOptions} rank={deptRank} placeholder="e.g. Indian Railways" customLabel="Use my own department:" onSelect={(o) => { if (o?.hint && !s.category && CATEGORY_NAMES.includes(o.hint)) set("category", o.hint); }} />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Previous designation" required error={err("designation")} htmlFor="f-desig"><Autocomplete id="f-desig" value={s.designation} onChange={(v) => set("designation", v)} options={DESIGNATIONS.map((d) => ({ value: d }))} placeholder="e.g. Executive Engineer" customLabel="Use" /></Field>
            <Field label="Last posted location" htmlFor="f-last"><input id="f-last" className="input" value={s.lastPosted} onChange={(e) => set("lastPosted", e.target.value)} placeholder="e.g. Jaipur Division" /></Field>
            <Field label="Years of service" required error={err("yearsService")} htmlFor="f-yrs"><input id="f-yrs" className="input" inputMode="numeric" value={s.yearsService} onChange={(e) => set("yearsService", e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="e.g. 32" /></Field>
            <Field label="Retirement year" required error={err("retirementYear")} htmlFor="f-ret"><input id="f-ret" className="input" inputMode="numeric" value={s.retirementYear} onChange={(e) => set("retirementYear", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="e.g. 2022" /></Field>
            <Field label="Highest educational qualification" required error={err("education")} htmlFor="f-edu"><select id="f-edu" className="input" value={s.education} onChange={(e) => set("education", e.target.value)}><option value="">Choose…</option>{QUALIFICATIONS.map((x) => <option key={x}>{x}</option>)}</select></Field>
          </div>
        </>)}
        {step === 2 && (<>
          <h2 className="text-2xl font-bold">Your expertise</h2>
          <Field label="Closest professional category" required error={err("category")} htmlFor="f-cat"><select id="f-cat" className="input" value={s.category} onChange={(e) => set("category", e.target.value)}><option value="">Choose…</option>{CATEGORY_NAMES.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <div><p className="label">Specializations <span className="text-red-700">*</span></p><p className="hint mb-2">Select all that apply.</p>
            <CheckGroup legend="Specializations" options={specs.map((x) => x.name)} value={s.specializations} onChange={(v) => set("specializations", v)} columns="sm:grid-cols-2 lg:grid-cols-3" />
            {err("specializations") && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err("specializations")}</p>}</div>
          <Field label="Add other skills" htmlFor="f-skills" hint="Type a skill and press Add. For example “GeM bidding”."><TagInput id="f-skills" value={s.skills} onChange={(v) => set("skills", v)} placeholder="Add a skill" /></Field>
          <Field label="Professional summary" required error={err("summary")} htmlFor="f-sum" hint={`Describe your experience in your own words. ${s.summary.trim().length} characters`}><textarea id="f-sum" rows={6} className="input" value={s.summary} onChange={(e) => set("summary", e.target.value)} placeholder="What work did you do, for how long, and how can you help clients now?" /></Field>
        </>)}
        {step === 3 && (<>
          <h2 className="text-2xl font-bold">Services, fees and availability</h2>
          <div><p className="label">Services you are willing to offer <span className="text-red-700">*</span></p><CheckGroup legend="Services" options={SERVICES} value={s.services} onChange={(v) => set("services", v)} />{err("services") && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err("services")}</p>}</div>
          <div><p className="label">Pricing <span className="text-red-700">*</span></p><p className="hint mb-2">Joining is always free. These are the fees you charge clients.</p><CheckGroup legend="Pricing" options={PRICING} value={s.pricingModels} onChange={(v) => set("pricingModels", v)} columns="sm:grid-cols-3" />{err("pricingModels") && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err("pricingModels")}</p>}</div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Expected starting fee (₹)" error={err("fee")} htmlFor="f-fee" hint="Leave blank if free or negotiable."><input id="f-fee" className="input" inputMode="numeric" value={s.fee} onChange={(e) => set("fee", e.target.value.replace(/\D/g, ""))} placeholder="e.g. 1500" /></Field>
            <Field label="Fee note" htmlFor="f-feenote" hint="e.g. per hour, free for students"><input id="f-feenote" className="input" value={s.feeNote} onChange={(e) => set("feeNote", e.target.value)} /></Field>
          </div>
          <div><p className="label">Availability <span className="text-red-700">*</span></p><CheckGroup legend="Availability" options={AVAILABILITY} value={s.availability} onChange={(v) => set("availability", v)} />{err("availability") && <p role="alert" className="text-sm text-red-700 font-medium mt-2">{err("availability")}</p>}</div>
          <Field label="Languages you can work in" htmlFor="f-lang"><TagInput id="f-lang" value={s.languages} onChange={(v) => set("languages", v)} placeholder="e.g. Hindi, English, Marwari" /></Field>
        </>)}
        {step === 4 && (<>
          <h2 className="text-2xl font-bold">Review and send</h2>
          <div className="rounded-xl bg-gold-50 border border-gold-300 p-5"><p className="font-semibold">Verified badge (optional)</p><p className="text-slate-700">After you send this form, reply with a clear <strong>photograph</strong> and, if you want a Verified badge, a photo or PDF of your <strong>retirement proof / experience certificate</strong>. Documents are used only for checking and are never published.</p></div>
          <dl className="card p-5 grid sm:grid-cols-2 gap-3 text-base">{[["Name", s.name], ["Location", `${s.city}, ${s.state}`], ["Department", s.department], ["Designation", s.designation], ["Experience", `${s.yearsService} years (retired ${s.retirementYear})`], ["Category", s.category], ["Specializations", s.specializations.join(", ")], ["Services", s.services.join(", ")], ["Pricing", `${s.pricingModels.join(", ")}${s.fee ? ` from ₹${s.fee}` : ""}`], ["Availability", s.availability.join(", ")]].map(([a, b]) => <div key={a}><dt className="text-sm text-slate-600">{a}</dt><dd className="font-semibold">{b}</dd></div>)}</dl>
          <div className="space-y-3 rounded-xl border border-slate-300 p-5">
            <p className="font-semibold">Declarations <span className="text-red-700">*</span></p>
            {err("consent") && <p role="alert" className="text-sm text-red-700 font-medium">{err("consent")}</p>}
            <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={s.consentTrue} onChange={(e) => set("consentTrue", e.target.checked)} /><span>I confirm that the information I have provided is true and I have actually served in the positions I have stated. I understand false claims will lead to removal.</span></label>
            <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={s.consentNoEndorse} onChange={(e) => set("consentNoEndorse", e.target.checked)} /><span>I understand I am listing as an independent professional and will not claim to represent or be endorsed by any government department or organisation.</span></label>
            <label className="flex gap-3 items-start"><input type="checkbox" className={chk} checked={s.consentPrivacy} onChange={(e) => set("consentPrivacy", e.target.checked)} /><span>I have read the <a href="/privacy" target="_blank" className="underline font-semibold">Privacy Policy</a>. I consent to my profile (without phone number or email) being shown publicly, and to Anubhav contacting me about enquiries.</span></label>
          </div>
        </>)}
      </div>
      <div className="mt-10 flex flex-wrap gap-3 justify-between border-t border-slate-200 pt-6">
        <button type="button" className="btn-outline" onClick={() => go(step - 1)} disabled={step === 0}>← Back</button>
        {step < STEPS.length - 1 ? <button type="button" className="btn-primary" onClick={next}>Next →</button> : <button type="button" className="btn-gold" onClick={finish}>Continue to send</button>}
      </div>
    </div>
  );
}
