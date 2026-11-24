import type { Metadata } from "next";
import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import { AppProvider } from "@/lib/app";
import { Footer, Header } from "@/components/Shell";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3210";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Anubhav – A Platform Built for India’s Retired | Share Your Experience, Help at Home", template: "%s | Anubhav" },
  description: "Anubhav is a platform built for India’s retired: list your expertise for free, charge for your time or help for free, and get trusted help at home. Your contact details stay private.",
  openGraph: { title: "Anubhav: Experience Never Retires.", description: "Share your experience, free or paid, and get help at home.", type: "website", locale: "en_IN", images: [{ url: site.replace(/\/$/, "") + "/og.png", width: 1200, height: 630 }] },
};
const display = Source_Serif_4({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}><body className="min-h-screen flex flex-col">
      <AppProvider><Header /><main id="main" className="flex-1">{children}</main><Footer /></AppProvider>
    </body></html>
  );
}
