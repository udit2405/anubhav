import Link from "next/link";
import { HeroText } from "@/components/HeroText";
import { MiniMap } from "@/components/MiniMap";
import { MarketExplorer } from "@/components/Markets";
import { ProfilePreview } from "@/components/ProfilePreview";
import { EarningsEstimator, Faq, MobileCta, Reveal, StepGuide } from "@/components/Interactive";

const ticker = ["Real estate", "Senior citizen schemes", "Mutual funds", "Gold", "Health cover", "Rental income", "Will & estate planning", "Part-time consulting", "Mentoring", "Safe monthly income"];

const steps = [
  { h: "Answer a few questions", d: "Your age, savings range and what matters to you. About 2 minutes, no documents.", t: "2 minutes", icon: "📝" },
  { h: "See your Money Map", d: "An instant picture of how savings can be balanced between safe income, property and other options.", t: "Instant", icon: "🗺️" },
  { h: "Free call with a specialist", d: "A retirement specialist walks you through it and shares options that fit, including RERA-registered property.", t: "20 minutes, free", icon: "📞" },
  { h: "Decide at your own pace", d: "No pressure and no obligation. Take your time, involve your family, and ask as many questions as you like.", t: "Always your choice", icon: "🤝" },
];
const faq = [
  ["Is the Money Map really free? What is the catch?", "It is free. We introduce you to registered partners (property developers, advisers, insurers). They pay us when you choose to work with them. You never pay Anubhav to get your map or the call."],
  ["Will I get spam calls?", "No. We call only the number you give us, at the time you choose, and only about what you asked for. You can tell us to stop at any time and we will."],
  ["Is my information safe?", "Your details go only to our team and, with your consent, to the specialist assigned to you. Your phone number is never shown on this website or sold to anyone."],
  ["Are you giving me investment advice?", "The Money Map is an educational starting point. Any advice comes from SEBI-registered advisers and RERA-registered partners, who will explain risks clearly. Returns are never guaranteed."],
  ["I have a lot of experience but not many savings. Is this for me?", "Yes. Register your expertise and get hired for consulting, mentoring and project work. Many retirees do both."],
  ["How do I know a call is really from Anubhav?", "We will never ask for your OTP, bank password, UPI PIN or card details, and never ask you to transfer money to us. If anyone does, hang up."],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-navy-900">
        <div className="container-x py-12 sm:py-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center relative">
          <HeroText />
          <div className="relative">
            <div className="hidden sm:block absolute -top-8 -right-4 h-20 w-20 rounded-full bg-coral-500 border-2 border-navy-900 float-a" aria-hidden />
            <div className="hidden sm:block absolute -bottom-6 -left-6 h-16 w-16 bg-mint-500 border-2 border-navy-900 rotate-12 float-b" style={{ ["--r" as string]: "12deg" }} aria-hidden />
            <div className="relative rotate-1 hover:rotate-0 transition-transform"><MiniMap /></div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-gold-500 border-b-2 border-navy-900 overflow-hidden py-3.5" aria-hidden>
        <div className="marquee font-serif text-xl font-bold uppercase tracking-wide text-navy-900">
          {[...ticker, ...ticker].map((t, i) => <span key={i} className="flex items-center whitespace-nowrap">{t}<span className="mx-6 text-2xl">✦</span></span>)}
        </div>
      </div>

      {/* TWO WAYS (bento) */}
      <section className="section container-x" aria-labelledby="two">
        <Reveal><p className="eyebrow">What you get</p><h2 id="two" className="mt-4 text-3xl sm:text-5xl max-w-3xl">Two ways to make your retirement count.</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-6">
          <Reveal className="md:col-span-3"><div className="card bg-coral-300 p-7 sm:p-9 h-full flex flex-col">
            <span className="text-5xl" aria-hidden>💰</span><h3 className="mt-3 text-3xl">Make your money work</h3>
            <p className="mt-2 text-lg text-navy-800">Free Retirement Money Map and a call with a specialist. Compare real estate, safe income, mutual funds, gold and cover.</p>
            <ul className="mt-4 space-y-1.5 font-medium">{["Rental property & senior living", "SCSS, FDs and bonds", "Monthly income plans"].map((x) => <li key={x} className="flex gap-2"><span aria-hidden>→</span>{x}</li>)}</ul>
            <Link href="/plan" className="btn-primary mt-auto self-start !mt-7">Get my Money Map</Link></div></Reveal>
          <Reveal className="md:col-span-3" delay={80}><div className="card bg-mint-300 p-7 sm:p-9 h-full flex flex-col">
            <span className="text-5xl" aria-hidden>🎓</span><h3 className="mt-3 text-3xl">Make your experience work</h3>
            <p className="mt-2 text-lg text-navy-800">List your expertise for free. Businesses, start-ups and families hire retired professionals for consulting and mentoring.</p>
            <ul className="mt-4 space-y-1.5 font-medium">{["You set fees and hours", "Phone and email stay private", "Free forever for professionals"].map((x) => <li key={x} className="flex gap-2"><span aria-hidden>→</span>{x}</li>)}</ul>
            <Link href="/register" className="btn-primary mt-auto self-start !mt-7">List my expertise</Link></div></Reveal>
          {[["🛡️", "We screen the partners", "Property partners are checked for RERA registration and advisers for SEBI registration.", "bg-white md:col-span-2"], ["🤲", "No pressure, ever", "Call at your time, in your language. Decide at your pace, with your family.", "bg-gold-100 md:col-span-2"], ["👨‍👩‍👧", "Help for the family too", "Anubhav Saathi sends verified young helpers for hospital visits, errands and phone lessons.", "bg-sky-100 md:col-span-2"]].map(([i, h, d, c], k) => (
            <Reveal key={h} className={c.split(" ").pop()} delay={k * 70}><div className={`card p-6 h-full ${c.split(" ")[0]}`}><span className="text-4xl" aria-hidden>{i}</span><h3 className="mt-2 text-xl">{h}</h3><p className="mt-1 text-slate-700">{d}</p></div></Reveal>))}
        </div>
      </section>

      {/* MARKETS */}
      <section className="section bg-white border-y-2 border-navy-900" aria-labelledby="mk"><div className="container-x">
        <Reveal><p className="eyebrow">Know your options</p><h2 id="mk" className="mt-4 text-3xl sm:text-5xl max-w-3xl">Where can retirement savings work?</h2>
          <p className="mt-3 text-lg text-slate-700 max-w-2xl">A plain-language guide to each option: why people choose it, and what to watch out for.</p></Reveal>
        <div className="mt-10"><MarketExplorer /></div>
      </div></section>

      {/* STEPS */}
      <section className="section container-x" aria-labelledby="how">
        <Reveal><p className="eyebrow">How it works</p><h2 id="how" className="mt-4 text-3xl sm:text-5xl">Four easy steps. You stay in control.</h2></Reveal>
        <div className="mt-12 max-w-4xl mx-auto"><StepGuide steps={steps} cta={{ href: "/plan", label: "Start my Money Map" }} /></div>
      </section>

      {/* TRUST */}
      <section className="bg-navy-900 text-white border-y-2 border-navy-900"><div className="container-x py-14 sm:py-20 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        <Reveal><p className="inline-flex rounded-full border-2 border-gold-500 text-gold-300 px-4 py-1.5 text-sm font-bold uppercase tracking-wide">Your safety</p>
          <h2 className="mt-4 text-3xl sm:text-5xl !text-white">Protect your savings from scams too.</h2>
          <p className="mt-4 text-lg text-navy-200">Fraudsters target retirees. We are built to be the opposite: slow, clear and transparent.</p></Reveal>
        <ul className="grid sm:grid-cols-2 gap-4">{[["🚫", "We never ask for OTP, PIN or passwords", "Anyone who does is a fraud. Hang up."], ["💸", "We never ask you to send us money", "Your money goes only to the bank, fund or developer you choose, never to us."], ["✅", "RERA and SEBI checks", "Ask for registration numbers. We help you verify them."], ["⏳", "No pressure to decide", "Genuine opportunities will still be there after you talk to your family."]].map(([i, h, d]) => <li key={h as string} className="rounded-2xl border-2 border-gold-500 p-5"><span className="text-3xl" aria-hidden>{i}</span><h3 className="mt-2 text-lg !text-white">{h}</h3><p className="mt-1 text-navy-200">{d}</p></li>)}</ul>
      </div></section>

      {/* EXPERTISE */}
      <section className="section container-x" aria-labelledby="exp">
        <Reveal><p className="eyebrow">Also: earn from your experience</p><h2 id="exp" className="mt-4 text-3xl sm:text-5xl max-w-3xl">Decades of experience. New opportunities.</h2>
          <p className="mt-3 text-lg text-slate-700 max-w-2xl">List yourself for free. Try the card below: it builds your public profile as you type.</p></Reveal>
        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start"><ProfilePreview />
          <div className="card bg-navy-900 text-white p-6 sm:p-8"><p className="text-gold-300 font-bold uppercase tracking-wide text-sm">Earnings calculator</p><h3 className="mt-2 text-2xl !text-white">What could your experience be worth?</h3><div className="mt-6"><EarningsEstimator /></div></div></div>
      </section>

      {/* SAATHI */}
      <section className="section bg-sky-100 border-y-2 border-navy-900" aria-labelledby="saathi"><div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <Reveal><p className="eyebrow">Anubhav Saathi</p><h2 id="saathi" className="mt-4 text-3xl sm:text-5xl">Need a hand at home? Or want to help?</h2>
          <p className="mt-3 text-lg text-navy-800">Verified young helpers who take elders to the hospital and back, run errands, teach phone and WhatsApp, or simply keep company. Families can book for their parents from anywhere.</p>
          <div className="mt-6 flex flex-wrap gap-4"><Link href="/saathi" className="btn-primary">Explore Saathi</Link><Link href="/saathi/helper" className="btn-outline">Earn as a helper</Link></div></Reveal>
        <Reveal delay={100}><div className="grid grid-cols-2 gap-4">{[["🏥", "Hospital visits", "bg-coral-300"], ["📱", "Phone lessons", "bg-gold-300"], ["🧺", "Errands & chores", "bg-mint-300"], ["🚶", "Companionship", "bg-white"]].map(([i, h, c]) => <div key={h} className={`card p-5 ${c} hover:-translate-y-1 hover:shadow-hard-lg transition-all`}><span className="text-4xl" aria-hidden>{i}</span><p className="mt-2 font-bold text-lg">{h}</p></div>)}</div></Reveal>
      </div></section>

      {/* FAQ */}
      <section className="section container-x max-w-4xl" aria-labelledby="faq">
        <Reveal><h2 id="faq" className="text-3xl sm:text-5xl">Questions you may have</h2></Reveal>
        <div className="mt-8"><Faq items={faq} /></div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gold-500 border-t-2 border-navy-900"><div className="container-x py-16 sm:py-24 text-center">
        <Reveal><h2 className="text-4xl sm:text-6xl max-w-4xl mx-auto leading-[1.05]">Take 2 minutes. Know your options.</h2>
          <p className="mt-4 text-xl text-navy-800 max-w-2xl mx-auto">Free Retirement Money Map. No obligation, and your number stays private.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/plan" className="btn-primary !text-lg !min-h-[64px] !px-10">Get my free Money Map →</Link><Link href="/register" className="btn-outline !text-lg !min-h-[64px] !px-10">List my expertise</Link></div></Reveal>
      </div></section>
      <MobileCta href="/plan" label="Get my free Money Map" />
    </>
  );
}
