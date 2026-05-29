"use client";

import { Reveal } from "@/components/Reveal";
import { SplitWords } from "@/components/SplitWords";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "start" | "center";
};

export function SectionHeader({ eyebrow, title, text, align = "start" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.42em] text-parchment">
          <span className="h-px w-8 bg-white/70" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitWords
        as="h2"
        text={title}
        className="mt-6 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl"
      />
      {text ? (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-7 text-smoke sm:text-lg">{text}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
