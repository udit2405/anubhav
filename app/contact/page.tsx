"use client";
import { useState } from "react";
import { Field, PageHeader } from "@/components/ui";
import { SendButtons } from "@/components/Send";
import { CONTACT } from "@/lib/contact";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" }); const [err, setErr] = useState<Record<string, string>>({}); const [ready, setReady] = useState(false);
  const set = (k: string, v: string) => { setF((p) => ({ ...p, [k]: v })); setReady(false); };
  const check = () => { const e: Record<string, string> = {}; if (f.name.trim().length < 2) e.name = "Please enter your name."; if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address."; if (f.message.trim().length < 10) e.message = "Please write a short message."; setErr(e); setReady(!Object.keys(e).length); };
  return (<>
    <PageHeader title="Contact Us" sub="Questions, feedback or need help with your profile? Write to us." />
    <div className="container-x py-10 grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 card p-6 space-y-5">
        <Field label="Your name" required error={err.name} htmlFor="c-n"><input id="c-n" className="input" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Email" required error={err.email} htmlFor="c-e"><input id="c-e" type="email" className="input" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Message" required error={err.message} htmlFor="c-m"><textarea id="c-m" rows={6} className="input" value={f.message} onChange={(e) => set("message", e.target.value)} /></Field>
        {!ready ? <button className="btn-primary" onClick={check}>Continue</button> : (<div role="status" className="space-y-3"><p className="font-semibold">Choose how to send your message:</p><SendButtons subject="Message from Anubhav website" body={`From: ${f.name} (${f.email})\n\n${f.message}`} filename="anubhav-message" /></div>)}
      </div>
      <aside className="card p-6 h-fit"><h2 className="text-xl font-bold">Reach us directly</h2><p className="mt-3">Email: <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p><p className="mt-2">WhatsApp: <a className="underline" href={`https://wa.me/${CONTACT.whatsapp}`}>+{CONTACT.whatsapp}</a></p><p className="mt-2 text-slate-600">Mon–Sat, 10 am to 6 pm IST. We speak Hindi and English.</p></aside>
    </div>
  </>);
}
