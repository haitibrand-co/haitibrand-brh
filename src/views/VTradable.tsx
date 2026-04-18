import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { Card, SigPill, BracketRange } from '../components/ui/primitives';
import { DivergenceChart, DivergenceLegend } from '../components/charts/DivergenceChart';
import { IRFChart } from '../components/charts/IRFChart';
import { irfTradable, irfNonTradable } from '../data/series';

export function VTradable({ lang }: { lang: Lang }) {
  const v = t.v.tradable;
  return (
    <div className="space-y-8">
      <Card title={L(v.divergeTitle, lang)} subtitle={lang === 'fr' ? 'Indice des prix (base 100) · 1998–2024' : 'Endèks pri (baz 100) · 1998–2024'} right={<DivergenceLegend />}>
        <DivergenceChart height={300} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 xl:gap-7">
        <Card title={lang === 'fr' ? 'Échangeables (115 catégories)' : 'Echanjab (115 kategori)'}
              right={<SigPill level="**" />}>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-medium tabular-nums text-blue-700">+5,59%</span>
              <span className="text-[12px] text-ink-2">pic à h=24 · t=1,97</span>
            </div>
            <IRFChart data={irfTradable.political} tone="political" peakH={24} height={140} />
            <BracketRange lo={0.92} hi={10.26} mid={5.59} label="IC 90%" />
          </div>
        </Card>

        <Card title={lang === 'fr' ? 'Non-échangeables (41 catégories)' : 'Non-echanjab (41 kategori)'}
              right={<SigPill level="*" />}>
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-medium tabular-nums text-blue-500">+2,84%</span>
              <span className="text-[12px] text-ink-2">pic à h=17 · t=1,90</span>
            </div>
            <IRFChart data={irfNonTradable.political} tone="labor" peakH={17} height={140} />
            <BracketRange lo={0.39} hi={5.29} mid={2.84} label="IC 90%" />
          </div>
        </Card>
      </div>

      <Card title={L(v.ratioTitle, lang)} subtitle={lang === 'fr' ? 'Ratio des réponses au choc politique' : 'Rapò repons yo ak chòk politik la'}>
        <div className="space-y-6">
          {/* Row 1 — Échangeables (bigger bar) */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-[13.5px] font-medium text-ink">{lang === 'fr' ? 'Échangeables' : 'Echanjab'}</span>
                <span className="text-[12.5px] text-ink-2 ml-2">115 catégories</span>
              </div>
              <span className="text-[22px] font-medium tabular-nums text-ink leading-none">+5,59%</span>
            </div>
            <div className="h-2.5 rounded-full bg-rail relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full bg-blue-700" style={{ width: '100%' }} />
            </div>
          </div>
          {/* Row 2 — Non-échangeables */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-[13.5px] font-medium text-ink">{lang === 'fr' ? 'Non-échangeables' : 'Non-echanjab'}</span>
                <span className="text-[12.5px] text-ink-2 ml-2">41 catégories</span>
              </div>
              <span className="text-[22px] font-medium tabular-nums text-ink leading-none">+2,84%</span>
            </div>
            <div className="h-2.5 rounded-full bg-rail relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full bg-blue-300" style={{ width: `${(2.84 / 5.59) * 100}%` }} />
            </div>
          </div>
        </div>
        {/* Ratio callout under both bars, not overlaid */}
        <div className="mt-6 pt-5 border-t border-edge flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[13px] font-medium tabular-nums">
            <i className="ph-bold ph-arrows-horizontal text-[13px]" />
            1,97× écart
          </span>
          <p className="text-[13.5px] text-ink-2 leading-relaxed">
            {lang === 'fr'
              ? 'Les importés souffrent près de deux fois plus. Signature du canal du taux de change.'
              : 'Pwodui enpòte yo soufri prèske de fwa plis. Siyati kanal to chanj la.'}
          </p>
        </div>
      </Card>

      <Card title={L(v.passThru, lang)} subtitle={lang === 'fr' ? 'Mécanisme de transmission avec magnitudes empiriques' : 'Mekanism transmisyon ak mayitid anpirik'}>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: 'Instabilité politique', sub: 's = 2 au pic',      tone: 'blue-700' },
            { label: 'Fuite de capitaux',     sub: '−7,1 M USD/mois',   tone: 'blue-500' },
            { label: 'Dépréciation HTG',      sub: '+40 %/an post-2018', tone: 'blue-500' },
            { label: 'Prix des importés ↑',   sub: '+5,59 % IPC',        tone: 'negative' },
          ].map((n, i, arr) => (
            <div key={i} className="flex items-center">
              <div className={`px-3.5 py-2.5 rounded-[10px] ${
                n.tone === 'blue-700' ? 'bg-blue-700 text-white' :
                n.tone === 'blue-500' ? 'bg-blue-100 text-blue-900' :
                'bg-negative-bg text-negative'
              }`}>
                <div className="text-[13px] font-medium leading-tight">{n.label}</div>
                <div className={`text-[11.5px] leading-tight mt-1 tabular-nums ${
                  n.tone === 'blue-700' ? 'text-blue-100' :
                  n.tone === 'blue-500' ? 'text-blue-700/80' :
                  'text-negative/80'
                }`}>{n.sub}</div>
              </div>
              {i < arr.length - 1 && <i className="ph-bold ph-arrow-right text-[16px] text-ink-2 mx-1.5" />}
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-edge text-[11.5px] text-ink-2">
          Source&nbsp;: BRH (flux nets de change, taux de change HTG/USD) · IHSI (IPC échangeables) · Propositions 1 &amp; 2 du modèle §6.
        </div>
      </Card>
    </div>
  );
}
