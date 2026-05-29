"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ScrambleText } from "@/components/ScrambleText";
import { SectionHeader } from "@/components/SectionHeader";

type Service = {
  title: string;
  text: string;
  pillars: string[];
};

const services: Service[] = [
  {
    title: "Brand Strategy",
    text: "Positioning systems, narrative architecture, and audience clarity for brands that need sharper market gravity.",
    pillars: ["Positioning", "Audience codes", "Naming & lexicon"],
  },
  {
    title: "Creative Direction",
    text: "Campaign worlds, visual language, and editorial taste that turn attention into cultural memory.",
    pillars: ["Identity systems", "Art direction", "Editorial campaigns"],
  },
  {
    title: "Performance Marketing",
    text: "Paid media and conversion architecture tuned for efficient acquisition without flattening the brand.",
    pillars: ["Paid media", "Funnel design", "Lifecycle"],
  },
  {
    title: "Digital Experience",
    text: "Websites and funnels with cinematic restraint, crisp UX, and a clear path from intrigue to inquiry.",
    pillars: ["Web design", "Motion & UX", "Analytics & ops"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Capabilities"
          title="Built for brands that need more than visibility."
          text="We shape the market signal, the visual world, and the conversion path together — engineered as one premium system."
        />

        <div className="mt-16 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <ServiceCard index={index} service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  service: Service;
  index: number;
};

function ServiceCard({ service, index }: CardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}px ${y}px, rgba(255,255,255,0.12), transparent 55%)`,
  );

  return (
    <article
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(-200);
        mouseY.set(-200);
      }}
      className="group relative isolate flex min-h-[22rem] flex-col justify-between bg-ink-soft p-9 transition-colors duration-500 hover:bg-ink-card"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="flex items-baseline justify-between">
        <span className="font-display text-6xl text-parchment/60 transition-colors duration-500 group-hover:text-white">
          0{index + 1}
        </span>
        <span className="h-px w-16 bg-white/40 transition-all duration-500 group-hover:w-24 group-hover:bg-white" />
      </div>

      <div>
        <h3 className="mt-12 font-display text-4xl font-semibold leading-tight text-parchment sm:text-5xl">
          <ScrambleText text={service.title} duration={520} />
        </h3>
        <p className="mt-5 max-w-md text-base leading-7 text-smoke">{service.text}</p>

        <ul className="mt-7 flex flex-wrap gap-2">
          {service.pillars.map((pillar) => (
            <li
              key={pillar}
              className="border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-smoke transition-colors duration-500 group-hover:border-white/50 group-hover:text-parchment"
            >
              {pillar}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
