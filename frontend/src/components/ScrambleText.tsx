"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-+*/<>·";

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "hover" | "view";
  children?: ReactNode;
};

export function ScrambleText({
  text,
  className,
  duration = 480,
  trigger = "hover",
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    stop();
    const totalFrames = Math.max(8, Math.round(duration / 30));
    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      frame += 1;
      if (frame >= totalFrames) {
        setOutput(text);
        stop();
        return;
      }
      const progress = frame / totalFrames;
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index / text.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOutput(next);
    }, 30);
  };

  useEffect(() => stop, []);

  useEffect(() => {
    if (trigger !== "view") return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  useEffect(() => {
    setOutput(text);
  }, [text]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? start : undefined}
      onFocus={trigger === "hover" ? start : undefined}
      data-cursor="hover"
    >
      {output}
    </span>
  );
}
