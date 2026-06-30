import { motion } from "framer-motion";

export default function DestinationCard({ destination, onOpen, index }) {
  return (
    <motion.button
      onClick={() => onOpen(destination)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative text-left h-[28rem] overflow-hidden rounded-2xl border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-90 transition-transform duration-700 group-hover:scale-110`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative h-full flex flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <span className="text-5xl drop-shadow-lg">{destination.icon}</span>
          <span className="text-xs uppercase tracking-widest text-white/80 border border-white/30 rounded-full px-3 py-1">
            {destination.year}
          </span>
        </div>

        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-white/70 mb-2">
            {destination.era}
          </p>
          <h3 className="font-display text-3xl font-semibold text-white mb-2">
            {destination.name}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
            {destination.tagline}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-gold-soft text-sm font-medium">
              à partir de {destination.price} €
            </span>
            <span className="text-xs uppercase tracking-widest text-white border-b border-gold/0 group-hover:border-gold transition-all">
              Découvrir →
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
