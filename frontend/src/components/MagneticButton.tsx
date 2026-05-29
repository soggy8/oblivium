"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
  useRef,
} from "react";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | "href"
  | "children"
  | "className"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
>;

const styles: Record<Variant, string> = {
  primary:
    "bg-white text-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
  ghost:
    "border border-white/40 text-parchment hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
};

export const MagneticButton = forwardRef<HTMLAnchorElement, Props>(function MagneticButton(
  { href, variant = "primary", children, className, ...rest },
  ref,
) {
  const localRef = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const sheenX = useTransform(springX, (value) => value * 1.6);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const node = localRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      {...rest}
      href={href}
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${styles[variant]} ${className ?? ""}`}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ x: sheenX }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
});
