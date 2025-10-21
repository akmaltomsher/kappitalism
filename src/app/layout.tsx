import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const Spotlight = dynamic(() => import("@/components/effects/Spotlight"), { ssr: true });

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "KAPPITALISM — Inspired Home",
  description: "Visual replica of KAPPITALISM home design (for dev use)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased bg-black text-white`}>
        <Spotlight />
        {children}
      </body>
    </html>
  );
}
