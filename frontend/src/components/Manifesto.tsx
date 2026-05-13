"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Monogram } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";

export function Manifesto() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yQuote = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const xWord = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const monogramRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const monogramOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.16, 0.05]);

  return (
    <section
      ref={ref}
      aria-label="Atelier manifesto"
      className="relative overflow-hidden border-y border-gold/15 bg-ink py-32"
    >
      <motion.div
        style={{ rotate: monogramRotate, opacity: monogramOpacity }}
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 text-gold"
        aria-hidden="true"
      >
        <Monogram className="h-[36rem] w-[36rem]" />
      </motion.div>

      <motion.p
        style={{ x: xWord }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 select-none whitespace-nowrap text-center font-display text-[24vw] font-semibold leading-none tracking-[-0.06em] text-gold/[0.04]"
      >
        OBLIVIUM
      </motion.p>

      <motion.blockquote
        style={{ y: yQuote }}
        className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8"
      >
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-gold">
            — The Atelier Manifesto
          </p>
        </Reveal>
        <p className="mt-10 font-display text-[2.4rem] leading-[1.05] tracking-[-0.04em] text-parchment text-glow sm:text-5xl md:text-7xl">
          <span className="italic text-gold-bright">Quiet brands</span> are forgotten.
          <br />
          We build the kind that <span className="italic text-gold-bright">linger</span>.
        </p>
        <Reveal delay={0.25}>
          <div className="mx-auto mt-14 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-7 text-smoke sm:text-lg">
            Marketing without taste is noise. Taste without strategy is decoration. Oblivium Atelier composes both — and the disciplined performance system that turns it into demand.
          </p>
        </Reveal>
      </motion.blockquote>
    </section>
  );
}
