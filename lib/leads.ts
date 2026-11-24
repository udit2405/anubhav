/** Silent lead capture: posts each lead to a Google Apps Script web app that appends it to your Google Sheet
 *  (and emails you). Set NEXT_PUBLIC_LEADS_URL. See apps-script/README.md. Without it, forms fall back to WhatsApp/email only. */
export const LEADS_URL = process.env.NEXT_PUBLIC_LEADS_URL || "";

function utm() {
  try { const p = new URLSearchParams(window.location.search); const o: Record<string, string> = {}; ["utm_source", "utm_medium", "utm_campaign", "ref"].forEach((k) => { const v = p.get(k) ?? sessionStorage.getItem("anubhav:" + k); if (v) { o[k] = v; sessionStorage.setItem("anubhav:" + k, v); } }); return o; } catch { return {}; }
}
export function captureUtm() { utm(); }

export async function submitLead(type: string, data: Record<string, unknown>): Promise<boolean> {
  if (!LEADS_URL) return false;
  const payload = { type, submitted_at: new Date().toISOString(), page: typeof window !== "undefined" ? window.location.pathname : "", ...utm(), ...data };
  try { await fetch(LEADS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) }); return true; } catch { return false; }
}
