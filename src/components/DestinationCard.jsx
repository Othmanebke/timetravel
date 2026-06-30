import { motion } from "framer-motion";
import SweepButton from "./SweepButton";

export default function DestinationCard({ destination, onOpen, index }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`group relative grid md:grid-cols-12 items-stretch border-t border-white/10 last:border-b transition-colors duration-500 hover:bg-white/[0.02] ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Gradient panel */}
      <div className="md:col-span-5 relative h-56 md:h-auto overflow-hidden">
        {destination.image && (
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.era}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} ${
            destination.image ? "opacity-50 mix-blend-multiply" : "opacity-80"
          } transition-transform duration-700 ease-out group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent md:bg-gradient-to-r md:from-ink/10 md:to-transparent" />
        <span className="absolute bottom-5 left-5 text-5xl drop-shadow-lg opacity-90">
          {destination.icon}
        </span>
        <span className="absolute top-5 right-5 text-xs uppercase tracking-widest text-white/80 border border-white/30 rounded-full px-3 py-1">
          {destination.year}
        </span>
      </div>

      {/* Text content */}
      <button
        onClick={() => onOpen(destination)}
        className="md:col-span-7 text-left p-7 md:p-12 flex flex-col justify-center focus:outline-none"
      >
        <div className="flex items-start gap-5">
          <span className="font-display text-5xl md:text-6xl text-white/10 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-gold-soft mb-2">
              {destination.era}
            </p>
            <h3 className="font-display text-4xl md:text-5xl font-semibold text-white mb-3 group-hover:text-gradient-gold transition-colors">
              {destination.name}
            </h3>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-md">
              {destination.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="text-gold-soft text-sm font-medium">
                à partir de {destination.price} €
              </span>
              <span className="text-stone-500 text-sm">{destination.duration}</span>
            </div>

            <div className="mt-6 inline-block">
              <SweepButton as="span" variant="outline" className="px-6 py-2.5 text-xs">
                Découvrir →
              </SweepButton>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
