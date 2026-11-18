"use client";
import Link from "next/link";
import { useState } from "react";
import { useApp, useTable } from "@/lib/app";
import type { Professional } from "@/lib/types";
import { Avatar, Disclaimer, Empty, Field, Modal, SampleBadge, Stars, VerifiedBadge, feeText } from "./ui";
import { SendButtons } from "./Send";

type Kind = "contact" | "consultation" | "requirement";
const KINDS: Record<Kind, { title: string; label: string; ph: string }> = {
  contact: { title: "Contact this expert", label: "ENQUIRY", ph: "Introduce yourself and say what you need help with." },
  consultation: { title: "Request a consultation", label: "CONSULTATION REQUEST", ph: "What would you like to discuss? Suggest a preferred day and time." },
  requirement: { title: "Send your requirement", label: "REQUIREMENT", ph: "Describe your requirement: scope, duration, location and budget." },
};

export function ExpertProfile({ id }: { id: string }) {
  const { toast } = useApp(); const { rows: all } = useTable("professionals"); const { rows: allReviews } = useTable("reviews");
  const [modal, setModal] = useState<Kind | "report" | null>(null);
  const p = all.find((x) => x.id === id);
  if (!p) return <div className="container-x py-16"><Empty title="This profile is not available">It may have been removed. <Link href="/experts" className="underline font-semibold">Browse other experts</Link>.</Empty></div>;
  const reviews = allReviews.filter((r) => r.professionalId === id);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const url = typeof window !== "undefined" ? window.location.href : "";
  const share = async () => { if (navigator.share) { try { await navigator.share({ title: p.name, text: `${p.name}, retired ${p.designation} on Anubhav`, url }); return; } catch { return; } } try { await navigator.clipboard.writeText(url); toast("Profile link copied."); } catch { toast(url); } };
  const wa = `https://wa.me/?text=${encodeURIComponent(`${p.name}, retired ${p.designation} (${p.city}) on Anubhav: ${url}`)}`;
  return (
    <div className="container-x py-8">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <Avatar p={p} size={112} />
              <div>
                <h1 className="text-3xl font-bold">{p.name}</h1>
                <p className="text-xl text-slate-700 mt-1">Retired {p.designation}</p>
                <p className="text-lg text-navy-800 font-semibold">{p.department}</p>
                <div className="mt-3 flex flex-wrap gap-2 items-center">{p.verified ? <VerifiedBadge /> : <span className="rounded-full bg-slate-100 border border-slate-300 px-3 py-1 text-sm">Self-declared · not yet verified</span>}{p.sample && <SampleBadge />}{reviews.length > 0 && <span className="text-sm"><Stars n={avg} /> {avg.toFixed(1)} ({reviews.length})</span>}</div>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 pt-5">
              {[["Experience", `${p.yearsService} years`], ["Retired in", String(p.retirementYear)], ["Location", `${p.city}, ${p.state}`], ["Last posted", p.lastPosted || "—"]].map(([a, b]) => <div key={a}><dt className="text-sm text-slate-600">{a}</dt><dd className="font-semibold">{b}</dd></div>)}
            </dl>
          </section>
          <section className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">About</h2><p className="mt-3 text-lg leading-relaxed text-slate-700 whitespace-pre-line">{p.summary}</p>
            <h3 className="text-lg font-bold mt-6">Specializations</h3><div className="mt-2 flex flex-wrap gap-2">{p.specializations.map((s) => <Link key={s} href={`/experts?specialization=${encodeURIComponent(s)}`} className="chip !text-base !py-1.5 hover:bg-navy-100">{s}</Link>)}</div>
            {p.skills.length > 0 && <><h3 className="text-lg font-bold mt-6">Skills</h3><div className="mt-2 flex flex-wrap gap-2">{p.skills.map((s) => <span key={s} className="chip !text-base !py-1.5 !bg-white">{s}</span>)}</div></>}
            <dl className="mt-6 grid sm:grid-cols-2 gap-4"><div><dt className="text-sm text-slate-600">Education</dt><dd className="font-semibold">{p.education}</dd></div><div><dt className="text-sm text-slate-600">Category</dt><dd className="font-semibold">{p.category}</dd></div><div><dt className="text-sm text-slate-600">Languages</dt><dd className="font-semibold">{p.languages.join(", ") || "—"}</dd></div></dl>
          </section>
          <section className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">Services, pricing and availability</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-4">
              <div><h3 className="font-bold">Services offered</h3><ul className="mt-2 space-y-1 list-disc pl-5">{p.services.map((s) => <li key={s}>{s}</li>)}</ul></div>
              <div><h3 className="font-bold">Pricing</h3><p className="mt-2 text-2xl font-serif font-bold text-navy-800">{feeText(p)}</p><ul className="mt-1 space-y-1 list-disc pl-5">{p.pricingModels.map((s) => <li key={s}>{s}</li>)}</ul>{p.feeNote && <p className="hint">{p.feeNote}</p>}</div>
              <div><h3 className="font-bold">Availability</h3><ul className="mt-2 space-y-1 list-disc pl-5">{p.availability.map((s) => <li key={s}>{s}</li>)}</ul></div>
            </div>
          </section>
          {reviews.length > 0 && <section className="card p-6 sm:p-8"><h2 className="text-2xl font-bold">Reviews</h2><ul className="mt-4 space-y-4">{reviews.map((r) => <li key={r.id} className="border-t border-slate-200 pt-4 first:border-0 first:pt-0"><Stars n={r.rating} /><p className="mt-1">{r.text}</p><p className="text-sm text-slate-600 mt-1">{r.clientName}{r.sample && " · sample review"}</p></li>)}</ul></section>}
          <Disclaimer />
        </div>
        <aside className="lg:sticky lg:top-28 h-fit space-y-4">
          <div className="card p-6 space-y-3">
            <h2 className="text-xl font-bold">Get in touch</h2>
            {!p.acceptEnquiries ? <p className="text-slate-700">This expert is not accepting new enquiries right now.</p> : <>
              <button className="btn-primary w-full" onClick={() => setModal("contact")}>Contact Expert</button>
              <button className="btn-gold w-full" onClick={() => setModal("consultation")}>Request Consultation</button>
              <button className="btn-outline w-full" onClick={() => setModal("requirement")}>Send Requirement</button>
              <p className="hint">🔒 The expert’s phone and email stay private. The Anubhav team passes your message on and connects you.</p></>}
            <hr />
            <div className="flex gap-2 flex-wrap"><button className="btn-outline btn-sm flex-1" onClick={share}>Share profile</button><a className="btn-outline btn-sm flex-1" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
            <button className="text-sm underline text-slate-700" onClick={() => setModal("report")}>Report this profile</button>
          </div>
        </aside>
      </div>
      {modal && modal !== "report" && <EnquiryModal kind={modal} p={p} onClose={() => setModal(null)} />}
      {modal === "report" && <ReportModal p={p} onClose={() => setModal(null)} />}
    </div>
  );
}

function EnquiryModal({ kind, p, onClose }: { kind: Kind; p: Professional; onClose: () => void }) {
  const k = KINDS[kind]; const [f, setF] = useState({ name: "", contact: "", message: "" }); const [err, setErr] = useState<Record<string, string>>({}); const [ready, setReady] = useState(false);
  const set = (key: string, v: string) => { setF((x) => ({ ...x, [key]: v })); setReady(false); };
  const check = () => { const e: Record<string, string> = {}; if (f.name.trim().length < 2) e.name = "Please enter your name."; if (f.contact.trim().length < 6) e.contact = "Enter your phone number or email so we can connect you."; if (f.message.trim().length < 10) e.message = "Please write at least a sentence."; setErr(e); setReady(!Object.keys(e).length); };
  const body = `${k.label} FOR EXPERT (Anubhav)\nExpert: ${p.name} (${p.id})\nFrom: ${f.name}\nContact: ${f.contact}\n\n${f.message.trim()}`;
  return (
    <Modal title={k.title} onClose={onClose}>
      <div className="space-y-5"><p className="text-slate-700">To: <strong>{p.name}</strong></p>
        <Field label="Your name" required error={err.name} htmlFor="e-n"><input id="e-n" className="input" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Your phone or email" required error={err.contact} htmlFor="e-c" hint="Shared only with our team and, once you agree, the expert."><input id="e-c" className="input" value={f.contact} onChange={(e) => set("contact", e.target.value)} /></Field>
        <Field label="Message" required error={err.message} htmlFor="e-m"><textarea id="e-m" rows={5} className="input" value={f.message} onChange={(e) => set("message", e.target.value)} placeholder={k.ph} /></Field>
        {!ready ? <button className="btn-primary w-full" onClick={check}>Continue</button> : <div role="status" className="space-y-3"><p className="font-semibold">Send your message to our team:</p><SendButtons subject={`${k.label}: ${p.name}`} body={body} filename="anubhav-enquiry" /></div>}
      </div>
    </Modal>
  );
}
const REASONS = ["Misleading or false credentials", "Fake or impersonation profile", "Inappropriate content", "Asking for money improperly", "Other"];
function ReportModal({ p, onClose }: { p: Professional; onClose: () => void }) {
  const [reason, setReason] = useState(REASONS[0]); const [details, setDetails] = useState("");
  return (<Modal title="Report this profile" onClose={onClose}><div className="space-y-5"><p className="text-slate-700">Tell us what looks wrong with <strong>{p.name}</strong>’s profile. Our team reviews every report.</p><Field label="Reason" required htmlFor="r-r"><select id="r-r" className="input" value={reason} onChange={(e) => setReason(e.target.value)}>{REASONS.map((r) => <option key={r}>{r}</option>)}</select></Field><Field label="Details" htmlFor="r-d"><textarea id="r-d" rows={4} className="input" value={details} onChange={(e) => setDetails(e.target.value)} /></Field><SendButtons subject={`Profile report: ${p.name}`} body={`PROFILE REPORT\nExpert: ${p.name} (${p.id})\nReason: ${reason}\nDetails: ${details}`} filename="anubhav-report" /></div></Modal>);
}
