import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { Card, StatStrip, TickComb, StripedBarCard } from '../components/ui/primitives';
import { RegimeChart } from '../components/charts/RegimeChart';
import { SlopeCompare } from '../components/charts/SlopeCompare';
import { CandleLine, CandleLineLegend } from '../components/charts/CandleLine';

export function VHero({ lang }: { lang: Lang }) {
  const v = t.v.hero;
  return (
    <div className="space-y-8">
      {/* Stat strip */}
      <StatStrip
        items={v.kpi.map(k => ({
          label: L(k.label, lang),
          whole: k.value.split(',')[0],
          fraction: k.value.includes(',') ? k.value.split(',')[1] : undefined,
          unit: typeof k.unit === 'string' ? k.unit : L(k.unit, lang),
          delta: (k as any).delta,
        }))}
      />

      {/* Main chart + slope compare (2/3 + 1/3 bento) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <Card className="md:col-span-2" title={L(v.chartTitle, lang)} subtitle={L(v.chartSub, lang)}
              right={
                <div className="flex items-center gap-3 text-[12px] text-ink-2">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300" />Pré-2018</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-700" />Post-2018</span>
                </div>
              }>
          <RegimeChart height={320} />
        </Card>

        <Card title={L(v.comparisonTitle, lang)} subtitle={lang === 'fr' ? 'Pente annuelle de l\'IPC' : 'Pant anyèl IPC'}>
          <div className="h-[280px]">
            <SlopeCompare />
          </div>
        </Card>
      </div>

      {/* Candle-over-line monthly inflation (Pipesale pattern) */}
      <Card
        title={lang === 'fr' ? 'Inflation mensuelle, candles et tendance' : 'Inflasyon chak mwa, candles ak tandans'}
        subtitle={lang === 'fr' ? 'Moy. mensuelle 1,58 % · Écart-type 1,33 · Pic 10,99 % (Sept. 2021)' : 'Mwayèn chak mwa 1,58 % · Ekat tip 1,33 · Pi wo 10,99 % (Sept. 2021)'}
        right={<CandleLineLegend />}
      >
        <CandleLine height={260} />
      </Card>

      {/* Order Breakdown horizontal striped bars (Acme pattern) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <Card className="md:col-span-2" title={lang === 'fr' ? 'Composition du choc — effet cumulatif à 24 mois' : 'Konpozisyon chòk la — efè kimile nan 24 mwa'}
              subtitle={lang === 'fr' ? 'Trois canaux narratifs, IPC agrégé' : 'Twa kanal naratif, IPC agregat'}>
          <StripedBarCard items={[
            { label: 'Instabilité politique', value: '+4,93%', sub: 'h=24 · t=1,94 · significatif', tone: 'blue' },
            { label: 'Choc fiscal',           value: '+1,42%', sub: 'h=21 · t=1,02 · non significatif', tone: 'pink' },
            { label: 'Marché du travail',     value: '+0,90%', sub: 'h=15 · t=0,84 · non significatif', tone: 'green' },
          ]} />
        </Card>

        <Card title={lang === 'fr' ? 'Taux de réplication' : 'To repetisyon'} subtitle={lang === 'fr' ? 'Persistance ρ̂ = 0,536' : 'Pèsistans ρ̂ = 0,536'} className="flex flex-col">
          {/* Middle — big number */}
          <div className="flex-1 flex flex-col items-center justify-center py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[48px] font-medium tabular-nums text-ink leading-none">2,15</span>
              <span className="text-[13px] text-ink-2">× multiplicateur</span>
            </div>
            <div className="text-[12.5px] text-positive inline-flex items-start gap-1.5 mt-3 leading-[1.4] max-w-[240px] font-medium">
              <i className="ph-bold ph-arrow-up text-[13px] mt-[2px] shrink-0" />
              <span>6,4% vs scénario sans persistance</span>
            </div>
          </div>
          {/* Bottom — tick comb + caption, fit snug at card bottom */}
          <div className="mt-8 pt-6 border-t border-edge">
            <TickComb count={30} activePct={70} />
            <div className="mt-3 text-[12.5px] text-ink-2">
              {lang === 'fr' ? 'Fraction long terme capturée' : 'Fraksyon long tèm kaptire'}
            </div>
          </div>
        </Card>
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
