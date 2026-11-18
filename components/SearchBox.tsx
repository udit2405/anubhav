"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Autocomplete, type Option } from "./ui";
import { CATEGORY_NAMES, DEPARTMENTS, DESIGNATIONS, EXAMPLE_SEARCHES, SPECIALIZATIONS } from "@/lib/data";

const OPTIONS: Option[] = [
  ...EXAMPLE_SEARCHES.map((v) => ({ value: v, hint: "Popular search" })),
  ...DEPARTMENTS.map((d) => ({ value: "Retired " + d.name + " officers", label: d.name, hint: "Department" })),
  ...SPECIALIZATIONS.map((s) => ({ value: s.name, hint: "Specialization" })),
  ...CATEGORY_NAMES.map((v) => ({ value: v, hint: "Category" })),
  ...DESIGNATIONS.map((v) => ({ value: "Retired " + v, label: v, hint: "Designation" })),
];

export function SearchBox({ initial = "", onSubmit, dark }: { initial?: string; onSubmit?: (q: string) => void; dark?: boolean }) {
  const router = useRouter(); const [q, setQ] = useState(initial);
  const options = useMemo(() => OPTIONS, []);
  const go = (v: string) => { if (onSubmit) onSubmit(v); else router.push(`/experts?q=${encodeURIComponent(v)}`); };
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); go(q); }} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1"><Autocomplete ariaLabel="Search experts" value={q} onChange={setQ} options={options} allowCustom={false} max={7} onSelect={(o) => o && go(o.value)} placeholder="Try “retired railway engineers in Jaipur”" /></div>
      <button type="submit" className={dark ? "btn-gold" : "btn-primary"}>Search</button>
    </form>
  );
}
