"use client";

import { Marquee } from "@/components/Marquee";

const items = [
  "Brand Strategy",
  "Creative Direction",
  "Performance Marketing",
  "Editorial Campaigns",
  "Digital Experience",
  "Cultural Positioning",
  "Conversion Architecture",
  "Launch Systems",
];

export function Credibility() {
  return (
    <section
      aria-label="What Oblivium Atelier delivers"
      className="relative border-y border-white/15 bg-ink/80"
    >
      <Marquee items={items} />
    </section>
  );
}
