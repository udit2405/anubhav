"use client";
import Link from "next/link";
import { SendButtons } from "./Send";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "@/lib/app";
import { CATEGORY_NAMES, CATEGORIES, STATES } from "@/lib/data";
import { parseQuery } from "@/lib/search";
import { RuleMatcher, tokens, type MatchResult } from "@/lib/match";
import type { Professional, Requirement } from "@/lib/types";
import { Autocomplete, Avatar, CheckGroup, Empty, Field, TagInput, VerifiedBadge, feeText } from "./ui";

const BUDGET = ["Fixed project budget", "Per hour", "Per month", "Not decided / Negotiable"];
const DURATIONS = ["One-time consultation", "Less than 1 month", "1–3 months", "3–6 months", "6+ months / ongoing"];
type F = { title: string; description: string; category: string; department: string; specializations: string[]; skills: string[]; state: string; city: string; mode: "remote" | "onsite" | "either"; duration: string; budgetType: string; budgetMin: string; budgetMax: string; urgency: string };
const blank: F = { title: "", description: "", category: "", department: "", specializations: [], skills: [], state: "", city: "", mode: "either", duration: "", budgetType: BUDGET[3], budgetMin: "", budgetMax: "", urgency: "Flexible" };

/** Fill empty structured fields from the free-text description so clients can just describe what they need. */
function autofill(f: F, specNames: string[], deptNames: { name: string; tags: string[]; category: string }[]): F {
  const text = (f.title + " " + f.description).toLowerCase(); const out = { ...f };
  const { city, state } = parseQuery(text);
  if (!out.city && city) out.city = city; if (!out.state && state) out.state = state;
  if (!out.specializations.length) { const tt = new Set(tokens(text)); out.specializations = specNames.filter((s) => { const st = tokens(s); return st.length > 0 && st.every((w) => tt.has(w)); }).slice(0, 4); }
  if (!out.department) { const d = deptNames.find((d) => d.tags.some((t) => t.length > 3 && new RegExp(`\\b${t}\\b`).test(text))); if (d) { out.department = d.name; if (!out.category) out.category = d.category; } }
  if (!out.category) { const c = CATEGORIES.find((c) => c.name.toLowerCase().split(/[ &,]+/).some((w) => w.length > 4 && text.includes(w.slice(0, 6)))); if (c) out.category = c.name; }
  return out;
}

export function RequirementForm({ onPosted }: { onPosted?: (r: Requirement) => void }) {
  const { rows: depts } = useTable("departments"); const { rows: specs } = useTable("specializations");
  const [f, setF] = useState<F>(blank); const [err, setErr] = useState<Record<string, string>>({}); 
  const set = <K extends keyof F>(k: K, v: F[K]) => setF((p) => ({ ...p, [k]: v }));
  const post = async () => {
    const e: Record<string, string> = {};
    if (f.title.trim().length < 5) e.title = "Please give your requirement a short title."; if (f.description.trim().length < 30) e.description = "Please describe what you need in at least a couple of sentences (30 characters).";
    if (f.budgetMin && f.budgetMax && Number(f.budgetMin) > Number(f.budgetMax)) e.budget = "Minimum budget cannot be higher than maximum.";
    setErr(e); if (Object.keys(e).length) return;
    const g = autofill(f, specs.map((s) => s.name), depts);
    const r: Requirement = { id: "req-" + Date.now(), clientId: "", clientName: "", title: g.title.trim(), description: g.description.trim(), category: g.category, department: g.department, specializations: g.specializations, skills: g.skills, state: g.state, city: g.city.trim(), mode: g.mode, duration: g.duration, budgetType: g.budgetType, budgetMin: g.budgetMin ? Number(g.budgetMin) : null, budgetMax: g.budgetMax ? Number(g.budgetMax) : null, urgency: g.urgency, status: "open", createdAt: new Date().toISOString() };
    onPosted?.(r);
  };
  return (
    <form className="space-y-6" noValidate onSubmit={(e) => { e.preventDefault(); post(); }}>
      {err.form && <p role="alert" className="rounded-lg bg-red-50 border border-red-300 text-red-900 p-3 font-medium">{err.form}</p>}
      <Field label="Requirement title" required error={err.title} htmlFor="q-title"><input id="q-title" className="input" value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Civil engineer for road project in Rajasthan" /></Field>
      <Field label="Describe the expertise you need" required error={err.description} htmlFor="q-desc" hint="Write it in plain words. We use it to find matching experts and fill in the details below for you."><textarea id="q-desc" rows={5} className="input" value={f.description} onChange={(e) => set("description", e.target.value)} placeholder="I am looking for a retired government civil engineer with experience in infrastructure projects in Rajasthan…" /></Field>
      <details className="rounded-xl border border-slate-300 p-4" open={!!(f.category || f.department || f.state)}><summary className="font-semibold cursor-pointer text-lg">Refine (optional): category, department, location, budget</summary>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Field label="Professional category" htmlFor="q-cat"><select id="q-cat" className="input" value={f.category} onChange={(e) => set("category", e.target.value)}><option value="">Any</option>{CATEGORY_NAMES.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Preferred department" htmlFor="q-dept"><Autocomplete id="q-dept" value={f.department} onChange={(v) => set("department", v)} options={depts.map((d) => ({ value: d.name, hint: d.category }))} placeholder="e.g. Indian Railways" customLabel="Use" /></Field>
          <Field label="State" htmlFor="q-st"><select id="q-st" className="input" value={f.state} onChange={(e) => set("state", e.target.value)}><option value="">Any</option>{STATES.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="City" htmlFor="q-city"><input id="q-city" className="input" value={f.city} onChange={(e) => set("city", e.target.value)} /></Field>
          <Field label="Work mode" htmlFor="q-mode"><select id="q-mode" className="input" value={f.mode} onChange={(e) => set("mode", e.target.value as F["mode"])}><option value="either">Remote or on-site</option><option value="remote">Remote only</option><option value="onsite">On-site required</option></select></Field>
          <Field label="Project duration" htmlFor="q-dur"><select id="q-dur" className="input" value={f.duration} onChange={(e) => set("duration", e.target.value)}><option value="">Not sure</option>{DURATIONS.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Budget type" htmlFor="q-bt"><select id="q-bt" className="input" value={f.budgetType} onChange={(e) => set("budgetType", e.target.value)}>{BUDGET.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Urgency" htmlFor="q-urg"><select id="q-urg" className="input" value={f.urgency} onChange={(e) => set("urgency", e.target.value)}>{["Flexible", "Within a month", "Urgent (this week)"].map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Budget: minimum (₹)" htmlFor="q-bmin"><input id="q-bmin" className="input" inputMode="numeric" value={f.budgetMin} onChange={(e) => set("budgetMin", e.target.value.replace(/\D/g, ""))} /></Field>
          <Field label="Budget: maximum (₹)" error={err.budget} htmlFor="q-bmax"><input id="q-bmax" className="input" inputMode="numeric" value={f.budgetMax} onChange={(e) => set("budgetMax", e.target.value.replace(/\D/g, ""))} /></Field>
        </div>
        <div className="mt-6"><p className="label">Specializations needed</p><CheckGroup legend="Specializations" options={specs.map((s) => s.name)} value={f.specializations} onChange={(v) => set("specializations", v)} columns="sm:grid-cols-2" /></div>
        <div className="mt-6"><Field label="Other skills needed" htmlFor="q-sk"><TagInput id="q-sk" value={f.skills} onChange={(v) => set("skills", v)} placeholder="Add a skill" /></Field></div>
      </details>
      <button className="btn-gold w-full sm:w-auto">Find matching experts</button>
    </form>
  );
}

export function Recommended({ req, limit = 6 }: { req: Requirement; limit?: number }) {
  const { rows } = useTable("professionals"); const loading = false;
  const [matches, setMatches] = useState<MatchResult[]>([]);
  useEffect(() => { Promise.resolve(RuleMatcher.match(req, rows)).then(setMatches); }, [req, rows]);
  if (loading) return <p className="text-slate-600">Finding matches…</p>;
  if (!matches.length) return <Empty title="No matching experts yet">We are still onboarding experts. Send your requirement to our team below and we will connect you as soon as a match joins.</Empty>;
  
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {matches.slice(0, limit).map((m) => <MatchCard key={m.pro.id} m={m} />)}
    </ul>
  );
}
function MatchCard({ m }: { m: MatchResult }) {
  const p: Professional = m.pro;
  return (
    <li className="card p-4 flex gap-4">
      <Avatar p={p} size={56} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2"><div><Link href={`/experts/${p.id}`} className="font-bold text-lg hover:underline">{p.name}</Link><p className="text-slate-700 text-sm">{p.designation}, {p.department} · {p.city}</p></div>
          <div className="text-center shrink-0" aria-label={`${m.score} percent match`}><div className="font-serif text-2xl font-bold text-navy-800">{m.score}%</div><div className="text-xs text-slate-600">match</div></div></div>
        <div className="h-2 rounded-full bg-slate-100 mt-2 overflow-hidden"><div className="h-full bg-gold-500" style={{ width: `${m.score}%` }} /></div>
        <ul className="mt-2 flex flex-wrap gap-1.5">{m.reasons.map((r) => <li key={r} className="chip">{r}</li>)}</ul>
        <div className="mt-3 flex flex-wrap items-center gap-2">{p.verified && <VerifiedBadge small />}<span className="text-sm font-semibold text-navy-800">{feeText(p)}</span><span className="flex-1" />
          <Link href={`/experts/${p.id}`} className="btn-primary btn-sm">View profile</Link></div>
      </div>
    </li>
  );
}

export function sendRequirementText(r: Requirement, top: MatchResult[]) {
  return `NEW REQUIREMENT (Anubhav)\nTitle: ${r.title}\nDescription: ${r.description}\nCategory: ${r.category || "-"}  Department: ${r.department || "-"}\nSpecializations: ${r.specializations.join("; ") || "-"}\nLocation: ${[r.city, r.state].filter(Boolean).join(", ") || "Any"}  Mode: ${r.mode}\nDuration: ${r.duration || "-"}  Urgency: ${r.urgency}\nBudget: ${r.budgetType} ${r.budgetMin ?? ""}-${r.budgetMax ?? ""}\nTop matches: ${top.slice(0, 5).map((m) => `${m.pro.name} (${m.score}%)`).join(", ")}\n\nMy name / phone / email: `;
}
export { SendButtons };
