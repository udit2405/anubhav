"use client";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { BASE } from "@/lib/base";
import type { Professional } from "@/lib/types";

export const inr = (n: number | null | undefined) => (n == null ? "" : "₹" + n.toLocaleString("en-IN"));
export const initials = (n: string) => n.replace(/^(Dr\.|Prof\.|Col\.|Justice)\s*/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
export const feeText = (p: Professional) => p.pricingModels.includes("Free Services") && !p.fee ? "Free" : p.fee ? `From ${inr(p.fee)}${p.pricingModels.includes("Monthly Retainer") && !p.pricingModels.includes("Per Consultation") ? "/month" : p.pricingModels.includes("Hourly Charges") && !p.pricingModels.includes("Per Consultation") ? "/hour" : ""}` : "Negotiable";

export function Avatar({ p, size = 64 }: { p: Pick<Professional, "name" | "photo">; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (p.photo) return <img src={p.photo.startsWith("/") ? BASE + p.photo : p.photo} alt={`Photograph of ${p.name}`} width={size} height={size} className="rounded-full object-cover shrink-0 border border-slate-200" style={{ width: size, height: size }} />;
  return <div aria-hidden className="rounded-full bg-navy-800 text-gold-300 flex items-center justify-center font-serif font-bold shrink-0" style={{ width: size, height: size, fontSize: size / 2.8 }}>{initials(p.name)}</div>;
}

export function VerifiedBadge({ small }: { small?: boolean }) {
  return <span className={`inline-flex items-center gap-1 rounded-full bg-gold-50 border border-gold-300 text-saffron-600 font-semibold ${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}`} title="Retirement / experience documents checked by Anubhav"><span aria-hidden>✔</span> Verified</span>;
}
export function SampleBadge() {
  return <span className="inline-flex rounded-full bg-slate-100 border border-slate-300 text-slate-700 px-2 py-0.5 text-xs font-medium" title="Illustrative profile for demonstration only. Not a real, verified person.">Sample profile</span>;
}

export function ExpertCard({ p, extra, saved, onSave }: { p: Professional; extra?: ReactNode; saved?: boolean; onSave?: () => void }) {
  return (
    <article className="card p-5 flex flex-col h-full hover:border-navy-300 transition-colors">
      <div className="flex gap-4">
        <Avatar p={p} size={64} />
        <div className="min-w-0">
          <h3 className="text-xl font-bold leading-tight"><Link href={`/experts/${p.id}`} className="hover:underline">{p.name}</Link></h3>
          <p className="text-slate-700">{p.designation}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">{p.verified && <VerifiedBadge small />}{p.sample && <SampleBadge />}{p.featured && <span className="rounded-full bg-navy-800 text-white px-2 py-0.5 text-xs">Featured</span>}</div>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div className="col-span-2"><dt className="text-slate-600">Retired from</dt><dd className="font-semibold">{p.department} <span className="font-normal text-slate-600">({p.retirementYear})</span></dd></div>
        <div><dt className="text-slate-600">Experience</dt><dd className="font-semibold">{p.yearsService} years</dd></div>
        <div><dt className="text-slate-600">Location</dt><dd className="font-semibold">{p.city}, {p.state}</dd></div>
        <div><dt className="text-slate-600">Consultation</dt><dd className="font-semibold">{p.acceptEnquiries ? (p.availability.includes("Available Immediately") ? "Available now" : "Available") : "Not accepting"}</dd></div>
        <div><dt className="text-slate-600">Starting fee</dt><dd className="font-semibold text-navy-800">{feeText(p)}</dd></div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-1.5">{p.specializations.slice(0, 3).map((s) => <span key={s} className="chip">{s}</span>)}</div>
      {extra}
      <div className="mt-auto pt-4 flex gap-2">
        <Link href={`/experts/${p.id}`} className="btn-primary btn-sm flex-1">View profile</Link>
        {onSave && <button type="button" onClick={onSave} aria-pressed={!!saved} className="btn-outline btn-sm" aria-label={saved ? `Remove ${p.name} from shortlist` : `Shortlist ${p.name}`}>{saved ? "★ Saved" : "☆ Save"}</button>}
      </div>
    </article>
  );
}

export function Field({ label, hint, error, required, children, htmlFor }: { label: string; hint?: string; error?: string; required?: boolean; children: ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label className="label" htmlFor={htmlFor}>{label}{required && <span className="text-red-700" aria-hidden> *</span>}{!required && <span className="text-slate-500 font-normal text-sm"> (optional)</span>}</label>
      {children}
      {hint && !error && <p className="hint">{hint}</p>}
      {error && <p role="alert" className="text-sm text-red-700 font-medium mt-1">{error}</p>}
    </div>
  );
}

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return <div role="status" className="flex items-center justify-center gap-3 py-16 text-slate-600"><span className="h-6 w-6 rounded-full border-4 border-navy-200 border-t-navy-800 animate-spin" />{label}</div>;
}
export function ErrorBox({ msg, retry }: { msg: string; retry?: () => void }) {
  return <div role="alert" className="rounded-lg border border-red-300 bg-red-50 text-red-900 p-4">Something went wrong: {msg} {retry && <button className="underline font-semibold ml-2" onClick={retry}>Try again</button>}</div>;
}
export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center"><p className="text-xl font-serif font-bold text-navy-900">{title}</p><div className="mt-2 text-slate-600">{children}</div></div>;
}
export function PageHeader({ title, sub, eyebrow, icon }: { title: string; sub?: string; eyebrow?: string; icon?: string }) {
  return (
    <div className="bg-navy-50 border-b border-navy-200">
      <div className="container-x py-9 sm:py-12 flex items-center justify-between gap-8">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-1 text-3xl sm:text-4xl">{title}</h1>
          <div className="mt-3 h-1 w-14 rounded bg-saffron-600" aria-hidden />
          {sub && <p className="mt-4 text-sm sm:text-base text-slate-700">{sub}</p>}
        </div>
        {icon && <div className="hidden md:flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-white border border-navy-200 text-6xl shadow-hard" aria-hidden>{icon}</div>}
      </div>
    </div>
  );
}
export function Disclaimer({ className = "" }: { className?: string }) {
  return <p className={`text-sm text-slate-600 ${className}`}>Listed professionals are independent individuals. They do not represent, and are not endorsed by, any government department, bank, PSU or organisation they previously served. Profile details are self-declared unless marked “Verified”.</p>;
}
export function Stars({ n }: { n: number }) { return <span aria-label={`${n} out of 5`} className="text-gold-500 tracking-wide">{"★".repeat(Math.round(n))}<span className="text-slate-300">{"★".repeat(5 - Math.round(n))}</span></span>; }

/* --------- Searchable autocomplete (combobox pattern; allows custom values) */
export interface Option { value: string; label?: string; hint?: string }
export function Autocomplete({ id, value, onChange, options, rank, placeholder, allowCustom = true, customLabel = "Use", onSelect, ariaLabel, max = 8 }: {
  id?: string; value: string; onChange: (v: string) => void; options: Option[]; rank?: (o: Option, q: string) => number; placeholder?: string; allowCustom?: boolean; customLabel?: string; onSelect?: (o: Option | null) => void; ariaLabel?: string; max?: number;
}) {
  const auto = useId(); const lid = (id ?? auto) + "-list";
  const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const q = value.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return options.slice(0, max);
    const scored = options.map((o, i) => ({ o, i, s: rank ? rank(o, q) : defaultRank(o, q) })).filter((x) => x.s > 0);
    scored.sort((a, b) => b.s - a.s || a.i - b.i);
    return scored.slice(0, max).map((x) => x.o);
  }, [options, q, rank, max]);
  const exact = options.some((o) => o.value.toLowerCase() === q);
  const showCustom = allowCustom && q.length > 0 && !exact;
  const items: (Option | { custom: true; value: string })[] = [...matches, ...(showCustom ? [{ custom: true as const, value: value.trim() }] : [])];
  useEffect(() => { setActive(0); }, [q]);
  useEffect(() => { const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const pick = (it: (typeof items)[number] | undefined) => { if (!it) return; onChange(it.value); onSelect?.("custom" in it ? null : it); setOpen(false); };
  return (
    <div ref={ref} className="relative">
      <input id={id} role="combobox" aria-expanded={open} aria-controls={lid} aria-autocomplete="list" aria-label={ariaLabel} aria-activedescendant={open ? `${lid}-${active}` : undefined} autoComplete="off"
        className="input" placeholder={placeholder} value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, items.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === "Enter" && open && items.length) { e.preventDefault(); pick(items[active]); }
          else if (e.key === "Escape") setOpen(false);
        }} />
      {open && items.length > 0 && (
        <ul id={lid} role="listbox" className="absolute z-30 mt-1 w-full max-h-80 overflow-auto rounded-lg border border-slate-300 bg-white shadow-xl">
          {items.map((it, i) => (
            <li key={"custom" in it ? "__custom" : it.value} id={`${lid}-${i}`} role="option" aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); pick(it); }} onMouseEnter={() => setActive(i)}
              className={`px-4 py-3 cursor-pointer text-base border-b border-slate-100 last:border-0 ${i === active ? "bg-navy-50" : ""}`}>
              {"custom" in it ? <span>{customLabel} “<strong>{it.value}</strong>” <span className="text-slate-600 text-sm">(not in list)</span></span> : <><Highlight text={it.label ?? it.value} q={q} />{it.hint && <span className="block text-sm text-slate-600">{it.hint}</span>}</>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function defaultRank(o: Option, q: string) {
  const s = (o.label ?? o.value).toLowerCase(); const words = s.split(/[\s/(),-]+/);
  if (s.startsWith(q)) return 100; if (words.some((w) => w.startsWith(q))) return 70; if (s.includes(q)) return 40; return 0;
}
export function Highlight({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-gold-100 text-navy-900 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

/* --------- Multi-select chips (checkbox grid) with custom entries */
export function CheckGroup({ options, value, onChange, legend, columns = "sm:grid-cols-2" }: { options: string[]; value: string[]; onChange: (v: string[]) => void; legend: string; columns?: string }) {
  const toggle = (o: string) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((o) => (
          <label key={o} className={`flex items-center gap-3 rounded-lg border px-4 min-h-[52px] cursor-pointer ${value.includes(o) ? "border-navy-700 bg-navy-50" : "border-slate-300 bg-white hover:bg-slate-50"}`}>
            <input type="checkbox" className="h-5 w-5 accent-[#123C2D]" checked={value.includes(o)} onChange={() => toggle(o)} /> <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function TagInput({ value, onChange, placeholder, suggestions = [], id }: { value: string[]; onChange: (v: string[]) => void; placeholder: string; suggestions?: string[]; id?: string }) {
  const [text, setText] = useState("");
  const add = (raw: string) => { const parts = raw.split(",").map((s) => s.trim()).filter(Boolean); if (!parts.length) return; const next = [...value]; parts.forEach((p) => { if (!next.some((x) => x.toLowerCase() === p.toLowerCase())) next.push(p); }); onChange(next); setText(""); };
  return (
    <div>
      <div className="flex gap-2">
        <input id={id} className="input" value={text} placeholder={placeholder} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(text); } }} />
        <button type="button" className="btn-outline" onClick={() => add(text)}>Add</button>
      </div>
      {suggestions.length > 0 && <datalist id={(id ?? "tags") + "-sug"}>{suggestions.map((s) => <option key={s} value={s} />)}</datalist>}
      {value.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{value.map((v) => <span key={v} className="chip !text-base !py-1.5">{v}<button type="button" aria-label={`Remove ${v}`} className="ml-2 text-slate-600 hover:text-red-700 font-bold" onClick={() => onChange(value.filter((x) => x !== v))}>×</button></span>)}</div>}
    </div>
  );
}

/* --------- Table helpers for dashboards/admin */
export function usePaged<T>(rows: T[], size = 10) {
  const [page, setPage] = useState(1); const pages = Math.max(1, Math.ceil(rows.length / size));
  useEffect(() => { if (page > pages) setPage(pages); }, [page, pages]);
  return { page, pages, setPage, slice: rows.slice((page - 1) * size, page * size), total: rows.length };
}
export function Pager({ page, pages, setPage, total }: { page: number; pages: number; setPage: (n: number) => void; total: number }) {
  return (
    <div className="flex items-center justify-between gap-3 mt-4 text-sm flex-wrap">
      <span className="text-slate-600">{total} result{total === 1 ? "" : "s"}</span>
      <div className="flex items-center gap-2">
        <button className="btn-outline btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Previous</button>
        <span>Page {page} of {pages}</span>
        <button className="btn-outline btn-sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </div>
  );
}
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-xl max-h-[92vh] overflow-auto p-6">
        <div className="flex items-start justify-between gap-4 mb-4"><h2 className="text-2xl font-bold">{title}</h2><button onClick={onClose} aria-label="Close" className="btn-outline btn-sm">✕</button></div>
        {children}
      </div>
    </div>
  );
}
