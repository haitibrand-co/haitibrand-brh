export type Lang = 'fr' | 'ht';

export const t = {
  nav: {
    rubriques:    { fr: 'Rubriques',  ht: 'Rubrik' },
    donnees:      { fr: 'Données',    ht: 'Done' },
    readerQs:     { fr: 'Questions des lecteurs', ht: 'Kesyon lektè yo' },
    essential:    { fr: 'L\'essentiel',            ht: 'Sa k enpòtan' },
    causes:       { fr: 'Causes',                  ht: 'Kòz' },
    mechanisms:   { fr: 'Mécanismes',              ht: 'Mekanism' },
    consequences: { fr: 'Conséquences',            ht: 'Konsekans' },
    download:     { fr: 'Télécharger le PDF',      ht: 'Telechaje PDF la' },
    copy:         { fr: 'Copier le lien',          ht: 'Kopi lyen an' },
    open:         { fr: 'Ouvrir PDF',              ht: 'Louvri PDF' },
    authors:      { fr: 'Auteurs',                 ht: 'Otè' },
    published:    { fr: 'Publié',                  ht: 'Pibliye' },
  },
  questions: [
    { group: 'essential', id: 'hero',         fr: 'Que se passe-t-il avec les prix en Haïti ?', ht: 'Kisa k ap pase ak pri yo ann Ayiti ?' },
    { group: 'essential', id: 'rupture',      fr: 'Quand tout a basculé ?',                    ht: 'Kilè tout bagay te chanje ?' },
    { group: 'essential', id: 'distribution', fr: 'Quelle est l\'ampleur du choc ?',           ht: 'Ki gwosè chòk la ?' },
    { group: 'causes',    id: 'hierarchy',    fr: 'Quel choc compte le plus ?',                ht: 'Ki chòk ki konte plis ?' },
    { group: 'causes',    id: 'political',    fr: 'L\'instabilité politique domine-t-elle vraiment ?', ht: 'Èske enstabilite politik la domine vrèman ?' },
    { group: 'causes',    id: 'fiscal',       fr: 'Et la politique budgétaire ?',              ht: 'E politik bidjetè a ?' },
    { group: 'mechanisms',id: 'tradable',     fr: 'Importés ou locaux, qui souffre le plus ?', ht: 'Enpòte oswa lokal, kiyès ki soufri plis ?' },
    { group: 'mechanisms',id: 'labor',        fr: 'Le marché du travail, quel rôle ?',         ht: 'Mache travay la, ki wòl li ?' },
    { group: 'mechanisms',id: 'model',        fr: 'Quel modèle explique tout cela ?',          ht: 'Ki modèl ki esplike tout sa ?' },
    { group: 'consequences', id: 'policy',    fr: 'Que faire selon les auteurs ?',             ht: 'Sa pou fè selon otè yo ?' },
    { group: 'consequences', id: 'data',      fr: 'Sources et méthodologie',                   ht: 'Sous ak metodoloji' },
  ],
  v: {
    hero: {
      kicker: { fr: 'Section 4.1 · 5 min de lecture · Données : IHSI', ht: 'Seksyon 4.1 · 5 min lekti · Done : IHSI' },
      title:  { fr: 'Que se passe-t-il avec les prix en Haïti ?',       ht: 'Kisa k ap pase ak pri yo ann Ayiti ?' },
      kpi: [
        { label: { fr: 'Pente pré-2018', ht: 'Pant pre-2018' }, value: '3,2', unit: { fr: 'pts/an', ht: 'pts/an' } },
        { label: { fr: 'Pente post-2018', ht: 'Pant pòs-2018' }, value: '42', unit: { fr: 'pts/an', ht: 'pts/an' }, delta: '×13' },
        { label: { fr: 'Pic d\'inflation', ht: 'Pi wo inflasyon' }, value: '49,3', unit: '%', year: '2024' },
        { label: { fr: 'Années de récession', ht: 'Ane resesyon' }, value: '7', unit: { fr: 'consécutives', ht: 'konsekitif' } },
        { label: { fr: 'Chocs politiques codés', ht: 'Chòk politik kode' }, value: '75', unit: '/ 136 mois' },
      ],
      chartTitle: { fr: 'Changement de régime de l\'IPC (1998–2024)', ht: 'Chanjman rejim IPC (1998–2024)' },
      chartSub:   { fr: 'Rupture : Juillet 2018, Peyi Lock', ht: 'Kraze : Jiyè 2018, Peyi Lock' },
      comparisonTitle: { fr: 'Pente annuelle avant et après', ht: 'Pant anyèl anvan ak aprè' },
      quote: {
        fr: '« La flambée inflationniste procède d\'une combinaison des chocs réels et politiques, et la politique monétaire, ne peut à elle seule contenir une dynamique dont l\'origine n\'est pas exclusivement monétaire. »',
        ht: '« Monte pri yo soti nan yon konbinezon chòk reyèl ak politik ; politik monetè a pou kont li pa ka kenbe yon dinamik ki pa sèlman monetè. »'
      },
      bullets: [
        { fr: 'Le choc d\'instabilité politique domine : +4,93 % sur l\'IPC en 24 mois.', ht: 'Chòk enstabilite politik la domine : +4,93 % sou IPC a nan 24 mwa.' },
        { fr: 'Les produits importés sont deux fois plus touchés que les produits locaux.', ht: 'Pwodui enpòte yo frape de fwa plis pase pwodui lokal yo.' },
        { fr: 'Le marché du travail formel signale une spirale prix-salaires naissante.', ht: 'Mache travay fòmèl la montre yon espiral pri-salè k ap kòmanse.' },
      ],
    },
    hierarchy: {
      title: { fr: 'Quel choc compte le plus ?', ht: 'Ki chòk ki konte plis ?' },
      kicker: { fr: 'Section 5 · Projections locales · Horizon 0–24 mois', ht: 'Seksyon 5 · Pwojeksyon lokal · Orizon 0–24 mwa' },
      funnelTitle: { fr: 'Hiérarchie des chocs par effet cumulatif', ht: 'Yerachi chòk yo selon efè kimile' },
      sliderLabel: { fr: 'Horizon (mois)', ht: 'Orizon (mwa)' },
      irfTitle: { fr: 'Fonctions de réponse impulsionnelle', ht: 'Fonksyon repons enpulsivite' },
      persistTitle: { fr: 'Persistance : un choc de 1 pp se propage', ht: 'Pèsistans : yon chòk 1 pp ap gaye' },
      persistNote: { fr: 'Multiplicateur de long terme 2,15 (ρ̂ = 0,536)', ht: 'Miltiplikatè long tèm 2,15 (ρ̂ = 0,536)' },
    },
    tradable: {
      title: { fr: 'Importés ou locaux, qui souffre le plus ?', ht: 'Enpòte oswa lokal, kiyès ki soufri plis ?' },
      kicker: { fr: 'Section 4.3 + 5.4 · 115 vs 41 catégories', ht: 'Seksyon 4.3 + 5.4 · 115 vs 41 kategori' },
      divergeTitle: { fr: 'Divergence échangeables vs non-échangeables', ht: 'Divèjans echanjab vs non-echanjab' },
      ratioTitle: { fr: 'Les importés souffrent près de 2× plus', ht: 'Enpòte yo soufri prèske 2× plis' },
      passThru: { fr: 'Canal du taux de change', ht: 'Kanal to chanj la' },
    },
    distribution: {
      title: { fr: 'Quelle est l\'ampleur du choc ?', ht: 'Ki gwosè chòk la ?' },
      kicker: { fr: 'Section 4.4 · Figure 6 · 156 catégories', ht: 'Seksyon 4.4 · Figi 6 · 156 kategori' },
      scrubber: { fr: 'Année', ht: 'Ane' },
      compareTitle: { fr: '1998 → 2023', ht: '1998 → 2023' },
    },
    labor: {
      title: { fr: 'Le marché du travail, quel rôle ?', ht: 'Mache travay la, ki wòl li ?' },
      kicker: { fr: 'Section 3.1 + 7 · JobPaw 14 909 offres', ht: 'Seksyon 3.1 + 7 · JobPaw 14 909 òf' },
      annualTitle: { fr: 'Offres d\'emploi annuelles (2009–2025)', ht: 'Òf travay chak ane (2009–2025)' },
      sectorsTitle: { fr: 'Répartition par secteur', ht: 'Repatisyon pa sektè' },
      domainsTitle: { fr: 'Répartition par domaine', ht: 'Repatisyon pa domèn' },
      asymTitle: { fr: 'Asymétrie inversée — signature de la spirale prix-salaires', ht: 'Asymetri envèse — siyati espiral pri-salè' },
    },
    rupture: {
      title: { fr: 'Quand tout a basculé ?', ht: 'Kilè tout bagay te chanje ?' },
      kicker: { fr: 'Section 2.2 · Rupture structurelle post-2018', ht: 'Seksyon 2.2 · Chanjman estriktirèl pòs-2018' },
      timelineTitle: { fr: 'Événements politiques majeurs', ht: 'Evenman politik majè' },
    },
    model: {
      title: { fr: 'Quel modèle explique tout cela ?', ht: 'Ki modèl ki esplike tout sa ?' },
      kicker: { fr: 'Section 6 · Trois propositions testables', ht: 'Seksyon 6 · Twa pwopozisyon tèstab' },
    },
    policy: {
      title: { fr: 'Que faire selon les auteurs ?', ht: 'Sa pou fè selon otè yo ?' },
      kicker: { fr: 'Section 8 · Implications de politique économique', ht: 'Seksyon 8 · Enplikasyon politik ekonomik' },
    },
    data: {
      title: { fr: 'Sources et méthodologie', ht: 'Sous ak metodoloji' },
      kicker: { fr: 'Section 3 · Trois bases de données', ht: 'Seksyon 3 · Twa baz done' },
    },
    political: {
      title: { fr: 'L\'instabilité politique domine-t-elle vraiment ?', ht: 'Èske enstabilite politik la domine vrèman ?' },
      kicker: { fr: 'Section 5.3 · Choc dominant', ht: 'Seksyon 5.3 · Chòk dominan' },
    },
    fiscal: {
      title: { fr: 'Et la politique budgétaire ?', ht: 'E politik bidjetè a ?' },
      kicker: { fr: 'Section 5.5 · Effet modéré, non significatif', ht: 'Seksyon 5.5 · Efè modere, pa siyifikatif' },
    },
  },
};

export function L(v: { fr: string; ht: string } | string, lang: Lang) {
  if (typeof v === 'string') return v;
  return v[lang];
}
