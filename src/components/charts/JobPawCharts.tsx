import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area, ComposedChart } from 'recharts';
import { jobpawAnnual, jobpawSectors, jobpawDomains } from '../../data/paper';
import { DarkTooltip } from '../ui/primitives';

export function JobPawAnnual({ height = 220 }: { height?: number }) {
  const events = jobpawAnnual.filter(d => d.event);
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <ComposedChart data={jobpawAnnual} margin={{ left: 8, right: 16, top: 16, bottom: 20 }}>
          <defs>
            <linearGradient id="jpFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.18" />
              <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 4" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={10} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} tickMargin={6} axisLine={false} tickLine={false} width={32} />
          {events.map(e => (
            <ReferenceLine key={e.year} x={e.year} stroke="#DC2626" strokeDasharray="3 3" label={{ value: e.event, position: 'top', fontSize: 11, fill: '#DC2626' }} />
          ))}
          <Area type="monotone" dataKey="offers" stroke="none" fill="url(#jpFade)" isAnimationActive={true} animationDuration={900} animationEasing="ease-out" />
          <Line type="monotone" dataKey="offers" stroke="#1D4ED8" strokeWidth={2} dot={{ r: 3, fill: '#1D4ED8' }} isAnimationActive={true} animationDuration={900} animationEasing="ease-out" name="Offres d'emploi" />
          <Tooltip content={(p: any) => <DarkTooltip payload={p.payload ?? []} label={String(p.label)} formatter={(v:number) => `${v} offres`} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Horizontal bar breakdown with Acme's "one saturated" pattern */
export function HBarBreakdown({ items, title }: { items: { label: string; pct: number; saturated?: boolean }[]; title?: string }) {
  const max = Math.max(...items.map(i => i.pct));
  return (
    <div className="space-y-2">
      {title && <h4 className="text-[13px] font-medium mb-2">{title}</h4>}
      {items.map((it, i) => {
        const w = (it.pct / max) * 100;
        return (
          <div key={i} className="grid grid-cols-[140px_1fr_40px] items-center gap-3">
            <div className={`text-[12px] ${it.saturated ? 'text-ink font-medium' : 'text-ink-2'}`}>{it.label}</div>
            <div className="h-6 rounded-[6px] bg-rail relative overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-[6px] ${it.saturated ? 'bg-blue-700' : 'bg-blue-300'}`}
                style={{ width: `${w}%` }}
              />
              {!it.saturated && (
                <div className="absolute inset-y-0 left-0 hatch-blue-light opacity-50 rounded-[6px]" style={{ width: `${w}%` }} />
              )}
            </div>
            <div className="text-[12px] tabular-nums text-ink text-right font-medium">{it.pct.toFixed(1)}%</div>
          </div>
        );
      })}
    </div>
  );
}

/** Stacked sectoral bar — single horizontal row, Acme saturated-one */
export function StackedSectoralBar() {
  const total = jobpawSectors.reduce((s, x) => s + x.pct, 0);
  return (
    <div>
      <div className="flex h-10 rounded-[10px] overflow-hidden border border-edge">
        {jobpawSectors.map((s, i) => {
          const w = (s.pct / total) * 100;
          const bg = s.saturated ? '#1D4ED8' : i === 1 ? '#3B82F6' : i === 2 ? '#93C5FD' : '#DBEAFE';
          const ink = s.saturated ? '#fff' : i <= 1 ? '#fff' : '#1E3A8A';
          return (
            <div key={i} style={{ width: `${w}%`, background: bg, color: ink }} className="flex items-center justify-center text-[12px] font-medium tabular-nums">
              {w > 10 ? `${s.pct}%` : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-[12px]">
        {jobpawSectors.map((s, i) => {
          const bg = s.saturated ? '#1D4ED8' : i === 1 ? '#3B82F6' : i === 2 ? '#93C5FD' : '#DBEAFE';
          return (
            <span key={i} className="flex items-center gap-1.5 text-ink-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: bg }} />
              {s.label} · <span className="text-ink font-medium tabular-nums">{s.pct}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export { jobpawDomains };
