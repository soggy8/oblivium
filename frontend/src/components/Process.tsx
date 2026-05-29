"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "Discover",
    text: "Decode the audience, market tension, and decisive commercial objective.",
    items: ["Audience codes", "Brand audit", "Strategic North Star"],
  },
  {
    title: "Design",
    text: "Design the identity, message, campaign system, and digital conversion path.",
    items: ["Identity & narrative", "Campaign system", "Web & UX"],
  },
  {
    title: "Dominate",
    text: "Deploy, measure, refine, and scale what creates qualified demand.",
    items: ["Performance ops", "Lifecycle & content", "Compounding growth"],
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 35%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="method" className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1fr]">
        <SectionHeader
          eyebrow="Method"
          title="Discover. Design. Dominate."
          text="A focused operating rhythm for moving from brand ambiguity to market command."
        />

        <div ref={ref} className="relative pl-10">
          <div className="absolute left-3 top-0 h-full w-px bg-white/15" aria-hidden="true" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 w-px bg-gradient-to-b from-white via-parchment to-transparent"
            aria-hidden="true"
          />

          <div className="grid gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <article className="group relative grid gap-3 border border-white/15 bg-ink-soft p-7 transition-colors duration-500 hover:border-white/40">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.6rem] top-7 grid h-7 w-7 place-items-center rounded-full border border-white/40 bg-ink font-display text-sm text-parchment transition-colors duration-500 group-hover:border-white group-hover:text-white"
                  >
                    {index + 1}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-3xl text-parchment sm:text-4xl">
                      {step.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.34em] text-parchment">
                      Phase 0{index + 1}
                    </span>
                  </div>
                  <p className="max-w-xl text-base leading-7 text-smoke">{step.text}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-smoke transition-colors duration-500 group-hover:border-white/50 group-hover:text-parchment"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
