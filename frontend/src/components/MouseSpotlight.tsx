"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 70, damping: 22, mass: 1.1 });
  const sy = useSpring(y, { stiffness: 70, damping: 22, mass: 1.1 });

  const background = useMotionTemplate`radial-gradient(620px circle at ${sx}px ${sy}px, rgba(255,255,255,0.12), transparent 65%)`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    x.set(window.innerWidth / 2);
    y.set(window.innerHeight / 2);

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[8] mix-blend-soft-light"
    />
  );
}
