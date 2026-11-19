/** Anubhav Saathi: config. EDIT PRICES / CITIES / FEE HERE; the whole section updates. */
export const PLATFORM_FEE_PCT = 20; // % of each booking kept by Anubhav; the rest goes to the helper
export const LAUNCH_CITIES = ["Jaipur"]; // add cities as you expand

export interface Service {
  id: string; icon: string; name: string; short: string; details: string[]; unit: string; unitPlural: string;
  min: number; max: number; def: number; price: (units: number) => number; priceLabel: string; extras?: string; askDestination?: boolean;
}
export const SERVICES: Service[] = [
  { id: "hospital", icon: "🏥", name: "Hospital visit companion", short: "Home → hospital → appointment → home, with someone by your side.",
    details: ["Picks you up from home and travels with you", "Helps with registration, queues, tests and pharmacy", "Waits with you and notes the doctor's advice", "Brings you safely back home and updates the family"],
    unit: "hour", unitPlural: "hours", min: 3, max: 10, def: 4, price: (h) => 899 + Math.max(0, h - 4) * 200, priceLabel: "₹899 for up to 4 hours, then ₹200 per extra hour", extras: "Cab / auto fare and medical bills are extra, paid at actuals.", askDestination: true },
  { id: "phone", icon: "📱", name: "Phone & digital lessons", short: "Patient, one-to-one help with smartphones, WhatsApp, UPI and more.",
    details: ["WhatsApp, video calls, photos and voice messages", "UPI / online payments, safely", "Booking tickets, ordering groceries and medicines", "Staying safe from scams and fake calls"],
    unit: "hour", unitPlural: "hours", min: 1, max: 6, def: 1, price: (h) => 300 * h, priceLabel: "₹300 per hour" },
  { id: "chores", icon: "🧺", name: "Household help & errands", short: "Groceries, medicines, bill payments and light household tasks.",
    details: ["Groceries, vegetables and medicine pick-up", "Paying electricity, phone and other bills", "Light tidying, sorting and organising", "Posting letters and collecting parcels"],
    unit: "hour", unitPlural: "hours", min: 1, max: 8, def: 2, price: (h) => 250 * h, priceLabel: "₹250 per hour", extras: "Cost of items bought is extra. No heavy cleaning or cooking.", askDestination: true },
  { id: "companion", icon: "🚶", name: "Companion & walk", short: "Company for a walk, a chat, a temple visit or a game of cards.",
    details: ["Morning or evening walks with a steady arm", "Temple, park or market visits", "Reading, chess, carrom or just conversation", "Good for elders living alone"],
    unit: "hour", unitPlural: "hours", min: 1, max: 8, def: 2, price: (h) => 200 * h, priceLabel: "₹200 per hour", askDestination: true },
  { id: "paperwork", icon: "🏦", name: "Bank, pension & paperwork help", short: "Go with you to the bank or office and sort out forms and documents.",
    details: ["Pension, life certificate and KYC formalities", "Filling forms and collecting documents", "Standing in queues so you do not have to", "Government office and e-mitra visits"],
    unit: "visit", unitPlural: "visits", min: 1, max: 5, def: 1, price: (v) => 499 * v, priceLabel: "₹499 per visit (up to 3 hours)", askDestination: true },
  { id: "setup", icon: "💡", name: "Smartphone set-up & fixes", short: "Set up a new phone, fix a problem, or install the apps you need.",
    details: ["New phone set-up and data transfer", "Bigger fonts, volume and accessibility settings", "Fixing storage, WhatsApp or sound problems", "Setting up emergency contacts"],
    unit: "visit", unitPlural: "visits", min: 1, max: 3, def: 1, price: (v) => 399 * v, priceLabel: "₹399 per visit (up to 90 minutes)" },
];
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const helperPayout = (price: number) => price * (1 - PLATFORM_FEE_PCT / 100);

export const NEEDS = ["Uses a wheelchair or walker", "Hearing difficulty", "Vision difficulty", "Memory problems / dementia", "Needs help with stairs"];
export const HELPER_LANGS = ["Hindi", "English", "Rajasthani / Marwari", "Punjabi", "Gujarati", "Urdu", "Other"];
export const DAYS = ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends", "Any time"];
export const SAFETY = [
  ["🪪", "ID and address verified", "Aadhaar-based identity check and address proof for every helper before they take a booking."],
  ["🛡️", "Police verification", "Every helper submits a police verification certificate. No certificate, no bookings."],
  ["🗣️", "Interviewed in person", "We meet every helper, check attitude and patience, and train them to treat elders with respect."],
  ["📍", "Family stays informed", "Helper name, photo and phone shared before the visit. Updates when they start, reach, and finish."],
  ["🔑", "Start and end codes", "A code is shared with the family and checked at the start and end of each visit."],
  ["⭐", "Ratings and removal", "Every visit is rated. Complaints are acted on within 24 hours and unsafe helpers are removed."],
];
