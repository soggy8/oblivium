"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    // Start Lenis stopped so it accumulates zero virtual scroll during the
    // intro sequence. It will be started by the intro-completion event below.
    lenis.stop();

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Intro sequence fires this when the explosion is fully done.
    // We start Lenis here so it reads the native scrollTop (which is 0) as
    // its initial position — guaranteeing the hero is never faded out.
    const onIntroDone = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    };
    window.addEventListener("lenis-reset-to-top", onIntroDone, { once: true });

    // Safety fallback: if the intro event never fires (no intro, dev reload,
    // reduced-motion skip), start Lenis after 4 s anyway.
    const fallback = window.setTimeout(() => {
      if (lenis.isStopped) {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      }
    }, 4000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      lenis.destroy();
      window.removeEventListener("lenis-reset-to-top", onIntroDone);
    };
  }, []);

  return null;
}
