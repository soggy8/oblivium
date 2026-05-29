"use client";

import { motion } from "framer-motion";

type MonogramProps = {
  className?: string;
  spin?: boolean;
};

export function Monogram({ className, spin = false }: MonogramProps) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      initial={{ rotate: 0 }}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 90, ease: "linear", repeat: Infinity } : undefined}
    >
      <defs>
        <linearGradient id="oa-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8a8a8a" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="100"
        cy="100"
        r="98"
        fill="none"
        stroke="url(#oa-accent)"
        strokeWidth="0.6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="0.4"
        strokeDasharray="2 6"
        initial={{ pathLength: 0, rotate: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M100 4 L100 196 M4 100 L196 100"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.4 }}
      />
      <motion.path
        d="M30 30 L170 170 M170 30 L30 170"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 0.6 }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontFamily="var(--font-display), serif"
          fontSize="78"
          fontWeight="600"
          fill="url(#oa-accent)"
        >
          OA
        </text>
        <text
          x="100"
          y="148"
          textAnchor="middle"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="6.4"
          letterSpacing="0.42em"
          fill="rgba(255,255,255,0.85)"
        >
          OBLIVIUM · ATELIER
        </text>
        <text
          x="100"
          y="62"
          textAnchor="middle"
          fontFamily="var(--font-sans), sans-serif"
          fontSize="5.6"
          letterSpacing="0.42em"
          fill="rgba(255,255,255,0.7)"
        >
          MMXXVI
        </text>
      </motion.g>
    </motion.svg>
  );
}
