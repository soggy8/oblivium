"use client";

import logoImage from "../../logo.png";

const sitemap = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Contact", href: "#contact" },
];

const elsewhere = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Email", href: "mailto:hello@obliviumatelier.com" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/15 bg-ink px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="group flex items-center gap-3">
            <img
              src={logoImage.src}
              alt="Oblivium Atelier"
              width={logoImage.width}
              height={logoImage.height}
              className="h-10 w-10 shrink-0 object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="font-display text-xl font-semibold tracking-[0.16em] text-parchment">
              Oblivium Atelier
            </span>
          </a>
          <p className="mt-6 max-w-md text-sm leading-7 text-smoke">
            A black-and-gold strategy atelier shaping premium brands through narrative, design, and disciplined performance systems.
          </p>
        </div>

        <FooterColumn title="Sitemap" links={sitemap} />
        <FooterColumn title="Elsewhere" links={elsewhere} />
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs uppercase tracking-[0.32em] text-smoke md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} Oblivium Atelier</span>
        <span>Made with intention. Designed to convert.</span>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.34em] text-parchment">{title}</p>
      <ul className="mt-6 grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-parchment transition-colors duration-300 hover:text-white"
            >
              <span className="h-px w-4 bg-white/40 transition-all duration-500 group-hover:w-8 group-hover:bg-white" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
