"use client";
import Link from "next/link";
import { useApp } from "@/lib/app";
export function HeroText() {
  const { t } = useApp();
  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-4 py-1.5 text-gold-300 font-semibold tracking-wide uppercase text-sm"><span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden />{t("tag")}</p>
      <h1 className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-bold !text-white leading-[1.08]">{t("hero.title")}</h1>
      <div className="mt-5 h-1 w-20 bg-gold-500 rounded" aria-hidden />
      <p className="mt-5 text-lg sm:text-xl text-navy-100 leading-relaxed max-w-xl">{t("pitch.sub")}</p>
      <div className="mt-8 flex flex-wrap gap-4"><Link href="/register" className="btn-gold !text-lg !min-h-[60px] !px-8">{t("hero.cta2")} — Free</Link><a href="#earn" className="btn border-2 border-white/70 text-white hover:bg-white hover:text-navy-900">See what you could earn</a></div>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg text-navy-100">
        {["100% free to join", "Phone & email stay private", "You set fees & hours", "No app, no password"].map((x) => <li key={x} className="flex items-center gap-2"><span className="h-6 w-6 shrink-0 rounded-full bg-gold-500 text-white text-sm flex items-center justify-center" aria-hidden>✓</span>{x}</li>)}
      </ul>
    </div>
  );
}
