import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
    >
      {/* Animated gradient "video-like" background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -inset-[10%] opacity-70"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.25), transparent 45%), radial-gradient(circle at 80% 20%, rgba(63,174,106,0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(176,98,58,0.25), transparent 45%)",
          }}
          animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.08, 1.02, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0c10_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0b0c10_100%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.span
          variants={item}
          className="inline-block uppercase tracking-[0.35em] text-xs text-gold-soft mb-6"
        >
          Voyages temporels de luxe
        </motion.span>
        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-7xl font-semibold text-gradient-gold leading-tight"
        >
          Traversez le temps,<br /> vivez l'Histoire
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 text-stone-300 text-lg md:text-xl max-w-xl mx-auto"
        >
          Paris 1889, le Crétacé et la Florence de la Renaissance vous attendent.
          Une agence, trois époques, une seule promesse&nbsp;: l'inoubliable.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#destinations"
            className="px-8 py-3 bg-gold text-ink font-medium uppercase tracking-widest text-sm hover:bg-gold-soft transition-colors"
          >
            Découvrir les destinations
          </a>
          <a
            href="#quiz"
            className="px-8 py-3 border border-gold/50 text-gold-soft uppercase tracking-widest text-sm hover:bg-gold/10 transition-colors"
          >
            Trouver mon époque
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 text-xs uppercase tracking-widest"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓ Scrollez dans le temps
      </motion.div>
    </section>
  );
}
