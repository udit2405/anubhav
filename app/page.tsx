import Link from "next/link";
import { HeroText } from "@/components/HeroText";
import { ProfilePreview } from "@/components/ProfilePreview";
import { EarningsEstimator, Faq, FieldExplorer, MobileCta, Reveal, StepGuide } from "@/components/Interactive";
import { T } from "@/components/T";
import { Disclaimer } from "@/components/ui";

const benefits = [
  ["🏅", "Stay active and respected", "Your decades of knowledge are still in demand. Be the person people call when the stakes are real."],
  ["₹", "Earn on your own terms", "Per consultation, per hour, per project or monthly. Or guide students for free. You decide."],
  ["🕰️", "Work when and where you like", "From home, part-time, or on-site for a project. Take only what suits you."],
  ["🔒", "Your privacy is protected", "Your phone and email are never shown. Every enquiry comes through our team first."],
  ["🔎", "Get found on Google", "You get your own professional profile page that businesses and families can find."],
  ["🎁", "Free to join, always", "We will never charge a retired professional to register or to be listed."],
];
const faq = [
  ["Do I need to be comfortable with computers?", "No. If you can use WhatsApp, you can register. Fill the form, tap send, and we do the rest. You can also call us and we will fill it in with you."],
  ["Is it really free?", "Yes. Registration and your profile are free. We may offer optional extras in future, but you will never be asked to pay to join."],
  ["Who can see my phone number?", "Nobody on the website. Businesses write to our team, and we connect you only when you agree."],
  ["Am I obliged to take work?", "Never. You choose which enquiries to accept, and you set your own fees, hours and availability."],
  ["I was not in government service. Can I join?", "Yes. Anyone with real professional experience can register: engineers, bankers, doctors, teachers, officers, scientists, accountants and more."],
  ["Does this make me a representative of my old department?", "No. You list as an independent professional and must not claim to represent or be endorsed by your former department."],
];
const quotes = [["“", "A lifetime of knowing how things really get done should not retire with the person who earned it.", "Why we built Anubhav"]];

export default function Home() {
  return (
    <>
      <section className="hero-pattern text-white">
        <div className="container-x py-14 sm:py-20 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-start">
          <div className="lg:pt-12"><HeroText /></div>
          <div className="lg:pl-4"><ProfilePreview /></div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="bg-gold-50 border-b border-gold-100"><div className="container-x py-10 grid md:grid-cols-[auto_1fr] gap-6 items-center">
        <span className="font-serif text-7xl leading-none text-gold-500" aria-hidden>{quotes[0][0]}</span>
        <div><p className="font-serif text-2xl sm:text-3xl text-navy-900 leading-snug">{quotes[0][1]}</p><p className="mt-2 text-slate-600">{quotes[0][2]}</p></div>
      </div></section>

      <section className="section container-x" aria-labelledby="why">
        <Reveal><p className="text-gold-700 font-semibold uppercase tracking-wide text-sm"><T k="why" /></p>
          <h2 id="why" className="mt-2 text-3xl sm:text-4xl font-bold max-w-3xl">Thousands retire every year with knowledge no one asks for. Be among the first to put yours to work.</h2></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([i, h, d], k) => (
            <Reveal key={h} delay={k * 70}><div className="group card p-6 h-full hover:-translate-y-1 hover:shadow-lg hover:border-gold-300 transition-all duration-300">
              <span className="h-14 w-14 rounded-xl bg-navy-800 text-gold-300 flex items-center justify-center text-2xl font-serif font-bold group-hover:bg-gold-500 group-hover:text-white transition-colors" aria-hidden>{i}</span>
              <h3 className="mt-4 text-xl font-bold">{h}</h3><p className="mt-2 text-slate-700 text-lg">{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section id="earn" className="section bg-navy-900 text-white scroll-mt-20"><div className="container-x">
        <Reveal><p className="text-gold-300 font-semibold uppercase tracking-wide text-sm">Earnings calculator</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold !text-white">What could your experience be worth?</h2>
          <p className="mt-3 text-lg text-navy-200 max-w-2xl">Move the sliders. You decide how much to work and what to charge.</p></Reveal>
        <div className="mt-10"><EarningsEstimator /></div>
      </div></section>

      <section className="section container-x" aria-labelledby="who">
        <Reveal><p className="text-gold-700 font-semibold uppercase tracking-wide text-sm"><T k="explore" /></p>
          <h2 id="who" className="mt-2 text-3xl sm:text-4xl font-bold">Which field did you serve in?</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl">Tap a field to see who we are inviting and what clients will ask for. Do not see yours? Register anyway.</p></Reveal>
        <div className="mt-10"><FieldExplorer /></div>
      </section>

      <section className="section bg-navy-50" aria-labelledby="how"><div className="container-x">
        <Reveal><p className="text-gold-700 font-semibold uppercase tracking-wide text-sm text-center"><T k="how" /></p>
          <h2 id="how" className="mt-2 text-3xl sm:text-4xl font-bold text-center">Four simple steps</h2></Reveal>
        <div className="mt-12 max-w-4xl mx-auto"><StepGuide /></div>
      </div></section>

      <section className="section container-x max-w-4xl" aria-labelledby="faq">
        <Reveal><h2 id="faq" className="text-3xl sm:text-4xl font-bold">Questions you may have</h2></Reveal>
        <div className="mt-8"><Faq items={faq} /></div>
        <p className="mt-6 text-lg">Still unsure? <Link href="/contact" className="underline font-semibold">Talk to us</Link>. We are happy to help you register.</p>
      </section>

      <section className="section bg-navy-50" aria-labelledby="saathi"><div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <Reveal><p className="text-gold-700 font-semibold uppercase tracking-wide text-sm">New: Anubhav Saathi</p>
          <h2 id="saathi" className="mt-2 text-3xl sm:text-4xl font-bold">Need a hand yourself? Or want to help?</h2>
          <p className="mt-3 text-lg text-slate-700">Verified young helpers who take elders to the hospital and back, run errands, teach phone and WhatsApp, or just keep company. Families can book for their parents from anywhere.</p>
          <div className="mt-6 flex flex-wrap gap-4"><Link href="/saathi" className="btn-primary">Explore Saathi</Link><Link href="/saathi/helper" className="btn-outline">Earn as a helper</Link></div></Reveal>
        <Reveal delay={100}><div className="grid grid-cols-2 gap-3">{[["🏥", "Hospital visits"], ["📱", "Phone lessons"], ["🧺", "Errands & chores"], ["🚶", "Companionship"]].map(([i, h]) => <div key={h} className="card p-5 hover:-translate-y-1 hover:shadow-lg transition-all"><span className="text-4xl" aria-hidden>{i}</span><p className="mt-2 font-bold text-lg">{h}</p></div>)}</div></Reveal>
      </div></section>

      <section className="hero-pattern text-white"><div className="container-x py-16 sm:py-20 text-center">
        <Reveal><h2 className="text-3xl sm:text-5xl font-bold !text-white">Experience doesn’t retire.<br className="hidden sm:block" /> <span className="text-gold-300">Put yours to work.</span></h2>
          <p className="mt-4 text-lg text-navy-200 max-w-2xl mx-auto">Join our founding group of experts. Free, and about 10 minutes.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/register" className="btn-gold !text-lg !min-h-[60px] !px-10">List Your Expertise</Link><Link href="/contact" className="btn border-2 border-white/70 text-white hover:bg-white hover:text-navy-900">Have a question?</Link></div></Reveal>
      </div></section>
      <div className="container-x py-8"><Disclaimer /></div>
      <MobileCta />
    </>
  );
}
