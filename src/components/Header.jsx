import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#quiz", label: "Quiz" },
  { href: "#booking", label: "Réserver" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass-panel" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-wide">
          <span className="text-gold text-2xl">⏳</span>
          <span className="text-gradient-gold font-semibold">TimeTravel Agency</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-stone-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#booking"
          className="hidden md:inline-block border border-gold/60 text-gold-soft px-5 py-2 text-sm uppercase tracking-widest hover:bg-gold hover:text-ink transition-colors"
        >
          Planifier
        </a>
      </div>
    </motion.header>
  );
}
