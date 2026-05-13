"use client";

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
    <footer className="relative mt-24 border-t border-gold/15 bg-ink px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold/60 font-display text-base text-gold">
              OA
            </span>
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

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-gold/15 pt-8 text-xs uppercase tracking-[0.32em] text-smoke md:flex-row md:items-center">
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
      <p className="text-xs uppercase tracking-[0.34em] text-gold">{title}</p>
      <ul className="mt-6 grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-parchment transition-colors duration-300 hover:text-gold-bright"
            >
              <span className="h-px w-4 bg-gold/40 transition-all duration-500 group-hover:w-8 group-hover:bg-gold-bright" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
