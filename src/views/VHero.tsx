import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { Card, StatStrip, TickComb, StripedBarCard, StatHeaderCard } from '../components/ui/primitives';
import { RegimeChart } from '../components/charts/RegimeChart';
import { SlopeCompare } from '../components/charts/SlopeCompare';
import { CandleLine, CandleLineLegend } from '../components/charts/CandleLine';

export function VHero({ lang }: { lang: Lang }) {
  const v = t.v.hero;
  return (
    <div className="space-y-8">
      {/* Stat strip — each KPI its own card */}
      <StatStrip
        items={v.kpi.map((k, i) => {
          const extras: Array<{ compare: string; icon: string; iconColor: string; deltaTone?: 'neutral' | 'positive' | 'negative' }> = [
            { compare: lang === 'fr' ? '1998 → 2018'   : '1998 → 2018',   icon: 'ph-trend-up',     iconColor: '#93C5FD' },
            { compare: lang === 'fr' ? 'post-2018'     : 'pòs-2018',      icon: 'ph-trend-up',     iconColor: '#DC2626', deltaTone: 'negative' },
            { compare: lang === 'fr' ? 'sept. 2024'    : 'sept. 2024',    icon: 'ph-flame',        iconColor: '#DC2626' },
            { compare: lang === 'fr' ? 'depuis 2018'   : 'depi 2018',     icon: 'ph-clock-countdown', iconColor: '#64748B' },
            { compare: lang === 'fr' ? '2014 → 2025'   : '2014 → 2025',   icon: 'ph-lightning',    iconColor: '#1D4ED8' },
          ];
          const extra = extras[i] ?? { compare: '', icon: 'ph-trend-up', iconColor: '#1D4ED8' };
          return {
            label: L(k.label, lang),
            whole: k.value.split(',')[0],
            fraction: k.value.includes(',') ? k.value.split(',')[1] : undefined,
            unit: typeof k.unit === 'string' ? k.unit : L(k.unit, lang),
            delta: (k as any).delta,
            ...extra,
          };
        })}
      />

      {/* Regime + slope compare (2/3 + 1/3 bento) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <StatHeaderCard className="md:col-span-2"
          label={L(v.chartTitle, lang)}
          value="×3,5"
          unit={lang === 'fr' ? 'écart · réel vs projeté' : 'ekat · reyèl vs pwojete'}
          meta={lang === 'fr' ? 'Rupture · juil. 2018' : 'Kraze · jiyè 2018'}
        >
          <RegimeChart height={320} />
        </StatHeaderCard>

        <StatHeaderCard
          label={L(v.comparisonTitle, lang)}
          value="×13"
          unit={lang === 'fr' ? 'pente post vs pré-2018' : 'pant pòs vs pre-2018'}
          meta={lang === 'fr' ? '3,2 → 42 pts/an' : '3,2 → 42 pts/an'}
        >
          <div className="h-[260px]">
            <SlopeCompare />
          </div>
        </StatHeaderCard>
      </div>

      {/* Monthly inflation — candles + trend */}
      <StatHeaderCard
        label={lang === 'fr' ? 'Inflation mensuelle' : 'Inflasyon chak mwa'}
        value="1,58%"
        unit={lang === 'fr' ? 'moy. · σ = 1,33' : 'mwayèn · σ = 1,33'}
        meta={lang === 'fr' ? 'Pic · 10,99% · Tableau 1' : 'Pik · 10,99% · Tablo 1'}
      >
        <div className="mb-3"><CandleLineLegend /></div>
        <CandleLine height={260} />
      </StatHeaderCard>

      {/* Composition du choc + multiplicateur */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <StatHeaderCard className="md:col-span-2"
          label={lang === 'fr' ? 'Composition du choc — effet cumulatif à 24 mois' : 'Konpozisyon chòk la — efè kimile nan 24 mwa'}
          value="+4,93%"
          unit={lang === 'fr' ? 'instabilité politique · t=1,94' : 'enstabilite politik · t=1,94'}
          meta={lang === 'fr' ? '3 canaux narratifs · IPC agrégé' : '3 kanal naratif · IPC agregat'}
        >
          <StripedBarCard items={[
            { label: 'Instabilité politique', value: '+4,93%', sub: 'h=24 · t=1,94 · significatif', tone: 'blue' },
            { label: 'Choc fiscal',           value: '+1,42%', sub: 'h=21 · t=1,02 · non significatif', tone: 'pink' },
            { label: 'Marché du travail',     value: '+0,90%', sub: 'h=15 · t=0,84 · non significatif', tone: 'green' },
          ]} />
        </StatHeaderCard>

        <StatHeaderCard
          label={lang === 'fr' ? 'Taux de réplication' : 'To repetisyon'}
          value="2,15"
          unit={lang === 'fr' ? '× multiplicateur' : '× miltiplikatè'}
          meta={lang === 'fr' ? 'ρ̂ = 0,536' : 'ρ̂ = 0,536'}
        >
          <TickComb count={30} activePct={70} />
          <div className="mt-3 text-[12.5px] text-ink-2">
            {lang === 'fr' ? 'Fraction long terme capturée' : 'Fraksyon long tèm kaptire'}
          </div>
        </StatHeaderCard>
      </div>

      {/* Bullets card (Ce que dit le papier) + quote */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <Card className="md:col-span-2" title={lang === 'fr' ? 'Ce que dit le papier' : 'Sa papye a di'} subtitle={lang === 'fr' ? 'Trois résultats principaux, classés par force statistique' : 'Twa rezilta prensipal, klase pa fòs estatistik'}>
          <div className="space-y-4">
            {v.bullets.map((b, i) => {
              const strength = [95, 70, 55][i] ?? 50;
              const tag = strength >= 90 ? 'p<0,05' : strength >= 65 ? 'p<0,10' : 'non significatif';
              const tagCls = strength >= 90 ? 'text-positive bg-positive-bg' : strength >= 65 ? 'text-blue-700 bg-blue-50' : 'text-ink-2 bg-rail';
              return (
                <div key={i} className="grid grid-cols-[28px_1fr_auto] items-start gap-4">
                  <div className="w-[22px] h-[22px] rounded-full bg-blue-700 text-white flex items-center justify-center text-[12px] font-medium tabular-nums mt-[1px]">{i + 1}</div>
                  <div className="text-[14px] text-ink leading-[1.55]">{L(b, lang)}</div>
                  <span className={`text-[11.5px] font-medium tabular-nums px-2 py-0.5 rounded-[5px] mt-[3px] whitespace-nowrap ${tagCls}`}>{tag}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-edge text-[11.5px] text-ink-2">
            Source&nbsp;: projections locales Jordà (2005) sur IPC IHSI · horizon 24 mois · §5 du papier.
          </div>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <div className="flex flex-col h-full justify-between">
            <p className="text-[13px] leading-relaxed text-ink">{L(v.quote, lang)}</p>
            <div className="mt-5 pt-4 border-t border-edge flex items-baseline gap-2">
              <span className="text-[13px] font-medium text-ink">Blaise &amp; Cayemitte</span>
              <span className="text-[12px] text-ink-2 ml-auto">Section 8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
