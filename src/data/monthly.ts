// Monthly inflation (%) — reconstructed from ipcSeries.
// Pre-2018: low vol oscillating around 0.3%; post-2018: higher vol 1.5-4%, spikes at events.
import { ipcSeries } from './series';

export type Candle = { month: string; inflation: number; phase: 'pre' | 'post'; event?: string };

const EVENTS: Record<string, string> = {
  '2018-07': 'Peyi Lock',
  '2020-03': 'Pandémie',
  '2021-07': 'Assassinat',
  '2022-02': 'Crise fiscale',
  '2023-03': 'Crise sécuritaire',
};

export const monthlyInflation: Candle[] = ipcSeries.slice(1).map((p, i) => {
  const prev = ipcSeries[i];
  const infl = ((p.ipc - prev.ipc) / prev.ipc) * 100;
  return {
    month: p.month,
    inflation: +infl.toFixed(2),
    phase: p.phase,
    event: EVENTS[p.month],
  };
});

// Smooth trend = 12-month centered moving average
export const inflationTrend = monthlyInflation.map((c, i, arr) => {
  const window = 6;
  const lo = Math.max(0, i - window);
  const hi = Math.min(arr.length, i + window);
  const avg = arr.slice(lo, hi).reduce((s, x) => s + x.inflation, 0) / (hi - lo);
  return { month: c.month, trend: +avg.toFixed(2) };
});

// Merged for chart rendering (candles + trend line on one dataset)
export const candleData = monthlyInflation.map((c, i) => ({
  ...c,
  trend: inflationTrend[i].trend,
}));
