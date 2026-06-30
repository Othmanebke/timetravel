import { motion } from "framer-motion";

const variants = {
  filled: {
    base: "bg-gold text-ink",
    sweep: "bg-ink-soft",
    hoverText: "group-hover:text-gold-soft",
  },
  outline: {
    base: "border border-gold/50 text-gold-soft",
    sweep: "bg-gold",
    hoverText: "group-hover:text-ink",
  },
  ghost: {
    base: "border border-white/20 text-stone-300",
    sweep: "bg-white/10",
    hoverText: "",
  },
};

export default function SweepButton({
  as: Comp = "button",
  variant = "filled",
  display = "inline-flex",
  className = "",
  children,
  ...props
}) {
  const v = variants[variant];
  return (
    <Comp
      className={`group relative isolate ${display} items-center justify-center overflow-hidden px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/15 active:translate-y-0 active:shadow-none ${v.base} ${v.hoverText} ${className}`}
      {...props}
    >
      <motion.span
        aria-hidden
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        className={`absolute inset-0 -z-10 ${v.sweep}`}
      />
      {children}
    </Comp>
  );
}
