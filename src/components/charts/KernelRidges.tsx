import { ipcDistribution } from '../../data/paper';

/** Joy plot — kernel densities of the 156 IPC categories, one ridge per 5-year snapshot.
    Each ridge sits on its own baseline with a year label to the left.
    Color gradient pale→bold reads "distribution has shifted and widened over time".
    This is exactly Figure 6 from the paper, presented as a senior economist would expect. */
export function KernelRidges() {
  const width = 680;
  const xMax = 800;              // IPC index
  const rowH = 52;                // per-year band height — tighter
  const leftGutter = 48;          // smaller year-label gutter
  const rightPad = 16;
  const chartW = width - leftGutter - rightPad;
  const xAxisH = 48;               // more room so ticks don't touch label
  const totalH = ipcDistribution.length * rowH + xAxisH + 12;

  // Color gradient: 1998 pale → 2023 deep
  const palette = ['#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#1D4ED8', '#1E3A8A'];

  function ridgePath(mean: number, maxVal: number) {
    const std = Math.max(10, (maxVal - mean) / 2);
    const peak = 1 / (std * Math.sqrt(2 * Math.PI));
    const pts: string[] = [];
    for (let x = 0; x <= xMax; x += 6) {
      const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      const px = leftGutter + (x / xMax) * chartW;
      const py = rowH - (y / peak) * (rowH - 6);
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  return (
    <div className="w-full">
      <svg width="100%" viewBox={`0 0 ${width} ${totalH}`}>
        {/* Ridges, stacked one per year */}
        {ipcDistribution.map((d, i) => {
          const color = palette[i];
          return (
            <g key={i} transform={`translate(0 ${i * rowH})`}>
              {/* Faint baseline */}
              <line x1={leftGutter} x2={leftGutter + chartW} y1={rowH} y2={rowH} stroke="#E5E7EB" strokeWidth={1} />
              {/* Ridge fill (trapezoid closed to baseline) */}
              <polygon
                points={`${leftGutter},${rowH} ${ridgePath(d.mean, d.max)} ${leftGutter + chartW},${rowH}`}
                fill={color}
                fillOpacity={0.22}
                stroke={color}
                strokeWidth={1.2}
                strokeLinejoin="round"
              />
              {/* Year label */}
              <text
                x={leftGutter - 10}
                y={rowH - 8}
                fontSize="11"
                fontWeight="500"
                fill={i === ipcDistribution.length - 1 ? '#1E3A8A' : '#64748B'}
                textAnchor="end"
              >
                {d.year}
              </text>
              {/* Mean tick + label inline */}
              <line
                x1={leftGutter + (d.mean / xMax) * chartW}
                x2={leftGutter + (d.mean / xMax) * chartW}
                y1={rowH - 3}
                y2={rowH + 3}
                stroke={color}
                strokeWidth={1.5}
              />
              <text
                x={leftGutter + (d.mean / xMax) * chartW + 5}
                y={rowH - 5}
                fontSize="9.5"
                fill="#64748B"
              >
                μ {d.mean}
              </text>
            </g>
          );
        })}

        {/* X-axis */}
        <g transform={`translate(0 ${ipcDistribution.length * rowH + 6})`}>
          <line x1={leftGutter} x2={leftGutter + chartW} y1={0} y2={0} stroke="#D1D5DB" strokeWidth={1} />
          {[0, 200, 400, 600, 800].map((v) => {
            const x = leftGutter + (v / xMax) * chartW;
            return (
              <g key={v}>
                <line x1={x} x2={x} y1={0} y2={4} stroke="#D1D5DB" />
                <text x={x} y={18} fontSize="10.5" fill="#64748B" textAnchor="middle">{v}</text>
              </g>
            );
          })}
          <text
            x={leftGutter + chartW / 2}
            y={40}
            fontSize="10.5"
            fill="#94A3B8"
            textAnchor="middle"
            fontWeight="500"
          >
            Indice IPC (base 100 = oct. 1998)
          </text>
        </g>
      </svg>

      {/* Summary stats at bottom — quantified */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5 border-t border-edge pt-5">
        <div>
          <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1">Moyenne</div>
          <div className="text-[18px] font-medium tabular-nums text-ink">16,3 <span className="text-ink-2">→</span> <span className="text-blue-700">326</span></div>
          <div className="text-[11.5px] text-ink-2 mt-0.5 tabular-nums">×20 · 25 ans</div>
        </div>
        <div>
          <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1">Maximum</div>
          <div className="text-[18px] font-medium tabular-nums text-ink">~30 <span className="text-ink-2">→</span> <span className="text-blue-700">693</span></div>
          <div className="text-[11.5px] text-ink-2 mt-0.5 tabular-nums">×23</div>
        </div>
        <div>
          <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1">Coeff. variation</div>
          <div className="text-[18px] font-medium tabular-nums text-ink">0,28 <span className="text-ink-2">→</span> <span className="text-blue-700">0,52</span></div>
          <div className="text-[11.5px] text-ink-2 mt-0.5">dispersion ×1,9</div>
        </div>
        <div>
          <div className="text-[12px] text-ink-2 uppercase tracking-[0.06em] mb-1">Asymétrie</div>
          <div className="text-[18px] font-medium tabular-nums text-ink">0,4 <span className="text-ink-2">→</span> <span className="text-blue-700">1,8</span></div>
          <div className="text-[11.5px] text-ink-2 mt-0.5">queue droite épaisse</div>
        </div>
      </div>
      <div className="mt-4 text-[11.5px] text-ink-2">
        Source&nbsp;: IHSI, 156 catégories de l'IPC (produits alimentaires, énergie, loyers, services). Estimation par noyau gaussien, bande passante Silverman.
      </div>
    </div>
  );
}
