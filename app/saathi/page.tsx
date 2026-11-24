import type { Metadata } from "next";
import Link from "next/link";
import { Faq, MobileCta, Reveal } from "@/components/Interactive";
import { HelperEarnings, ServiceExplorer } from "@/components/SaathiParts";
import { LAUNCH_CITIES, PLATFORM_FEE_PCT, SAFETY } from "@/lib/saathi";
import { Disclaimer } from "@/components/ui";

export const metadata: Metadata = {
  title: "Anubhav Saathi: trusted help for elders at home",
  description: "Verified young helpers for hospital visits, phone lessons, errands and companionship for senior citizens. Book in two minutes. Families get updates at every step.",
};
const steps = [["Choose a service", "Hospital visit, phone lessons, errands, companionship and more, at clear fixed prices."], ["Tell us when and where", "Pick a date and time. A family member can book for their parent from anywhere."], ["We match a verified helper", "You get the helper’s name, photo and number before the visit."], ["Relax. We keep you updated", "Updates when the helper starts, reaches and finishes. Rate the visit afterwards."]];
const faq = [
  ["Who are the helpers?", "Verified young people such as students and part-time workers, who are trained to be patient and respectful with elders. Every helper has ID, address and police verification before taking bookings."],
  ["Can my son or daughter book for me from another city?", "Yes. That is exactly what many families do. They book, we send them the helper’s details and updates at every step."],
  ["How much does it cost? Are there hidden charges?", "Prices are fixed and shown before you book. Only actual expenses such as cab fare, medicines and shopping items are extra."],
  ["What about emergencies?", "Helpers are not medical staff or nurses. In an emergency call 112 or 108 immediately. Helpers will also call the family."],
  ["Which cities do you serve?", `We are starting in ${LAUNCH_CITIES.join(", ")}. Tell us your city in the booking form and we will let you know when we reach you.`],
  ["How do I pay?", "In this early phase we confirm the booking on WhatsApp and arrange payment with you directly. Online payment is coming soon."],
];

export default function Saathi() {
  return (
    <>
      <section className="hero-pattern text-white"><div className="container-x py-14 sm:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-4 py-1.5 text-gold-300 font-semibold tracking-wide uppercase text-sm"><span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden />Anubhav Saathi · Now in {LAUNCH_CITIES.join(", ")}</p>
          <h1 className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-bold !text-white leading-[1.08]">Someone you can trust, whenever you need a hand.</h1>
          <div className="mt-5 h-1 w-20 bg-gold-500 rounded" aria-hidden />
          <p className="mt-5 text-lg sm:text-xl text-navy-100 leading-relaxed max-w-xl">Verified young helpers to take you to the hospital and back, run errands, teach you your phone, or simply keep you company. Book in two minutes, even for your parents in another city.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/saathi/book/" className="btn-gold !text-lg !min-h-[52px] !px-7">Book a helper</Link><Link href="/saathi/helper/" className="btn border-2 border-white/70 text-white hover:bg-white hover:text-navy-900">I want to be a helper</Link></div>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg text-navy-100">{["Police-verified helpers", "Fixed prices, no haggling", "Family gets updates", "Booking in 2 minutes"].map((x) => <li key={x} className="flex items-center gap-2"><span className="h-6 w-6 shrink-0 rounded-full bg-gold-500 text-navy-900 text-sm flex items-center justify-center" aria-hidden>✓</span>{x}</li>)}</ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[["🏥", "Hospital visits", "Home to hospital and back"], ["📱", "Phone lessons", "WhatsApp, UPI, video calls"], ["🧺", "Errands & chores", "Groceries, medicines, bills"], ["🚶", "Companionship", "Walks, chats and company"]].map(([i, h, d]) => (
            <div key={h} className="rounded-xl bg-white text-navy-900 p-5 shadow-hard"><span className="text-4xl" aria-hidden>{i}</span><p className="mt-2 font-bold text-lg leading-tight">{h}</p><p className="text-sm text-slate-600">{d}</p></div>))}
        </div>
      </div></section>

      <section className="section container-x" aria-labelledby="svc">
        <Reveal><p className="text-saffron-600 font-semibold uppercase tracking-wide text-sm">Our services</p><h2 id="svc" className="mt-2 text-3xl sm:text-4xl font-bold">What do you need help with?</h2><p className="mt-3 text-lg text-slate-600 max-w-2xl">Tap a service to see exactly what is included and what it costs.</p></Reveal>
        <div className="mt-10"><ServiceExplorer /></div>
      </section>

      <section className="section bg-navy-50" aria-labelledby="how"><div className="container-x">
        <Reveal><h2 id="how" className="text-3xl sm:text-4xl font-bold text-center">How it works</h2></Reveal>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{steps.map(([h, d], i) => <Reveal key={h} delay={i * 80}><li className="card p-6 h-full list-none"><span className="h-11 w-11 rounded-full bg-gold-500 text-navy-900 font-bold flex items-center justify-center text-lg">{i + 1}</span><h3 className="mt-4 text-xl font-bold">{h}</h3><p className="mt-2 text-slate-700">{d}</p></li></Reveal>)}</ol>
      </div></section>

      <section className="section container-x" aria-labelledby="safe">
        <Reveal><p className="text-saffron-600 font-semibold uppercase tracking-wide text-sm">Safety first</p><h2 id="safe" className="mt-2 text-3xl sm:text-4xl font-bold max-w-3xl">Your trust is everything. Here is how we protect it.</h2></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{SAFETY.map(([i, h, d], k) => <Reveal key={h} delay={k * 60}><div className="card p-6 h-full hover:shadow-hard-lg hover:border-navy-900 transition-all"><span className="text-3xl" aria-hidden>{i}</span><h3 className="mt-3 text-xl font-bold">{h}</h3><p className="mt-2 text-slate-700">{d}</p></div></Reveal>)}</div>
      </section>

      <section className="section bg-navy-900 text-white" id="earn"><div className="container-x">
        <Reveal><p className="text-gold-300 font-semibold uppercase tracking-wide text-sm">For young people</p><h2 className="mt-2 text-3xl sm:text-4xl font-bold !text-white">Earn well. Do something that matters.</h2>
          <p className="mt-3 text-lg text-navy-200 max-w-2xl">Choose your own hours, earn for your time and make a real difference to an elder’s day. Anubhav keeps a {PLATFORM_FEE_PCT}% platform fee; the rest is yours.</p></Reveal>
        <div className="mt-10"><HelperEarnings /></div>
        <div className="mt-8"><Link href="/saathi/helper/" className="btn-gold !text-lg">Apply to be a helper</Link></div>
      </div></section>

      <section className="section container-x max-w-4xl" aria-labelledby="faq"><h2 id="faq" className="text-3xl sm:text-4xl font-bold">Questions you may have</h2><div className="mt-8"><Faq items={faq} /></div></section>

      <section className="hero-pattern text-white"><div className="container-x py-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold !text-white">Because no one should have to manage alone.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/saathi/book/" className="btn-gold !text-lg !min-h-[52px] !px-7">Book a helper</Link><Link href="/saathi/helper/" className="btn border-2 border-white/70 text-white hover:bg-white hover:text-navy-900">Become a helper</Link></div>
      </div></section>
      <div className="container-x py-8"><p className="text-sm text-slate-600">Anubhav Saathi helpers are independent, verified part-time helpers, not doctors, nurses or medical staff. For emergencies call 112 or 108.</p><Disclaimer className="hidden" /></div>
      <MobileCta href="/saathi/book/" label="Book a helper" />
    </>
  );
}
