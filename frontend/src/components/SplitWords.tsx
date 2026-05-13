"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type SplitWordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const child: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
  as = "span",
}: SplitWordsProps) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="relative mr-[0.32em] inline-flex overflow-hidden align-bottom"
        >
          <motion.span variants={child} className={wordClassName}>
            {word as ReactNode}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
