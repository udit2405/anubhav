import type { Option } from "@/components/ui";
import type { Department } from "./types";
/** Ranks departments for the autocomplete: name/word/tag prefix first (in curated list order), then substring. */
export function makeDeptRank(depts: Department[]) {
  const tagsByName = new Map(depts.map((d) => [d.name, d.tags]));
  return (o: Option, q: string) => {
    const name = o.value.toLowerCase(); const words = name.split(/[\s/(),-]+/); const tags = tagsByName.get(o.value) ?? [];
    if (name.startsWith(q) || words.some((w) => w.startsWith(q)) || tags.some((t) => t.startsWith(q))) return 80;
    if (name.includes(q)) return 40; if (tags.some((t) => t.includes(q))) return 30; return 0;
  };
}
export const PREFILL_KEY = "anubhav:prefill:v1";
