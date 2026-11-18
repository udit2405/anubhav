import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { CONTACT } from "@/lib/contact";
export const metadata: Metadata = { title: "Privacy Policy & Terms", description: "How Anubhav handles your information." };
const S = ({ h, children }: { h: string; children: React.ReactNode }) => <section><h2 className="text-2xl font-bold">{h}</h2><div className="mt-2 space-y-2 text-slate-700">{children}</div></section>;
export default function Page() {
  return (<>
    <PageHeader title="Privacy Policy & Terms" sub="Plain language. Last updated November 2026." />
    <div className="container-x py-12 max-w-3xl space-y-8 text-lg">
      <S h="What we collect">When you register, you send us your name, mobile number, email, age (optional), city, career details, skills, fees and, optionally, your photograph and verification documents.</S>
      <S h="What is shown publicly">Only your professional profile: name, photograph, designation, department, experience, location, skills, services, fees and availability. <strong>Your mobile number, email, age and documents are never published.</strong></S>
      <S h="How enquiries work">Clients write to the Anubhav team. We share their message with you, and connect you only if you agree. We do not give your contact details to clients without your consent.</S>
      <S h="Documents">Retirement proofs and certificates are used only to check your profile for a Verified badge, and are not shared with anyone.</S>
      <S h="Your control">You can ask us at any time to correct, hide or delete your profile and your data. Write to <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</S>
      <S h="Terms of use">
        <ul className="list-disc pl-6 space-y-1"><li>You must provide true information. Profiles with false claims are removed.</li><li>You list as an independent professional. You may not claim to represent or be endorsed by any government department or organisation you served.</li><li>Joining and a basic listing are free. You and your clients agree fees directly; Anubhav does not hold money at this stage.</li><li>Verified means we checked a document you supplied. It is not an endorsement of the quality of your advice.</li><li>We may remove profiles that are reported or appear misleading.</li></ul>
      </S>
    </div>
  </>);
}
