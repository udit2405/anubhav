"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Field, CheckGroup } from "./ui";
import { SendButtons } from "./Send";
import { LEADS_URL, submitLead } from "@/lib/leads";
import { HELPER_LANGS, LAUNCH_CITIES, NEEDS, PLATFORM_FEE_PCT, SERVICES, inr } from "@/lib/saathi";

const STEPS = ["Service", "Who needs help", "When & where", "Review & send"];
const today = () => new Date().toISOString().slice(0, 10);
interface F { who: "self" | "family"; name: string; age: string; city: string; area: string; needs: string[]; gender: string; lang: string; date: string; time: string; flexible: boolean; destination: string; notes: string; bookerName: string; relation: string; phone: string; elderPhone: string; consent: boolean }
const blank: F = { who: "family", name: "", age: "", city: LAUNCH_CITIES[0], area: "", needs: [], gender: "No preference", lang: "Hindi", date: "", time: "", flexible: false, destination: "", notes: "", bookerName: "", relation: "Son", phone: "", elderPhone: "", consent: false };

export function BookingWizard() {
  const sp = useSearchParams(); const pre = sp.get("service");
  const [sel, setSel] = useState<Record<string, number>>(() => { const s = SERVICES.find((x) => x.id === pre); return s ? { [s.id]: s.def } : {}; });
  const [f, setF] = useState<F>(blank); const [step, setStep] = useState(0); const [err, setErr] = useState<Record<string, string>>({}); const [done, setDone] = useState(false);
  const set = <K extends keyof F>(k: K, v: F[K]) => { setF((p) => ({ ...p, [k]: v })); setErr((e) => (Object.keys(e).length ? {} : e)); };
  const chosen = SERVICES.filter((s) => sel[s.id] != null);
  const total = chosen.reduce((a, s) => a + s.price(sel[s.id]), 0);
  const askDest = chosen.some((s) => s.askDestination);
  const toggle = (id: string) => setSel((p) => { const n = { ...p }; if (n[id] != null) delete n[id]; else n[id] = SERVICES.find((s) => s.id === id)!.def; return n; });
  const bump = (id: string, d: number) => setSel((p) => { const sv = SERVICES.find((x) => x.id === id)!; return { ...p, [id]: Math.min(sv.max, Math.max(sv.min, (p[id] ?? sv.def) + d)) }; });

  const validate = (st: number) => {
    const e: Record<string, string> = {};
    if (st === 0 && !chosen.length) e.services = "Please choose at least one service.";
    if (st === 1) { if (f.name.trim().length < 2) e.name = "Please enter the name of the person who needs help."; if (f.age && (Number(f.age) < 40 || Number(f.age) > 110)) e.age = "Please check the age."; if (!f.area.trim()) e.area = "Please enter the area / colony so we can find a nearby helper."; }
    if (st === 2) {
      if (!f.flexible && !f.date) e.date = "Please choose a date, or tick “I am flexible”."; else if (f.date && f.date < today()) e.date = "The date cannot be in the past.";
      if (f.bookerName.trim().length < 2) e.bookerName = "Please enter your name."; if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit mobile number.";
      if (f.elderPhone && !/^[6-9]\d{9}$/.test(f.elderPhone)) e.elderPhone = "Enter a valid 10-digit mobile number.";
    }
    if (st === 3 && !f.consent) e.consent = "Please tick to confirm.";
    return e;
  };
  const go = (n: number) => { setErr({}); setStep(n); document.getElementById("bk-top")?.scrollIntoView({ behavior: "smooth" }); };
  const next = () => { const e = validate(step); setErr(e); if (Object.keys(e).length) { document.getElementById("bk-top")?.scrollIntoView({ behavior: "smooth" }); return; } go(step + 1); };

  const body = useMemo(() => `NEW HELPER BOOKING (Anubhav Saathi)
Services: ${chosen.map((s) => `${s.name} x ${sel[s.id]} ${sel[s.id] === 1 ? s.unit : s.unitPlural} (${inr(s.price(sel[s.id]))})`).join("; ")}
Estimated total: ${inr(total)} (cab/medical/items extra at actuals)
Person needing help: ${f.name}${f.age ? `, age ${f.age}` : ""}
City / area: ${f.city}, ${f.area}
Special needs: ${f.needs.join(", ") || "None"}
Helper preference: ${f.gender}, speaks ${f.lang}
Date / time: ${f.flexible ? "Flexible" : f.date}${f.time ? " at " + f.time : ""}
${askDest ? `Destination / hospital: ${f.destination || "-"}\n` : ""}Notes: ${f.notes || "-"}
Booked by: ${f.bookerName} (${f.who === "self" ? "the person themselves" : f.relation}), phone ${f.phone}
Elder's phone: ${f.elderPhone || (f.who === "self" ? f.phone : "-")}`, [chosen, sel, total, f, askDest]);

  if (done) return (
    <div id="bk-top" className="space-y-6" role="status">
      <div className="rounded-xl bg-green-50 border border-green-300 p-6"><h2 className="text-2xl font-bold">{LEADS_URL ? "Booking request received!" : "One last step: send your booking to us"}</h2><p className="mt-2 text-lg text-slate-700">Tap WhatsApp (fastest) or email. We will reply within a few hours to confirm your helper, their details and how to pay. Your booking is <strong>not confirmed until we reply</strong>.</p></div>
      <SendButtons subject={`Saathi booking: ${f.name}`} body={body} filename="anubhav-saathi-booking" />
      <details className="card p-5"><summary className="font-semibold cursor-pointer">Preview what will be sent</summary><pre className="mt-3 whitespace-pre-wrap text-sm">{body}</pre></details>
      <button className="btn-outline" onClick={() => setDone(false)}>← Change my booking</button>
    </div>);

  const E = (k: string) => err[k];
  return (
    <div id="bk-top" className="scroll-mt-24 grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div>
        <nav aria-label="Progress" className="mb-8"><ol className="flex flex-wrap gap-2">{STEPS.map((l, i) => <li key={l}><button type="button" disabled={i > step} onClick={() => i < step && go(i)} aria-current={i === step ? "step" : undefined} className={`rounded-full px-4 min-h-[44px] text-sm font-semibold border ${i === step ? "bg-navy-800 text-white border-navy-800" : i < step ? "bg-navy-50 text-navy-800 border-navy-200" : "bg-white text-slate-500 border-slate-300"}`}>{i + 1}. {l}</button></li>)}</ol></nav>
        <div className="space-y-6">
          {step === 0 && (<>
            <h2 className="text-2xl font-bold">What help is needed?</h2>
            <p className="text-slate-600">Choose one or more. You can change the time needed.</p>
            {E("services") && <p role="alert" className="text-red-700 font-medium">{E("services")}</p>}
            <div className="space-y-3">{SERVICES.map((s) => { const on = sel[s.id] != null; return (
              <div key={s.id} className={`rounded-xl border-2 p-4 transition-colors ${on ? "border-navy-800 bg-navy-50" : "border-slate-200 bg-white"}`}>
                <label className="flex gap-4 items-start cursor-pointer"><input type="checkbox" className="h-6 w-6 mt-1 accent-[#123C2D]" checked={on} onChange={() => toggle(s.id)} />
                  <span className="flex-1"><span className="text-xl font-bold">{s.icon} {s.name}</span><span className="block text-slate-700">{s.short}</span><span className="block text-sm font-semibold text-saffron-600 mt-1">{s.priceLabel}</span></span></label>
                {on && <div className="mt-3 pl-10 flex flex-wrap items-center gap-3"><span className="font-semibold">How many {s.unitPlural}?</span>
                  <div className="flex items-center gap-2"><button type="button" aria-label="Fewer" className="btn-outline btn-sm !px-4" onClick={() => bump(s.id, -1)}>−</button><span className="w-10 text-center font-serif text-2xl font-bold" aria-live="polite">{sel[s.id]}</span><button type="button" aria-label="More" className="btn-outline btn-sm !px-4" onClick={() => bump(s.id, 1)}>+</button></div>
                  <span className="font-bold text-navy-800">{inr(s.price(sel[s.id]))}</span>{s.extras && <span className="text-sm text-slate-600 w-full">{s.extras}</span>}</div>}
              </div>); })}</div>
          </>)}
          {step === 1 && (<>
            <h2 className="text-2xl font-bold">Who needs help?</h2>
            <div role="radiogroup" aria-label="Who is booking" className="grid sm:grid-cols-2 gap-3">{([["family", "I am booking for a parent or relative"], ["self", "I am booking for myself"]] as const).map(([v, l]) => <label key={v} className={`flex items-center gap-3 rounded-xl border-2 px-4 min-h-[56px] cursor-pointer ${f.who === v ? "border-navy-800 bg-navy-50" : "border-slate-300"}`}><input type="radio" className="h-5 w-5 accent-[#123C2D]" checked={f.who === v} onChange={() => set("who", v)} />{l}</label>)}</div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Name of the person who needs help" required error={E("name")} htmlFor="b-name"><input id="b-name" className="input" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
              <Field label="Age" error={E("age")} htmlFor="b-age"><input id="b-age" className="input" inputMode="numeric" value={f.age} onChange={(e) => set("age", e.target.value.replace(/\D/g, "").slice(0, 3))} /></Field>
              <Field label="City" required htmlFor="b-city"><select id="b-city" className="input" value={f.city} onChange={(e) => set("city", e.target.value)}>{[...LAUNCH_CITIES, "Other (tell us in notes)"].map((c) => <option key={c}>{c}</option>)}</select></Field>
              <Field label="Area / colony" required error={E("area")} htmlFor="b-area" hint="For example: Malviya Nagar, near Gaurav Tower"><input id="b-area" className="input" value={f.area} onChange={(e) => set("area", e.target.value)} /></Field>
            </div>
            <div><p className="label">Anything we should know? <span className="text-slate-500 font-normal text-sm">(optional)</span></p><CheckGroup legend="Special needs" options={NEEDS} value={f.needs} onChange={(v) => set("needs", v)} /></div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Helper preference" htmlFor="b-g"><select id="b-g" className="input" value={f.gender} onChange={(e) => set("gender", e.target.value)}>{["No preference", "Female helper", "Male helper"].map((x) => <option key={x}>{x}</option>)}</select></Field>
              <Field label="Language" htmlFor="b-l"><select id="b-l" className="input" value={f.lang} onChange={(e) => set("lang", e.target.value)}>{HELPER_LANGS.map((x) => <option key={x}>{x}</option>)}</select></Field>
            </div>
          </>)}
          {step === 2 && (<>
            <h2 className="text-2xl font-bold">When and where?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Date" required error={E("date")} htmlFor="b-date"><input id="b-date" type="date" min={today()} className="input" value={f.date} disabled={f.flexible} onChange={(e) => set("date", e.target.value)} /></Field>
              <Field label="Preferred time" htmlFor="b-time"><input id="b-time" type="time" className="input" value={f.time} onChange={(e) => set("time", e.target.value)} /></Field>
            </div>
            <label className="flex gap-3 items-center"><input type="checkbox" className="h-5 w-5 accent-[#123C2D]" checked={f.flexible} onChange={(e) => set("flexible", e.target.checked)} /><span>I am flexible on the date. Suggest the earliest slot.</span></label>
            {askDest && <Field label="Hospital / destination" htmlFor="b-dest" hint="For hospital visits, add the doctor, department and appointment time if you have them."><input id="b-dest" className="input" value={f.destination} onChange={(e) => set("destination", e.target.value)} placeholder="e.g. SMS Hospital, Cardiology, 11 am" /></Field>}
            <Field label="Notes for the helper" htmlFor="b-notes"><textarea id="b-notes" rows={3} className="input" value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything that will help the visit go smoothly" /></Field>
            <div className="rounded-xl border border-slate-300 p-5 space-y-5"><h3 className="text-xl font-bold">Your contact details</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your name" required error={E("bookerName")} htmlFor="b-bn"><input id="b-bn" className="input" value={f.bookerName} onChange={(e) => set("bookerName", e.target.value)} /></Field>
                {f.who === "family" && <Field label="Your relation" htmlFor="b-rel"><select id="b-rel" className="input" value={f.relation} onChange={(e) => set("relation", e.target.value)}>{["Son", "Daughter", "Son-in-law", "Daughter-in-law", "Grandchild", "Other relative", "Friend / neighbour"].map((x) => <option key={x}>{x}</option>)}</select></Field>}
                <Field label="Your mobile number" required error={E("phone")} htmlFor="b-ph"><input id="b-ph" className="input" inputMode="numeric" value={f.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} /></Field>
                {f.who === "family" && <Field label="Elder’s mobile number" error={E("elderPhone")} htmlFor="b-eph" hint="So the helper can reach them"><input id="b-eph" className="input" inputMode="numeric" value={f.elderPhone} onChange={(e) => set("elderPhone", e.target.value.replace(/\D/g, "").slice(0, 10))} /></Field>}
              </div></div>
          </>)}
          {step === 3 && (<>
            <h2 className="text-2xl font-bold">Review your booking</h2>
            <dl className="card p-5 grid sm:grid-cols-2 gap-3">{[["Person", `${f.name}${f.age ? ", " + f.age : ""}`], ["Place", `${f.area}, ${f.city}`], ["When", f.flexible ? "Flexible" : `${f.date}${f.time ? " at " + f.time : ""}`], ["Booked by", `${f.bookerName} · ${f.phone}`], ["Helper preference", `${f.gender}, ${f.lang}`], ["Special needs", f.needs.join(", ") || "None"]].map(([a, b]) => <div key={a}><dt className="text-sm text-slate-600">{a}</dt><dd className="font-semibold">{b}</dd></div>)}</dl>
            {E("consent") && <p role="alert" className="text-red-700 font-medium">{E("consent")}</p>}
            <label className="flex gap-3 items-start"><input type="checkbox" className="h-5 w-5 mt-1 accent-[#123C2D]" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} /><span>I understand helpers are verified part-time helpers, not doctors or nurses. In an emergency I will call 112 / 108. I agree to share these details with Anubhav to arrange the booking.</span></label>
          </>)}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 justify-between border-t border-slate-200 pt-6">
          <button type="button" className="btn-outline" disabled={step === 0} onClick={() => go(step - 1)}>← Back</button>
          {step < 3 ? <button type="button" className="btn-primary" onClick={next}>Next →</button> : <button type="button" className="btn-gold" onClick={() => { const e = validate(3); setErr(e); if (!Object.keys(e).length) { submitLead("saathi_booking", { name: f.name, age: f.age, city: f.city, area: f.area, services: chosen.map((s) => `${s.name} x${sel[s.id]}`), estimate_inr: total, needs: f.needs, helper_pref: f.gender, language: f.lang, date: f.flexible ? "flexible" : f.date, time: f.time, destination: f.destination, notes: f.notes, booked_by: f.bookerName, relation: f.who === "self" ? "self" : f.relation, phone: f.phone, elder_phone: f.elderPhone }); setDone(true); document.getElementById("bk-top")?.scrollIntoView({ behavior: "smooth" }); } }}>Continue to send</button>}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 card p-5 border-t-4 border-t-gold-500 order-first lg:order-none">
        <h3 className="text-lg font-bold">Your booking</h3>
        {chosen.length === 0 ? <p className="text-slate-600 mt-2">Choose a service to see the price.</p> : <ul className="mt-3 space-y-2">{chosen.map((s) => <li key={s.id} className="flex justify-between gap-3"><span>{s.icon} {s.name}<span className="block text-sm text-slate-600">{sel[s.id]} {sel[s.id] === 1 ? s.unit : s.unitPlural}</span></span><strong>{inr(s.price(sel[s.id]))}</strong></li>)}</ul>}
        <div className="mt-4 border-t border-slate-200 pt-3 flex justify-between items-baseline"><span className="font-semibold">Estimated total</span><span className="font-serif text-3xl font-bold text-navy-800 tabular-nums" aria-live="polite">{inr(total)}</span></div>
        <p className="text-sm text-slate-600 mt-2">Includes our platform fee. Cab fare, medical bills and items bought are extra at actuals. No payment is taken on this website.</p>
      </aside>
    </div>
  );
}
