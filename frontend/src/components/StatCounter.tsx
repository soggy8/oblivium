"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type StatCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, motionValue, value]);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="flex items-baseline gap-1 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-parchment md:text-6xl">
        {prefix ? <span>{prefix}</span> : null}
        <motion.span>{display}</motion.span>
        {suffix ? <span className="text-parchment">{suffix}</span> : null}
      </div>
      <p className="text-xs uppercase tracking-[0.28em] text-smoke">{label}</p>
    </div>
  );
}
