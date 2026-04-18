import { ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell, ComposedChart } from 'recharts';
import { monthlyInflation, inflationTrend } from '../../data/monthly';
import { DarkTooltip } from '../ui/primitives';

/** Pipesale-style candle-over-line:
 *   - Thin vertical bars per month, colored by direction (up=blue-300, down=red light, big-spike=blue-700)
 *   - Smooth blue-700 trend line riding on top
 */
export function CandleLineChart({ height = 260 }: { height?: number }) {
  const data = monthlyInflation.map((c, i) => ({
    ...c,
    trend: inflationTrend[i]?.trend ?? c.inflation,
  }));

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 0, right: 16, top: 16, bottom: 8 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={10} tickFormatter={(v) => v.slice(0,4)} interval={35} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={6} axisLine={false} tickLine={false} width={32} tickFormatter={(v) => `${v}%`} />
          <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1} />
          <ReferenceLine x="2018-07" stroke="#DC2626" strokeDasharray="4 4" label={{ value: 'Peyi Lock', position: 'insideTopLeft', fontSize: 12, fill: '#DC2626' }} />
          <Bar dataKey="inflation" maxBarSize={3} isAnimationActive={true} animationDuration={900} animationEasing="ease-out">
            {data.map((d, i) => {
              const positive = d.inflation >= 0;
              const big = Math.abs(d.inflation) > 3;
              const color = big ? '#1D4ED8' : positive ? '#93C5FD' : '#FCA5A5';
              return <Cell key={i} fill={color} />;
            })}
          </Bar>
          <Line type="monotone" dataKey="trend" stroke="#1D4ED8" strokeWidth={2.2} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Tendance 12 mois" />
          <Tooltip content={(p: any) => {
            const row = p.payload?.[0]?.payload;
            if (!row) return null;
            const payload = [
              { name: 'Inflation mensuelle', value: row.inflation + '%', color: row.inflation >= 0 ? '#1D4ED8' : '#DC2626' },
              { name: 'Tendance 12 mois', value: (row.trend ?? 0).toFixed(2) + '%', color: '#1D4ED8' },
            ];
            if (row.event) payload.unshift({ name: row.event, value: '⚑', color: '#DC2626' });
            return <DarkTooltip payload={payload} label={row.month} />;
          }} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 text-[12px] text-ink-2 mt-1">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-700" />Tendance 12m</span>
        <span className="flex items-center gap-1.5"><span className="w-[3px] h-3 bg-blue-300" />Mois positif</span>
        <span className="flex items-center gap-1.5"><span className="w-[3px] h-3" style={{ background: '#FCA5A5' }} />Mois négatif</span>
        <span className="flex items-center gap-1.5"><span className="w-[3px] h-3 bg-blue-700" />Choc &gt; 3%</span>
      </div>
    </div>
  );
}
