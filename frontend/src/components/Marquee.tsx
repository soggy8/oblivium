"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  duration?: number;
};

export function Marquee({ items, duration = 38 }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max gap-16 whitespace-nowrap py-6 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-16 font-display text-2xl tracking-[-0.02em] text-parchment/85"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
