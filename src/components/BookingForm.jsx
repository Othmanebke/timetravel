import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "../data/destinations";
import SweepButton from "./SweepButton";

const today = new Date().toISOString().split("T")[0];

export default function BookingForm({ presetDestination }) {
  const [form, setForm] = useState({
    destinationId: destinations[0].id,
    date: "",
    travelers: 1,
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    if (presetDestination) {
      setForm((f) => ({ ...f, destinationId: presetDestination.id }));
      setConfirmed(null);
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [presetDestination]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.date) next.date = "Choisissez une date de départ.";
    else if (form.date < today) next.date = "La date doit être dans le futur.";
    if (!form.name.trim()) next.name = "Indiquez votre nom complet.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Adresse e-mail invalide.";
    if (form.travelers < 1 || form.travelers > 12)
      next.travelers = "Entre 1 et 12 voyageurs.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const destination = destinations.find((d) => d.id === form.destinationId);
    setConfirmed({ ...form, destination });
  };

  const destination = destinations.find((d) => d.id === form.destinationId);

  return (
    <section id="booking" className="relative py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="uppercase tracking-[0.35em] text-xs text-gold-soft">
            Planifiez votre saut temporel
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3">
            Réservation
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                    Destination
                  </label>
                  <select
                    value={form.destinationId}
                    onChange={update("destinationId")}
                    className="w-full bg-ink border border-white/15 rounded-lg px-4 py-3 text-stone-200 focus:border-gold outline-none"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} · {d.year}
                      </option>
                    ))}
                  </select>
                  <p className="text-gold-soft text-sm mt-2">
                    {destination.duration} — à partir de {destination.price} € / personne
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                      Date de départ
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={update("date")}
                      className="w-full bg-ink border border-white/15 rounded-lg px-4 py-3 text-stone-200 focus:border-gold outline-none"
                    />
                    {errors.date && (
                      <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                      Voyageurs
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={form.travelers}
                      onChange={update("travelers")}
                      className="w-full bg-ink border border-white/15 rounded-lg px-4 py-3 text-stone-200 focus:border-gold outline-none"
                    />
                    {errors.travelers && (
                      <p className="text-red-400 text-xs mt-1">{errors.travelers}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ada Lovelace"
                    className="w-full bg-ink border border-white/15 rounded-lg px-4 py-3 text-stone-200 focus:border-gold outline-none placeholder:text-stone-600"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="vous@exemple.com"
                    className="w-full bg-ink border border-white/15 rounded-lg px-4 py-3 text-stone-200 focus:border-gold outline-none placeholder:text-stone-600"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <SweepButton type="submit" variant="filled" className="w-full">
                  Confirmer ma réservation
                </SweepButton>
              </motion.form>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="text-6xl block mb-4"
                >
                  ✅
                </motion.span>
                <h3 className="font-display text-2xl text-white mb-2">
                  Réservation confirmée, {confirmed.name.split(" ")[0]} !
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  Votre saut vers <strong className="text-gold-soft">{confirmed.destination.name} ({confirmed.destination.year})</strong> est
                  programmé pour le {new Date(confirmed.date).toLocaleDateString("fr-FR")} —{" "}
                  {confirmed.travelers} voyageur{confirmed.travelers > 1 ? "s" : ""}.
                </p>
                <p className="text-stone-500 text-sm mt-3">
                  Un chrono-guide vous contactera à {confirmed.email} sous 24h.
                </p>
                <SweepButton variant="ghost" className="mt-6" onClick={() => setConfirmed(null)}>
                  Nouvelle réservation
                </SweepButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
