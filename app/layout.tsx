import type { Metadata } from "next";
import "./globals.css";
import { Atkinson_Hyperlegible, Source_Serif_4 } from "next/font/google";
import { AppProvider } from "@/lib/app";
import { Footer, Header } from "@/components/Shell";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3210";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Anubhav – Put Your Decades of Experience to Work | Free for Retired Professionals", template: "%s | Anubhav" },
  description: "Retired government officers, engineers, bankers, doctors and scientists: list your expertise for free and get hired for consulting, mentoring and project work. Your contact details stay private.",
  openGraph: { title: "Anubhav – Experience Doesn’t Retire", description: "Affordable access to decades of practical expertise.", type: "website", locale: "en_IN" },
};
const display = Source_Serif_4({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}><body className="min-h-screen flex flex-col">
      <AppProvider><Header /><main id="main" className="flex-1">{children}</main><Footer /></AppProvider>
    </body></html>
  );
}
