"use client";
import Link from "next/link";
import { useState } from "react";
import { inr, PLATFORM_FEE_PCT, SERVICES, helperPayout } from "@/lib/saathi";

/* Interactive services: pick one to see what is included and the price */
export function ServiceExplorer() {
  const [sel, setSel] = useState(SERVICES[0].id); const s = SERVICES.find((x) => x.id === sel)!;
  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3" role="tablist" aria-label="Services">
        {SERVICES.map((x) => (
          <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}
            className={`text-left rounded-xl border-2 p-4 transition-all ${sel === x.id ? "border-navy-800 bg-navy-800 text-white shadow-lg -translate-y-0.5" : "border-slate-200 bg-white hover:border-gold-500"}`}>
            <span className="text-3xl" aria-hidden>{x.icon}</span>
            <span className="block mt-1 font-bold leading-snug">{x.name}</span>
            <span className={`block text-sm mt-0.5 ${sel === x.id ? "text-gold-300" : "text-gold-700"} font-semibold`}>{x.priceLabel.split(",")[0]}</span>
          </button>
        ))}
      </div>
      <div key={sel} role="tabpanel" className="card p-7 fade-in border-t-4 border-t-gold-500 h-fit lg:sticky lg:top-28">
        <p className="text-5xl" aria-hidden>{s.icon}</p>
        <h3 className="text-2xl font-bold mt-2">{s.name}</h3>
        <p className="text-slate-700 text-lg mt-1">{s.short}</p>
        <h4 className="mt-5 font-bold text-navy-900">What is included</h4>
        <ul className="mt-2 space-y-1.5">{s.details.map((d) => <li key={d} className="flex gap-2"><span className="text-green-700 font-bold" aria-hidden>✓</span>{d}</li>)}</ul>
        <div className="mt-5 rounded-lg bg-gold-50 border border-gold-100 p-4"><p className="font-serif text-2xl font-bold text-navy-900">{s.priceLabel}</p>{s.extras && <p className="text-sm text-slate-600 mt-1">{s.extras}</p>}</div>
        <Link href={`/saathi/book/?service=${s.id}`} className="btn-gold w-full mt-5">Book this service</Link>
      </div>
    </div>
  );
}

/* Helper earnings calculator (shows the platform fee openly) */
export function HelperEarnings() {
  const [hrs, setHrs] = useState(10); const [rate, setRate] = useState(250);
  const gross = hrs * rate * 4; const net = helperPayout(gross);
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-7">
        <div><div className="flex justify-between items-baseline"><label htmlFor="he-h" className="text-lg font-semibold">Hours you can give each week</label><span className="font-serif text-3xl font-bold text-gold-300">{hrs}</span></div>
          <input id="he-h" type="range" min={2} max={40} value={hrs} onChange={(e) => setHrs(Number(e.target.value))} className="range w-full" /><div className="flex justify-between text-sm text-navy-300"><span>2</span><span>40</span></div></div>
        <div><div className="flex justify-between items-baseline"><label htmlFor="he-r" className="text-lg font-semibold">Average booking price per hour</label><span className="font-serif text-3xl font-bold text-gold-300">{inr(rate)}</span></div>
          <input id="he-r" type="range" min={200} max={350} step={10} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="range w-full" /><div className="flex justify-between text-sm text-navy-300"><span>₹200</span><span>₹350</span></div></div>
      </div>
      <div className="rounded-2xl bg-white text-navy-900 p-7 sm:p-9">
        <p className="text-slate-600 font-semibold uppercase tracking-wide text-sm">You could take home about</p>
        <p className="font-serif text-5xl sm:text-6xl font-bold mt-2 tabular-nums" aria-live="polite">{inr(net)}<span className="text-2xl text-slate-500 font-sans font-normal"> / month</span></p>
        <p className="mt-2 text-slate-700">After Anubhav’s {PLATFORM_FEE_PCT}% platform fee ({inr(gross - net)}). Fully transparent, no hidden cuts.</p>
        <div className="mt-5 h-3 rounded-full bg-navy-100 overflow-hidden" aria-hidden><div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${Math.min(100, (net / 40000) * 100)}%` }} /></div>
        <p className="mt-4 text-sm text-slate-500">An illustration based on your numbers, not a guarantee. Earnings depend on bookings available in your area.</p>
      </div>
    </div>
  );
}
