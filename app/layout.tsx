import type { Metadata } from "next";
import "./globals.css";
import { Atkinson_Hyperlegible, Source_Serif_4 } from "next/font/google";
import { AppProvider } from "@/lib/app";
import { Footer, Header } from "@/components/Shell";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3210";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Anubhav – A Platform Built for India’s Retired | Savings, Work & Help at Home", template: "%s | Anubhav" },
  description: "Anubhav is a platform built for India’s retired: free guidance on savings and property, work that uses your experience, and trusted help at home. Your contact details stay private.",
  openGraph: { title: "Anubhav – A platform built for India’s retired", description: "Savings guidance, work that uses your experience, and help at home, in one trusted place.", type: "website", locale: "en_IN" },
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
