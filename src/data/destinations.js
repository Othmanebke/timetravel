export const destinations = [
  {
    id: "paris-1889",
    name: "Paris",
    era: "Belle Époque",
    year: "1889",
    tagline: "L'effervescence de l'Exposition Universelle",
    description:
      "Déambulez sur les Champs-Élysées au pied d'une Tour Eiffel encore toute neuve, assistez à l'Exposition Universelle et savourez l'effervescence artistique et industrielle qui annonce le XXe siècle.",
    longDescription:
      "1889 : Paris s'apprête à inaugurer la Tour Eiffel, prouesse d'ingénierie qui fera scandale avant de devenir le symbole de la ville. Flânez dans les salons impressionnistes, dansez au Moulin Rouge naissant et croisez les pionniers de la photographie et du cinématographe.",
    color: "paris",
    gradient: "from-[#3a2a0f] via-[#7a5c1e] to-[#d4af37]",
    icon: "🗼",
    highlights: [
      "Visite privée du chantier de la Tour Eiffel",
      "Soirée de gala à l'Exposition Universelle",
      "Atelier avec un peintre impressionniste",
      "Dîner Belle Époque sur les Grands Boulevards",
    ],
    price: "4 890",
    duration: "5 jours / 4 nuits",
    bestFor: ["urbain", "art", "histoire-moderne"],
  },
  {
    id: "cretace",
    name: "Crétacé",
    era: "Préhistoire",
    year: "-65 000 000",
    tagline: "Le règne des géants avant la chute",
    description:
      "Explorez une Terre sauvage et luxuriante, peuplée de dinosaures, quelques semaines à peine avant l'impact qui changera le cours de l'évolution. Une aventure brute, au plus près de la nature originelle.",
    longDescription:
      "Bien avant l'humanité, la Terre vibrait au pas des plus grandes créatures qu'elle ait jamais portées. Observez troupeaux de tricératops et vols de ptérosaures depuis nos capsules d'observation blindées, au cœur de forêts tropicales infinies.",
    color: "cretace",
    gradient: "from-[#0f2a18] via-[#1f6b3f] to-[#3fae6a]",
    icon: "🦖",
    highlights: [
      "Safari blindé au cœur de la jungle crétacée",
      "Observation d'un troupeau de Tricératops",
      "Vol au-dessus des volcans actifs",
      "Camp d'observation nocturne sécurisé",
    ],
    price: "7 250",
    duration: "4 jours / 3 nuits",
    bestFor: ["aventure", "nature", "origines"],
  },
  {
    id: "florence-1504",
    name: "Florence",
    era: "Renaissance",
    year: "1504",
    tagline: "L'âge d'or de l'art et du génie",
    description:
      "Plongez au cœur de la Renaissance italienne, croisez les plus grands esprits de leur temps et assistez à l'installation du David de Michel-Ange sur la Piazza della Signoria.",
    longDescription:
      "Florence en 1504 est le centre du monde artistique : Michel-Ange achève son David, Léonard de Vinci esquisse ses machines visionnaires, les Médicis financent les chefs-d'œuvre qui traverseront les siècles. Une immersion totale dans le génie humain.",
    color: "florence",
    gradient: "from-[#2a160c] via-[#7a3d1e] to-[#b0623a]",
    icon: "🎨",
    highlights: [
      "Installation du David sur la Piazza della Signoria",
      "Atelier privé dans la bottega d'un maître Renaissance",
      "Banquet à la cour des Médicis",
      "Visite des ateliers de Léonard de Vinci",
    ],
    price: "5 620",
    duration: "6 jours / 5 nuits",
    bestFor: ["art", "architecture", "renaissance"],
  },
];

export const getDestinationById = (id) =>
  destinations.find((d) => d.id === id);
