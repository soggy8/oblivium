"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "oa-preloader-shown";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(STORAGE_KEY);

    if (reduced || seen) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    let frame = 0;
    const start = performance.now();
    const duration = 1700;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setTimeout(() => setVisible(false), 380);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink"
        >
          <motion.div
            exit={{ y: "-101%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 origin-top bg-ink"
          />
          <motion.div
            exit={{ y: "101%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-ink"
          />

          <motion.div
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-7"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] uppercase text-parchment"
            >
              Oblivium Atelier
            </motion.p>

            <motion.p
              key="count"
              className="font-display text-[6.5rem] font-semibold leading-none tracking-[-0.05em] text-parchment text-glow sm:text-[9rem]"
            >
              {String(count).padStart(3, "0")}
            </motion.p>

            <div className="relative h-px w-56 overflow-hidden bg-white/20">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: "linear" }}
                className="h-full w-full origin-left bg-gradient-to-r from-parchment to-white"
              />
            </div>

            <p className="text-[10px] uppercase tracking-[0.42em] text-smoke">
              Composing the atelier
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
