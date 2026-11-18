import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ProfileForm } from "@/components/ProfileForm";
export const metadata: Metadata = { title: "Register as an Expert", description: "List your expertise on Anubhav for free." };
export default function Register() {
  return (<><PageHeader title="Register as an Expert" sub="Free to join. It takes about 10 minutes. Verified profiles get a badge that builds client trust." /><div className="container-x py-10 max-w-3xl"><ProfileForm /></div></>);
}
