import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceDot, Area, ComposedChart } from 'recharts';
import { DarkTooltip } from '../ui/primitives';

type IRFPoint = { h: number; beta: number; lo: number; hi: number };

const TONES = {
  political: { line: '#1D4ED8', fill: 'rgba(29,78,216,0.15)', tip: '#1D4ED8' },
  fiscal:    { line: '#3B82F6', fill: 'rgba(59,130,246,0.12)', tip: '#3B82F6' },
  labor:     { line: '#93C5FD', fill: 'rgba(147,197,253,0.25)', tip: '#93C5FD' },
};

export function IRFChart({ data, tone, peak, peakH, currentH, height = 180 }: {
  data: IRFPoint[];
  tone: keyof typeof TONES;
  peak: number;
  peakH: number;
  currentH?: number;
  height?: number;
}) {
  const t = TONES[tone];
  const series = data.map(d => ({ h: d.h, beta: d.beta, band: [d.lo, d.hi] as [number, number] }));
  const currentPt = currentH != null ? data[Math.min(Math.max(currentH, 0), data.length - 1)] : null;
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ComposedChart data={series} margin={{ left: 8, right: 16, top: 16, bottom: 24 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="h" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} label={{ value: 'Horizon (mois)', position: 'insideBottomRight', offset: -2, fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={28} />
          <ReferenceLine y={0} stroke="#94A3B8" strokeDasharray="2 3" />
          <Area type="monotone" dataKey="band" stroke="none" fill={t.fill} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" />
          <Line type="monotone" dataKey="beta" stroke={t.line} strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Réponse cumulative (%)" />
          {/* Peak reference */}
          <ReferenceLine x={peakH} stroke={t.line} strokeDasharray="3 3" opacity={0.35} />
          {/* Current horizon (slider-driven) — bold dashed + labeled dot */}
          {currentH != null && currentPt && (
            <>
              <ReferenceLine
                x={currentH}
                stroke={t.line}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                label={{ value: `h=${currentH}`, position: 'top', fontSize: 11, fill: t.line, fontWeight: 500 }}
              />
              <ReferenceDot
                x={currentH}
                y={currentPt.beta}
                r={5}
                fill="#fff"
                stroke={t.line}
                strokeWidth={2.5}
                isFront
              />
            </>
          )}
          <Tooltip content={(p: any) => <DarkTooltip payload={p.payload ?? []} label={`h = ${p.label}`} formatter={(v:any)=> typeof v === 'number' ? v.toFixed(2)+' %' : v} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
