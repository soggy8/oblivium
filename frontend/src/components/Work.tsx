"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ScrambleText } from "@/components/ScrambleText";
import { SectionHeader } from "@/components/SectionHeader";

type CaseItem = {
  category: string;
  title: string;
  outcome: string;
  detail: string;
  tone: "slate" | "pearl" | "ash" | "noir";
};

const cases: CaseItem[] = [
  {
    category: "Luxury Retail",
    title: "Heritage label, repositioned for a high-intent audience.",
    outcome: "+38% qualified inquiries · 90 days",
    detail: "Brand strategy, art direction, paid social system, conversion site.",
    tone: "slate",
  },
  {
    category: "Founder Brand",
    title: "Editorial launch system around authority and momentum.",
    outcome: "4.6x social-to-site conversion",
    detail: "Narrative architecture, content engine, lead capture funnel.",
    tone: "pearl",
  },
  {
    category: "Hospitality",
    title: "Premium booking journey for a private members concept.",
    outcome: "Sold-out launch calendar in 21 days",
    detail: "Identity refinement, cinematic web experience, lifecycle ops.",
    tone: "ash",
  },
  {
    category: "Tech Atelier",
    title: "Repositioned a B2B platform as the category of one.",
    outcome: "+62% inbound enterprise demos",
    detail: "Positioning, messaging, sales site, performance media.",
    tone: "noir",
  },
];

const palettes: Record<CaseItem["tone"], string> = {
  slate:
    "bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.22),transparent_55%),linear-gradient(160deg,#1a1a1a,#070707)]",
  pearl:
    "bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.16),transparent_55%),linear-gradient(160deg,#181818,#050505)]",
  ash:
    "bg-[radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.12),transparent_55%),linear-gradient(160deg,#141414,#050505)]",
  noir:
    "bg-[radial-gradient(circle_at_15%_85%,rgba(255,255,255,0.14),transparent_60%),linear-gradient(160deg,#0d0d0d,#000000)]",
};

const GAP = 32;
const SCROLL_START = 0.08;
const SCROLL_END = 0.92;

export function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(600);
  const [startX, setStartX] = useState(64);
  const [endX, setEndX] = useState(-1200);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const update = () => {
      const width =
        window.innerWidth < 768 ? window.innerWidth * 0.85 : window.innerWidth * 0.5;
      const start = window.innerWidth * 0.08;

      setCardWidth(width);
      setStartX(start);
      setEndX(start - (cases.length - 1) * (width + GAP));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const rawX = useTransform(scrollYProgress, [SCROLL_START, SCROLL_END], [startX, endX]);
  const x = useSpring(rawX, { stiffness: 86, damping: 24, mass: 0.9 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalized = (latest - SCROLL_START) / (SCROLL_END - SCROLL_START);
    const next = Math.max(
      0,
      Math.min(cases.length - 1, Math.round(normalized * (cases.length - 1))),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  const goToCase = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const progress =
      SCROLL_START + (index / Math.max(1, cases.length - 1)) * (SCROLL_END - SCROLL_START);
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + scrollable * progress,
      behavior: "smooth",
    });
  };

  const isLast = activeIndex === cases.length - 1;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-[460vh] bg-ink-soft"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
      {/* Header row */}
      <div className="absolute inset-x-0 top-0 z-10 px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Selected Outcomes"
            title="Cinematic systems with measurable edge."
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-6">
              <span className="text-xs uppercase tracking-[0.34em] text-smoke">
                {String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
              </span>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-parchment transition-colors duration-300 hover:text-white"
              >
                <span className="h-px w-8 bg-white/60 transition-all duration-500 group-hover:w-16" />
                Request deck
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cards track */}
      <motion.div
        style={{ x }}
        className="absolute inset-x-0 top-42 bottom-24 flex items-start will-change-transform sm:top-44 sm:items-center"
      >
        {cases.map((item, index) => (
          <CaseCard
            key={item.title}
            item={item}
            index={index}
            isActive={index === activeIndex}
            widthPx={cardWidth}
            gapPx={index === 0 ? 0 : GAP}
          />
        ))}
      </motion.div>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {cases.map((_, i) => (
          <button
            key={i}
            onClick={() => goToCase(i)}
            aria-label={`Go to case ${i + 1}`}
            className="group flex items-center justify-center p-1"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "h-1.5 w-6 bg-white"
                  : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint at last card */}
      <motion.div
        animate={{ opacity: isLast ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        aria-hidden={!isLast}
        className="pointer-events-none absolute bottom-10 right-8 z-10 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.42em] text-parchment"
      >
        <span>Scroll to continue</span>
        <motion.span
          animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block h-5 w-px bg-white"
        />
      </motion.div>
      </div>
    </section>
  );
}

type CaseCardProps = {
  item: CaseItem;
  index: number;
  isActive: boolean;
  widthPx: number;
  gapPx: number;
};

function CaseCard({ item, index, isActive, widthPx, gapPx }: CaseCardProps) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.94, opacity: isActive ? 1 : 0.55 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-shrink-0 flex-col justify-between overflow-hidden border border-white/15 bg-ink p-8 will-change-transform sm:p-10"
      style={{
        width: widthPx || "50vw",
        height: "62vh",
        marginLeft: gapPx,
      }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${palettes[item.tone]} transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-50"}`}
      />

      {/* Active border glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 border border-white/40"
      />

      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-parchment">
        <span>{item.category}</span>
        <span className="font-display text-3xl text-parchment/70">0{index + 1}</span>
      </div>

      <div className="flex flex-col gap-7">
        <h3 className="font-display text-3xl leading-[1.05] text-parchment sm:text-5xl">
          <ScrambleText text={item.title} trigger="view" duration={620} />
        </h3>

        <p className="max-w-md text-sm leading-7 text-smoke">{item.detail}</p>

        <div className="h-px w-full bg-white/25 transition-all duration-700 group-hover:bg-white" />

        <div className="flex items-end justify-between gap-4">
          <p className="font-display text-xl text-white sm:text-2xl">{item.outcome}</p>
          <span
            aria-hidden="true"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-parchment transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-white group-hover:text-white"
          >
            ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}
