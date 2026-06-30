import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40 origin-right"
      />
      <span className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40 origin-left"
      />
    </div>
  );
}
