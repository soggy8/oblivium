"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, select, textarea, [data-cursor='hover']",
      );
      setHovering(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1, opacity: hovering ? 0 : 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.55)]"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.7 : 1,
            borderColor: hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="h-10 w-10 rounded-full border"
        />
      </motion.div>
    </>
  );
}
