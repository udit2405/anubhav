"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Professional, Review, Department, Specialization } from "./types";
import { CATEGORIES, DEPARTMENTS, SPECIALIZATIONS } from "./data";
import { PROS, REVIEWS } from "./static";
import { LANGS, STR, type Lang } from "./i18n";

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; toast: (msg: string, kind?: "ok" | "err") => void }
const C = createContext<Ctx>(null as never);
export const useApp = () => useContext(C);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangS] = useState<Lang>("en");
  const [toasts, setToasts] = useState<{ id: number; msg: string; kind: string }[]>([]);
  useEffect(() => { try { const l = localStorage.getItem("anubhav:lang"); if (LANGS.some((x) => x.code === l)) setLangS(l as Lang); } catch {} }, []);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = LANGS.find((x) => x.code === lang)?.dir ?? "ltr"; }, [lang]);
  const setLang = (l: Lang) => { setLangS(l); try { localStorage.setItem("anubhav:lang", l); } catch {} };
  const t = (k: string) => STR[lang][k] ?? STR.en[k] ?? k;
  const toast = (msg: string, kind: "ok" | "err" = "ok") => { const id = Date.now() + Math.random(); setToasts((x) => [...x, { id, msg, kind }]); setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 5000); };
  return (
    <C.Provider value={{ lang, setLang, t, toast }}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 left-4 sm:left-auto z-[100] flex flex-col gap-2 sm:w-96">
        {toasts.map((x) => <div key={x.id} role="status" className={`rounded-lg px-4 py-3 shadow-lg text-white text-base ${x.kind === "err" ? "bg-red-700" : "bg-navy-800"}`}>{x.msg}</div>)}
      </div>
    </C.Provider>
  );
}

type Tables = { professionals: Professional; reviews: Review; departments: Department; specializations: Specialization };
const DATA: { [K in keyof Tables]: Tables[K][] } = { professionals: PROS, reviews: REVIEWS, departments: DEPARTMENTS, specializations: SPECIALIZATIONS };
/** Same shape as before so components stay simple; data is static now. */
export function useTable<K extends keyof Tables>(t: K) {
  const rows = useMemo(() => DATA[t], [t]);
  return { rows, loading: false, error: "", reload: () => {} };
}
export { CATEGORIES };
