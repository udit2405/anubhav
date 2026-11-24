"use client";
import Link from "next/link";
import { useState } from "react";

const MARKETS = [
  { id: "re", icon: "🏠", name: "Real estate", color: "bg-coral-300", what: "Buying a home to rent out, a plot, a commercial unit, or a senior-living apartment, for rental income and long-term value.", good: ["Steady rental income that can rise with time", "Something tangible you can pass on", "Senior-living homes designed for comfort and care"], watch: ["Always check RERA registration and a clean title", "Rental yields are often modest after tax and maintenance", "It is hard to sell quickly. Do not put all savings here"] },
  { id: "fix", icon: "🏦", name: "Safe income", color: "bg-mint-300", what: "Senior Citizen Savings Scheme (SCSS), bank and corporate fixed deposits, government and high-grade bonds.", good: ["Predictable income, often paid quarterly", "Government-backed options for capital safety", "Easy to understand and plan around"], watch: ["Interest is taxable and may not beat inflation", "Deposit insurance covers only up to a limit per bank", "Avoid unknown schemes promising unusually high returns"] },
  { id: "mf", icon: "📈", name: "Mutual funds", color: "bg-sky-300", what: "Professionally managed funds. Retirees often use balanced funds and a Systematic Withdrawal Plan (SWP) for monthly income.", good: ["Potential to grow faster than inflation", "Monthly SWP can be tax-efficient", "You can start small and stay flexible"], watch: ["Values rise and fall. Returns are not guaranteed", "Choose funds suited to your age and risk comfort", "Use SEBI-registered advisers or direct plans with care"] },
  { id: "gold", icon: "🪙", name: "Gold", color: "bg-gold-300", what: "Sovereign Gold Bonds, gold ETFs and digital gold, as a small anchor against inflation and uncertainty.", good: ["Holds value across long periods", "Easy to buy and sell in paper form", "Diversifies away from property and shares"], watch: ["Pays no regular income (except some bonds)", "Prices can stay flat for years", "Keep it a small share of the total"] },
  { id: "cover", icon: "🩺", name: "Health & annuity", color: "bg-mint-100", what: "Adequate health insurance for medical costs, and optionally an annuity for guaranteed lifetime income.", good: ["Protects savings from a big hospital bill", "Annuities give income you cannot outlive", "Peace of mind for you and your family"], watch: ["Check waiting periods and exclusions carefully", "Annuity rates lock in; compare options", "Never buy a policy as an ‘investment’ without comparing"] },
  { id: "estate", icon: "📜", name: "Will & estate", color: "bg-gold-100", what: "A registered will, nominations and clear paperwork so your family receives what you intend, smoothly.", good: ["Avoids disputes and long delays", "Keeps your wishes clear for property and savings", "Simple and inexpensive to do now"], watch: ["Keep nominations updated on every account", "Use a qualified lawyer for the will", "Tell a trusted person where documents are"] },
];

export function MarketExplorer() {
  const [sel, setSel] = useState("re"); const m = MARKETS.find((x) => x.id === sel)!;
  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-6 items-start">
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3" role="tablist" aria-label="Where savings can work">
        {MARKETS.map((x) => (
          <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}
            className={`flex items-center gap-3 text-left rounded-lg border-2 border-navy-200 p-3 min-h-[56px] transition-all ${sel === x.id ? `${x.color} border-navy-700 ` : "bg-white hover:bg-navy-50"}`}>
            <span className="text-3xl" aria-hidden>{x.icon}</span><span className="font-bold text-lg leading-tight">{x.name}</span></button>))}
      </div>
      <div key={sel} role="tabpanel" className={`fade-in card p-6 sm:p-8 ${m.color}`}>
        <div className="flex items-center gap-3"><span className="text-5xl" aria-hidden>{m.icon}</span><h3 className="text-3xl font-bold">{m.name}</h3></div>
        <p className="mt-3 text-lg text-navy-800">{m.what}</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white border border-navy-300 p-4"><h4 className="font-bold">Why people choose it</h4><ul className="mt-2 space-y-1.5">{m.good.map((g) => <li key={g} className="flex gap-2"><span className="text-mint-700 font-bold" aria-hidden>✓</span>{g}</li>)}</ul></div>
          <div className="rounded-xl bg-white border border-navy-300 p-4"><h4 className="font-bold">Watch out for</h4><ul className="mt-2 space-y-1.5">{m.watch.map((g) => <li key={g} className="flex gap-2"><span className="text-coral-600 font-bold" aria-hidden>!</span>{g}</li>)}</ul></div>
        </div>
        <Link href="/plan" className="btn-primary mt-6">Talk to a specialist about {m.name.toLowerCase()}</Link>
        <p className="mt-3 text-xs text-navy-700">General education, not advice. Returns are not guaranteed.</p>
      </div>
    </div>
  );
}
