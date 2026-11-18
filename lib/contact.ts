/** Where enquiries and registrations are sent. Set in .env.local (see README). Digits only, with country code. */
export const CONTACT = { whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "919999999999", email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@anubhav.in" };
export const waLink = (text: string) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailLink = (subject: string, body: string) => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
