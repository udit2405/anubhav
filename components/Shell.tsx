"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/app";
import { DISCLAIMER } from "@/lib/data";
import { NOTICE, RERA_NO, SEBI_RIA } from "@/lib/legal";
import { LANGS, type Lang } from "@/lib/i18n";
import { prettyPhone, telLink } from "@/lib/contact";

export function Header() {
  const { t } = useApp(); const path = usePathname(); const [open, setOpen] = useState(false);
  const links = [["/plan", "Free Retirement Plan"], ["/register", "Earn from Experience"], ["/saathi", "Help at Home"], ["/contact", "Contact"]];
  const active = (h: string) => path === h || path === h + "/" || (h !== "/" && path.startsWith(h + "/"));
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-navy-200">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-3 z-50">Skip to content</a>
      <div className="bg-navy-800 text-white">
        <div className="container-x flex items-center justify-between gap-3 py-1.5 text-sm">
          <span className="hidden sm:block">Free, no-obligation guidance for retired professionals</span>
          <span className="sm:hidden"><LangSelect compact /></span>
          <a href={telLink} className="font-bold underline-offset-4 hover:underline ml-auto sm:ml-0 whitespace-nowrap">📞 <span className="hidden sm:inline">Call us: </span>{prettyPhone()}</a>
        </div>
      </div>
      <div className="container-x flex items-center justify-between gap-2 sm:gap-3 h-16">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="Anubhav home">
          <span className="h-10 w-10 rounded-lg bg-navy-800 text-white flex items-center justify-center font-serif text-2xl font-bold">अ</span>
          <span className="leading-tight"><span className="block font-serif text-xl sm:text-2xl font-bold text-navy-900">Anubhav</span><span className="hidden sm:block text-xs text-slate-600">Experience doesn’t retire</span></span>
        </Link>
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          {links.map(([h, l]) => <Link key={h} href={h} aria-current={active(h) ? "page" : undefined} className={`px-3 py-2 text-base font-bold border-b-4 whitespace-nowrap ${active(h) ? "border-saffron-600 text-navy-900" : "border-transparent text-navy-700 hover:border-navy-200"}`}>{l}</Link>)}
        </nav>
        <div className="hidden xl:flex items-center gap-3"><LangSelect /></div>
        <div className="xl:hidden flex items-center gap-2 shrink-0"><span className="hidden sm:block"><LangSelect /></span><button className="btn-outline btn-sm !px-3 !min-h-[40px]" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div>
      </div>
      {open && (
        <nav id="mobile-menu" className="xl:hidden border-t border-navy-200 bg-white px-5 pb-6" aria-label="Mobile">
          {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="block py-4 text-xl font-bold border-b border-navy-100">{l}</Link>)}
          <a href={telLink} className="btn-gold w-full mt-5">📞 Call us: {prettyPhone()}</a>
        </nav>
      )}
    </header>
  );
}

export function LangSelect({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useApp();
  return (
    <label className={`inline-flex items-center gap-2 rounded-lg border-2 border-navy-300 bg-white pl-2 sm:pl-3 pr-0 sm:pr-1 ${compact ? "min-h-[40px]" : "min-h-[48px]"} text-navy-900`}>
      <span className="hidden sm:inline text-base text-slate-600">Language</span><span className="sr-only">Language / भाषा</span>
      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent font-bold text-base py-2 pr-1 cursor-pointer w-[110px] sm:w-auto">
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </label>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200 mt-auto">
      <div className="container-x py-12 grid gap-10 md:grid-cols-4 text-lg">
        <div className="md:col-span-2"><p className="font-serif text-2xl text-white font-bold">Anubhav</p><p className="mt-2 max-w-md">Guidance, opportunities and help at home for retired professionals and their families.</p>
          <a href={telLink} className="inline-block mt-4 text-white font-bold text-xl underline">📞 {prettyPhone()}</a></div>
        <div><p className="font-bold text-white mb-2">Explore</p><ul className="space-y-2"><li><Link href="/plan" className="hover:text-white underline">Free Retirement Plan</Link></li><li><Link href="/register" className="hover:text-white underline">Earn from Your Experience</Link></li><li><Link href="/saathi" className="hover:text-white underline">Help at Home (Saathi)</Link></li><li><Link href="/hire" className="hover:text-white underline">Hire an Expert</Link></li></ul></div>
        <div><p className="font-bold text-white mb-2">Company</p><ul className="space-y-2"><li><Link href="/about" className="hover:text-white underline">About Us</Link></li><li><Link href="/contact" className="hover:text-white underline">Contact Us</Link></li><li><Link href="/how-it-works" className="hover:text-white underline">How It Works</Link></li><li><Link href="/privacy" className="hover:text-white underline">Privacy & Terms</Link></li></ul></div>
      </div>
      <div className="border-t border-navy-700"><div className="container-x py-6 text-base space-y-3"><p>{NOTICE}</p>{(SEBI_RIA || RERA_NO) && <p className="font-bold text-white">{SEBI_RIA && <>SEBI RIA: {SEBI_RIA} · </>}{RERA_NO && <>RERA: {RERA_NO}</>}</p>}<p>{DISCLAIMER}</p><p>© 2026 Anubhav</p></div></div>
    </footer>
  );
}
