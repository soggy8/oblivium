import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroSequence } from "@/components/IntroSequence";
import { MouseSpotlight } from "@/components/MouseSpotlight";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Oblivium Atelier — Strategic Marketing for Ambitious Brands",
  description:
    "A black-and-gold marketing atelier shaping premium brands through strategy, creative direction, performance, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <IntroSequence />
        <SmoothScroll />
        <ScrollProgress />
        <MouseSpotlight />
        <CustomCursor />
        <div className="grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
