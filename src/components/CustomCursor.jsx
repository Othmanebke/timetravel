import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });

  useEffect(() => {
    const move = (e) => {
      if (!visible) setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest(
        "a, button, input, select, textarea, [data-cursor-hover]"
      );
      setHovering(Boolean(target));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [visible, x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block rounded-full border border-gold mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 48 : 16,
        height: hovering ? 48 : 16,
        opacity: visible ? 1 : 0,
        backgroundColor: hovering ? "rgba(212,175,55,0.15)" : "transparent",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
