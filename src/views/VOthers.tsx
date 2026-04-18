import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { Card, SigPill, TickComb, StatCard, CheckBadge } from '../components/ui/primitives';
import { KernelRidges } from '../components/charts/KernelRidges';
import { JobPawAnnual, StackedSectoralBar, HBarBreakdown, jobpawDomains } from '../components/charts/JobPawCharts';
import { RegimeChart } from '../components/charts/RegimeChart';
import { ipcDistribution, politicalShocks, descriptive, paper, irfPeaks } from '../data/paper';
import { irfAggregate, irfTradable, irfNonTradable } from '../data/series';

/** Smooth inline IRF sparkline — blue line + light-blue gradient fill, cubic-smoothed path. */
function Sparkline({ data }: { data: { beta: number }[] }) {
  const w = 160, h = 48, pad = 2;
  const maxY = Math.max(...data.map(d => d.beta), 0.1);
  const minY = Math.min(...data.map(d => d.beta), 0);
  const span = Math.max(maxY - minY, 0.1);
  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (w - 2 * pad),
    y: h - pad - ((d.beta - minY) / span) * (h - 2 * pad),
  }));
  // Catmull-Rom → cubic bezier smoothing
  const smooth = pts.reduce((d, p, i, a) => {
    if (i === 0) return `M ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    const prev = a[i - 1];
    const prev2 = a[i - 2] ?? prev;
    const next = a[i + 1] ?? p;
    const tension = 0.2;
    const cp1x = prev.x + (p.x - prev2.x) * tension;
    const cp1y = prev.y + (p.y - prev2.y) * tension;
    const cp2x = p.x - (next.x - prev.x) * tension;
    const cp2y = p.y - (next.y - prev.y) * tension;
    return `${d} C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }, '');
  const areaD = `${smooth} L ${(w - pad).toFixed(2)},${(h - pad).toFixed(2)} L ${pad.toFixed(2)},${(h - pad).toFixed(2)} Z`;
  const gid = `sparkGrad-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#93C5FD" stopOpacity="0.55" />
          <stop offset="1" stopColor="#93C5FD" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gid})`} />
      <path d={smooth} fill="none" stroke="#1D4ED8" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── V2 Rupture ─── */
export function VRupture({ lang }: { lang: Lang }) {
  const v = t.v.rupture;
  return (
    <div className="space-y-8">
      <Card title={lang === 'fr' ? 'Rupture structurelle de l\'IPC' : 'Chanjman estriktirèl IPC'} subtitle={L(v.kicker, lang)}>
        <RegimeChart height={280} />
      </Card>

      <Card title={L(v.timelineTitle, lang)} subtitle={lang === 'fr' ? 'Intensité codée 0–2 · 75 mois sur 136 enregistrent un choc positif' : 'Entansite kode 0–2 · 75 mwa sou 136 anrejistre yon chòk pozitif'}>
        {/* Mobile: vertical list with dot rail */}
        <div className="sm:hidden relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-edge-strong" />
          <div className="space-y-4">
            {politicalShocks.map((e, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-blue-700 ring-4 ring-blue-100" />
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[14px] text-ink font-medium leading-tight">{e.label}</div>
                    <div className="text-[12.5px] text-ink-2 tabular-nums mt-0.5">{e.date}</div>
                  </div>
                  <div className="text-[13px] text-blue-700 font-medium tabular-nums whitespace-nowrap">s = {e.intensity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ≥sm: horizontal axis */}
        <div className="hidden sm:block relative pt-10 pb-4">
          <div className="h-px bg-edge-strong" />
          <div className="flex justify-between mt-0 relative">
            {politicalShocks.map((e, i) => (
              <div key={i} className="flex flex-col items-center relative" style={{ width: `${100/politicalShocks.length}%` }}>
                <div className="border-l border-dashed border-blue-300 h-5 absolute -top-6" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-700 absolute -top-[22px] ring-4 ring-blue-100" />
                <div className="text-[14px] text-ink font-medium mt-3 text-center">{e.label}</div>
                <div className="text-[13px] text-ink-2 tabular-nums mt-1">{e.date}</div>
                <div className="text-[13px] text-blue-700 font-medium tabular-nums mt-1.5">s = {e.intensity}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-edge flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] text-ink-2">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-700" /><strong className="text-ink font-medium tabular-nums">s = 2</strong> intensité max.</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300" /><strong className="text-ink font-medium tabular-nums">s = 1,5–1,8</strong> élevée</span>
          <span className="basis-full sm:basis-auto sm:ml-auto">Codage narratif · Cerra &amp; Saxena (2008), Stock &amp; Watson (2018)</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        {ipcDistribution.filter(d => [1998, 2018, 2023].includes(d.year)).map((d, i) => {
          // Pre-2018 baseline = 1998 mean; post = current
          const base = ipcDistribution[0].mean;
          const multiple = (d.mean / base);
          const prev = i > 0 ? ipcDistribution.filter(x => [1998, 2018, 2023].includes(x.year))[i-1].mean : null;
          return (
            <Card key={i} title={`${d.year}`} subtitle={lang === 'fr' ? `IPC moyen · 156 catégories` : `IPC mwayèn · 156 kategori`}>
              <div className="text-[36px] font-medium tabular-nums text-ink leading-none">{d.mean}</div>
              <div className="flex items-center gap-2 mt-2 text-[12px]">
                <span className="text-ink-2">Maximum <strong className="text-ink font-medium tabular-nums ml-1">{d.max}</strong></span>
                {prev && (
                  <span className="text-blue-700 font-medium tabular-nums">· ×{(d.mean / prev).toFixed(1)} vs {ipcDistribution.filter(x => [1998, 2018, 2023].includes(x.year))[i-1].year}</span>
                )}
              </div>
              <div className="mt-4"><TickComb count={24} activePct={(d.mean / 330) * 100} /></div>
              <div className="mt-2 text-[12px] text-ink-2">Dispersion <strong className="text-ink font-medium">{d.spread}</strong>{i === 0 ? '' : ` · ×${multiple.toFixed(1)} vs 1998`}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─── V3 Distribution ─── */
export function VDistribution({ lang }: { lang: Lang }) {
  const v = t.v.distribution;
  return (
    <div className="space-y-8">
      <Card title={lang === 'fr' ? 'Distribution de l\'IPC par catégorie' : 'Distribisyon IPC pa kategori'} subtitle={L(v.kicker, lang)}>
        <KernelRidges />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <Card title={L(v.compareTitle, lang)} subtitle={lang === 'fr' ? '25 ans · 156 catégories' : '25 ane · 156 kategori'} className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Moyenne IPC',   before: '16,3',   after: '326',       mult: '×20' },
              { label: 'Maximum IPC',   before: '30',     after: '693',       mult: '×23' },
              { label: 'Dispersion',    before: 'faible', after: 'très large', mult: 'CV ×1,9' },
            ].map((s, i) => (
              <div key={i} className="rounded-[10px] p-4 bg-blue-100">
                <div className="text-[11.5px] text-ink-2 uppercase tracking-[0.06em] font-medium mb-2">{s.label}</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[14px] text-ink-2 tabular-nums">{s.before}</span>
                  <i className="ph-bold ph-arrow-right text-[12px] text-ink-2" />
                  <span className="text-[22px] font-medium text-blue-700 tabular-nums leading-none">{s.after}</span>
                </div>
                <div className="text-[12px] text-ink-2 mt-2 tabular-nums">{s.mult}</div>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-ink-2 mt-5 leading-relaxed">
            {lang === 'fr'
              ? 'La distribution passe d\'une forme serrée autour de 112 points à une forme très étalée (moyenne 326, max 693). La queue droite épaisse traduit l\'existence de catégories dont les prix ont explosé.'
              : 'Distribisyon an pase de yon fòm sere otou 112 pwen a yon fòm trè etale (mwayèn 326, maks 693). Ke dwat epè a montre kategori kote pri yo te eksploze.'}
          </p>
        </Card>

        <Card title={lang === 'fr' ? 'Catégories extrêmes' : 'Kategori ekstrèm'} subtitle={lang === 'fr' ? 'Croissance IPC 2018 → 2023 · top 5 / fond 5' : 'Kwasans IPC 2018 → 2023 · top 5 / fon 5'}>
          {(() => {
            const topRows = [
              { label: 'Carburants',           mult: 6.2 },
              { label: 'Produits laitiers',    mult: 5.4 },
              { label: 'Céréales importées',   mult: 4.8 },
              { label: 'Huiles alimentaires',  mult: 4.3 },
              { label: 'Viande importée',      mult: 3.9 },
            ];
            const botRows = [
              { label: 'Loyer résidentiel',    mult: 1.9 },
              { label: 'Services domestiques', mult: 1.7 },
              { label: 'Transport local',      mult: 1.6 },
              { label: 'Éducation',            mult: 1.5 },
              { label: 'Santé',                mult: 1.4 },
            ];
            const max = 6.5;
            const Row = ({ label, mult, hot }: { label: string; mult: number; hot: boolean }) => (
              <div className="grid grid-cols-[120px_1fr_44px] items-center gap-3">
                <span className={`text-[12px] truncate ${hot ? 'text-ink' : 'text-ink-2'}`}>{label}</span>
                <div className="h-2 relative">
                  <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-rail" />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${(mult / max) * 100}%`, background: hot ? '#1D4ED8' : '#93C5FD' }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white"
                    style={{ left: `calc(${(mult / max) * 100}% - 6px)`, background: hot ? '#1D4ED8' : '#93C5FD' }}
                  />
                </div>
                <span className={`text-[13px] font-medium tabular-nums text-right ${hot ? 'text-blue-700' : 'text-ink-2'}`}>×{mult.toFixed(1)}</span>
              </div>
            );
            return (
              <div>
                <div className="space-y-2.5">
                  {topRows.map((r, i) => <Row key={i} {...r} hot />)}
                </div>
                <div className="my-4 flex items-center gap-3 text-[12.5px] text-ink-2">
                  <div className="flex-1 border-t border-dashed border-edge-strong" />
                  <span>146 autres catégories</span>
                  <div className="flex-1 border-t border-dashed border-edge-strong" />
                </div>
                <div className="space-y-2.5">
                  {botRows.map((r, i) => <Row key={i} {...r} hot={false} />)}
                </div>
              </div>
            );
          })()}
        </Card>
      </div>
    </div>
  );
}

/* ─── V6 Labor ─── */
export function VLabor({ lang }: { lang: Lang }) {
  const v = t.v.labor;
  return (
    <div className="space-y-8">
      {/* JobPaw intro — 3 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <StatCard icon={<IconNgo />}  label={lang === 'fr' ? 'ONG' : 'ONG'} whole="46" unit="%" />
        <StatCard icon={<IconGov />}  label={lang === 'fr' ? 'Secteur public' : 'Sektè piblik'} whole="28" unit="%" />
        <StatCard icon={<IconBiz />}  label={lang === 'fr' ? 'Secteur privé' : 'Sektè prive'} whole="19" unit="%" />
      </div>

      <Card title={L(v.annualTitle, lang)} subtitle={lang === 'fr' ? '14 909 offres · base construite par ML' : '14 909 òf · baz konstwi ak ML'}>
        <JobPawAnnual height={240} />
        <div className="mt-4 p-4 rounded-[10px] bg-blue-50 flex items-start gap-3 text-[13px] leading-relaxed">
          <i className="ph-bold ph-info text-[16px] mt-0.5 shrink-0 text-ink" />
          <span className="text-ink-2">
            <strong className="font-medium text-ink">Portée de l'échantillon&nbsp;:</strong> JobPaw couvre l'emploi formel annoncé en ligne (ONG 46 %, public 28 %, privé 19 %). L'emploi informel, qui représente plus de 80 % du marché du travail haïtien, n'est pas capturé. Les tendances reflètent donc le segment formel&nbsp;; elles sont un indicateur, non une mesure exhaustive.
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 xl:gap-7">
        <Card title={L(v.sectorsTitle, lang)}>
          <StackedSectoralBar />
        </Card>

        <Card title={L(v.domainsTitle, lang)}>
          <HBarBreakdown items={jobpawDomains} />
        </Card>
      </div>

      <Card title={L(v.asymTitle, lang)} subtitle={lang === 'fr' ? 'Réponse des biens au choc du marché du travail' : 'Repons byen yo a chòk mache travay la'}>
        <div className="space-y-6">
          {/* Non-échangeables (leading — this is the bigger response) */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-[13.5px] font-medium text-ink">{lang === 'fr' ? 'Non-échangeables' : 'Non-echanjab'}</span>
                <span className="text-[12.5px] text-ink-2 ml-2">41 catégories · t = 1,42</span>
              </div>
              <span className="text-[22px] font-medium tabular-nums text-ink leading-none">+1,59%</span>
            </div>
            <div className="h-2.5 rounded-full bg-rail relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full bg-blue-700" style={{ width: '100%' }} />
            </div>
          </div>
          {/* Échangeables (smaller) */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-[13.5px] font-medium text-ink">{lang === 'fr' ? 'Échangeables' : 'Echanjab'}</span>
                <span className="text-[12.5px] text-ink-2 ml-2">115 catégories · t = 1,55</span>
              </div>
              <span className="text-[22px] font-medium tabular-nums text-ink leading-none">+0,92%</span>
            </div>
            <div className="h-2.5 rounded-full bg-rail relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full bg-blue-300" style={{ width: `${(0.92 / 1.59) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-edge flex items-start gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[13px] font-medium tabular-nums shrink-0">
            <i className="ph-bold ph-arrows-horizontal text-[13px]" />
            1,73× écart
          </span>
          <p className="text-[13.5px] text-ink-2 leading-relaxed">
            {lang === 'fr'
              ? 'L\'asymétrie inversée — plus forte sur les non-échangeables — est cohérente avec une spirale prix-salaires naissante dans les services et la production locale.'
              : 'Asymetri envèse la — pi fò sou non-echanjab yo — konsistan ak yon espiral pri-salè k ap kòmanse nan sèvis ak pwodiksyon lokal.'}
          </p>
        </div>
      </Card>
    </div>
  );
}

function IconNgo() { return <i className="ph-bold ph-hand-heart text-[20px]" />; }
function IconGov() { return <i className="ph-bold ph-bank text-[20px]" />; }
function IconBiz() { return <i className="ph-bold ph-buildings text-[20px]" />; }

/* ─── V7 Model ─── */
export function VModel({ lang }: { lang: Lang }) {
  return (
    <div className="space-y-8">
      <Card title={lang === 'fr' ? 'Forme réduite de l\'inflation' : 'Fòm redui inflasyon an'} subtitle={lang === 'fr' ? 'Équation 6 — modèle partiel, deux secteurs' : 'Ekwasyon 6 — modèl pasyèl, de sektè'}>
        <div className="py-6 text-center text-[16px] sm:text-[20px] md:text-[22px] font-medium text-ink leading-relaxed overflow-x-auto scroll-thin" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          π<sub>t</sub> = ρ π<sub>t−1</sub> + α Δe<sub>t</sub> + <span className="text-blue-700">β s<sup>P</sup><sub>t</sub></span> + γ s<sup>F</sup><sub>t</sub> + μφ (n<sub>t</sub> − n̄) + ν<sub>t</sub>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
          {[
            { t: 'Persistance',       v: 'ρ = 0,536',          contrib: 54 },
            { t: 'Taux de change',    v: 'α · Δe',             contrib: 22 },
            { t: 'Politique',         v: 'β s^P',              contrib: 68, hi: true },
            { t: 'Fiscal',            v: 'γ s^F',              contrib: 12 },
            { t: 'Spirale salariale', v: 'μφ (n−n̄)',          contrib: 18 },
          ].map((c, i) => (
            <div key={i} className={`p-3.5 rounded-[10px] ${c.hi ? 'bg-blue-100' : 'bg-rail'}`}>
              <div className="text-[12.5px] text-ink-2 uppercase tracking-wide">{c.t}</div>
              <div className={`text-[12.5px] mt-1 ${c.hi ? 'text-blue-700 font-medium' : 'text-ink-2'}`}>{c.v}</div>
            </div>
          ))}
        </div>
        {/* Term contribution bar chart */}
        <div className="mt-6 pt-5 border-t border-edge">
          <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-3 font-medium">Contribution relative à l'inflation cumulative (à h=24)</div>
          <div className="space-y-2.5">
            {[
              { t: 'Politique (β s^P)',      pct: 62, hi: true },
              { t: 'Persistance (ρ π_{t−1})', pct: 19 },
              { t: 'Taux de change (α Δe)',  pct: 11 },
              { t: 'Fiscal (γ s^F)',          pct: 5  },
              { t: 'Spirale (μφ (n−n̄))',      pct: 3  },
            ].map((c, i) => (
              <div key={i} className="grid grid-cols-[130px_1fr_40px] sm:grid-cols-[160px_1fr_40px] items-center gap-3">
                <span className="text-[12.5px] text-ink">{c.t}</span>
                <div className="h-2 rounded-full bg-rail relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${c.pct}%`, background: c.hi ? '#1D4ED8' : '#93C5FD' }} />
                </div>
                <span className={`text-[12.5px] tabular-nums text-right ${c.hi ? 'text-blue-700 font-medium' : 'text-ink-2'}`}>{c.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11.5px] text-ink-2">
            Décomposition approximative via la forme réduite (équation 6). Robustesse confirmée sur sous-échantillons 2014–2019 et 2019–2025 (§5.5 du papier).
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        {[
          { n: 1, title: lang === 'fr' ? 'Dominance du choc politique' : 'Dominans chòk politik la', body: '∂π/∂s^P ≫ ∂π/∂s^F > ∂π/∂s^L', empirical: '+4,93% vs +1,42% vs +0,90%' },
          { n: 2, title: lang === 'fr' ? 'Asymétrie sectorielle' : 'Asymetri sektoryèl', body: 'α_T > α_NT → ∂π^T/∂s^P > ∂π^NT/∂s^P', empirical: '+5,59% vs +2,84% (ratio 1,97×)' },
          { n: 3, title: lang === 'fr' ? 'Spirale prix-salaires' : 'Espiral pri-salè', body: '∂π^NT/∂s^L > ∂π^T/∂s^L', empirical: '+1,59% vs +0,92% (ratio 1,73×)' },
        ].map((p, i) => (
          <Card key={i} title={`Proposition ${p.n}`} right={<CheckBadge size={22} />} className="flex flex-col">
            <div className="text-[14px] font-medium mb-3">{p.title}</div>
            <div className="p-3 rounded-[8px] bg-rail text-[12.5px] font-mono">{p.body}</div>
            {/* Empirical confirmation pinned to bottom with top divider */}
            <div className="mt-auto pt-4 border-t border-edge">
              <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1.5">{lang === 'fr' ? 'Confirmé par les données' : 'Konfime pa done yo'}</div>
              <div className="text-[14px] text-ink font-medium tabular-nums">{p.empirical}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── V8 Policy ─── */
export function VPolicy({ lang }: { lang: Lang }) {
  const recs = [
    { n: 1, title: lang === 'fr' ? 'Stabilité politique = stabilité des prix' : 'Estabilite politik = estabilite pri yo',
      body: lang === 'fr' ? 'La gouvernance devient une politique anti-inflation de premier ordre.' : 'Gouvènans vin yon politik anti-inflasyon premye nivo.',
      impact: 'Très élevé', feasibility: 'Moyenne', horizon: 'Moyen–long terme',
      evidence: 'Proposition 1 · +4,93 % IPC sur 24 mois' },
    { n: 2, title: lang === 'fr' ? 'Réduire le pass-through' : 'Diminye pass-through la',
      body: lang === 'fr' ? 'Diversifier les sources d\'importation et soutenir la production locale.' : 'Divèsifye sous enpòtasyon yo epi sipòte pwodiksyon lokal.',
      impact: 'Élevé', feasibility: 'Élevée', horizon: 'Court–moyen terme',
      evidence: 'Proposition 2 · asymétrie 1,97× échangeables' },
    { n: 3, title: lang === 'fr' ? 'Surveiller la spirale prix-salaires' : 'Siveye espiral pri-salè',
      body: lang === 'fr' ? 'Monitoring via JobPaw et le marché du travail formel.' : 'Monitorage atravè JobPaw ak mache travay fòmèl la.',
      impact: 'Moyen', feasibility: 'Élevée', horizon: 'Court terme',
      evidence: 'Proposition 3 · asymétrie inversée +1,59 % NT' },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        {recs.map(r => (
          <section key={r.n} className="bg-card rounded-[16px] border border-edge p-6 md:p-7 flex flex-col">
            <header className="flex items-start gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-blue-700 text-white text-[16px] font-medium flex items-center justify-center shrink-0 tabular-nums">{r.n}</span>
              <h3 className="text-[17px] font-medium leading-snug text-ink pt-1.5">{r.title}</h3>
            </header>
            <p className="text-[14px] text-ink-2 leading-relaxed mb-4">{r.body}</p>
            <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1.5">Preuve empirique</div>
            <div className="text-[13px] text-ink font-medium tabular-nums">{r.evidence}</div>
            {/* Impact / Faisabilité / Horizon — stacked rows, label left / value right, no wrap */}
            <div className="mt-auto pt-5 border-t border-edge space-y-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-ink-2 uppercase tracking-[0.06em]">Impact</span>
                <span className="text-[13.5px] text-ink font-medium text-right">{r.impact}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-ink-2 uppercase tracking-[0.06em]">Faisabilité</span>
                <span className="text-[13.5px] text-ink font-medium text-right">{r.feasibility}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-ink-2 uppercase tracking-[0.06em]">Horizon</span>
                <span className="text-[13.5px] text-ink font-medium text-right">{r.horizon}</span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Card title={lang === 'fr' ? 'Citer cet article' : 'Site atik sa a'}>
        <div className="p-4 rounded-[10px] bg-rail text-[13.5px] leading-relaxed text-ink">
          <div className="font-medium">Blaise, K. &amp; Cayemitte, J.M.</div>
          <div className="text-ink-2">(2026). Instabilité politique et dynamique des prix en Haïti&nbsp;: une analyse par chocs narratifs.</div>
          <div className="text-ink-2 italic mt-0.5">DREF/BRH Working Paper 2026/1.</div>
        </div>
      </Card>
    </div>
  );
}

/* ─── V9 Data ─── */
export function VData({ lang }: { lang: Lang }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        {paper.sources.map((s, i) => (
          <Card key={i} title={s.label} subtitle={s.detail}>
            {/* Data shape preview */}
            <div className="h-28 rounded-[10px] bg-rail p-4 flex items-end gap-[2px]">
              {i === 0 && Array.from({ length: 26 }).map((_, j) => (
                <span key={j} className="flex-1 rounded-sm" style={{ background: '#1D4ED8', height: `${30 + (j / 26) * 65 + (Math.sin(j) * 5)}%` }} />
              ))}
              {i === 1 && Array.from({ length: 16 }).map((_, j) => (
                <span key={j} className="flex-1 rounded-sm" style={{ background: '#3B82F6', height: `${20 + Math.abs(Math.sin(j*0.8)) * 70}%` }} />
              ))}
              {i === 2 && Array.from({ length: 17 }).map((_, j) => {
                const shocks = [1, 10, 11];
                const h = shocks.includes(j) ? 35 : 60 + Math.sin(j * 0.5) * 20;
                return <span key={j} className="flex-1 rounded-sm" style={{ background: '#1D4ED8', height: `${h}%` }} />;
              })}
            </div>
            {/* Sample shape */}
            <div className="mt-3 flex items-center justify-between text-[12px] text-ink-2">
              <span>
                {i === 0 && '156 catégories × 310 mois'}
                {i === 1 && '16 variables × 136 mois'}
                {i === 2 && '14 909 offres / 17 ans'}
              </span>
              <span className="tabular-nums">
                {i === 0 && 'Oct. 1998 →'}
                {i === 1 && 'Sept. 2014 →'}
                {i === 2 && '2009 →'}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card title={lang === 'fr' ? 'Statistiques descriptives (Tableau 1)' : 'Estatistik deskriptif (Tablo 1)'}
            subtitle="Sept. 2014 – Déc. 2025">
       <div className="overflow-x-auto scroll-thin -mx-2">
        <table className="w-full text-[12.5px] min-w-[560px]">
          <thead>
            <tr className="text-ink-2 text-[11.5px] uppercase tracking-wide">
              <th className="text-left font-medium py-2 px-2 sticky left-0 bg-card">Variable</th>
              <th className="text-right font-medium px-2">Obs.</th>
              <th className="text-right font-medium px-2">Moyenne</th>
              <th className="text-right font-medium px-2">Éc.-type</th>
              <th className="text-right font-medium px-2">Min</th>
              <th className="text-right font-medium px-2">Max</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {descriptive.map((r, i) => (
              <tr key={i} className="border-t border-edge">
                <td className="py-2.5 px-2 text-ink whitespace-nowrap sticky left-0 bg-card">{r.variable}</td>
                <td className="text-right text-ink-2 px-2">{r.n}</td>
                <td className="text-right text-ink font-medium px-2">{r.mean}</td>
                <td className="text-right text-ink-2 px-2">{r.std}</td>
                <td className="text-right text-ink-2 px-2">{r.min}</td>
                <td className="text-right text-ink-2 px-2">{r.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </Card>
    </div>
  );
}

/* ─── V political (focus view) ─── */
export function VPolitical({ lang }: { lang: Lang }) {
  return (
    <div className="space-y-8">
      <Card title={lang === 'fr' ? 'Le choc dominant, sous tous les angles' : 'Chòk dominan an, anba tout ang'}
            subtitle={lang === 'fr' ? 'Pic à +4,93% sur l\'agrégé · effet monotone croissant' : 'Pik nan +4,93% sou agregat la · efè monotòn k ap grandi'}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
          {[
            { cat: 'Agrégée',           series: irfAggregate.political  },
            { cat: 'Échangeables',      series: irfTradable.political   },
            { cat: 'Non-échangeables',  series: irfNonTradable.political},
          ].map((row, i) => {
            const r = irfPeaks.find(x => x.inflation === row.cat && x.shock === 'Politique')!;
            return (
              <div key={i} className={`rounded-[12px] border border-edge flex flex-col overflow-hidden ${i === 0 ? 'bg-blue-50' : 'bg-card'}`}>
                <div className="px-5 pt-4 pb-3 border-b border-edge">
                  <div className="text-[12.5px] text-ink-2 uppercase tracking-[0.08em] font-medium">{row.cat}</div>
                </div>
                <div className="px-5 py-5 flex-1">
                  <div className="text-[28px] font-medium tabular-nums text-ink leading-none">+{r.beta.toFixed(2)}%</div>
                  <div className="text-[13.5px] text-ink-2 mt-3">h = {r.horizon} · t = {r.t.toFixed(2)}</div>
                  {/* Trajectory sparkline */}
                  <div className="mt-4">
                    <div className="text-[11.5px] text-ink-2 uppercase tracking-[0.06em] mb-1.5">Trajectoire 0–24 mois</div>
                    <Sparkline data={row.series} />
                  </div>
                </div>
                <div className="px-5 pb-4 flex justify-end">
                  <SigPill level={r.sig} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={lang === 'fr' ? 'Pourquoi l\'effet persiste-t-il ?' : 'Poukisa efè a pèsiste ?'}>
        <p className="text-[13px] text-ink-2 leading-relaxed">
          {lang === 'fr'
            ? 'À 24 mois, la réponse cumulative de l\'IPC des biens échangeables continue de croître sans montrer de signe d\'épuisement. Cette persistance est cohérente avec l\'idée que l\'instabilité politique n\'est pas un choc temporaire, mais un état durable qui modifie en profondeur les anticipations des agents économiques et le fonctionnement des marchés.'
            : 'Nan 24 mwa, repons kimile IPC byen echanjab yo kontinye grandi san pa gen sign epuizman. Pèsistans sa a konsistan ak lide ke enstabilite politik pa yon chòk tanporè, men yon eta dirab ki modifye anpwofondè atant ajan ekonomik yo ak fonksyònman mache yo.'}
        </p>
      </Card>
    </div>
  );
}

/* ─── V fiscal (focus view) ─── */
export function VFiscal({ lang }: { lang: Lang }) {
  return (
    <div className="space-y-8">
      <Card title={lang === 'fr' ? 'Effet modéré, non significatif' : 'Efè modere, pa siyifikatif'}
            subtitle={lang === 'fr' ? 'Pic à +1,42% · t=1,02 · IC 90% traverse zéro' : 'Pik nan +1,42% · t=1,02 · IC 90% travèse zewo'}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
          {[
            { cat: 'Agrégée',           series: irfAggregate.fiscal  },
            { cat: 'Échangeables',      series: irfTradable.fiscal   },
            { cat: 'Non-échangeables',  series: irfNonTradable.fiscal},
          ].map((row, i) => {
            const r = irfPeaks.find(x => x.inflation === row.cat && x.shock === 'Fiscal')!;
            return (
              <div key={i} className="rounded-[12px] border border-edge bg-card flex flex-col overflow-hidden">
                <div className="px-5 pt-4 pb-3 border-b border-edge">
                  <div className="text-[12.5px] text-ink-2 uppercase tracking-[0.08em] font-medium">{row.cat}</div>
                </div>
                <div className="px-5 py-5 flex-1">
                  <div className="text-[28px] font-medium tabular-nums text-ink leading-none">+{r.beta.toFixed(2)}%</div>
                  <div className="text-[13.5px] text-ink-2 mt-3">h = {r.horizon} · t = {r.t.toFixed(2)}</div>
                  <div className="mt-4">
                    <div className="text-[11.5px] text-ink-2 uppercase tracking-[0.06em] mb-1.5">Trajectoire 0–24 mois</div>
                    <Sparkline data={row.series} />
                  </div>
                </div>
                <div className="px-5 pb-4 flex justify-end">
                  <SigPill level={r.sig} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[12.5px] text-ink-2 mt-5 leading-relaxed">
          {lang === 'fr'
            ? 'Le canal fiscal-monétaire opère principalement via le taux de change (monétisation → dépréciation → inflation importée), sans effet direct significatif sur les prix domestiques.'
            : 'Kanal fiskal-monetè a fonksyone prensipalman atravè to chanj (monetizasyon → depresyasyon → inflasyon enpòte), san efè dirèk siyifikatif sou pri domestik yo.'}
        </p>
      </Card>
    </div>
  );
}
