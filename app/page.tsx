import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { Faq, FieldExplorer, MobileCta } from "@/components/Interactive";
import { Icon } from "@/components/Icons";
import { prettyPhone, telLink } from "@/lib/contact";

const trust = [
  ["gift", "Free to list", "No registration fee, ever"],
  ["lock", "Private by default", "Your number is never shown"],
  ["badge", "Verified profiles", "Retirement proof checked"],
  ["globe", "13 Indian languages", "Use the site in your language"],
];
const ways = [
  { icon: "briefcase", tag: "For retired professionals", h: "Share your expertise", d: "Advise businesses, mentor young people or guide your community. Set your own fees and hours, or help for free.", pts: ["Consulting and advisory work", "Mentoring and training", "One-time or ongoing projects"], cta: "List my expertise", href: "/register", dark: false },
  { icon: "home", tag: "Anubhav Saathi · Now in Jaipur", h: "Help at home", d: "Verified young helpers for hospital visits, errands, phone lessons and company. Families can book for their parents from anywhere.", pts: ["Background-checked helpers", "Clear prices, shared before booking", "Book by phone or WhatsApp"], cta: "Explore Saathi", href: "/saathi", dark: true },
];
const pricing = [
  { icon: "heart", h: "Free", d: "Mentor students, guide a neighbour or support a cause, simply for the joy of it." },
  { icon: "wallet", h: "Paid", d: "Charge per hour, per consultation or per project. You set the fee." },
  { icon: "scale", h: "Both", d: "Offer some services free and others paid. Change it whenever you like." },
];
const steps = [
  ["form", "Fill a simple form", "Your career and what you can help with. About 10 minutes."],
  ["send", "Send it, or ask for a call", "One tap on WhatsApp or email, or we fill it in with you by phone."],
  ["shieldCheck", "We check and publish", "Your profile goes live within 2 working days. Add proof for a Verified badge."],
  ["users", "People find you", "Requests come through Anubhav. You decide what to accept, free or paid."],
];
const safety = [
  ["lock", "Your phone number stays private", "It is never shown on the website. People write to Anubhav first, and we connect you only if you agree."],
  ["gift", "Free to join, always", "We never charge a retired professional to register or to be listed."],
  ["badge", "Verified badge", "Send your retirement proof and we check it. Verified profiles are trusted more."],
  ["ban", "We never ask for OTP, PIN or money", "If anyone says they are from Anubhav and asks, please hang up and call us."],
];
const faq = [
  ["Do I have to charge money?", "No. You choose. You can offer free guidance, paid services, or both, and change it whenever you like."],
  ["Is it free to list myself?", "Yes. Registration and your profile are free, always. We may offer optional extras in the future, but you will never need to pay to be listed."],
  ["Who can see my phone number?", "Nobody on the website. Clients write to the Anubhav team and we connect you only when you agree."],
  ["I was not in government service. Can I join?", "Yes. Anyone with real professional experience can register: engineers, bankers, doctors, teachers, officers, scientists, accountants and more."],
  ["I do not use computers much. Can I still list myself?", "Yes. Request a call back, or call us, and we will fill in the form with you over the phone."],
  ["Will people really contact me?", "We are building Anubhav now, and our first experts are the founding members. Your profile is published for free, and people who need your skills can ask for you through Anubhav. You always choose whether to reply."],
];

function Head({ eyebrow, title, sub, id, light, center }: { eyebrow: string; title: string; sub?: string; id: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 h-section ${light ? "!text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 lead ${light ? "!text-navy-100" : ""}`}>{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-cream border-b border-line lg:min-h-[calc(100svh-101px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-lines" aria-hidden />
        <div className="relative container-x w-full py-10 lg:py-8 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">A platform built for India’s retired</p>
            <h1 className="mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.4rem] leading-[1.06]">Decades of experience.<br /><span className="text-saffron-600 italic">New opportunities.</span></h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">List yourself for free. Advise businesses, mentor young people or help your community, free or paid, on your own terms.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary !min-h-[52px] !px-7">List my expertise <Icon name="arrow" className="h-4 w-4" /></Link>
              <a href="#how" className="btn-outline !min-h-[52px] !px-7">How it works</a>
            </div>
            <div className="mt-9 pt-7 border-t border-line grid grid-cols-3 gap-4 max-w-lg">
              {[["₹0", "to register"], ["2 days", "to go live"], ["100%", "your choice"]].map(([n, l]) => (
                <div key={l}><p className="font-serif text-2xl sm:text-3xl font-semibold text-navy-800">{n}</p><p className="text-sm text-slate-500 mt-0.5">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-navy-800 p-2 shadow-hard-lg">
              <div className="flex items-center gap-3 px-4 py-3 text-white">
                <span className="h-9 w-9 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center"><Icon name="phone" className="h-4 w-4" strokeWidth={2} /></span>
                <div className="leading-tight"><p className="font-semibold">Free help to get started</p><p className="text-sm text-navy-200">We call you and fill the form together</p></div>
              </div>
              <CallbackForm compact title="Request a call back" sub="Leave your name and number, and our team will call you back. Free, no obligation." />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-line" aria-label="Why Anubhav">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
          {trust.map(([i, h, d], k) => (
            <div key={h} className={`flex items-center gap-3.5 py-6 px-3 sm:px-6 ${k === 0 ? "!pl-0" : ""} ${k === 2 ? "max-lg:!border-l-0 max-lg:!pl-0 max-lg:border-t max-lg:border-line" : ""} ${k === 3 ? "max-lg:border-t max-lg:border-line" : ""}`}>
              <span className="icon-tile h-11 w-11 shrink-0"><Icon name={i} /></span>
              <div className="leading-tight"><p className="font-semibold text-[15px]">{h}</p><p className="text-sm text-slate-500 mt-0.5 hidden sm:block">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO WAYS */}
      <section className="section container-x" aria-labelledby="ways">
        <Head id="ways" eyebrow="What you can do" title="Two ways Anubhav works for you" sub="Use one, or both. Each is simple, private and free to join." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ways.map((x) => (
            <article key={x.h} className={`rounded-2xl p-8 sm:p-10 flex flex-col border ${x.dark ? "bg-navy-800 border-navy-800 text-white" : "bg-white border-line shadow-hard-sm"}`}>
              <div className="flex items-center justify-between gap-4">
                <span className={`h-14 w-14 rounded-xl flex items-center justify-center ${x.dark ? "bg-white/10 text-gold-300" : "icon-tile"}`}><Icon name={x.icon} className="h-7 w-7" /></span>
                <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${x.dark ? "text-gold-300" : "text-saffron-600"}`}>{x.tag}</span>
              </div>
              <h3 className={`mt-7 font-serif text-3xl font-semibold ${x.dark ? "!text-white" : ""}`}>{x.h}</h3>
              <p className={`mt-3 text-lg leading-relaxed ${x.dark ? "text-navy-100" : "text-slate-600"}`}>{x.d}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {x.pts.map((p) => <li key={p} className="flex items-center gap-3"><span className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${x.dark ? "bg-gold-500 text-navy-900" : "bg-navy-800 text-white"}`}><Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /></span>{p}</li>)}
              </ul>
              <div className={`mt-8 pt-6 border-t ${x.dark ? "border-white/15" : "border-line"}`}>
                <Link href={x.href} className={x.dark ? "btn-gold" : "btn-primary"}>{x.cta} <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FREE OR PAID */}
      <section className="section bg-white border-y border-line" aria-labelledby="fp"><div className="container-x">
        <Head id="fp" eyebrow="Your terms" title="Free or paid. You choose." sub="Every expert decides how they want to help, and can change it at any time. There is no minimum commitment." />
        <div className="mt-12 grid sm:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {pricing.map((x) => (
            <div key={x.h} className="bg-white p-8">
              <span className="icon-tile h-12 w-12"><Icon name={x.icon} className="h-6 w-6" /></span>
              <h3 className="mt-5 font-serif text-2xl font-semibold">{x.h}</h3>
              <p className="mt-2 text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* WHICH FIELD */}
      <section className="section container-x" aria-labelledby="who">
        <Head id="who" eyebrow="Fields we invite" title="Which field did you serve in?" sub="Select a field to see who we are inviting and what people will ask for. Do not see yours? Register anyway." />
        <div className="mt-12"><FieldExplorer /></div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-white border-y border-line" aria-labelledby="how"><div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Head id="how" eyebrow="Step by step" title="How listing yourself works" />
          <Link href="/register" className="btn-primary">List my expertise <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 relative">
          <div className="hidden lg:block absolute top-7 left-7 right-[12%] h-px bg-line" aria-hidden />
          {steps.map(([i, h, d], k) => (
            <li key={h} className="relative">
              <div className="flex items-center gap-3">
                <span className="relative h-14 w-14 rounded-full bg-navy-800 text-gold-300 flex items-center justify-center ring-8 ring-white"><Icon name={i} className="h-6 w-6" /></span>
                <span className="font-serif text-sm font-semibold text-slate-400 tracking-wider">STEP {String(k + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-xl">{h}</h3>
              <p className="mt-2 text-slate-600">{d}</p>
            </li>
          ))}
        </ol>
      </div></section>

      {/* SAATHI */}
      <section className="relative bg-navy-900 text-white overflow-hidden" aria-labelledby="saathi">
        <div className="absolute inset-0 grid-lines-dark" aria-hidden />
        <div className="relative container-x section grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Head id="saathi" light eyebrow="Anubhav Saathi · Help at home" title="A trusted helping hand, when family is far away" sub="Verified young helpers take elders to the hospital and back, run errands, teach phone and WhatsApp, or simply keep company." />
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/saathi" className="btn-gold !min-h-[52px] !px-7">Explore Saathi <Icon name="arrow" className="h-4 w-4" /></Link><Link href="/saathi/helper" className="btn border border-white/40 text-white hover:bg-white/10 !min-h-[52px] !px-7">Earn as a helper</Link></div>
            <p className="mt-6 text-sm text-navy-200 flex items-center gap-2"><Icon name="mapPin" className="h-4 w-4" /> Now serving Jaipur. More cities soon.</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[["hospital", "Hospital visits", "From ₹899 per visit"], ["smartphone", "Phone lessons", "From ₹300 per hour"], ["bag", "Errands & chores", "From ₹250 per hour"], ["coffee", "Companionship", "From ₹200 per hour"]].map(([i, h, p]) => (
              <div key={h} className="bg-navy-900 p-6 sm:p-7">
                <Icon name={i} className="h-7 w-7 text-gold-300" />
                <p className="mt-4 font-semibold text-lg">{h}</p>
                <p className="mt-1 text-sm text-navy-200">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section container-x" aria-labelledby="safe">
        <Head id="safe" eyebrow="Our promise" title="Built on trust" sub="Simple rules we follow for every member, every time." />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {safety.map(([i, h, d]) => (
            <li key={h} className="card p-7 flex gap-5">
              <span className="icon-tile h-12 w-12 shrink-0"><Icon name={i} className="h-6 w-6" /></span>
              <div><h3 className="text-lg">{h}</h3><p className="mt-1.5 text-slate-600">{d}</p></div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="section bg-white border-y border-line" aria-labelledby="faq"><div className="container-x grid lg:grid-cols-[0.8fr_1.4fr] gap-12">
        <div>
          <Head id="faq" eyebrow="Good to know" title="Questions you may have" />
          <div className="mt-8 card p-6 bg-cream">
            <p className="font-semibold">Still have a question?</p>
            <p className="mt-1 text-slate-600 text-[15px]">Speak to our team. We are happy to help.</p>
            <a href={telLink} className="btn-primary w-full mt-4"><Icon name="phone" className="h-4 w-4" /> {prettyPhone()}</a>
          </div>
        </div>
        <Faq items={faq} />
      </div></section>

      {/* FINAL CTA */}
      <section className="relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 grid-lines-dark" aria-hidden />
        <div className="relative container-x py-16 sm:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow eyebrow-light">Experience never retires</p>
            <h2 className="mt-3 h-section !text-white max-w-2xl">Put a lifetime of experience to work.</h2>
            <p className="mt-4 text-lg text-navy-100 max-w-xl">Free to join. About 10 minutes. Or call us and we will help you, step by step.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link href="/register" className="btn-gold !min-h-[54px]">List my expertise <Icon name="arrow" className="h-4 w-4" /></Link>
            <a href={telLink} className="btn border border-white/40 text-white hover:bg-white/10 !min-h-[54px]"><Icon name="phone" className="h-4 w-4" /> {prettyPhone()}</a>
          </div>
        </div>
      </section>
      <div className="h-24 lg:hidden" aria-hidden />
      <MobileCta href="/register" label="List my expertise" />
    </>
  );
}
