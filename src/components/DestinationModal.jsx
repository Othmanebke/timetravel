import { AnimatePresence, motion } from "framer-motion";
import SweepButton from "./SweepButton";

export default function DestinationModal({ destination, onClose, onBook }) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[85vh] glass-panel rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="overflow-y-auto">
              <div
                className={`h-40 bg-gradient-to-br ${destination.gradient} relative overflow-hidden`}
              >
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.era}`}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
                  />
                )}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              <div className="p-7 pt-8">
                <p className="uppercase tracking-[0.3em] text-xs text-gold-soft mb-2">
                  {destination.era} · {destination.year}
                </p>
                <h2 className="font-display text-3xl font-semibold text-white mb-4">
                  {destination.name}
                </h2>
                <p className="text-stone-300 leading-relaxed mb-6">
                  {destination.longDescription}
                </p>

                <h4 className="text-sm uppercase tracking-widest text-gold-soft mb-3">
                  Temps forts
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 mb-7">
                  {destination.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm text-stone-300 flex items-start gap-2"
                    >
                      <span className="text-gold mt-0.5">✦</span> {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-stone-400 text-xs uppercase tracking-widest">
                      {destination.duration}
                    </p>
                    <p className="text-gold-soft text-xl font-display font-semibold">
                      à partir de {destination.price} €
                    </p>
                  </div>
                  <SweepButton variant="filled" onClick={() => onBook(destination)}>
                    Réserver ce voyage
                  </SweepButton>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
