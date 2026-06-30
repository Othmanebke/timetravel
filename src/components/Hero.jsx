import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SweepButton from "./SweepButton";

// Drop your generated hero video at public/videos/hero-bg.mp4 (and an optional
// public/videos/hero-bg-poster.jpg). Until that file exists the video silently
// fails to load and the animated CSS gradient below is used as-is.
const HERO_VIDEO_SRC = "/videos/hero-bg.mp4";
const HERO_VIDEO_POSTER = "/videos/hero-bg-poster.jpg";

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

const TICKER_ITEMS = [
  "PARIS · 1889",
  "CRÉTACÉ · -65 000 000",
  "FLORENCE · 1504",
  "TIMETRAVEL AGENCY",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 });
  const blobX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const blobY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const handle = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mvX.set((e.clientX - rect.left) / rect.width - 0.5);
      mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mvX, mvY]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Animated gradient "video-like" background with mouse parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -inset-[10%] opacity-70"
          style={{
            x: blobX,
            y: blobY,
            background:
              "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.25), transparent 45%), radial-gradient(circle at 80% 20%, rgba(63,174,106,0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(176,98,58,0.25), transparent 45%)",
          }}
          animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.08, 1.02, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Optional generated background video — fades in only once it can actually play */}
        <motion.video
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          initial={false}
          animate={{ opacity: videoReady ? 0.55 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0c10_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0b0c10_100%)]" />
      </div>

      {/* Decorative corner frame — premium editorial touch, cleared below the fixed header */}
      <div className="absolute top-24 md:top-28 inset-x-6 md:inset-x-10 bottom-6 md:bottom-10 border border-white/10 pointer-events-none" />
      <span className="absolute top-27 left-9 md:top-31 md:left-13 text-[10px] tracking-[0.3em] text-stone-500 uppercase">
        Est. 2026
      </span>
      <span className="absolute top-27 right-9 md:top-31 md:right-13 text-[10px] tracking-[0.3em] text-stone-500 uppercase">
        N°001 — Chrono-Voyages
      </span>

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
          <SweepButton as="a" href="#destinations" variant="filled">
            Découvrir les destinations
          </SweepButton>
          <SweepButton as="a" href="#quiz" variant="outline">
            Trouver mon époque
          </SweepButton>
        </motion.div>
      </motion.div>

      {/* Marquee ticker */}
      <div className="absolute bottom-20 left-0 right-0 overflow-hidden border-y border-white/10 py-3 bg-ink/40">
        <motion.div
          className="flex gap-12 whitespace-nowrap text-xs tracking-[0.3em] text-stone-400"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-gold/50">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

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
