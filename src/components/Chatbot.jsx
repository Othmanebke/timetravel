import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { renderLiteMarkdown } from "../lib/markdownLite";

const SUGGESTIONS = [
  "Quelle destination pour un amateur d'art ?",
  "Quels sont vos prix ?",
  "Le Crétacé est-il dangereux ?",
  "Que comprend le voyage à Florence ?",
];

const WELCOME = {
  role: "assistant",
  content:
    "Bonjour et bienvenue chez TimeTravel Agency ! ⏳ Je suis votre chrono-conseiller. Posez-moi vos questions sur Paris 1889, le Crétacé ou Florence 1504 — je me ferai un plaisir de vous guider vers l'époque idéale.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const send = async (text) => {
    const content = text ?? input;
    if (!content.trim() || loading) return;
    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error("network");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Le chrono-conseiller est momentanément indisponible. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[70] w-16 h-16 rounded-full bg-gold text-ink text-2xl shadow-[0_0_30px_rgba(212,175,55,0.45)] flex items-center justify-center"
        aria-label="Ouvrir le chatbot"
      >
        {open ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-26 right-6 z-[70] w-[22rem] max-w-[calc(100vw-3rem)] h-[32rem] max-h-[70vh] glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3 bg-ink-soft/60">
              <span className="text-2xl">⏳</span>
              <div>
                <p className="text-white font-medium text-sm">Chrono-conseiller</p>
                <p className="text-xs text-gold-soft">En ligne · TimeTravel Agency</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <span className="shrink-0 w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-xs">
                      ⏳
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold text-ink rounded-br-sm"
                        : "bg-white/5 text-stone-200 rounded-bl-sm border border-white/10"
                    }`}
                  >
                    {renderLiteMarkdown(m.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mr-auto bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-stone-400">
                  <span className="inline-flex gap-1">
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}>●</motion.span>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>●</motion.span>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>●</motion.span>
                  </span>
                </div>
              )}
              {error && <p className="text-red-400 text-xs">{error}</p>}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-gold-soft hover:bg-gold/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="border-t border-white/10 p-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="flex-1 bg-ink border border-white/15 rounded-full px-4 py-2.5 text-sm text-stone-200 focus:border-gold outline-none placeholder:text-stone-600"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-10 h-10 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-50"
                aria-label="Envoyer"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
