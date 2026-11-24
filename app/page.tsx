import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { MarketExplorer } from "@/components/Markets";
import { Faq, MobileCta } from "@/components/Interactive";
import { prettyPhone, telLink } from "@/lib/contact";

const help = [
  { icon: "🗺️", color: "bg-sky-100", h: "A free Retirement Plan", d: "Answer a few simple questions and see how your savings could be balanced between safe income, property and other options. A specialist then calls you to explain, free of charge.", cta: "Get my free plan", href: "/plan" },
  { icon: "🎓", color: "bg-mint-100", h: "Earn from your experience", d: "Businesses, young professionals and families want advice from people who have done the work for decades. List yourself for free and choose your own fees and hours.", cta: "List my experience", href: "/register" },
  { icon: "🤝", color: "bg-gold-100", h: "Help at home", d: "Trusted, verified young helpers to take you to the hospital and back, run errands, or teach you to use your phone. Your family can book for you from anywhere.", cta: "See Anubhav Saathi", href: "/saathi" },
];
const steps = [
  ["Tell us a little about you", "Answer a few easy questions, or just request a call back. It takes about two minutes."],
  ["See your plan", "You instantly see a simple picture of how your savings could be balanced."],
  ["Talk to a specialist", "A friendly specialist phones you at the time you choose and explains everything in your language. Free."],
  ["Decide in your own time", "There is no pressure and no obligation. Talk to your family. Ask as many questions as you like."],
];
const safety = [
  ["We never ask for your OTP, PIN or password", "If anyone asks, even if they say they are from Anubhav, please hang up."],
  ["We never ask you to send us money", "Your money goes only to the bank, fund or developer you choose, never to us."],
  ["Check every registration", "Ask for RERA and SEBI numbers. We will help you verify them."],
  ["No pressure to decide", "A genuine opportunity will still be there after you speak to your family."],
];
const faq = [
  ["Is it really free? What is the catch?", "It is free. We introduce you to registered partners such as property developers, advisers and insurers, and they pay us when you choose to work with them. You never pay Anubhav for your plan or the call."],
  ["Will I get unwanted calls?", "No. We call only the number you give us, at the time you choose, about what you asked for. Tell us to stop at any time and we will stop."],
  ["Is my information safe?", "Your details go only to our team and, with your consent, to the specialist assigned to you. Your phone number is never shown on this website and never sold to anyone."],
  ["Are you giving me investment advice?", "The plan is a simple starting point to help you understand your options. Any advice comes from SEBI-registered advisers and RERA-registered partners, who will explain the risks clearly. Returns are never guaranteed."],
  ["I do not use computers much. Can I still use this?", "Yes. Just call us on the number above, or send your number and we will call you. We will fill in everything for you."],
  ["How do I know a call is really from Anubhav?", "We will never ask for your OTP, bank password, UPI PIN or card details, and never ask you to transfer money to us. If anyone does, hang up and call us on the number on this website."],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white border-b border-navy-200 lg:min-h-[calc(100svh-97px)] flex items-center">
        <div className="container-x w-full py-6 lg:py-4 grid lg:grid-cols-[1.15fr_1fr] gap-7 lg:gap-12 items-center">
          <div>
            <p className="eyebrow">A platform built for India’s retired</p>
            <h1 className="mt-2 text-4xl sm:text-[2.6rem] leading-[1.15]">Everything your retirement needs, in one trusted place.</h1>
            <p className="mt-4 text-xl text-slate-700 leading-relaxed">Guidance for your savings, work that uses your experience, and trusted help at home. Free, simple, and in your own language.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/plan" className="btn-gold !text-lg !min-h-[52px] !px-7">Get my free retirement plan</Link>
              <a href={telLink} className="btn-outline !text-lg !min-h-[52px] !px-7">📞 Call {prettyPhone()}</a>
            </div>
            <ul className="mt-6 space-y-2.5 text-lg">
              {["Completely free, with no obligation", "A friendly person calls you, at your time", "Your phone number is never shown or sold"].map((x) => <li key={x} className="flex gap-3 items-start"><span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-mint-500 text-white text-sm flex items-center justify-center" aria-hidden>✓</span>{x}</li>)}
            </ul>
          </div>
          <CallbackForm compact />
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="section container-x" aria-labelledby="help">
        <h2 id="help" className="text-3xl sm:text-4xl max-w-3xl">How Anubhav can help you</h2>
        <p className="mt-3 text-xl text-slate-700 max-w-3xl">Choose what matters to you. You can use one, or all three.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {help.map((x) => (
            <div key={x.h} className={`card p-7 flex flex-col ${x.color}`}>
              <span className="text-5xl" aria-hidden>{x.icon}</span>
              <h3 className="mt-4 text-2xl">{x.h}</h3>
              <p className="mt-3 text-lg text-slate-800 flex-1">{x.d}</p>
              <Link href={x.href} className="btn-primary mt-6">{x.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* MARKETS */}
      <section className="section bg-white border-y border-navy-200" aria-labelledby="mk"><div className="container-x">
        <h2 id="mk" className="text-3xl sm:text-4xl max-w-3xl">Where can retirement savings work?</h2>
        <p className="mt-3 text-xl text-slate-700 max-w-3xl">A simple guide to each option: why people choose it, and what to be careful about. Tap an option to read.</p>
        <div className="mt-10"><MarketExplorer /></div>
      </div></section>

      {/* STEPS */}
      <section className="section container-x" aria-labelledby="how">
        <h2 id="how" className="text-3xl sm:text-4xl">How it works</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map(([h, d], i) => (
            <li key={h} className="card p-6 flex gap-5 items-start"><span className="h-14 w-14 shrink-0 rounded-full bg-navy-800 text-white font-serif text-2xl font-bold flex items-center justify-center" aria-hidden>{i + 1}</span>
              <div><h3 className="text-2xl">{h}</h3><p className="mt-2 text-lg text-slate-700">{d}</p></div></li>
          ))}
        </ol>
        <div className="mt-10"><Link href="/plan" className="btn-gold !text-lg !min-h-[52px] !px-7">Start my free plan</Link></div>
      </section>

      {/* SAFETY */}
      <section className="section bg-sky-100 border-y border-navy-200" aria-labelledby="safe"><div className="container-x">
        <h2 id="safe" className="text-3xl sm:text-4xl max-w-3xl">Your safety comes first</h2>
        <p className="mt-3 text-xl text-navy-800 max-w-3xl">Sadly, fraudsters target retired people. We work slowly, clearly and openly, and we promise you this:</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {safety.map(([h, d]) => <li key={h} className="card p-6 flex gap-4"><span className="h-9 w-9 shrink-0 rounded-full bg-mint-500 text-white flex items-center justify-center text-xl" aria-hidden>✓</span><div><h3 className="text-xl">{h}</h3><p className="mt-1 text-lg text-slate-700">{d}</p></div></li>)}
        </ul>
      </div></section>

      {/* FAQ */}
      <section className="section container-x max-w-4xl" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl sm:text-4xl">Questions you may have</h2>
        <div className="mt-8"><Faq items={faq} /></div>
      </section>

      {/* FINAL CTA */}
      <section className="hero-pattern text-white"><div className="container-x py-14 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-5xl !text-white max-w-3xl mx-auto">Talk to us today. It is free, and there is no obligation.</h2>
        <p className="mt-4 text-xl text-navy-100 max-w-2xl mx-auto">Call us, or get your free retirement plan in two minutes.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><a href={telLink} className="btn bg-white text-navy-900 hover:bg-navy-50 !text-lg !min-h-[52px] !px-7">📞 {prettyPhone()}</a><Link href="/plan" className="btn-gold !text-lg !min-h-[52px] !px-7">Get my free plan</Link></div>
      </div></section>
      <div className="h-24 lg:hidden" aria-hidden />
      <MobileCta href="/plan" label="Free plan" />
    </>
  );
}
