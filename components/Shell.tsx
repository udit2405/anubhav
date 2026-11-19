"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/app";
import { DISCLAIMER } from "@/lib/data";
import { LANGS, type Lang } from "@/lib/i18n";

export function Header() {
  const { t } = useApp(); const path = usePathname(); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 8); h(); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["/saathi", "Anubhav Saathi"], ["/how-it-works", t("nav.how")], ["/about", t("nav.about")], ["/contact", t("nav.contact")]];
  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur border-b transition-shadow ${scrolled ? "shadow-md border-slate-200" : "border-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-3 z-50">Skip to content</a>
      <div className={`container-x flex items-center justify-between gap-3 transition-all ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="Anubhav home">
          <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg bg-navy-800 text-gold-300 flex items-center justify-center font-serif text-2xl font-bold">अ</span>
          <span className="leading-tight"><span className="block font-serif text-lg sm:text-2xl font-bold text-navy-900">Anubhav</span><span className="hidden sm:block text-xs text-slate-600 tracking-wide">EXPERIENCE DOESN’T RETIRE</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {links.map(([h, l]) => <Link key={h} href={h} aria-current={path.startsWith(h) ? "page" : undefined} className={`px-3 py-2 rounded-lg text-base font-medium hover:bg-navy-50 ${path.startsWith(h) ? "text-navy-900 underline underline-offset-8 decoration-gold-500 decoration-2" : "text-slate-700"}`}>{l}</Link>)}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <LangSelect />
          <Link href="/register" className="btn-gold btn-sm">{t("nav.register")}</Link>
        </div>
        <div className="lg:hidden flex items-center gap-1.5 shrink-0"><LangSelect /><button className="btn-outline btn-sm !px-3" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button></div>
      </div>
      {open && (
        <nav id="mobile-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 pb-5" aria-label="Mobile">
          {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-medium border-b border-slate-100">{l}</Link>)}
          <div className="mt-4 grid gap-3">
            <Link href="/register" onClick={() => setOpen(false)} className="btn-gold">{t("nav.register")}</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200 mt-auto">
      <div className="container-x py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2"><p className="font-serif text-2xl text-white font-bold">Anubhav</p><p className="mt-2 max-w-md">A free-to-join marketplace connecting retired professionals with businesses, startups, freelancers and individuals who need experienced guidance.</p></div>
        <div><p className="font-semibold text-white mb-2">Explore</p><ul className="space-y-2"><li><Link href="/register" className="hover:text-white">Register as an Expert</Link></li><li><Link href="/saathi" className="hover:text-white">Anubhav Saathi (help for elders)</Link></li><li><Link href="/saathi/helper" className="hover:text-white">Become a helper</Link></li><li><Link href="/hire" className="hover:text-white">Hire an Expert</Link></li><li><Link href="/experts" className="hover:text-white">Find Experts</Link></li><li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li></ul></div>
        <div><p className="font-semibold text-white mb-2">Company</p><ul className="space-y-2"><li><Link href="/about" className="hover:text-white">About Us</Link></li><li><Link href="/contact" className="hover:text-white">Contact Us</Link></li><li><Link href="/privacy" className="hover:text-white">Privacy & Terms</Link></li></ul></div>
      </div>
      <div className="border-t border-navy-700"><div className="container-x py-6 text-sm space-y-2"><p>{DISCLAIMER}</p><p>© 2026 Anubhav.</p></div></div>
    </footer>
  );
}

export function LangSelect() {
  const { lang, setLang } = useApp();
  return (
    <label className="inline-flex items-center gap-1 rounded-lg border-2 border-navy-800 bg-white pl-2 pr-1 min-h-[44px] text-navy-800">
      <span aria-hidden className="hidden sm:inline">🌐</span><span className="sr-only">Language / भाषा</span>
      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent font-semibold text-sm py-2 pr-1 cursor-pointer w-[78px] sm:w-auto">
        {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </label>
  );
}
