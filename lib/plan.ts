/** Retirement Money Map: illustrative allocation logic + lead scoring. Educational only, no return promises. */
export const AGE_BANDS = ["Under 60", "60–65", "65–70", "70–75", "75+"];
export const CORPUS_BANDS: { label: string; mid: number; weight: number }[] = [
  { label: "Under ₹25 lakh", mid: 1500000, weight: 0 }, { label: "₹25–50 lakh", mid: 3750000, weight: 1 }, { label: "₹50 lakh – ₹1 crore", mid: 7500000, weight: 2 },
  { label: "₹1–3 crore", mid: 20000000, weight: 3 }, { label: "₹3–5 crore", mid: 40000000, weight: 4 }, { label: "Above ₹5 crore", mid: 70000000, weight: 5 },
];
export const SOURCES = ["Retirement benefits (PF / gratuity / commutation)", "Property sale", "Savings and fixed deposits", "Business sale", "Inheritance", "Other"];
export const GOALS = ["Steady monthly income", "Protect my capital", "Grow wealth for my children", "Buy or upgrade property", "Earn rental income", "Healthcare and insurance security", "Reduce tax", "Will and estate planning"];
export const INTERESTS = ["Residential property", "Plots / land", "Commercial / rental property", "Senior living homes", "REITs", "Fixed deposits / SCSS / bonds", "Mutual funds", "Gold", "Annuity / insurance", "Not sure yet, guide me"];
export const RISK = [["safe", "Safety first", "I cannot afford to lose my capital."], ["balanced", "Balanced", "Some growth, with steady income."], ["growth", "Growth", "I can ride out ups and downs for higher growth."]] as const;
export const TIMELINES = ["Within this month", "In the next 3 months", "In 3–6 months", "Just exploring"];

export interface Bucket { key: string; name: string; pct: number; color: string; blurb: string; ask: string }
const META: Record<string, Omit<Bucket, "pct" | "key">> = {
  fixed: { name: "Safe income (FD, SCSS, bonds)", color: "#0B6B4C", blurb: "Government-backed and bank instruments for steady, predictable income.", ask: "Which options suit my tax slab, and how do I ladder maturities?" },
  property: { name: "Real estate", color: "#FF6B57", blurb: "Rental property, plots, or senior-living homes for income and long-term value.", ask: "Is the project RERA-registered, and what is the realistic net rental yield?" },
  funds: { name: "Mutual funds", color: "#5560A8", blurb: "Diversified market investments for long-term growth, with monthly withdrawal options.", ask: "How should I use SWP so withdrawals are tax-efficient?" },
  gold: { name: "Gold", color: "#FFB400", blurb: "A small anchor against inflation and uncertainty (sovereign gold bonds, ETFs).", ask: "Which form of gold is cheapest and safest to hold?" },
  cover: { name: "Health cover & annuity", color: "#17A878", blurb: "A medical cushion and optional guaranteed lifetime income.", ask: "Is my health cover enough, and is an annuity worth it for me?" },
  liquid: { name: "Emergency reserve", color: "#8FCBFF", blurb: "Easily accessible money for 12 months of expenses and surprises.", ask: "Where should I park this so it earns something yet stays accessible?" },
};
export function buildMap(input: { age: string; risk: string; goals: string[]; interests: string[]; corpusIdx: number }) {
  const base: Record<string, Record<string, number>> = {
    safe: { fixed: 50, property: 15, funds: 10, gold: 8, cover: 10, liquid: 7 },
    balanced: { fixed: 33, property: 25, funds: 20, gold: 8, cover: 8, liquid: 6 },
    growth: { fixed: 20, property: 28, funds: 32, gold: 7, cover: 6, liquid: 7 },
  };
  const w = { ...(base[input.risk] ?? base.balanced) };
  const move = (from: string, to: string, n: number) => { const x = Math.min(n, w[from] - 2); if (x > 0) { w[from] -= x; w[to] += x; } };
  if (input.age === "70–75" || input.age === "75+") { move("funds", "fixed", 10); move("property", "cover", 3); }
  if (input.interests.some((i) => /property|plots|rental|senior living/i.test(i)) || input.goals.includes("Buy or upgrade property") || input.goals.includes("Earn rental income")) move("funds", "property", 5);
  else move("property", "fixed", 8);
  if (input.goals.includes("Healthcare and insurance security")) move("funds", "cover", 4);
  if (input.goals.includes("Protect my capital")) move("funds", "fixed", 5);
  if (input.goals.includes("Grow wealth for my children")) move("fixed", "funds", 5);
  const mid = [...CORPUS_BANDS][input.corpusIdx]?.mid ?? 7500000;
  const keys = Object.keys(w).sort((a, b) => w[b] - w[a]);
  return keys.map((k) => ({ key: k, pct: w[k], amount: Math.round((mid * w[k]) / 100 / 100000) * 100000, ...META[k] })) as (Bucket & { amount: number })[];
}
export function scoreLead(corpusIdx: number, timeline: string) {
  const t = TIMELINES.indexOf(timeline); // 0 hottest
  if (corpusIdx >= 3 && t <= 1) return "A (hot: ₹1Cr+, deciding soon)";
  if (corpusIdx >= 2 && t <= 2) return "B (warm)";
  if (corpusIdx >= 3) return "B (warm: large corpus, exploring)";
  return "C (nurture)";
}
export const lakhs = (n: number) => (n >= 10000000 ? `₹${(n / 10000000).toFixed(n % 10000000 ? 1 : 0)} Cr` : `₹${Math.round(n / 100000)} L`);
