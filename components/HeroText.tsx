"use client";
import Link from "next/link";
import { useApp } from "@/lib/app";
export function HeroText() {
  const { t } = useApp();
  const title = t("h2.title"); const m = title.match(/^(.*?[.?।]\s)(.+)$/); // highlight the second sentence
  return (
    <div className="relative">
      <p className="eyebrow"><span className="h-2.5 w-2.5 rounded-full bg-coral-500" aria-hidden />{t("h2.eyebrow")}</p>
      <h1 className="mt-5 text-4xl sm:text-5xl xl:text-6xl leading-[1.05]">
        {m ? <>{m[1]}<span className="relative inline-block"><span className="absolute inset-x-[-4px] bottom-1 h-[0.42em] bg-gold-500 -rotate-1 -z-10" aria-hidden />{m[2]}</span></> : title}
      </h1>
      <p className="mt-6 text-xl text-slate-700 leading-relaxed max-w-xl">{t("h2.sub")}</p>
      <div className="mt-8 flex flex-wrap gap-4"><Link href="/plan" className="btn-gold !text-lg !min-h-[60px] !px-8">{t("h2.cta1")} →</Link><Link href="/register" className="btn-outline !text-lg !min-h-[60px] !px-8">{t("h2.cta2")}</Link></div>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-slate-700 font-medium">
        {["Free, no obligation", "Takes 2 minutes", "Your number stays private"].map((x) => <li key={x} className="flex items-center gap-2"><span className="h-6 w-6 rounded-full bg-mint-500 text-white text-sm flex items-center justify-center border border-navy-300" aria-hidden>✓</span>{x}</li>)}
      </ul>
    </div>
  );
}
