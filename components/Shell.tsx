"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/app";
import { DISCLAIMER } from "@/lib/data";
import { LANGS, type Lang } from "@/lib/i18n";
import { prettyPhone, telLink } from "@/lib/contact";
import { BASE } from "@/lib/base";
import { Icon } from "./Icons";

export function Header() {
  const { t } = useApp(); const path = usePathname(); const [open, setOpen] = useState(false);
  const links = [["/register", "List Your Expertise"], ["/saathi", "Help at Home"], ["/how-it-works", "How It Works"], ["/contact", "Contact"]];
  const active = (h: string) => path === h || path === h + "/" || (h !== "/" && path.startsWith(h + "/"));
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-line">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-3 z-50">Skip to content</a>
      <div className="bg-navy-800 text-white">
        <div className="container-x flex items-center justify-between gap-3 h-[33px] text-[13px]">
          <span className="hidden sm:flex items-center gap-2 text-navy-100"><Icon name="shieldCheck" className="h-3.5 w-3.5 text-gold-300" />A platform built for India’s retired · Free to join</span>
          <span className="sm:hidden"><LangSelect compact /></span>
          <a href={telLink} className="flex items-center gap-1.5 font-semibold hover:text-gold-300 ml-auto sm:ml-0 whitespace-nowrap"><Icon name="phone" className="h-3.5 w-3.5" /><span className="hidden sm:inline text-navy-100 font-normal">Call us</span>{prettyPhone()}</a>
        </div>
      </div>
      <div className="container-x flex items-center justify-between gap-2 sm:gap-3 h-[68px]">
        <Link href="/" className="shrink-0" aria-label="Anubhav, Experience Never Retires. Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE + "/brand/logo-horizontal.png"} alt="Anubhav: Experience Never Retires." width={1049} height={225} className="h-10 sm:h-[3.3rem] w-auto" />
        </Link>
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          {links.map(([h, l]) => <Link key={h} href={h} aria-current={active(h) ? "page" : undefined} className={`relative px-3.5 py-2 text-[15px] font-medium whitespace-nowrap transition-colors ${active(h) ? "text-navy-900 after:absolute after:left-3.5 after:right-3.5 after:-bottom-[17px] after:h-0.5 after:bg-gold-500" : "text-slate-600 hover:text-navy-900"}`}>{l}</Link>)}
        </nav>
        <div className="hidden xl:flex items-center gap-3"><LangSelect /><Link href="/register" className="btn-primary !min-h-[42px] !px-5 !text-sm">List your expertise</Link></div>
        <div className="xl:hidden flex items-center gap-2 shrink-0"><span className="hidden sm:block"><LangSelect /></span><button className="btn-outline btn-sm !px-4 !min-h-[40px]" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div>
      </div>
      {open && (
        <nav id="mobile-menu" className="xl:hidden border-t border-navy-200 bg-white px-5 pb-6" aria-label="Mobile">
          {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-lg font-semibold border-b border-line">{l}<Icon name="arrow" className="h-4 w-4 text-slate-400" /></Link>)}
          <a href={telLink} className="btn-primary w-full mt-5"><Icon name="phone" className="h-4 w-4" /> Call us: {prettyPhone()}</a>
        </nav>
      )}
    </header>
  );
}

export function LangSelect({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useApp();
  return (
    <label className={`inline-flex items-center gap-1.5 rounded-md border ${compact ? "border-white/25 bg-transparent text-white min-h-[26px] pl-2" : "border-line bg-white text-navy-900 min-h-[42px] pl-3"} pr-0 sm:pr-1`}>
      <Icon name="globe" className={compact ? "h-3.5 w-3.5" : "h-4 w-4 text-slate-500"} /><span className="sr-only">Language / भाषा</span>
      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className={`bg-transparent font-medium ${compact ? "text-[13px] py-0.5 w-[100px] [&>option]:text-navy-900" : "text-sm py-2"} pr-1 cursor-pointer sm:w-auto`}>
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </label>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200 mt-auto">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4 text-[15px]">
        <div className="md:col-span-2">{/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE + "/brand/logo-horizontal-light.png"} alt="Anubhav: Experience Never Retires." width={1049} height={225} className="h-14 w-auto" /><p className="mt-4 max-w-sm text-navy-200 leading-relaxed">A platform built for India’s retired: share your experience and get help at home.</p>
          <a href={telLink} className="inline-flex items-center gap-2 mt-5 text-white font-semibold text-lg hover:text-gold-300"><Icon name="phone" className="h-4 w-4 text-gold-300" />{prettyPhone()}</a></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 mb-4">Explore</p><ul className="space-y-2.5"><li><Link href="/register" className="hover:text-white">List Your Expertise</Link></li><li><Link href="/saathi" className="hover:text-white">Help at Home (Saathi)</Link></li></ul></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 mb-4">Company</p><ul className="space-y-2.5"><li><Link href="/about" className="hover:text-white">About Us</Link></li><li><Link href="/contact" className="hover:text-white">Contact Us</Link></li><li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li><li><Link href="/privacy" className="hover:text-white">Privacy & Terms</Link></li></ul></div>
      </div>
      <div className="border-t border-white/10"><div className="container-x py-6 text-[13px] text-navy-300 space-y-3"><p className="max-w-4xl">{DISCLAIMER}</p><p>© 2026 Anubhav. Experience never retires.</p></div></div>
    </footer>
  );
}
