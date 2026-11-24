import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { CONTACT } from "@/lib/contact";
export const metadata: Metadata = { title: "Privacy Policy & Terms", description: "How Anubhav handles your information." };
const S = ({ n, h, children }: { n: number; h: string; children: React.ReactNode }) => (
  <section className="card p-6 flex gap-5"><span className="h-10 w-10 shrink-0 rounded-full bg-navy-800 text-white font-serif text-lg font-bold flex items-center justify-center" aria-hidden>{n}</span>
    <div><h2 className="text-2xl">{h}</h2><div className="mt-2 space-y-2 text-lg text-slate-700">{children}</div></div></section>
);
export default function Page() {
  return (<>
    <PageHeader eyebrow="Your information" title="Privacy Policy & Terms" sub="Plain language. Last updated November 2026." icon="🔒" />
    <div className="container-x py-12 max-w-3xl space-y-5">
      <div className="card bg-mint-100 p-6"><p className="text-xl font-bold text-navy-900">The short version</p><ul className="mt-2 space-y-1.5 text-lg"><li>✓ Your phone number, email, age and documents are <strong>never published</strong>.</li><li>✓ People reach you only through Anubhav, and only if you agree.</li><li>✓ You can ask us to change or delete your details at any time.</li></ul></div>
      <S n={1} h="What we collect">When you register, you send us your name, mobile number, email, age (optional), city, career details, skills, fees and, optionally, your photograph and verification documents.</S>
      <S n={2} h="What is shown publicly">Only your professional profile: name, photograph, designation, department, experience, location, skills, services, fees and availability. <strong>Your mobile number, email, age and documents are never published.</strong></S>
      <S n={3} h="How enquiries work">People write to the Anubhav team. We share their message with you, and connect you only if you agree. We do not give your contact details to anyone without your consent.</S>
      <S n={4} h="Call-backs and messages">If you ask for a call back, we will call or WhatsApp only the number you give us, to help you register. Tell us to stop at any time and we will stop.</S>
      <S n={5} h="Documents">Retirement proofs and certificates are used only to check your profile for a Verified badge, and are not shared with anyone.</S>
      <S n={6} h="Your control (DPDP Act, 2023)">You can ask us at any time to see, correct or delete your data, hide your profile, or stop all calls and messages. Write to <a className="underline font-bold" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</S>
      <S n={7} h="Terms of use">
        <ul className="list-disc pl-6 space-y-1.5"><li>You must provide true information. Profiles with false claims are removed.</li><li>You list as an independent professional. You may not claim to represent or be endorsed by any government department or organisation you served.</li><li>Joining and a basic listing are free. You and the people who contact you agree fees directly; Anubhav does not hold money at this stage.</li><li>Verified means we checked a document you supplied. It is not an endorsement of the quality of your advice.</li><li>Helpers and experts are independent. In an emergency, call 112 or 108.</li><li>We may remove profiles that are reported or appear misleading.</li></ul>
      </S>
    </div>
  </>);
}
