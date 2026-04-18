import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { SigPill, BracketRange, StatHeaderCard } from '../components/ui/primitives';
import { DivergenceChart, DivergenceLegend } from '../components/charts/DivergenceChart';
import { IRFChart } from '../components/charts/IRFChart';
import { irfTradable, irfNonTradable } from '../data/series';

export function VTradable({ lang }: { lang: Lang }) {
  const v = t.v.tradable;
  return (
    <div className="space-y-8">
      <StatHeaderCard
        label={L(v.divergeTitle, lang)}
        value="×1,97"
        unit={lang === 'fr' ? 'écart échangeables vs non-éch.' : 'ekat echanjab vs non-ech.'}
        meta={<DivergenceLegend />}
      >
        <DivergenceChart height={300} />
      </StatHeaderCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 xl:gap-7">
        <StatHeaderCard
          label={lang === 'fr' ? 'Échangeables' : 'Echanjab'}
          value="+5,59%"
          unit={lang === 'fr' ? 'pic · h=24 · t=1,97' : 'pik · h=24 · t=1,97'}
          meta={<SigPill level="**" />}
        >
          <div className="space-y-4">
            <IRFChart data={irfTradable.political} tone="political" peakH={24} height={140} />
            <BracketRange lo={0.92} hi={10.26} mid={5.59} label="IC 90%" />
          </div>
        </StatHeaderCard>

        <StatHeaderCard
          label={lang === 'fr' ? 'Non-échangeables' : 'Non-echanjab'}
          value="+2,84%"
          unit={lang === 'fr' ? 'pic · h=17 · t=1,90' : 'pik · h=17 · t=1,90'}
          meta={<SigPill level="*" />}
        >
          <div className="space-y-4">
            <IRFChart data={irfNonTradable.political} tone="labor" peakH={17} height={140} />
            <BracketRange lo={0.39} hi={5.29} mid={2.84} label="IC 90%" />
          </div>
        </StatHeaderCard>
      </div>

      <StatHeaderCard
        label={L(v.ratioTitle, lang)}
        value="×1,97"
        unit={lang === 'fr' ? 'importés vs locaux' : 'enpòte vs lokal'}
        meta={lang === 'fr' ? 'Canal du taux de change' : 'Kanal to chanj la'}
      >
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
      </StatHeaderCard>

      <StatHeaderCard
        label={L(v.passThru, lang)}
        value="4"
        unit={lang === 'fr' ? 'étapes de transmission' : 'etap transmisyon'}
        meta={lang === 'fr' ? 'Politique → HTG → importés' : 'Politik → HTG → enpòte'}
      >
        {(() => {
          const nodes = [
            { label: 'Instabilité politique', sub: 'choc s^P',                    tone: 'blue-700' },
            { label: 'Fuite de capitaux',     sub: 'canal α_T (pass-through)',    tone: 'blue-500' },
            { label: 'Dépréciation HTG',      sub: 'α_T > α_NT',                  tone: 'blue-500' },
            { label: 'Prix des importés ↑',   sub: '+5,59 % IPC · t = 1,97',      tone: 'negative' },
          ];
          const tone = (t: string) =>
            t === 'blue-700' ? 'bg-blue-700 text-white' :
            t === 'blue-500' ? 'bg-blue-100 text-blue-900' :
            'bg-negative-bg text-negative';
          const subTone = (t: string) =>
            t === 'blue-700' ? 'text-blue-100' :
            t === 'blue-500' ? 'text-blue-700/80' :
            'text-negative/80';
          return (
            <>
              {/* Mobile: vertical chain — full-width steps, numbered, down-caret between */}
              <div className="sm:hidden flex flex-col">
                {nodes.map((n, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-7 h-7 rounded-full bg-rail text-ink-2 inline-flex items-center justify-center text-[11px] font-medium tabular-nums">{i + 1}</div>
                      <div className={`flex-1 px-4 py-3 rounded-[12px] ${tone(n.tone)}`}>
                        <div className="text-[14px] font-medium leading-tight">{n.label}</div>
                        <div className={`text-[12px] leading-tight mt-1 tabular-nums ${subTone(n.tone)}`}>{n.sub}</div>
                      </div>
                    </div>
                    {i < nodes.length - 1 && (
                      <div className="flex flex-col items-center my-1" style={{ paddingLeft: '14px' }}>
                        <div className="w-px h-3 bg-edge-strong" />
                        <i className="ph-bold ph-caret-down text-[11px] text-ink-3 -mt-0.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ≥sm: horizontal chain (unchanged) */}
              <div className="hidden sm:flex items-center gap-2 flex-wrap">
                {nodes.map((n, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className={`px-3.5 py-2.5 rounded-[10px] ${tone(n.tone)}`}>
                      <div className="text-[13px] font-medium leading-tight">{n.label}</div>
                      <div className={`text-[11.5px] leading-tight mt-1 tabular-nums ${subTone(n.tone)}`}>{n.sub}</div>
                    </div>
                    {i < arr.length - 1 && <i className="ph-bold ph-arrow-right text-[16px] text-ink-2 mx-1.5" />}
                  </div>
                ))}
              </div>
            </>
          );
        })()}
        <div className="mt-5 pt-4 border-t border-edge text-[11.5px] text-ink-2">
          Source&nbsp;: BRH (flux nets de change, taux de change HTG/USD) · IHSI (IPC échangeables) · Propositions 1 &amp; 2 du modèle §6.
        </div>
      </StatHeaderCard>
    </div>
  );
}
