export const quizQuestions = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", scores: { "florence-1504": 2, "paris-1889": 1 } },
      { label: "Aventure et nature", scores: { cretace: 2 } },
      { label: "Élégance et raffinement", scores: { "paris-1889": 2, "florence-1504": 1 } },
    ],
  },
  {
    question: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne (XIXe siècle)", scores: { "paris-1889": 2 } },
      { label: "Temps anciens et origines", scores: { cretace: 2 } },
      { label: "Renaissance et classicisme", scores: { "florence-1504": 2 } },
    ],
  },
  {
    question: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", scores: { "paris-1889": 2 } },
      { label: "La nature sauvage", scores: { cretace: 2 } },
      { label: "L'art et l'architecture", scores: { "florence-1504": 2 } },
    ],
  },
  {
    question: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", scores: { "paris-1889": 1, "florence-1504": 1 } },
      { label: "Observer la faune", scores: { cretace: 2 } },
      { label: "Explorer des musées", scores: { "florence-1504": 2 } },
    ],
  },
];

export function computeRecommendation(answers) {
  const totals = { "paris-1889": 0, cretace: 0, "florence-1504": 0 };
  answers.forEach((option) => {
    Object.entries(option.scores).forEach(([id, value]) => {
      totals[id] += value;
    });
  });
  const winnerId = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  return winnerId;
}
