"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { GoldDust } from "@/components/GoldDust";
import { MagneticButton } from "@/components/MagneticButton";
import { Monogram } from "@/components/Monogram";
import { SplitWords } from "@/components/SplitWords";
import { StatCounter } from "@/components/StatCounter";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const orbX = useMotionValue(0);
  const orbY = useMotionValue(0);
  const orbXSpring = useSpring(orbX, { stiffness: 60, damping: 18, mass: 1 });
  const orbYSpring = useSpring(orbY, { stiffness: 60, damping: 18, mass: 1 });

  // Use a plain MotionValue that starts at 1 so the hero is never
  // accidentally hidden during the intro sequence. We only update it from
  // native scroll events that fire AFTER the user actually scrolls.
  const scrollYMV = useMotionValue(0);
  const heroParallax = useTransform(scrollYMV, [0, 600], [0, 110]);
  const titleParallax = useTransform(scrollYMV, [0, 600], [0, -40]);
  const monogramRotate = useTransform(scrollYMV, [0, 1200], [0, 60]);

  useEffect(() => {
    const onScroll = () => scrollYMV.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollYMV]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = (event.clientX - rect.left) / rect.width - 0.5;
      const cy = (event.clientY - rect.top) / rect.height - 0.5;
      orbX.set(cx * 60);
      orbY.set(cy * 40);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [orbX, orbY]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-32 pb-24 sm:px-8"
    >
      <motion.div
        style={{ y: heroParallax }}
        className="absolute inset-x-0 top-0 h-[44rem] bg-radial-gold opacity-95"
        aria-hidden="true"
      />

      <GoldDust density={36} />

      <motion.div
        aria-hidden="true"
        style={{ x: orbXSpring, y: orbYSpring }}
        className="absolute left-[18%] top-[30%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,190,122,0.36),transparent_60%)] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: orbXSpring, y: orbYSpring }}
        className="absolute right-[6%] bottom-[18%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.22),transparent_60%)] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(198,161,91,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,161,91,0.35) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(circle at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: titleParallax }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.65fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex items-center gap-4 text-xs uppercase tracking-[0.42em] text-gold"
          >
            <span className="h-px w-10 bg-gold/70" />
            Black-Gold Marketing Atelier
            <span className="hidden h-px w-10 bg-gold/40 sm:inline-flex" />
            <span className="hidden text-smoke sm:inline-flex">EST. MMXXVI</span>
          </motion.div>

          <h1 className="font-display text-[3.4rem] font-semibold leading-[0.86] tracking-[-0.05em] text-parchment text-glow sm:text-7xl md:text-8xl xl:text-[10rem]">
            <SplitWords text="We engineer" stagger={0.08} delay={0.1} />
            <br />
            <SplitWords
              text="cultural"
              wordClassName="italic text-gold-bright"
              stagger={0.1}
              delay={0.22}
            />{" "}
            <SplitWords text="gravity" stagger={0.1} delay={0.32} />
            <br />
            <SplitWords text="for ambitious brands." stagger={0.07} delay={0.44} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-xl text-lg leading-8 text-smoke sm:text-xl"
          >
            Oblivium Atelier blends brand strategy, creative direction, and performance systems into digital experiences that feel rare and convert with intent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#contact" variant="primary">
              Book a Strategy Session
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View Work
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid max-w-2xl gap-10 border-t border-gold/15 pt-10 sm:grid-cols-3"
          >
            <StatCounter value={84} suffix="+" label="Brands shaped" />
            <StatCounter value={3.2} decimals={1} suffix="x" label="Avg. ROI lift" />
            <StatCounter value={5} label="Continents served" />
          </motion.dl>
        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md text-gold lg:max-w-none"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 110, ease: "linear", repeat: Infinity }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="rgba(198,161,91,0.4)"
                strokeWidth="0.4"
                strokeDasharray="1 5"
              />
              <circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="rgba(198,161,91,0.18)"
                strokeWidth="0.3"
                strokeDasharray="2 8"
              />
            </svg>
          </motion.div>
          <motion.div
            style={{ rotate: monogramRotate }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <Monogram className="h-full w-full" />
          </motion.div>
        </motion.aside>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-smoke"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="block h-8 w-px bg-gold/60"
        />
      </motion.div>
    </section>
  );
}
