import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, ComposedChart, ReferenceDot } from 'recharts';
import { ipcSeries } from '../../data/series';
import { DarkTooltip } from '../ui/primitives';

/** Counterfactual regime chart — actual post-2018 curve vs projected pre-2018 trend continuation. */
export function RegimeChart({ height = 340 }: { height?: number }) {
  const ruptureDate = '2018-07';
  const base0 = 16.3;
  const slopePre = 0.267;

  const data = ipcSeries.map((p, i) => {
    const trendPre = base0 + slopePre * i;
    return {
      month: p.month,
      ipcPre:  p.phase === 'pre'  ? p.ipc : null,
      ipcPost: p.phase === 'post' ? p.ipc : null,
      trendPre,
    };
  });

  const lastMonth = ipcSeries[ipcSeries.length - 1];
  const projectedEnd = +(base0 + slopePre * (ipcSeries.length - 1)).toFixed(0);
  const realEnd = Math.round(lastMonth.ipc);
  const ratio = (realEnd / projectedEnd).toFixed(1);

  return (
    <div className="relative">
      {/* Top-right legend */}
      <div className="absolute top-0 right-0 flex items-center gap-4 text-[12px] text-ink-2 z-10">
        <span className="flex items-center gap-2"><span className="w-3 h-[2px] bg-blue-700 rounded-full" />IPC réel</span>
        <span className="flex items-center gap-2"><span className="w-3 h-[2px] rounded-full" style={{ background: '#94A3B8', backgroundImage: 'repeating-linear-gradient(to right, #94A3B8 0 4px, transparent 4px 7px)' }} />Tendance pré-2018 projetée</span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: 8, right: 140, top: 36, bottom: 20 }}>
            <defs>
              <linearGradient id="postFade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.18" />
                <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={10} tickFormatter={(v) => v.slice(0,4)} interval={35} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={6} axisLine={false} tickLine={false} width={36} />
            <ReferenceLine x={ruptureDate} stroke="#DC2626" strokeDasharray="4 4" label={{ value: 'Juil. 2018 · Peyi Lock', position: 'insideTop', fontSize: 12, fill: '#DC2626', offset: 8 }} />

            <Area type="monotone" dataKey="ipcPost" stroke="none" fill="url(#postFade)" isAnimationActive={true} animationDuration={900} animationEasing="ease-out" />

            {/* Pre-2018 trend projection — bolder dashed gray */}
            <Line type="monotone" dataKey="trendPre" stroke="#94A3B8" strokeWidth={2} strokeDasharray="6 5" dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Tendance pré-2018 projetée" />

            <Line type="monotone" dataKey="ipcPre"  stroke="#93C5FD" strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Pré-2018" />
            <Line type="monotone" dataKey="ipcPost" stroke="#1D4ED8" strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Post-2018" />

            {/* Projected endpoint */}
            <ReferenceDot x={lastMonth.month} y={projectedEnd} r={5} fill="#fff" stroke="#64748B" strokeWidth={2} isFront label={{ value: `Projeté ${projectedEnd}`, position: 'right', fontSize: 12, fill: '#64748B', offset: 10 }} />
            {/* Real endpoint */}
            <ReferenceDot x={lastMonth.month} y={realEnd} r={6} fill="#1D4ED8" stroke="#fff" strokeWidth={2.5} isFront label={{ value: `Réel ${realEnd}`, position: 'right', fontSize: 13, fill: '#1D4ED8', fontWeight: 600, offset: 10 }} />

            <Tooltip content={(p: any) => <DarkTooltip payload={(p.payload ?? []).filter((x:any) => x.dataKey === 'ipcPre' || x.dataKey === 'ipcPost' || x.dataKey === 'trendPre')} label={p.label} formatter={(v:number)=>v?.toFixed(1)} />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Ratio annotation card under chart */}
      <div className="mt-3 flex items-center gap-2.5 justify-end pr-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[13px] font-medium tabular-nums">
          <i className="ph-bold ph-arrows-vertical text-[13px]" />
          ×{ratio} écart · l'IPC réel est {ratio} fois plus élevé que la projection
        </span>
      </div>
    </div>
  );
}
