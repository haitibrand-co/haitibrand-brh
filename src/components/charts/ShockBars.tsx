import { irfPeaks } from '../../data/paper';
import { SigPill } from '../ui/primitives';

/** Vertical bar chart — three shocks at peak, CI whiskers (T-bars) on top, labels below.
    Designed for the wide card slot. */
export function ShockBars() {
  const rows = irfPeaks.filter(r => r.inflation === 'Agrégée');
  const max = 11;                // Y axis max (%)
  const zeroPct = 14;            // zero baseline sits 14% from bottom to leave room for negative whiskers

  const mapY = (v: number) => zeroPct + (v / max) * (100 - zeroPct);

  return (
    <div>
      <div className="relative h-[260px] grid grid-cols-3 gap-8 px-6 pt-4">
        {/* Horizontal gridlines */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 3, 6, 9].map((v, i) => (
            <div key={i} className="absolute inset-x-0 flex items-center" style={{ bottom: `${mapY(v)}%` }}>
              <span className="w-9 text-right text-[10.5px] text-ink-2 tabular-nums pr-2">{v}%</span>
              <div className="flex-1 border-t border-dashed border-edge" />
            </div>
          ))}
          {/* Solid zero line */}
          <div className="absolute inset-x-0 flex items-center" style={{ bottom: `${zeroPct}%` }}>
            <span className="w-9 text-right text-[10.5px] text-ink font-medium tabular-nums pr-2">0%</span>
            <div className="flex-1 border-t border-edge-strong" />
          </div>
        </div>

        {/* Bars + whiskers */}
        {rows.map((r, i) => {
          const lo = Math.max(r.beta - 1.645 * r.se, -3);
          const hi = r.beta + 1.645 * r.se;
          const color = r.sig === '**' ? '#1D4ED8' : r.sig === '*' ? '#3B82F6' : '#93C5FD';
          const topBarPct = mapY(r.beta);
          const loPct = mapY(lo);
          const hiPct = mapY(hi);
          return (
            <div key={i} className="relative">
              {/* Bar — thinner */}
              <div
                className="absolute rounded-t-[6px] left-1/2 -translate-x-1/2"
                style={{ width: 40, bottom: `${zeroPct}%`, top: `${100 - topBarPct}%`, background: color }}
              />
              {/* CI vertical stem — lighter */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-px bg-ink-2 opacity-70"
                style={{ bottom: `${loPct}%`, height: `${hiPct - loPct}%` }}
              />
              {/* CI top T — narrower */}
              <div
                className="absolute left-1/2 -translate-x-1/2 h-px w-3 bg-ink-2 opacity-70"
                style={{ bottom: `${hiPct}%` }}
              />
              {/* CI bottom T */}
              <div
                className="absolute left-1/2 -translate-x-1/2 h-px w-3 bg-ink-2 opacity-70"
                style={{ bottom: `${loPct}%` }}
              />
              {/* Value label floating above whisker */}
              <div
                className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                style={{ bottom: `calc(${hiPct}% + 8px)` }}
              >
                <div className="text-[14px] font-medium tabular-nums text-ink leading-none">+{r.beta.toFixed(2)}%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels stacked cleanly under each bar */}
      <div className="grid grid-cols-3 gap-8 px-6 mt-5 pt-5 border-t border-edge">
        {rows.map((r, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="text-[14px] text-ink font-medium">{r.shock}</div>
            <SigPill level={r.sig} />
            <div className="text-[12px] text-ink-2 tabular-nums">t = {r.t.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
