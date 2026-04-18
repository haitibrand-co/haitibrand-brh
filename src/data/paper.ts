export const paper = {
  id: 'WP/2026/1',
  title: {
    fr: 'Instabilité politique et dynamique des prix en Haïti',
    ht: 'Enstabilite politik ak dinamik pri yo ann Ayiti',
  },
  subtitle: {
    fr: 'Une analyse par chocs narratifs',
    ht: 'Yon analiz ki soti nan chòk naratif',
  },
  authors: ['Kensley Blaise', 'Jean Marie Cayemitte'],
  affiliation: 'Direction de la Recherche Économique et Financière (DREF), Banque de la République d\'Haïti (BRH)',
  date: 'Mars 2026',
  jel: ['E31', 'E52', 'E58', 'F31', 'O54'],
  pdfUrl: '/paper.pdf',  // bundled local copy, served with Content-Disposition below
  brhUrl: 'https://www.brh.ht/wp-content/uploads/DREF_wp_dynamique_des_prix_24-mars-2026-1.pdf',
  sources: [
    { key: 'IHSI', label: 'IHSI · IPC', detail: '156 catégories · Oct 1998 – Août 2024 · 310 obs' },
    { key: 'BRH',  label: 'BRH · Macro', detail: '16 variables · Sept 2014 – Déc 2025 · 136 obs' },
    { key: 'JobPaw', label: 'JobPaw · Marché du travail', detail: '14 909 offres d\'emploi · 2009–2025 · classification ML' },
  ],
};

export const kpis = {
  slopePre: 3.2,      // pts IPC / year
  slopePost: 42,      // pts IPC / year
  multiplier: 13,
  peakInflation: 49.3,
  yearsRecession: 7,
  politicalShockMonths: 75,
  totalMonths: 136,
  persistence: 0.536,
  longRunMultiplier: 2.15,
  nTradable: 115,
  nNonTradable: 41,
  nCategories: 156,
  nJobpaw: 14909,
};

// Table 1 — descriptive statistics (Sept 2014 – Dec 2025)
export const descriptive = [
  { variable: 'Inflation mensuelle (%)', n: 134, mean: 1.58, std: 1.33, min: -1.19, max: 10.99 },
  { variable: 'Taux directeur (%)',       n: 136, mean: 92.89, std: 31.71, min: 45.49, max: 155.70 },
  { variable: 'Intervention nette (M USD)', n: 136, mean: -7.10, std: 31.31, min: -153.73, max: 66.00 },
  { variable: 'Prix pétrole (USD/baril)', n: 136, mean: 65.98, std: 19.21, min: 17.66, max: 117.75 },
  { variable: 'Croissance M2 (%)',        n: 135, mean: 1.11, std: 2.07, min: -3.45, max: 8.89 },
  { variable: 'Balance commerciale (M USD)', n: 133, mean: -257.13, std: 64.19, min: -410.29, max: -102.85 },
];

// Table 2 — local projections peaks
export type IRFRow = { inflation: 'Agrégée'|'Échangeables'|'Non-échangeables'; shock: 'Politique'|'Fiscal'|'Marché du travail'; horizon: number; beta: number; se: number; t: number; sig: '**'|'*'|'' };
export const irfPeaks: IRFRow[] = [
  { inflation:'Agrégée',         shock:'Politique',           horizon:24, beta:4.93, se:2.54, t:1.94, sig:'*'  },
  { inflation:'Agrégée',         shock:'Fiscal',              horizon:21, beta:1.42, se:1.39, t:1.02, sig:''   },
  { inflation:'Agrégée',         shock:'Marché du travail',   horizon:15, beta:0.90, se:1.07, t:0.84, sig:''   },
  { inflation:'Échangeables',    shock:'Politique',           horizon:24, beta:5.59, se:2.84, t:1.97, sig:'**' },
  { inflation:'Échangeables',    shock:'Fiscal',              horizon:21, beta:1.70, se:1.47, t:1.16, sig:''   },
  { inflation:'Échangeables',    shock:'Marché du travail',   horizon:4,  beta:0.92, se:0.59, t:1.55, sig:''   },
  { inflation:'Non-échangeables',shock:'Politique',           horizon:17, beta:2.84, se:1.49, t:1.90, sig:'*'  },
  { inflation:'Non-échangeables',shock:'Fiscal',              horizon:21, beta:0.53, se:1.13, t:0.47, sig:''   },
  { inflation:'Non-échangeables',shock:'Marché du travail',   horizon:22, beta:1.59, se:1.11, t:1.42, sig:''   },
];

// JobPaw sectoral distribution
export const jobpawSectors = [
  { label: 'ONG',            pct: 46, saturated: true },
  { label: 'Secteur public', pct: 28, saturated: false },
  { label: 'Secteur privé',  pct: 19, saturated: false },
  { label: 'Autres',         pct: 7,  saturated: false },
];

export const jobpawDomains = [
  { label: 'Management/Finance', pct: 33.3, saturated: true },
  { label: 'Santé',              pct: 12.8, saturated: false },
  { label: 'Sciences Humaines',  pct: 11.3, saturated: false },
  { label: 'Agriculture',        pct: 6.6,  saturated: false },
  { label: 'Ingénierie',         pct: 5.1,  saturated: false },
  { label: 'Autres',             pct: 30.9, saturated: false },
];

// Annual JobPaw offers (figure 9) — reconstructed from paper's description
export const jobpawAnnual = [
  { year: 2009, offers: 195 },
  { year: 2010, offers: 320, event: 'Séisme' },
  { year: 2011, offers: 310 },
  { year: 2012, offers: 325 },
  { year: 2013, offers: 305 },
  { year: 2014, offers: 330 },
  { year: 2015, offers: 345 },
  { year: 2016, offers: 325 },
  { year: 2017, offers: 375 },
  { year: 2018, offers: 360, event: 'Peyi Lock' },
  { year: 2019, offers: 230 },
  { year: 2020, offers: 205, event: 'Pandémie' },
  { year: 2021, offers: 310 },
  { year: 2022, offers: 355 },
  { year: 2023, offers: 360 },
  { year: 2024, offers: 325 },
];

// Distribution (figure 6) — kernel density snapshots every 5 years
export const ipcDistribution = [
  { year: 1998, mean: 16.3,  max: 30,  spread: 'très faible' },
  { year: 2003, mean: 28,    max: 55,  spread: 'faible' },
  { year: 2008, mean: 52,    max: 95,  spread: 'modérée' },
  { year: 2013, mean: 78,    max: 130, spread: 'modérée' },
  { year: 2018, mean: 112,   max: 180, spread: 'large' },
  { year: 2023, mean: 326,   max: 693, spread: 'très large' },
];

// Narrative political shocks timeline
export const politicalShocks = [
  { date: '2018-07', label: 'Peyi Lock',          intensity: 2.0 },
  { date: '2019-01', label: 'Manifs anti-gov.',   intensity: 1.8 },
  { date: '2021-07', label: 'Assassinat du Prés.', intensity: 2.0 },
  { date: '2023-03', label: 'Crise sécuritaire',  intensity: 1.8 },
  { date: '2024-02', label: 'Crise sécuritaire',  intensity: 1.8 },
];
