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
      synopsis: { fr: 'Vue d\'ensemble des quatre chocs qui ont fait basculer l\'IPC après 2018 : instabilité politique, taux de change, budgétaire, marché du travail. Les chiffres clés en un coup d\'œil.', ht: 'Yon rezime kat chòk ki fè IPC a chavire apre 2018 : enstabilite politik, to chanj, bidjetè, mache travay. Chif kle yo an yon kout je.' },
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
      synopsis: { fr: 'Classement des chocs selon leur effet cumulatif sur l\'inflation à 24 mois. L\'instabilité politique domine ; les autres canaux ne sont pas statistiquement significatifs.', ht: 'Klasman chòk yo selon efè kimile sou inflasyon a 24 mwa. Enstabilite politik la domine ; lòt kanal yo pa siyifikatif estatistikman.' },
      funnelTitle: { fr: 'Hiérarchie des chocs par effet cumulatif', ht: 'Yerachi chòk yo selon efè kimile' },
      sliderLabel: { fr: 'Horizon (mois)', ht: 'Orizon (mwa)' },
      irfTitle: { fr: 'Fonctions de réponse impulsionnelle', ht: 'Fonksyon repons enpulsivite' },
      persistTitle: { fr: 'Persistance : un choc de 1 pp se propage', ht: 'Pèsistans : yon chòk 1 pp ap gaye' },
      persistNote: { fr: 'Multiplicateur de long terme 2,15 (ρ̂ = 0,536)', ht: 'Miltiplikatè long tèm 2,15 (ρ̂ = 0,536)' },
    },
    tradable: {
      title: { fr: 'Importés ou locaux, qui souffre le plus ?', ht: 'Enpòte oswa lokal, kiyès ki soufri plis ?' },
      kicker: { fr: 'Section 4.3 + 5.4 · 115 vs 41 catégories', ht: 'Seksyon 4.3 + 5.4 · 115 vs 41 kategori' },
      synopsis: { fr: 'Les 115 biens échangeables répondent près de deux fois plus fortement que les 41 non-échangeables. Signature du canal du taux de change sur les prix importés.', ht: '115 byen echanjab yo reponn prèske de fwa pi fò pase 41 non-echanjab yo. Siyati kanal to chanj la sou pri pwodui enpòte.' },
      divergeTitle: { fr: 'Divergence échangeables vs non-échangeables', ht: 'Divèjans echanjab vs non-echanjab' },
      ratioTitle: { fr: 'Les importés souffrent près de 2× plus', ht: 'Enpòte yo soufri prèske 2× plis' },
      passThru: { fr: 'Canal du taux de change', ht: 'Kanal to chanj la' },
    },
    distribution: {
      title: { fr: 'Quelle est l\'ampleur du choc ?', ht: 'Ki gwosè chòk la ?' },
      kicker: { fr: 'Section 4.4 · Figure 6 · 156 catégories', ht: 'Seksyon 4.4 · Figi 6 · 156 kategori' },
      synopsis: { fr: 'Distribution des prix sur 156 catégories de produits. La moyenne passe de 16 à 326 entre 1998 et 2023, avec une queue droite de plus en plus épaisse.', ht: 'Distribisyon pri sou 156 kategori pwodui. Mwayèn lan pase de 16 a 326 ant 1998 ak 2023, ak yon ke dwat ki pi epè.' },
      scrubber: { fr: 'Année', ht: 'Ane' },
      compareTitle: { fr: '1998 → 2023', ht: '1998 → 2023' },
    },
    labor: {
      title: { fr: 'Le marché du travail, quel rôle ?', ht: 'Mache travay la, ki wòl li ?' },
      kicker: { fr: 'Section 3.1 + 7 · JobPaw 14 909 offres', ht: 'Seksyon 3.1 + 7 · JobPaw 14 909 òf' },
      synopsis: { fr: 'Analyse du segment formel via 14 909 offres d\'emploi JobPaw. Asymétrie inversée : les non-échangeables répondent plus fortement, signe d\'une spirale prix-salaires naissante.', ht: 'Analiz segman fòmèl la atravè 14 909 òf travay JobPaw. Asymetri envèse : non-echanjab yo reponn pi fò, siy yon espiral pri-salè k ap kòmanse.' },
      annualTitle: { fr: 'Offres d\'emploi annuelles (2009–2025)', ht: 'Òf travay chak ane (2009–2025)' },
      sectorsTitle: { fr: 'Répartition par secteur', ht: 'Repatisyon pa sektè' },
      domainsTitle: { fr: 'Répartition par domaine', ht: 'Repatisyon pa domèn' },
      asymTitle: { fr: 'Asymétrie inversée — signature de la spirale prix-salaires', ht: 'Asymetri envèse — siyati espiral pri-salè' },
    },
    rupture: {
      title: { fr: 'Quand tout a basculé ?', ht: 'Kilè tout bagay te chanje ?' },
      kicker: { fr: 'Section 2.2 · Rupture structurelle post-2018', ht: 'Seksyon 2.2 · Chanjman estriktirèl pòs-2018' },
      synopsis: { fr: 'Juillet 2018, Peyi Lock : point de bascule. La pente annuelle de l\'IPC est multipliée par treize et 75 chocs politiques sont codés sur les 136 mois suivants.', ht: 'Jiyè 2018, Peyi Lock : pwen chavire. Pant anyèl IPC a miltipliye pa trèz e 75 chòk politik kode sou 136 mwa ki vin apre.' },
      timelineTitle: { fr: 'Événements politiques majeurs', ht: 'Evenman politik majè' },
    },
    model: {
      title: { fr: 'Quel modèle explique tout cela ?', ht: 'Ki modèl ki esplike tout sa ?' },
      kicker: { fr: 'Section 6 · Trois propositions testables', ht: 'Seksyon 6 · Twa pwopozisyon tèstab' },
      synopsis: { fr: 'Forme réduite à cinq termes : persistance, taux de change, choc politique, choc fiscal, spirale salariale. Le terme politique explique 62 % de l\'inflation cumulative.', ht: 'Fòm redui ak senk tèm : pèsistans, to chanj, chòk politik, chòk fiskal, espiral salè. Tèm politik la esplike 62 % inflasyon kimile a.' },
    },
    policy: {
      title: { fr: 'Que faire selon les auteurs ?', ht: 'Sa pou fè selon otè yo ?' },
      kicker: { fr: 'Section 8 · Implications de politique économique', ht: 'Seksyon 8 · Enplikasyon politik ekonomik' },
      synopsis: { fr: 'Trois recommandations : la stabilité politique comme politique anti-inflation de premier ordre, la réduction du pass-through, et la surveillance de la spirale prix-salaires.', ht: 'Twa rekòmandasyon : estabilite politik kòm politik anti-inflasyon premye plan, diminye pass-through la, ak sivèyans espiral pri-salè a.' },
    },
    data: {
      title: { fr: 'Sources et méthodologie', ht: 'Sous ak metodoloji' },
      kicker: { fr: 'Section 3 · Trois bases de données', ht: 'Seksyon 3 · Twa baz done' },
      synopsis: { fr: 'Trois sources couplées : IHSI (IPC, 156 catégories, 310 obs.), BRH (macro, 16 variables), JobPaw (marché du travail, 14 909 offres). Période 1998–2025.', ht: 'Twa sous ki konbine : IHSI (IPC, 156 kategori, 310 obs.), BRH (makro, 16 varyab), JobPaw (mache travay, 14 909 òf). Peryòd 1998–2025.' },
    },
    political: {
      title: { fr: 'L\'instabilité politique domine-t-elle vraiment ?', ht: 'Èske enstabilite politik la domine vrèman ?' },
      kicker: { fr: 'Section 5.3 · Choc dominant', ht: 'Seksyon 5.3 · Chòk dominan' },
      synopsis: { fr: 'Le choc politique est le seul dont l\'intervalle de confiance à 90 % ne traverse jamais zéro sur l\'horizon 0–24 mois. Effet monotone et persistant.', ht: 'Chòk politik la se sèl la ki entèval konfyans 90 % li pa janm travèse zewo sou orizon 0–24 mwa. Efè monoton e pèsistan.' },
    },
    fiscal: {
      title: { fr: 'Et la politique budgétaire ?', ht: 'E politik bidjetè a ?' },
      kicker: { fr: 'Section 5.5 · Effet modéré, non significatif', ht: 'Seksyon 5.5 · Efè modere, pa siyifikatif' },
      synopsis: { fr: 'Pic à +1,42 % mais l\'intervalle de confiance à 90 % traverse zéro. L\'effet fiscal existe mais reste statistiquement dominé par le choc politique.', ht: 'Pik a +1,42 % men entèval konfyans 90 % la travèse zewo. Efè fiskal la egziste men rete domine estatistikman pa chòk politik la.' },
    },
  },
};

export function L(v: { fr: string; ht: string } | string, lang: Lang) {
  if (typeof v === 'string') return v;
  return v[lang];
}
