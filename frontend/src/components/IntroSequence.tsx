"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "falling" | "impact" | "exploding" | "done";

const DOT_START = 6; // vh
const DOT_END = 88; // vh
// Total accumulated wheel/touch input (in pixels) needed to bring the dot
// from start to bottom. Tuned so a normal scroll gesture on a mouse wheel or
// trackpad finishes the fall in roughly one full motion.
const SCROLL_TOTAL = 760;
const IMPACT_MS = 420;
const EXPLODE_MS = 1500;
// Bumped storage key — so any user with the old "complete" flag still gets to
// see the new intro once.
const INTRO_STORAGE_KEY = "oblivium-intro-v3";
let introCompletedInMemory = false;

export function IntroSequence() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [hydrated, setHydrated] = useState(false);
  const phaseRef = useRef<Phase>("idle");
  const acc = useRef(0);
  const impactedRef = useRef(false);

  // Direct (no-spring) motion value — the dot tracks scroll input 1:1.
  const pct = useMotionValue(DOT_START);
  const dotTop = useTransform(pct, (v) => `${v}vh`);
  const trailHeight = useTransform(
    pct,
    (v) => `${Math.max(0, v - DOT_START)}vh`,
  );

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // SSR-safe storage check after hydration.
  useEffect(() => {
    setHydrated(true);
    if (window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "1") {
      introCompletedInMemory = true;
    }
    if (introCompletedInMemory) setPhase("done");
  }, []);

  // Body scroll lock + cursor/spotlight suppression while intro is active.
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
      return;
    }
    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
    };
  }, [phase]);

  // Phase progression timers.
  useEffect(() => {
    if (phase === "impact") {
      const t = setTimeout(() => setPhase("exploding"), IMPACT_MS);
      return () => clearTimeout(t);
    }
    if (phase === "exploding") {
      const t = setTimeout(() => setPhase("done"), EXPLODE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      introCompletedInMemory = true;
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
      window.dispatchEvent(new CustomEvent("lenis-reset-to-top"));
    }
  }, [phase]);

  // Wheel / touch / keyboard input → drive the dot directly.
  useEffect(() => {
    const normalize = (e: WheelEvent) => {
      const abs = Math.abs(e.deltaY);
      // deltaMode: 0 = pixels, 1 = lines, 2 = pages
      if (e.deltaMode === 1) return abs * 18;
      if (e.deltaMode === 2) return abs * window.innerHeight;
      return abs;
    };

    const push = (delta: number) => {
      const p = phaseRef.current;
      if (p !== "idle" && p !== "falling") return;
      acc.current = Math.min(SCROLL_TOTAL, acc.current + delta);
      const t = acc.current / SCROLL_TOTAL;
      pct.set(DOT_START + t * (DOT_END - DOT_START));
      if (t > 0 && p === "idle") setPhase("falling");
      if (t >= 1 && !impactedRef.current) {
        impactedRef.current = true;
        pct.set(DOT_END);
        setPhase("impact");
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Floor each wheel tick so even small Linux/trackpad deltas always
      // produce visible progress.
      push(Math.max(40, normalize(e)));
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      touchY = y;
      push(Math.max(20, Math.abs(dy) * 2.2));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === " " ||
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === "Enter"
      ) {
        e.preventDefault();
        push(120);
      }
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pct]);

  if (!hydrated || phase === "done") return null;

  const isExploding = phase === "exploding";

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      animate={isExploding ? { opacity: [1, 1, 0] } : { opacity: 1 }}
      transition={
        isExploding
          ? {
              duration: EXPLODE_MS / 1000,
              times: [0, 0.7, 1],
              ease: "linear",
            }
          : {}
      }
    >
      {/* ── Drop trail ── */}
      <AnimatePresence>
        {(phase === "falling" || phase === "impact") && (
          <motion.div
            key="trail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2"
            style={{
              top: `${DOT_START}vh`,
              height: trailHeight,
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.85) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── The single white dot ── */}
      <AnimatePresence>
        {phase !== "exploding" && (
          <motion.div
            key="dot"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: dotTop }}
            animate={
              phase === "impact"
                ? {
                    scaleX: [1, 3.4, 0.5, 1.7, 1],
                    scaleY: [1, 0.16, 1.8, 0.7, 1],
                  }
                : {}
            }
            transition={
              phase === "impact" ? { duration: 0.42, ease: "easeOut" } : {}
            }
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.08 } }}
          >
            <div
              className="h-3 w-3 rounded-full bg-white"
              style={{
                boxShadow:
                  "0 0 20px 4px rgba(255,255,255,0.85), 0 0 6px 1px rgba(255,255,255,0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Impact ripples ── */}
      <AnimatePresence>
        {phase === "impact" && (
          <motion.div key="ripples" className="pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  top: `${DOT_END}vh`,
                  border: "1px solid rgba(255,255,255,0.7)",
                }}
                initial={{ width: 14, height: 14, opacity: 0.95 }}
                animate={{
                  width: 100 + i * 110,
                  height: 100 + i * 110,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Light burst expanding from impact point ── */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            key="explosion"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              top: `${DOT_END}vh`,
              width: "1vmax",
              height: "1vmax",
              background:
                "radial-gradient(circle at center, #ffffff 0%, #e8e8e8 18%, #b0b0b0 48%, #404040 80%, #0a0a0a 100%)",
              boxShadow: "0 0 80px 20px rgba(255,255,255,0.4)",
            }}
            initial={{ scale: 0.5 }}
            animate={{ scale: 320 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
