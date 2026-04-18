import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   UI PRIMITIVES — all merged from the 4 reference screenshots.
   ═══════════════════════════════════════════════════════════════════════ */

/** Dashed read-only chip (metadata display) — icon + pipe + value, no caret. */
export function ChipDashed({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-dashed-soft rounded-[10px] px-4 py-2 flex items-center gap-2.5 text-[13px] text-ink-2 whitespace-nowrap">
      <span className="text-ink-2 inline-flex">{icon}</span>
      <span>{label}</span>
      <span className="w-px h-4 bg-edge-strong" />
      <span className="text-ink font-medium">{value}</span>
    </div>
  );
}

/** Info icon with hover tooltip (Pipesale) */
export function InfoIcon({ tip }: { tip: string }) {
  return (
    <span className="relative inline-flex items-center group" tabIndex={0}>
      <i className="ph ph-info text-[11px] text-ink-3" />
      <span className="invisible group-hover:visible group-focus:visible absolute left-4 top-0 z-10 tooltip-dark whitespace-nowrap max-w-[240px] text-wrap">
        {tip}
      </span>
    </span>
  );
}

/** Number with consistent font/size/color — unit is the only muted element */
export function NumberDiminuendo({ whole, fraction, unit, size = 'xl' }: { whole: string; fraction?: string; unit?: string; size?: 'xl' | 'lg' | 'md' }) {
  const numCls = size === 'xl' ? 'text-[36px] sm:text-[42px] leading-none' : size === 'lg' ? 'text-[28px] sm:text-[34px] leading-none' : 'text-[20px] sm:text-[22px] leading-none';
  const unitCls = size === 'xl' ? 'text-[13px] sm:text-[14px] text-ink-2 ml-1.5 sm:ml-2 font-normal' : 'text-[12px] sm:text-[13px] text-ink-2 ml-1 sm:ml-1.5 font-normal';
  return (
    <div className="inline-flex items-baseline tabular-nums font-medium text-ink">
      <span className={numCls}>
        {whole}{fraction && <span>,{fraction}</span>}
      </span>
      {unit && <span className={unitCls}>{unit}</span>}
    </div>
  );
}

/** Delta indicator — colored text + icon, no chip background (modern finance standard) */
export function DeltaChip({ value, direction = 'up', mute = false }: { value: string; direction?: 'up' | 'down' | 'flat'; mute?: boolean }) {
  const cls = mute ? 'text-ink-2'
    : direction === 'up' ? 'text-positive'
    : direction === 'down' ? 'text-negative'
    : 'text-ink-2';
  const icon = direction === 'up' ? 'ph-arrow-up' : direction === 'down' ? 'ph-arrow-down' : 'ph-arrow-right';
  return (
    <span className={`inline-flex items-center gap-1 text-[12.5px] font-medium tabular-nums ${cls}`}>
      <i className={`ph-bold ${icon} text-[12px]`} /> {value}
    </span>
  );
}

/** Significance badge — compact, readable, strong-tinted. */
export function SigPill({ level }: { level: '**' | '*' | '' }) {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[12px] font-medium whitespace-nowrap';
  if (level === '**') return <span className={base} style={{ background: '#86EFAC', color: '#065F46' }} title="Significatif à 5%">✓ p&lt;0,05</span>;
  if (level === '*')  return <span className={base} style={{ background: '#93C5FD', color: '#1E3A8A' }} title="Significatif à 10%">✓ p&lt;0,10</span>;
  return <span className={base} style={{ background: '#E5E7EB', color: '#374151' }} title="Non significatif">non significatif</span>;
}

/** Pastel icon tile (Acme Type A) */
export function IconTile({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'light' }) {
  const bg = tone === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-500';
  return <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center ${bg}`}>{children}</div>;
}

/** Stat card (Acme Type A) — pastel tile + label + big number + delta */
export function StatCard({
  icon, label, whole, fraction, unit, delta, deltaDir = 'up',
}: {
  icon: React.ReactNode; label: string;
  whole: string; fraction?: string; unit?: string;
  delta?: string; deltaDir?: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="bg-card rounded-[14px] border border-edge p-5 flex items-start gap-4">
      <IconTile>{icon}</IconTile>
      <div className="flex-1">
        <div className="text-[12px] text-ink-2 mb-1">{label}</div>
        <NumberDiminuendo whole={whole} fraction={fraction} unit={unit} size="lg" />
        {delta && <div className="mt-1.5"><DeltaChip value={delta} direction={deltaDir} /></div>}
      </div>
    </div>
  );
}

/** Stat strip (Pipesale) — 5 KPIs inline with soft dividers */
export function StatStrip({ items }: { items: { label: string; whole: string; fraction?: string; unit?: string; delta?: string; tip?: string }[] }) {
  return (
    <div className="bg-card rounded-[16px] border border-edge p-4 md:px-6 md:py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5">
      {items.map((it, i) => (
        <div key={i} className={`px-3 md:px-4 ${i > 0 ? 'lg:border-l border-edge' : ''} ${i > 0 && i % 3 !== 0 ? 'sm:border-l' : ''}`}>
          <div className="text-[12px] md:text-[13px] text-ink-2 mb-2 flex items-center gap-1.5 leading-tight">
            {it.label}
            {it.tip && <InfoIcon tip={it.tip} />}
          </div>
          <NumberDiminuendo whole={it.whole} fraction={it.fraction} unit={it.unit} size="lg" />
          {it.delta && <div className="mt-1.5"><DeltaChip value={it.delta} direction="up" /></div>}
        </div>
      ))}
    </div>
  );
}

/** Tick comb (Acme Stock availability) — tiny vertical ticks, fill % or categorical */
export function TickComb({
  count, activePct,
}: { count: number; activePct: number }) {
  const active = Math.round((activePct / 100) * count);
  return (
    <div className="flex gap-[2px] items-end h-5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background: i < active ? 'var(--color-blue-700)' : '#93C5FD',
            height: `${60 + ((i * 7) % 40)}%`,
          }}
        />
      ))}
    </div>
  );
}

/** Confidence interval bracket (Acme Projected Sales Growth — exact copy).
    Split color: red segment for negative, blue segment for positive, midpoint notch, bracket tips. */
export function BracketRange({
  lo, hi, mid, label,
}: { lo: number; hi: number; mid: number; label?: string }) {
  const width = hi - lo;
  const zeroPct = Math.max(0, Math.min(100, ((0 - lo) / width) * 100));
  const midPct = ((mid - lo) / width) * 100;
  const hasNegative = lo < 0;
  return (
    <div className="w-full">
      {label && <div className="text-[11px] text-ink-2 mb-1.5">{label}</div>}
      <div className="flex items-center gap-2 text-[11px] tabular-nums">
        <span className={`${lo < 0 ? 'text-negative' : 'text-ink-2'} w-14 text-right font-medium`}>{lo >= 0 ? '+' : ''}{lo.toFixed(2)}%</span>
        <div className="relative flex-1 h-2">
          {/* negative segment (red) */}
          {hasNegative && (
            <div className="absolute inset-y-0 left-0 rounded-l-full" style={{ width: `${zeroPct}%`, background: '#FEE2E2' }} />
          )}
          {/* positive segment (blue) */}
          <div className="absolute inset-y-0 rounded-r-full" style={{ left: `${zeroPct}%`, right: 0, background: '#DBEAFE' }} />
          {/* zero divider */}
          {hasNegative && (
            <div className="absolute top-0 bottom-0 w-px bg-ink-3" style={{ left: `${zeroPct}%` }} />
          )}
          {/* midpoint notch */}
          <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-700 ring-2 ring-white" style={{ left: `calc(${midPct}% - 5px)` }} />
          {/* bracket tips */}
          <div className="absolute left-0 -top-1.5 w-px h-5 bg-edge-strong" />
          <div className="absolute right-0 -top-1.5 w-px h-5 bg-edge-strong" />
        </div>
        <span className="text-positive w-14 font-medium">+{hi.toFixed(2)}%</span>
      </div>
    </div>
  );
}

/** Segmented pill tabs (kargul — exact copy).
    Pill container (rail bg), inner active tab = white card with soft shadow.
    Mobile: full-width equal grid with optional count sub-label. Desktop: inline whitespace-nowrap. */
export function SegmentedTabs<T extends string>({
  value, options, onChange,
}: { value: T; options: { id: T; label: string; shortLabel?: string; count?: number }[]; onChange: (v: T) => void }) {
  const cols = options.length;
  return (
    <div
      className={`p-1 rounded-[10px] bg-rail grid sm:inline-flex`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`px-3 py-2 sm:py-1.5 rounded-[8px] text-[12px] font-medium transition sm:whitespace-nowrap flex sm:inline flex-col items-center leading-tight
              ${active ? 'bg-card shadow-pill text-ink' : 'text-ink-2 hover:text-ink'}`}
          >
            <span className="sm:hidden">{o.shortLabel ?? o.label}</span>
            <span className="hidden sm:inline">{o.label}</span>
            {o.count != null && (
              <span className={`sm:hidden mt-0.5 text-[10.5px] font-normal tabular-nums ${active ? 'text-ink-2' : 'text-ink-3'}`}>
                {o.count} cat.
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Acme Order Breakdown — horizontal hatched-striped bar with legend on top.
    Three rows, each: colored dot + label + big number, then the hatched bar beneath. */
export function StripedBarCard({
  items,
}: { items: { label: string; value: string; sub?: string; tone: 'blue' | 'pink' | 'green' }[] }) {
  const tones = {
    blue:  { bar: '#1D4ED8', bg: '#DBEAFE' },
    pink:  { bar: '#DB2777', bg: '#FCE7F3' },
    green: { bar: '#16A34A', bg: '#DCFCE7' },
  };
  return (
    <div className="space-y-6">
      {items.map((it, i) => {
        const t = tones[it.tone];
        return (
          <div key={i}>
            <div
              className="h-3.5 rounded-full relative overflow-hidden"
              style={{
                background: t.bg,
                backgroundImage: `repeating-linear-gradient(45deg, ${t.bar} 0 3px, ${t.bg} 3px 7px)`,
              }}
            />
            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.bar }} />
              <span className="text-[14px] text-ink font-medium">{it.label}</span>
              <span className="text-[20px] font-medium text-ink tabular-nums ml-auto">{it.value}</span>
            </div>
            {it.sub && <div className="text-[12.5px] text-ink-2 ml-[18px] mt-1">{it.sub}</div>}
          </div>
        );
      })}
    </div>
  );
}

/** Ranked list — label + meta on top, thin horizontal bar below, value right-aligned.
    Clean, minimalist; no chunky colored boxes, no taper — just clear hierarchy. */
export function HorizontalFunnel({ items }: { items: { label: string; value: string; sub?: string; shade: number }[] }) {
  const shades = ['#1D4ED8', '#3B82F6', '#60A5FA', '#93C5FD'];
  // Normalize widths by value magnitude
  const values = items.map(it => parseFloat(it.value.replace('+','').replace('%','').replace(',','.')));
  const maxV = Math.max(...values);
  return (
    <div className="space-y-5">
      {items.map((it, i) => {
        const widthPct = (values[i] / maxV) * 100;
        return (
          <div key={i}>
            {/* Value on top, lead */}
            <div className="text-[22px] font-medium tabular-nums text-ink leading-none">{it.value}</div>
            {/* Label below */}
            <div className="text-[13.5px] font-medium text-ink mt-1.5">{it.label}</div>
            {/* Meta / legend */}
            {it.sub && <div className="text-[12px] text-ink-2 mt-0.5 tabular-nums">{it.sub}</div>}
            {/* Bar at the bottom */}
            <div className="h-2 rounded-full bg-rail relative mt-3">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${widthPct}%`, background: shades[i] ?? shades[shades.length - 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Green check badge — never use a bare ✓. Always in a filled circle. */
export function CheckBadge({ size = 20 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full"
      style={{ width: size, height: size, background: '#16A34A' }}
      aria-label="Confirmé"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

/** Verified check (Acme) — small blue seal */
export function VerifiedCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="inline-block shrink-0">
      <circle cx="10" cy="10" r="9" fill="#1D4ED8" />
      <path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Active nav pill (universal) — white with soft shadow */
export function NavPill({
  active, icon, children, onClick, compact = false,
}: { active?: boolean; icon?: React.ReactNode; children: React.ReactNode; onClick?: () => void; compact?: boolean }) {
  const base = compact ? 'px-3 py-2 text-[13.5px]' : 'px-3 py-2.5 text-[14px]';
  return (
    <button
      onClick={onClick}
      className={`w-full text-left ${base} rounded-[10px] flex items-center gap-3 transition
        ${active ? 'bg-card shadow-pill text-ink font-medium' : 'text-ink-2 hover:bg-hover'}`}
    >
      {icon && <span className="w-4 h-4 shrink-0 inline-flex items-center justify-center">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
}

/** Dark tooltip (Lokananta) — for chart hovers. Rendered inline where Recharts expects. */
export function DarkTooltip({ payload, label, formatter }: { payload: any[]; label: string; formatter?: (v: any) => string }) {
  if (!payload?.length) return null;
  return (
    <div className="tooltip-dark">
      <div className="text-[11px] opacity-70 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-[11px] opacity-85">{p.name}</span>
          <span className="text-[12px] font-medium tabular-nums ml-auto">{formatter ? formatter(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Ratio label — shows "×13" or "2:1" above a paired bar */
export function RatioLabel({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium tabular-nums">{children}</span>;
}

/** Section card wrapper */
export function Card({ title, subtitle, right, children, className = '' }: {
  title?: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={`bg-card rounded-[16px] border border-edge p-5 sm:p-6 md:p-7 ${className}`}>
      {(title || right) && (
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 md:mb-6">
          <div className="min-w-0">
            {title && <h3 className="text-[17px] font-medium leading-tight">{title}</h3>}
            {subtitle && <p className="text-[13px] text-ink-2 mt-1.5 leading-relaxed">{subtitle}</p>}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
