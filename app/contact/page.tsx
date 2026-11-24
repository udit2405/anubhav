"use client";
import { useState } from "react";
import { Field, PageHeader } from "@/components/ui";
import { SendButtons } from "@/components/Send";
import { CONTACT, prettyPhone, telLink, waLink } from "@/lib/contact";
import { submitLead } from "@/lib/leads";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" }); const [err, setErr] = useState<Record<string, string>>({}); const [ready, setReady] = useState(false);
  const set = (k: string, v: string) => { setF((p) => ({ ...p, [k]: v })); setReady(false); setErr({}); };
  const check = () => { const e: Record<string, string> = {}; if (f.name.trim().length < 2) e.name = "Please enter your name."; if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address."; if (f.message.trim().length < 10) e.message = "Please write a short message."; setErr(e); const ok = !Object.keys(e).length; setReady(ok); if (ok) submitLead("contact", { name: f.name, email: f.email, message: f.message }); };
  const ways = [
    { icon: "📞", h: "Call us", d: "Speak to a real person. We speak Hindi and English.", cta: prettyPhone(), href: telLink, c: "bg-sky-100" },
    { icon: "💬", h: "WhatsApp", d: "Message us any time. We reply within a few hours.", cta: "Open WhatsApp", href: waLink("Hello Anubhav, I would like some help."), c: "bg-mint-100" },
    { icon: "✉️", h: "Email", d: "Write to us and we will reply within two working days.", cta: CONTACT.email, href: `mailto:${CONTACT.email}`, c: "bg-gold-100" },
  ];
  return (<>
    <PageHeader eyebrow="We are here to help" title="Contact Us" sub="Questions, or need help with your profile? Reach us the way that suits you." icon="☎️" />
    <section className="container-x py-12">
      <div className="grid gap-5 md:grid-cols-3">{ways.map((w) => (
        <div key={w.h} className={`card p-6 flex flex-col ${w.c}`}><span className="text-4xl" aria-hidden>{w.icon}</span><h2 className="mt-3 text-2xl">{w.h}</h2><p className="mt-2 text-lg text-slate-800 flex-1">{w.d}</p><a href={w.href} className="btn-primary mt-5 break-all" {...(w.h === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{w.cta}</a></div>))}</div>
      <p className="mt-4 text-lg text-slate-600">Open Monday to Saturday, 10 am to 6 pm.</p>
    </section>
    <section className="bg-white border-t border-navy-200"><div className="container-x py-12 max-w-3xl">
      <h2 className="text-3xl">Or send us a message</h2>
      <div className="card p-6 sm:p-8 mt-6 space-y-5">
        <Field label="Your name" required error={err.name} htmlFor="c-n"><input id="c-n" className="input" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Email" required error={err.email} htmlFor="c-e"><input id="c-e" type="email" className="input" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Message" required error={err.message} htmlFor="c-m"><textarea id="c-m" rows={5} className="input" value={f.message} onChange={(e) => set("message", e.target.value)} /></Field>
        {!ready ? <button className="btn-gold" onClick={check}>Continue</button> : (<div role="status" className="space-y-3"><p className="font-bold text-lg">Choose how to send your message:</p><SendButtons subject="Message from Anubhav website" body={`From: ${f.name} (${f.email})\n\n${f.message}`} filename="anubhav-message" /></div>)}
      </div>
    </div></section>
  </>);
}
