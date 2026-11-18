"use client";
import { useApp } from "@/lib/app";
import { mailLink, waLink } from "@/lib/contact";

/** Sends a prepared message to the Anubhav team via WhatsApp / email, or copies/downloads it. */
export function SendButtons({ subject, body, filename = "anubhav-message" }: { subject: string; body: string; filename?: string }) {
  const { toast } = useApp();
  const copy = async () => { try { await navigator.clipboard.writeText(body); toast("Copied. You can paste it anywhere."); } catch { toast("Could not copy. Please use WhatsApp or email.", "err"); } };
  const download = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([body], { type: "text/plain" })); a.download = filename + ".txt"; a.click(); URL.revokeObjectURL(a.href); };
  return (
    <div className="flex flex-wrap gap-3">
      <a className="btn-gold" href={waLink(body)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
      <a className="btn-primary" href={mailLink(subject, body)}>Send by email</a>
      <button type="button" className="btn-outline" onClick={copy}>Copy text</button>
      <button type="button" className="btn-outline" onClick={download}>Download</button>
    </div>
  );
}
