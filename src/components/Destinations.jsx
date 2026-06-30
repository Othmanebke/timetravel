import { useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "../data/destinations";
import DestinationCard from "./DestinationCard";
import DestinationModal from "./DestinationModal";

export default function Destinations({ onBook }) {
  const [active, setActive] = useState(null);

  return (
    <section id="destinations" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.35em] text-xs text-gold-soft">
            Nos époques
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3">
            Trois destinations,<span className="text-gradient-gold"> une seule machine</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-xl mx-auto">
            Chaque voyage est conçu avec une précision chirurgicale par nos chrono-guides
            experts. Choisissez votre époque.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <DestinationModal
        destination={active}
        onClose={() => setActive(null)}
        onBook={(d) => {
          setActive(null);
          onBook(d);
        }}
      />
    </section>
  );
}
