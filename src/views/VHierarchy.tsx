import { useState } from 'react';
import type { Lang } from '../data/i18n';
import { L, t } from '../data/i18n';
import { Card, HorizontalFunnel, SigPill, BracketRange, SegmentedTabs } from '../components/ui/primitives';
import { IRFChart } from '../components/charts/IRFChart';
import { ShockBars } from '../components/charts/ShockBars';
import { irfAggregate, irfTradable, irfNonTradable, persistenceSteps } from '../data/series';

type Cut = 'agr' | 'ech' | 'nonEch';

export function VHierarchy({ lang }: { lang: Lang }) {
  const v = t.v.hierarchy;
  const [h, setH] = useState(24);
  const [cut, setCut] = useState<Cut>('agr');
  const cutData = { agr: irfAggregate, ech: irfTradable, nonEch: irfNonTradable }[cut];
  const cutPeaks: Record<Cut, { p: number; ph: number; f: number; fh: number; l: number; lh: number; sig: { p: '**'|'*'|''; f: '**'|'*'|''; l: '**'|'*'|'' } }> = {
    agr:    { p: 4.93, ph: 24, f: 1.42, fh: 21, l: 0.90, lh: 15, sig: { p: '*',  f: '', l: '' } },
    ech:    { p: 5.59, ph: 24, f: 1.70, fh: 21, l: 0.92, lh: 4,  sig: { p: '**', f: '', l: '' } },
    nonEch: { p: 2.84, ph: 17, f: 0.53, fh: 21, l: 1.59, lh: 22, sig: { p: '*',  f: '', l: '' } },
  };
  const pk = cutPeaks[cut];
  const val = (arr: any[]) => arr[Math.min(h, arr.length - 1)].beta.toFixed(2);
  const maxPersist = 2.15;

  return (
    <div className="space-y-8">
      {/* Wide: vertical bar chart of responses. Narrow: horizontal hierarchy cascade. */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
        <Card className="md:col-span-2" title={lang === 'fr' ? 'Réponses comparées à l\'horizon 24 mois' : 'Repons konpare nan orizon 24 mwa'} subtitle={lang === 'fr' ? 'Réponse cumulative de l\'IPC · barres d\'erreur IC 90%' : 'Repons kimile IPC · ba erè IC 90%'}>
          <ShockBars />
        </Card>

        <Card title={L(v.funnelTitle, lang)} subtitle={lang === 'fr' ? 'Effet cumulatif, pic observé' : 'Efè kimile, pik obsève'}>
          <HorizontalFunnel items={[
            { label: 'Instabilité politique', value: '+4,93%', sub: 'h=24 · t=1,94', shade: 1 },
            { label: 'Choc fiscal',           value: '+1,42%', sub: 'h=21 · t=1,02', shade: 0.6 },
            { label: 'Marché du travail',     value: '+0,90%', sub: 'h=15 · t=0,84', shade: 0.3 },
          ]} />
        </Card>
      </div>

      {/* IRF triptych with segmented tabs + horizon slider */}
      <Card
        title={L(v.irfTitle, lang)}
        subtitle={lang === 'fr' ? 'Projections locales (Jordà, 2005) · segmentez la catégorie, glissez l\'horizon' : 'Pwojeksyon lokal (Jordà, 2005) · segmante kategori a, glise orizon an'}
        right={
          <div className="flex items-center gap-3 text-[12px]">
            <span className="text-ink-2">{L(v.sliderLabel, lang)}</span>
            <input type="range" min={0} max={25} value={h} onChange={e => setH(+e.target.value)} className="w-32 accent-blue-700" />
            <span className="text-ink font-medium tabular-nums w-8">{h}</span>
          </div>
        }
      >
        {/* kargul-style segmented pill tabs INSIDE the card */}
        <div className="mb-5">
          <SegmentedTabs<Cut>
            value={cut}
            onChange={setCut}
            options={[
              { id: 'agr',    label: lang === 'fr' ? 'Inflation agrégée' : 'Inflasyon agregat' },
              { id: 'ech',    label: lang === 'fr' ? 'Biens échangeables (115)' : 'Byen echanjab (115)' },
              { id: 'nonEch', label: lang === 'fr' ? 'Non-échangeables (41)' : 'Non-echanjab (41)' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-7">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium">Choc politique</span>
              <SigPill level={pk.sig.p} />
            </div>
            <IRFChart data={cutData.political} tone="political" peak={pk.p} peakH={pk.ph} currentH={h} />
            <BracketRange lo={+(pk.p - 1.645 * (pk.p > 4 ? 2.84 : pk.p > 3 ? 2.54 : 1.49)).toFixed(2)} hi={+(pk.p + 1.645 * (pk.p > 4 ? 2.84 : pk.p > 3 ? 2.54 : 1.49)).toFixed(2)} mid={pk.p} label={`IC 90% à h=${pk.ph}`} />
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-ink-2">Valeur à h={h}</span>
              <span className="text-ink font-medium tabular-nums">+{val(cutData.political)}%</span>
            </div>
          </div>

          <div className="border-l border-edge pl-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium">Choc fiscal</span>
              <SigPill level={pk.sig.f} />
            </div>
            <IRFChart data={cutData.fiscal} tone="fiscal" peak={pk.f} peakH={pk.fh} currentH={h} />
            <BracketRange lo={+(pk.f - 1.645 * 1.39).toFixed(2)} hi={+(pk.f + 1.645 * 1.39).toFixed(2)} mid={pk.f} label={`IC 90% à h=${pk.fh}`} />
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-ink-2">Valeur à h={h}</span>
              <span className="text-ink font-medium tabular-nums">+{val(cutData.fiscal)}%</span>
            </div>
          </div>

          <div className="border-l border-edge pl-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium">Marché du travail</span>
              <SigPill level={pk.sig.l} />
            </div>
            <IRFChart data={cutData.labor} tone="labor" peak={pk.l} peakH={pk.lh} currentH={h} />
            <BracketRange lo={+(pk.l - 1.645 * 1.07).toFixed(2)} hi={+(pk.l + 1.645 * 1.07).toFixed(2)} mid={pk.l} label={`IC 90% à h=${pk.lh}`} />
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-ink-2">Valeur à h={h}</span>
              <span className="text-ink font-medium tabular-nums">+{val(cutData.labor)}%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Persistence card */}
      <Card title={L(v.persistTitle, lang)} subtitle={L(v.persistNote, lang)}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {persistenceSteps.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full h-32 bg-rail rounded-[10px] relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 bg-blue-700 rounded-b-[10px]" style={{ height: `${(p.value / maxPersist) * 100}%` }} />
                <div className="absolute inset-x-0 bottom-0 hatch-blue opacity-40" style={{ height: `${(p.value / maxPersist) * 100}%` }} />
              </div>
              <div className="text-[12px] text-ink-2 mt-2">{p.step}</div>
              <div className="text-[13px] font-medium tabular-nums text-ink">{p.value.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-[12.5px] text-ink-2">
          {lang === 'fr'
            ? 'Chaque choc initial de 1 point de pourcentage génère un effet cumulé de 2,15 points à long terme.'
            : 'Chak chòk inisyal 1 pwen pousantaj pwodui yon efè kimile 2,15 pwen alontèm.'}
        </div>
      </Card>
    </div>
  );
}
