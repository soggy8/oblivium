"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return time;
}

function isOpen(date: Date) {
  const day = date.getDay();
  const hour = date.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 19;
}

export function LiveTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!now) {
    return (
      <span className="hidden text-[10px] uppercase tracking-[0.42em] text-smoke md:inline-flex">
        EU · —
      </span>
    );
  }

  const open = isOpen(now);

  return (
    <span
      className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-smoke md:inline-flex"
      aria-live="polite"
    >
      <span>EU · {formatTime(now)}</span>
      <span className="flex items-center gap-1.5">
        <span
          className={`relative flex h-1.5 w-1.5 ${
            open ? "text-gold-bright" : "text-smoke"
          }`}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-full w-full rounded-full bg-current" />
        </span>
        {open ? "Studio Open" : "On Retainer"}
      </span>
    </span>
  );
}
