import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from 'recharts';
import { candleData } from '../../data/monthly';
import { DarkTooltip } from '../ui/primitives';

/** Pipesale-signature: up/down candles (green/red) + smooth trend line riding over them.
    Direct copy of the Revenue Trend chart aesthetic. */
export function CandleLine({ height = 260 }: { height?: number }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ComposedChart data={candleData} margin={{ left: 8, right: 16, top: 12, bottom: 20 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={10} tickFormatter={(v) => v.slice(0,4)} interval={35} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={6} axisLine={false} tickLine={false} width={36} unit="%" />
          <ReferenceLine y={0} stroke="#CBD5E1" />
          <ReferenceLine x="2018-07" stroke="#DC2626" strokeDasharray="4 4" label={{ value: 'Peyi Lock', position: 'insideTopRight', fontSize: 12, fill: '#DC2626' }} />
          <Bar dataKey="inflation" barSize={3} isAnimationActive={true} animationDuration={900} animationEasing="ease-out">
            {candleData.map((c, i) => (
              <Cell key={i} fill={c.inflation >= 0 ? '#93C5FD' : '#FBCFE8'} />
            ))}
          </Bar>
          <Line type="monotone" dataKey="trend" stroke="#1D4ED8" strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Tendance 12M" />
          <Tooltip content={(p: any) => <DarkTooltip payload={(p.payload ?? []).filter((x:any) => x.dataKey === 'inflation' || x.dataKey === 'trend')} label={p.label} formatter={(v:number) => (v ?? 0).toFixed(2) + ' %'} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Top-right legend for the CandleLine chart (pass to Card's `right` prop). */
export function CandleLineLegend() {
  return (
    <div className="flex items-center gap-4 text-[12px] text-ink-2 flex-wrap justify-end">
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-300" />Inflation mensuelle</span>
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#FBCFE8' }} />Mois négatifs</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-blue-700" />Tendance 12 mois</span>
    </div>
  );
}
