import type { Professional, Requirement } from "./types";

export interface MatchResult { pro: Professional; score: number; reasons: string[] }
/** Pluggable matcher. Swap RuleMatcher for an embeddings/LLM-backed matcher later without touching the UI. */
export interface Matcher { match(req: Requirement, pros: Professional[]): MatchResult[] | Promise<MatchResult[]> }

const STOP = new Set(["a","an","the","and","or","for","of","in","on","to","with","who","has","have","need","needs","looking","retired","government","experience","experienced","expert","experts","project","projects","work","i","am","we","are","is","my","our","from","as","at","by","help","required","require"]);
export const tokens = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.replace(/(ing|ers|er|es|s)$/, ""));
const overlap = (a: string[], b: string[]) => { if (!a.length) return 0; const B = new Set(b); return a.filter((x) => B.has(x)).length / a.length; };

export const RuleMatcher: Matcher = {
  match(req, pros) {
    const reqSpec = req.specializations.map((s) => s.toLowerCase());
    const reqText = tokens([req.title, req.description, req.skills.join(" "), req.specializations.join(" "), req.category, req.department].join(" "));
    return pros.map((pro) => {
      const reasons: string[] = []; let score = 0;
      // 1. Specialization (30)
      const proSpec = pro.specializations.map((s) => s.toLowerCase());
      const specHit = reqSpec.filter((s) => proSpec.includes(s));
      if (reqSpec.length) { score += 30 * (specHit.length / reqSpec.length); if (specHit.length) reasons.push(`Specialises in ${specHit.slice(0, 2).join(", ")}`); }
      else { const o = overlap(tokens(pro.specializations.join(" ")), reqText); score += 30 * Math.min(1, o * 2); }
      // 2. Department / category (20)
      const dep = req.department.trim().toLowerCase();
      if (dep && (pro.department.toLowerCase().includes(dep) || dep.includes(pro.department.toLowerCase()))) { score += 20; reasons.push(`Retired from ${pro.department}`); }
      else if (req.category && pro.category === req.category) { score += 12; reasons.push(`Works in ${pro.category}`); }
      else if (!dep && !req.category) { score += 8; }
      else if (overlap(tokens(pro.department + " " + pro.designation), reqText) > 0.1) score += 8;
      // 3. Skills / text relevance (15)
      const proText = tokens([pro.skills.join(" "), pro.summary, pro.designation, pro.specializations.join(" ")].join(" "));
      const t = overlap(reqText, proText); score += 15 * Math.min(1, t * 2.5);
      if (t > 0.25) reasons.push("Skills match your description");
      // 4. Location (15)
      if (req.mode === "remote") score += 12;
      else if (req.city && pro.city.toLowerCase() === req.city.toLowerCase()) { score += 15; reasons.push(`Based in ${pro.city}`); }
      else if (req.state && pro.state === req.state) { score += 10; reasons.push(`Based in ${pro.state}`); }
      else if (!req.city && !req.state) score += 8;
      else if (pro.availability.includes("Available for Travel")) { score += 5; }
      // 5. Experience (10)
      score += 10 * Math.min(1, pro.yearsService / 30); if (pro.yearsService >= 25) reasons.push(`${pro.yearsService} years of experience`);
      // 6. Availability (5)
      const wantsOnsite = req.mode !== "remote";
      const av = pro.availability;
      if (av.includes("Available Immediately")) { score += 3; }
      if ((req.mode === "remote" && av.includes("Available Remotely")) || (wantsOnsite && (av.includes("Available for On-Site Projects") || av.includes("Available for Travel")))) { score += 2; reasons.push(req.mode === "remote" ? "Available remotely" : "Available on-site"); }
      // 7. Budget (5)
      if (req.budgetMax == null && req.budgetMin == null) score += 3;
      else if (pro.pricingModels.includes("Free Services")) { score += 5; reasons.push("Offers free services"); }
      else if (pro.fee != null && req.budgetMax != null) { if (pro.fee <= req.budgetMax) { score += 5; reasons.push("Fee fits your budget"); } else if (pro.fee <= req.budgetMax * 1.3) score += 2; }
      else if (pro.pricingModels.includes("Negotiable")) score += 3;
      if (pro.verified) score += 2;
      return { pro, score: Math.round(Math.min(100, score)), reasons: reasons.slice(0, 4) };
    }).filter((m) => m.pro.status === "approved").sort((a, b) => b.score - a.score);
  },
};
