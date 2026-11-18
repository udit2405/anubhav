import type { Professional } from "./types";
import { CITIES, STATES } from "./data";
import { tokens } from "./match";

export interface Filters {
  q: string; department: string; category: string; specialization: string; state: string; city: string; minYears: number; designation: string;
  service: string; fee: "" | "free" | "paid"; availability: string; verifiedOnly: boolean; sort: "relevance" | "experience" | "newest";
}
export const EMPTY: Filters = { q: "", department: "", category: "", specialization: "", state: "", city: "", minYears: 0, designation: "", service: "", fee: "", availability: "", verifiedOnly: false, sort: "relevance" };

const norm = (s: string) => s.toLowerCase();
const stem = (w: string) => w.replace(/(ing|ers|er|es|s)$/, "");
const SYN: Record<string, string[]> = { railway: ["rail", "railway", "railways"], rail: ["rail", "railway", "railways"], defence: ["defence", "defense", "army", "navy", "air force"], defense: ["defence", "army", "navy"], bank: ["bank", "banking"], doctor: ["medical", "hospital", "health"], accountant: ["accounts", "audit"], accounts: ["accounts", "audit", "accountant"] };

/** Parse a natural-language query such as "retired civil engineers in Jaipur" into location + keyword terms. */
export function parseQuery(q: string) {
  let rest = " " + norm(q) + " "; let city = "", state = "";
  for (const c of CITIES) if (rest.includes(" " + norm(c) + " ") || rest.includes(" " + norm(c) + "?")) { city = c; rest = rest.replace(norm(c), " "); }
  for (const s of STATES) if (s !== "Other" && rest.includes(norm(s))) { state = s; rest = rest.replace(norm(s), " "); }
  return { city, state, terms: tokens(rest) };
}

export function searchPros(pros: Professional[], f: Filters): { pro: Professional; rel: number }[] {
  const pq = f.q.trim() ? parseQuery(f.q) : null;
  const out: { pro: Professional; rel: number }[] = [];
  for (const pro of pros) {
    if (f.department && pro.department !== f.department) continue;
    if (f.category && pro.category !== f.category) continue;
    if (f.specialization && !pro.specializations.includes(f.specialization)) continue;
    if (f.state && pro.state !== f.state) continue;
    if (f.city && !norm(pro.city).includes(norm(f.city))) continue;
    if (f.minYears && pro.yearsService < f.minYears) continue;
    if (f.designation && !norm(pro.designation).includes(norm(f.designation))) continue;
    if (f.service && !pro.services.includes(f.service)) continue;
    if (f.fee === "free" && !pro.pricingModels.includes("Free Services")) continue;
    if (f.fee === "paid" && !(pro.fee && pro.fee > 0)) continue;
    if (f.availability && !pro.availability.includes(f.availability)) continue;
    if (f.verifiedOnly && !pro.verified) continue;
    let rel = pro.featured ? 5 : 0;
    if (pq) {
      if (pq.city && norm(pro.city) !== norm(pq.city)) continue;
      if (pq.state && pro.state !== pq.state) continue;
      const hay = norm([pro.name, pro.department, pro.designation, pro.category, pro.city, pro.state, pro.specializations.join(" "), pro.skills.join(" "), pro.summary].join(" "));
      const hayTokens = hay.split(/[^a-z0-9]+/).map(stem);
      let ok = true;
      for (const term of pq.terms) {
        const alts = (SYN[term] ?? [term]).map(stem);
        const hit = alts.some((a) => hayTokens.some((h) => h.startsWith(a) || (a.length > 4 && h.includes(a))));
        if (!hit) { ok = false; break; }
        rel += 10 + (norm(pro.designation + " " + pro.department).includes(term) ? 6 : 0);
      }
      if (!ok) continue;
    }
    out.push({ pro, rel });
  }
  out.sort((a, b) => f.sort === "experience" ? b.pro.yearsService - a.pro.yearsService : f.sort === "newest" ? b.pro.createdAt.localeCompare(a.pro.createdAt) : b.rel - a.rel || Number(b.pro.verified) - Number(a.pro.verified) || b.pro.yearsService - a.pro.yearsService);
  return out;
}

export function filtersFromParams(p: URLSearchParams): Filters {
  return { ...EMPTY, q: p.get("q") ?? "", department: p.get("department") ?? "", category: p.get("category") ?? "", specialization: p.get("specialization") ?? "", state: p.get("state") ?? "", city: p.get("city") ?? "", minYears: Number(p.get("minYears") ?? 0) || 0, designation: p.get("designation") ?? "", service: p.get("service") ?? "", fee: (p.get("fee") as Filters["fee"]) ?? "", availability: p.get("availability") ?? "", verifiedOnly: p.get("verified") === "1", sort: (p.get("sort") as Filters["sort"]) || "relevance" };
}
export function filtersToParams(f: Filters): string {
  const p = new URLSearchParams();
  (Object.keys(f) as (keyof Filters)[]).forEach((k) => { const v = f[k]; if (v && v !== "relevance") p.set(k === "verifiedOnly" ? "verified" : k, v === true ? "1" : String(v)); });
  return p.toString();
}
