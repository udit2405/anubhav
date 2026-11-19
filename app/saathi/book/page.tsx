import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/BookingWizard";
import { PageHeader } from "@/components/ui";
export const metadata: Metadata = { title: "Book a helper | Anubhav Saathi", description: "Book a verified helper for hospital visits, errands, phone lessons or companionship." };
export default function Page() {
  return (<><PageHeader title="Book a helper" sub="Four quick steps. You will see the price before you send anything." /><div className="container-x py-10"><Suspense fallback={null}><BookingWizard /></Suspense></div></>);
}
