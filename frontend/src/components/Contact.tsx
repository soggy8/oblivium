"use client";

import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SplitWords } from "@/components/SplitWords";

const promises = [
  "A focused next move, not a sales call",
  "Reply within one business day",
  "Senior strategist on the first call",
];

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-32 sm:px-8">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl accent-line" />

      <div className="mx-auto grid max-w-7xl gap-12 border border-white/20 bg-ink-soft/85 p-6 shadow-accent-glow backdrop-blur-md md:p-12 lg:grid-cols-[0.85fr_1fr]">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.42em] text-parchment">
                <span className="h-px w-8 bg-white/70" />
                Private intake
              </p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Start with the signal."
              className="mt-6 font-display text-5xl font-semibold leading-[0.94] tracking-[-0.04em] sm:text-6xl md:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-xl text-base leading-7 text-smoke sm:text-lg">
                Share the ambition, constraint, and timeline. We will respond with the most useful next move, not a generic discovery dance.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <ul className="space-y-4 border-t border-white/15 pt-7">
              {promises.map((promise) => (
                <li
                  key={promise}
                  className="flex items-center gap-4 text-sm tracking-[0.04em] text-parchment"
                >
                  <span aria-hidden="true" className="text-parchment">
                    ◆
                  </span>
                  {promise}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
