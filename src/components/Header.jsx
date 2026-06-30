import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SweepButton from "./SweepButton";

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#quiz", label: "Quiz" },
  { href: "#booking", label: "Réserver" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled || mobileOpen ? "glass-panel" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-wide" data-cursor-hover>
          <span className="text-gold text-2xl">⏳</span>
          <span className="text-gradient-gold font-semibold">TimeTravel Agency</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-stone-300">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative py-1">
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <SweepButton
          as="a"
          href="#booking"
          variant="outline"
          display="hidden md:inline-flex"
          className="px-5 py-2"
        >
          Planifier
        </SweepButton>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-gold-soft origin-center"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-gold-soft origin-center"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-5 gap-5 text-sm uppercase tracking-widest text-stone-300">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </a>
              ))}
              <SweepButton
                as="a"
                href="#booking"
                variant="outline"
                className="px-5 py-2.5 w-fit"
                onClick={() => setMobileOpen(false)}
              >
                Planifier
              </SweepButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
