import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, ComposedChart } from 'recharts';
import { tradableIPC } from '../../data/series';
import { DarkTooltip } from '../ui/primitives';

export function DivergenceChart({ height = 280 }: { height?: number }) {
  // Add divergence band (difference tradable - non-tradable)
  const data = tradableIPC.map(d => ({
    month: d.month,
    t: d.t,
    nt: d.nt,
    gap: [d.nt, d.t] as [number, number],
  }));
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 8, right: 16, top: 12, bottom: 20 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={10} tickFormatter={(v) => v.slice(0,4)} interval="preserveStartEnd" minTickGap={48} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={6} axisLine={false} tickLine={false} width={36} />
          <ReferenceLine x="2018-07" stroke="#DC2626" strokeDasharray="4 4" label={{ value: 'Peyi Lock', position: 'insideTopRight', fontSize: 12, fill: '#DC2626' }} />
          <Area type="monotone" dataKey="gap" stroke="none" fill="rgba(29,78,216,0.10)" isAnimationActive={true} animationDuration={900} animationEasing="ease-out" />
          <Line type="monotone" dataKey="t"  stroke="#1D4ED8" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Échangeables (115)" />
          <Line type="monotone" dataKey="nt" stroke="#93C5FD" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Non-échangeables (41)" />
          <Tooltip content={(p: any) => <DarkTooltip payload={(p.payload ?? []).filter((x:any) => x.dataKey === 't' || x.dataKey === 'nt')} label={p.label} formatter={(v:number)=>v?.toFixed(1)} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Top-right legend for DivergenceChart — pass to Card's `right` prop. */
export function DivergenceLegend() {
  return (
    <div className="flex items-center gap-4 text-[12.5px] text-ink-2 flex-wrap justify-end">
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-700" />Échangeables (115)</span>
      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-300" />Non-échangeables (41)</span>
    </div>
  );
}
