# TimeTravel Agency — Webapp Interactive

Webapp moderne et interactive pour une agence de voyage temporel fictive de luxe, mettant en
scène 3 destinations : **Paris 1889** (Belle Époque), **Crétacé -65M** (Préhistoire) et
**Florence 1504** (Renaissance). Projet réalisé avec génération de code assistée par IA
("vibe coding") et un agent conversationnel propulsé par l'API Mistral AI.

> 👤 Réalisé en solo par : othmane bouakline m2

## 🔗 Liens

- Repository : https://github.com/Othmanebke/timetravel
- Démo en ligne : https://timetravel-xi.vercel.app/

## 🗺️ Architecture & navigation (planning)

Structure de navigation définie en amont du développement (une seule page, ancrage par
section) :

```
Header (sticky, menu mobile burger)
 → Hero (CTA "Découvrir les destinations" / "Trouver mon époque")
 → #destinations (3 destinations, layout éditorial alterné)
 → #quiz (recommandation personnalisée en 4 questions)
 → #booking (formulaire de réservation)
Footer
Chatbot (widget flottant, présent sur toute la page)
```

Approche mobile-first : grilles en une colonne par défaut puis étendues au breakpoint `md`
(Tailwind), navigation desktop remplacée par un menu burger en dessous de 768px.

## 🛠️ Stack technique

- **React 19 + Vite** — framework front-end et tooling
- **Tailwind CSS v4** — design system utilitaire (thème sombre, accents dorés)
- **Framer Motion** — animations (fade-in au scroll, micro-interactions, transitions)
- **Mistral AI API** (`mistral-small-latest`) — agent conversationnel
- **Express** (dev) / **Vercel Serverless Functions** (prod) — proxy sécurisé vers l'API
  Mistral, pour ne jamais exposer la clé API côté client
- **Vercel** — hébergement et déploiement

## ✨ Features implémentées

### Page d'accueil
- Hero section plein écran avec fond animé (dégradés Framer Motion façon "aurore temporelle")
- Présentation de l'agence et CTA vers les destinations / le quiz
- Header sticky avec navigation

### Galerie des destinations
- 3 cards interactives (Paris 1889, Crétacé, Florence 1504), hover & animations au scroll
- Modale de détail par destination (temps forts, durée, prix, CTA réservation)
- Visuels générés en CSS (dégradés thématiques par époque) — pas de dépendance image externe

### Agent conversationnel (chatbot IA)
- Widget flottant en bas à droite, design cohérent (thème sombre, accents dorés)
- Personnalité dédiée ("Chronos", chrono-conseiller passionné d'histoire)
- Connaît les 3 destinations, leurs prix, durées et points forts
- Recommande une destination selon les goûts exprimés par l'utilisateur
- Appels API sécurisés via une fonction serverless (clé API jamais exposée au navigateur)

### Quiz de recommandation personnalisée (exercice 3.2)
- 4 questions sur les préférences du voyageur
- Algorithme de scoring qui recommande la destination la plus adaptée
- Résultat affiché avec explication personnalisée + CTA réservation directe

### Réservation
- Formulaire (destination, date, nombre de voyageurs, nom, e-mail)
- Validation côté client (date future, e-mail valide, champs requis)
- Confirmation animée après validation
- Pré-remplissage automatique depuis une card de destination ou le résultat du quiz

### Animations (exercice 2.3)
- Fade-in progressif des sections au scroll (`whileInView`)
- Apparition séquencée du titre en hero (stagger)
- Hover effects sur les cards de destinations et boutons
- Transitions douces entre les écrans du quiz et du chatbot

## 🤖 IA utilisées (transparence)

- **Code** : généré et itéré avec Claude (Anthropic) via Claude Code, à partir du brief de
  l'agence et de prompts successifs (structure, design, animations, intégration API)
- **Chatbot** : Mistral AI, modèle `mistral-small-latest`, via l'API officielle
  (`@mistralai/mistralai`)
- **Visuels** : dégradés CSS générés sur-mesure par destination en arrière-plan par défaut.
  Le hero accepte aussi une vidéo de fond générée par IA (3 décors des destinations) :
  déposer le fichier dans `public/videos/hero-bg.mp4` (+ `hero-bg-poster.jpg` en option) —
  voir `src/components/Hero.jsx`. Sans ce fichier, le dégradé CSS animé reste utilisé seul.

## 📦 Installation locale

```bash
git clone https://github.com/Othmanebke/timetravel.git
cd timetravel
npm install
cp .env.example .env.local   # puis renseigner MISTRAL_API_KEY
npm run dev
```

L'app tourne sur `http://localhost:5173` (front Vite) avec l'API du chatbot servie en local
sur `http://localhost:3001` (proxée automatiquement via `/api/chat`).

`npm run dev` lance en parallèle le serveur Vite et le petit serveur Express local
(`server/index.js`) qui réutilise exactement la même logique que la fonction serverless
de production (`api/chat.js`).

## 🚀 Déploiement (Vercel)

1. Importer le repo GitHub sur [vercel.com](https://vercel.com/new)
2. Vercel détecte automatiquement Vite (`npm run build`, dossier `dist`)
3. Le dossier `api/` est automatiquement déployé comme fonctions serverless
4. Dans **Settings → Environment Variables**, ajouter `MISTRAL_API_KEY` avec la clé API
5. Déployer — l'URL publique est générée automatiquement

## 📁 Structure du projet

```
timetravel/
├── api/
│   ├── chat.js              # Fonction serverless Vercel (proxy Mistral AI)
│   └── _systemPrompt.js     # Personnalité et connaissances du chatbot
├── server/
│   └── index.js             # Serveur Express pour le dev local
├── src/
│   ├── components/          # Header, Hero, Destinations, Quiz, BookingForm, Chatbot, Footer
│   ├── data/                # Données des destinations et du quiz
│   ├── App.jsx
│   └── index.css            # Thème Tailwind v4 (couleurs, polices)
├── .env.example
└── README.md
```

