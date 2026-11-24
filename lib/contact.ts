/** Where enquiries go. Set in GitHub repo variables (WHATSAPP, PHONE, CONTACT_EMAIL). Digits only, with country code 91. */
export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "919999999999",
  phone: process.env.NEXT_PUBLIC_PHONE || process.env.NEXT_PUBLIC_WHATSAPP || "919999999999",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@anubhav.in",
};
export const waLink = (text: string) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailLink = (subject: string, body: string) => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const telLink = `tel:+${CONTACT.phone}`;
export const prettyPhone = () => { const d = CONTACT.phone.replace(/^91/, ""); return `+91 ${d.slice(0, 5)} ${d.slice(5)}`; };
