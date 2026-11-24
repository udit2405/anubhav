import type { Metadata } from "next";
import { Planner } from "@/components/Planner";
export const metadata: Metadata = {
  title: "Free Retirement Money Map: where should your savings work?",
  description: "Answer a few questions and get a personalised map of how retirees can balance safe income, real estate, mutual funds, gold and cover. Free 20-minute call with a specialist.",
};
export default function Page() {
  return (<>
    <section className="bg-gold-500 border-b-2 border-navy-900"><div className="container-x py-12 sm:py-16"><p className="eyebrow">Free · 2 minutes · No obligation</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-bold max-w-3xl">Where should your retirement savings work?</h1><p className="mt-3 text-xl text-navy-800 max-w-2xl">Get your personal Retirement Money Map: a clear picture of safe income, real estate and other options that fit you.</p></div></section>
    <div className="container-x py-10 max-w-4xl"><Planner /></div>
  </>);
}
