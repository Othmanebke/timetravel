import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quizQuestions, computeRecommendation } from "../data/quiz";
import { getDestinationById } from "../data/destinations";
import SweepButton from "./SweepButton";

export default function Quiz({ onBook }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const choose = (option) => {
    const next = [...answers, option];
    setAnswers(next);
    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
    } else {
      const winnerId = computeRecommendation(next);
      setResult(getDestinationById(winnerId));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="relative py-28 px-6 bg-ink-soft">
      <div className="max-w-2xl mx-auto text-center">
        <span className="uppercase tracking-[0.35em] text-xs text-gold-soft">
          Recommandation personnalisée
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3 mb-12">
          Quelle époque est <span className="text-gradient-gold">faite pour vous ?</span>
        </h2>

        <div className="glass-panel rounded-2xl p-8 md:p-10 text-left min-h-[20rem] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Question {step + 1} / {quizQuestions.length}
                </p>
                <h3 className="font-display text-2xl text-white mb-6">
                  {quizQuestions[step].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[step].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => choose(option)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-white/10 hover:border-gold/60 hover:bg-gold/5 transition-colors text-stone-200"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1.5 mt-7">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i <= step ? "bg-gold" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="text-center"
              >
                <span className="text-6xl">{result.icon}</span>
                <p className="uppercase tracking-widest text-xs text-gold-soft mt-4">
                  Votre destination idéale
                </p>
                <h3 className="font-display text-3xl font-semibold text-gradient-gold mt-1">
                  {result.name} · {result.year}
                </h3>
                <p className="text-stone-300 mt-4 leading-relaxed">
                  {result.description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-7">
                  <SweepButton variant="filled" onClick={() => onBook(result)}>
                    Réserver {result.name}
                  </SweepButton>
                  <SweepButton variant="ghost" onClick={restart}>
                    Refaire le quiz
                  </SweepButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
