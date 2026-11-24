import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { Faq, FieldExplorer, MobileCta } from "@/components/Interactive";
import { prettyPhone, telLink } from "@/lib/contact";

const ways = [
  { icon: "🎓", color: "bg-mint-100", h: "Share your expertise", d: "List yourself for free. Advise businesses, mentor young people or guide a neighbour. Choose your own fees and hours.", cta: "List my expertise", href: "/register" },
  { icon: "🤝", color: "bg-gold-100", h: "Help at home", d: "Verified young helpers for hospital visits, errands and phone lessons. Families can book for their parents from anywhere.", cta: "See Anubhav Saathi", href: "/saathi" },
];
const pricing = [
  { icon: "🎁", h: "Free", d: "Share your knowledge for the joy of it: mentor students, guide a neighbour, support a cause. Many retirees do this.", tag: "bg-mint-100" },
  { icon: "💼", h: "Paid", d: "Charge for your time: consulting, projects, training or a monthly retainer. You set the fee, per hour, per consultation or per project.", tag: "bg-gold-100" },
  { icon: "🤲", h: "Both", d: "Offer some things free and others paid. You decide for each service, and you can change it any time.", tag: "bg-sky-100" },
];
const steps = [
  ["Fill a simple form", "Tell us about your career and what you can help with. About 10 minutes."],
  ["Send it, or ask for a call", "Send it on WhatsApp or email in one tap, or request a call and we will fill it with you."],
  ["We publish your profile", "Our team checks it and publishes it, usually within 2 working days. Send your retirement proof for a Verified badge."],
  ["Be found, and you decide", "When people look for your skills, they find your profile and ask for you through Anubhav. You choose whether to reply, and whether it is free or paid."],
];
const safety = [
  ["Your phone number stays private", "It is never shown on the website. People write to Anubhav first, and we connect you only if you agree."],
  ["Free to join, always", "We never charge a retired professional to register or to be listed."],
  ["Verified badge", "Send your retirement proof and we check it. Verified profiles are trusted more."],
  ["We never ask for OTP, PIN or money", "If anyone says they are from Anubhav and asks, please hang up and call us."],
];
const faq = [
  ["Do I have to charge money?", "No. You choose. You can offer free guidance, paid services, or both, and change it whenever you like."],
  ["Is it free to list myself?", "Yes. Registration and your profile are free, always. We may offer optional extras in the future, but you will never need to pay to be listed."],
  ["Who can see my phone number?", "Nobody on the website. Clients write to the Anubhav team and we connect you only when you agree."],
  ["I was not in government service. Can I join?", "Yes. Anyone with real professional experience can register: engineers, bankers, doctors, teachers, officers, scientists, accountants and more."],
  ["I do not use computers much. Can I still list myself?", "Yes. Request a call back, or call us, and we will fill in the form with you over the phone."],
  ["Will people really contact me?", "We are building Anubhav now, and our first experts are the founding members. Your profile is published for free, and people who need your skills can ask for you through Anubhav. You always choose whether to reply."],
];

export default function Home() {
  return (
    <>
      {/* HERO: share your expertise */}
      <section className="bg-white border-b border-navy-200 lg:min-h-[calc(100svh-97px)] flex items-center">
        <div className="container-x w-full py-6 lg:py-4 grid lg:grid-cols-[1.15fr_1fr] gap-7 lg:gap-12 items-center">
          <div>
            <p className="eyebrow">A platform built for India’s retired</p>
            <h1 className="mt-2 text-4xl sm:text-[2.6rem] leading-[1.15]">Decades of experience. New opportunities.</h1>
            <p className="mt-4 text-xl text-slate-700 leading-relaxed">List yourself for free. Advise businesses, mentor young people or help your community, free or paid, on your own terms.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="btn-gold !text-lg !min-h-[52px] !px-7">List my expertise</Link>
              <a href="#how" className="btn-outline !text-lg !min-h-[52px] !px-7">How it works</a>
            </div>
            <ul className="mt-6 space-y-2.5 text-lg">
              {["Free to list, always", "Charge for your time, or help for free", "Your phone number stays private"].map((x) => <li key={x} className="flex gap-3 items-start"><span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-mint-500 text-white text-sm flex items-center justify-center" aria-hidden>✓</span>{x}</li>)}
            </ul>
          </div>
          <CallbackForm compact title="Need help getting started?" sub="Tell us your number and we will call you and help you list yourself, step by step. Free." />
        </div>
      </section>

      {/* THREE WAYS */}
      <section className="section container-x" aria-labelledby="ways">
        <h2 id="ways" className="text-3xl sm:text-4xl max-w-3xl">What you can do on Anubhav</h2>
        <p className="mt-3 text-xl text-slate-700 max-w-3xl">Use one, or both.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ways.map((x) => (
            <div key={x.h} className={`card p-7 flex flex-col ${x.color}`}>
              <span className="text-5xl" aria-hidden>{x.icon}</span>
              <h3 className="mt-4 text-2xl">{x.h}</h3>
              <p className="mt-3 text-lg text-slate-800 flex-1">{x.d}</p>
              <Link href={x.href} className="btn-primary mt-6">{x.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FREE OR PAID */}
      <section className="section bg-white border-y border-navy-200" aria-labelledby="fp"><div className="container-x">
        <h2 id="fp" className="text-3xl sm:text-4xl max-w-3xl">Free or paid. You choose.</h2>
        <p className="mt-3 text-xl text-slate-700 max-w-3xl">Every expert decides how they want to help, and can change it any time.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricing.map((x) => <div key={x.h} className={`card p-7 ${x.tag}`}><span className="text-4xl" aria-hidden>{x.icon}</span><h3 className="mt-3 text-2xl">{x.h}</h3><p className="mt-2 text-lg text-slate-800">{x.d}</p></div>)}
        </div>
      </div></section>

      {/* WHICH FIELD */}
      <section className="section container-x" aria-labelledby="who">
        <h2 id="who" className="text-3xl sm:text-4xl max-w-3xl">Which field did you serve in?</h2>
        <p className="mt-3 text-xl text-slate-700 max-w-3xl">Tap a field to see who we are inviting and what people will ask for. Do not see yours? Register anyway.</p>
        <div className="mt-10"><FieldExplorer /></div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-white border-y border-navy-200" aria-labelledby="how"><div className="container-x">
        <h2 id="how" className="text-3xl sm:text-4xl">How listing yourself works</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map(([h, d], i) => (
            <li key={h} className="card p-6 flex gap-5 items-start"><span className="h-14 w-14 shrink-0 rounded-full bg-navy-800 text-white font-serif text-2xl font-bold flex items-center justify-center" aria-hidden>{i + 1}</span>
              <div><h3 className="text-2xl">{h}</h3><p className="mt-2 text-lg text-slate-700">{d}</p></div></li>
          ))}
        </ol>
        <div className="mt-10"><Link href="/register" className="btn-gold !text-lg !min-h-[52px] !px-7">List my expertise</Link></div>
      </div></section>

      {/* SAATHI */}
      <section className="section bg-white border-y border-navy-200" aria-labelledby="saathi"><div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow">Anubhav Saathi · Help at home</p>
          <h2 id="saathi" className="mt-2 text-3xl sm:text-4xl">Need a hand at home? Or want to help?</h2>
          <p className="mt-3 text-xl text-slate-700">Verified young helpers take elders to the hospital and back, run errands, teach phone and WhatsApp, or simply keep company. Families can book for their parents from anywhere.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/saathi" className="btn-primary !text-lg !min-h-[52px] !px-7">Explore Saathi</Link><Link href="/saathi/helper" className="btn-outline !text-lg !min-h-[52px] !px-7">Earn as a helper</Link></div>
        </div>
        <div className="grid grid-cols-2 gap-4">{[["🏥", "Hospital visits", "bg-coral-300"], ["📱", "Phone lessons", "bg-gold-100"], ["🧺", "Errands & chores", "bg-mint-100"], ["🚶", "Companionship", "bg-sky-100"]].map(([i, h, c]) => <div key={h} className={`card p-5 ${c}`}><span className="text-4xl" aria-hidden>{i}</span><p className="mt-2 font-bold text-lg">{h}</p></div>)}</div>
      </div></section>

      {/* TRUST */}
      <section className="section container-x" aria-labelledby="safe">
        <h2 id="safe" className="text-3xl sm:text-4xl max-w-3xl">Built on trust</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {safety.map(([h, d]) => <li key={h} className="card p-6 flex gap-4"><span className="h-9 w-9 shrink-0 rounded-full bg-mint-500 text-white flex items-center justify-center text-xl" aria-hidden>✓</span><div><h3 className="text-xl">{h}</h3><p className="mt-1 text-lg text-slate-700">{d}</p></div></li>)}
        </ul>
      </section>

      {/* FAQ */}
      <section className="section bg-white border-y border-navy-200" aria-labelledby="faq"><div className="container-x max-w-4xl">
        <h2 id="faq" className="text-3xl sm:text-4xl">Questions you may have</h2>
        <div className="mt-8"><Faq items={faq} /></div>
      </div></section>

      {/* FINAL CTA */}
      <section className="hero-pattern text-white"><div className="container-x py-14 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-5xl !text-white max-w-3xl mx-auto">Experience doesn’t retire. Put yours to work.</h2>
        <p className="mt-4 text-xl text-navy-100 max-w-2xl mx-auto">Free to join. About 10 minutes. Or call us and we will help you.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/register" className="btn-gold !text-lg !min-h-[52px] !px-7">List my expertise</Link><a href={telLink} className="btn bg-white text-navy-900 hover:bg-navy-50 !text-lg !min-h-[52px] !px-7">📞 {prettyPhone()}</a></div>
      </div></section>
      <div className="h-24 lg:hidden" aria-hidden />
      <MobileCta href="/register" label="List my expertise" />
    </>
  );
}
