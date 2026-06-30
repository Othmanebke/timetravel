export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-stone-400">
        <div className="flex items-center font-display text-lg">
          <span className="text-gradient-gold font-semibold">TimeTravel Agency</span>
        </div>
        <p className="text-center md:text-left">
          Projet pédagogique — Webapp générée avec IA. Aucun voyage temporel réel n'est
          (encore) possible.
        </p>
        <div className="flex gap-5 uppercase tracking-widest text-xs">
          <a href="#destinations" className="hover:text-gold transition-colors">
            Destinations
          </a>
          <a href="#booking" className="hover:text-gold transition-colors">
            Réserver
          </a>
        </div>
      </div>
    </footer>
  );
}
