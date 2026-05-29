"use client";

import { useEffect, useRef } from "react";

type AmbientDustProps = {
  density?: number;
  className?: string;
};

export function AmbientDust({ density = 32, className }: AmbientDustProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      ad: number;
    };

    const seed = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.5 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.06 - Math.random() * 0.22,
      a: Math.random(),
      ad: 0.002 + Math.random() * 0.005,
    });

    const particles: Particle[] = Array.from({ length: density }, seed);

    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.ad;
        if (p.a > 1) p.ad = -Math.abs(p.ad);
        if (p.a < 0) p.ad = Math.abs(p.ad);
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a * 0.55})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      frame = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
