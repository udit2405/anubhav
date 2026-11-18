"use client";
import { BASE } from "@/lib/base";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTable } from "@/lib/app";
import { AVAILABILITY, CATEGORY_NAMES, SERVICES, STATES } from "@/lib/data";
import { EMPTY, filtersFromParams, filtersToParams, searchPros, type Filters } from "@/lib/search";
import { Autocomplete, Disclaimer, Empty, ErrorBox, ExpertCard, PageHeader, Pager, Spinner, usePaged } from "@/components/ui";
import { SearchBox } from "@/components/SearchBox";

function Inner() {
  const router = useRouter(); const sp = useSearchParams(); 
  const { rows: pros, loading, error, reload } = useTable("professionals"); const { rows: depts } = useTable("departments"); const { rows: specs } = useTable("specializations");
  const [showF, setShowF] = useState(false);
  const f = useMemo(() => filtersFromParams(new URLSearchParams(sp.toString())), [sp]);
  const setF = (patch: Partial<Filters>) => router.replace("/experts?" + filtersToParams({ ...f, ...patch }), { scroll: false });
  const [deptText, setDeptText] = useState(f.department);
  useEffect(() => setDeptText(f.department), [f.department]);

  const approved = useMemo(() => pros.filter((p) => p.status === "approved"), [pros]);
  const results = useMemo(() => searchPros(approved, f), [approved, f]);
  const pg = usePaged(results, 12);
  useEffect(() => { pg.setPage(1); /* eslint-disable-next-line */ }, [sp.toString()]);

  const active = (Object.keys(EMPTY) as (keyof Filters)[]).filter((k) => k !== "sort" && f[k] && f[k] !== EMPTY[k]);
  const sel = "input";
  const filtersUi = (
    <div className="space-y-5">
      <div><label className="label" htmlFor="x-dept">Department / organisation</label>
        <Autocomplete id="x-dept" value={deptText} onChange={(v) => { setDeptText(v); if (!v) setF({ department: "" }); }} onSelect={(o) => setF({ department: o?.value ?? "" })} options={depts.map((d) => ({ value: d.name, hint: d.category }))} allowCustom={false} placeholder="Type to search…" /></div>
      <div><label className="label" htmlFor="x-cat">Professional category</label><select id="x-cat" className={sel} value={f.category} onChange={(e) => setF({ category: e.target.value })}><option value="">All categories</option>{CATEGORY_NAMES.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label className="label" htmlFor="x-spec">Specialization</label><select id="x-spec" className={sel} value={f.specialization} onChange={(e) => setF({ specialization: e.target.value })}><option value="">Any</option>{specs.map((x) => <option key={x.id}>{x.name}</option>)}</select></div>
      <div><label className="label" htmlFor="x-state">State</label><select id="x-state" className={sel} value={f.state} onChange={(e) => setF({ state: e.target.value })}><option value="">All states</option>{STATES.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label className="label" htmlFor="x-city">City</label><input id="x-city" className="input" value={f.city} onChange={(e) => setF({ city: e.target.value })} placeholder="e.g. Jaipur" /></div>
      <div><label className="label" htmlFor="x-yrs">Minimum years of experience</label><select id="x-yrs" className={sel} value={f.minYears} onChange={(e) => setF({ minYears: Number(e.target.value) })}><option value={0}>Any</option>{[10, 20, 25, 30, 35].map((y) => <option key={y} value={y}>{y}+ years</option>)}</select></div>
      <div><label className="label" htmlFor="x-des">Previous designation</label><input id="x-des" className="input" value={f.designation} onChange={(e) => setF({ designation: e.target.value })} placeholder="e.g. Engineer, Manager" /></div>
      <div><label className="label" htmlFor="x-svc">Service offered</label><select id="x-svc" className={sel} value={f.service} onChange={(e) => setF({ service: e.target.value })}><option value="">Any</option>{SERVICES.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label className="label" htmlFor="x-fee">Free or paid</label><select id="x-fee" className={sel} value={f.fee} onChange={(e) => setF({ fee: e.target.value as Filters["fee"] })}><option value="">Both</option><option value="free">Offers free services</option><option value="paid">Paid</option></select></div>
      <div><label className="label" htmlFor="x-av">Availability</label><select id="x-av" className={sel} value={f.availability} onChange={(e) => setF({ availability: e.target.value })}><option value="">Any</option>{AVAILABILITY.map((x) => <option key={x}>{x}</option>)}</select></div>
      <label className="flex items-center gap-3 min-h-[52px]"><input type="checkbox" className="h-5 w-5 accent-[#183358]" checked={f.verifiedOnly} onChange={(e) => setF({ verifiedOnly: e.target.checked })} /><span className="font-semibold">Verified profiles only</span></label>
      {active.length > 0 && <button className="btn-outline w-full" onClick={() => router.replace("/experts")}>Clear all filters</button>}
    </div>
  );
  if (!loading && approved.length === 0) return (<div className="container-x py-16 max-w-2xl text-center"><h2 className="text-3xl font-bold">We are onboarding our first experts</h2><p className="mt-3 text-lg text-slate-700">Retired professionals are joining now and profiles will appear here shortly. Looking to hire? Tell us what you need and we will connect you as soon as a match is available.</p><div className="mt-6 flex flex-wrap gap-4 justify-center"><a className="btn-primary" href={BASE + "/hire"}>Tell us what you need</a><a className="btn-gold" href={BASE + "/register"}>I am a retired professional</a></div></div>);
  return (
    <div className="container-x py-8">
      <div className="card p-4 sm:p-5 mb-6"><SearchBox key={f.q} initial={f.q} onSubmit={(q) => setF({ q })} /><p className="mt-3 text-sm text-slate-600">Try: {["Retired railway engineers", "Retired IAS officers in Rajasthan", "Retired civil engineers in Jaipur"].map((x, i) => <button key={x} className="underline mr-3" onClick={() => setF({ q: x })}>{x}</button>)}</p></div>
      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <aside className="hidden lg:block"><h2 className="text-xl font-bold mb-4">Filters</h2>{filtersUi}</aside>
        <div>
          <div className="lg:hidden mb-4"><button className="btn-outline w-full" onClick={() => setShowF(!showF)} aria-expanded={showF}>{showF ? "Hide filters" : `Show filters${active.length ? ` (${active.length})` : ""}`}</button>{showF && <div className="card p-4 mt-3">{filtersUi}</div>}</div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-lg"><strong>{results.length}</strong> expert{results.length === 1 ? "" : "s"} found{f.q && <> for “{f.q}”</>}</p>
            <label className="flex items-center gap-2 text-base">Sort by <select className="input !min-h-[44px] !w-auto" value={f.sort} onChange={(e) => setF({ sort: e.target.value as Filters["sort"] })}><option value="relevance">Best match</option><option value="experience">Most experience</option><option value="newest">Newest</option></select></label>
          </div>
          {active.length > 0 && <div className="flex flex-wrap gap-2 mb-4">{active.map((k) => <button key={k} className="chip !text-base !py-1.5 hover:bg-red-50" onClick={() => setF({ [k]: EMPTY[k] } as Partial<Filters>)}>{k === "verifiedOnly" ? "Verified" : k === "minYears" ? `${f.minYears}+ yrs` : String(f[k])} <span className="ml-2 font-bold" aria-label="remove filter">×</span></button>)}</div>}
          {loading ? <Spinner /> : error ? <ErrorBox msg={error} retry={reload} /> : results.length === 0 ? (
            <Empty title="No experts match your search">Try fewer filters or a broader search, or <button className="underline font-semibold" onClick={() => router.replace("/experts")}>clear everything</button>. You can also <a className="underline font-semibold" href={BASE + "/hire"}>post a requirement</a> and we will find suitable experts for you.</Empty>
          ) : (<>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{pg.slice.map(({ pro }) => <ExpertCard key={pro.id} p={pro} />)}</div>
            <Pager {...pg} />
          </>)}
          <Disclaimer className="mt-8" />
        </div>
      </div>
    </div>
  );
}
export default function Experts() { return (<><PageHeader title="Find Experts" sub="Search experienced retired professionals by department, skill, location and more." /><Suspense fallback={<Spinner />}><Inner /></Suspense></>); }
