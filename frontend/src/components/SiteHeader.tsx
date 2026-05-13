"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LiveTime } from "@/components/LiveTime";
import { ScrambleText } from "@/components/ScrambleText";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid
          ? "border-gold/15 bg-ink/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8"
        aria-label="Primary navigation"
      >
        <a href="#top" className="group flex items-center gap-3" data-cursor="hover">
          <span className="grid h-10 w-10 place-items-center border border-gold/60 font-display text-base text-gold transition-colors duration-500 group-hover:border-gold-bright group-hover:text-gold-bright">
            OA
          </span>
          <span className="hidden font-display text-xl font-semibold tracking-[0.16em] text-parchment sm:inline-flex">
            Oblivium Atelier
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-xs uppercase tracking-[0.32em] text-smoke transition-colors duration-300 hover:text-parchment"
              data-cursor="hover"
            >
              <ScrambleText text={item.label} duration={420} />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <LiveTime />
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-gold/40 px-5 py-2 text-xs uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright md:inline-flex"
            data-cursor="hover"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-125" />
            <ScrambleText text="Start" duration={360} />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
