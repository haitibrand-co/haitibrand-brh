// Reconstructed time series from the paper's figures.
// IPC aggregate (figure 3), monthly, 1998-10 to 2024-08.
// Pre-2018 slope ~3.2 pts/yr (0.27/mo); Post-2018 slope ~42 pts/yr (3.5/mo).
// Base Oct 1998 ~ 16.3; by Jul 2018 ~ 112; by Aug 2024 ~ 380+.

function monthlyIPC() {
  const series: { month: string; ipc: number; phase: 'pre' | 'post' }[] = [];
  let v = 16.3;
  const start = new Date(1998, 9, 1); // Oct 1998
  const rupture = new Date(2018, 6, 1); // Jul 2018
  for (let i = 0; i < 311; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    const post = d >= rupture;
    const base = post ? 3.5 : 0.27;
    // zig-zag: base + seasonal sine + political noise
    const noise = (Math.sin(i * 0.7) * (post ? 1.8 : 0.6)) + (post ? Math.sin(i * 0.23) * 3 : Math.sin(i * 0.35) * 0.4);
    const shock = post && (i % 17 === 0) ? 4 : 0;
    v += base + noise * 0.3 + shock * 0.15;
    if (v < 0) v = 1;
    series.push({
      month: d.toISOString().slice(0, 7),
      ipc: +v.toFixed(1),
      phase: post ? 'post' : 'pre',
    });
  }
  return series;
}

export const ipcSeries = monthlyIPC();

// Tradable vs non-tradable cumulative IPC (figure 5) ~~ similar shape but divergence post-2018
function tradableSeries() {
  const tradable: { month: string; t: number; nt: number }[] = [];
  let t = 16, nt = 16;
  const start = new Date(1998, 9, 1);
  const rupture = new Date(2018, 6, 1);
  for (let i = 0; i < 311; i++) {
    const d = new Date(start);
    d.setMonth(start.getMonth() + i);
    const post = d >= rupture;
    if (post) {
      t  += 3.8 + Math.sin(i * 0.7) * 0.8;
      nt += 2.6 + Math.sin(i * 0.65) * 0.5;
    } else {
      t  += 0.28 + Math.sin(i * 0.35) * 0.2;
      nt += 0.25 + Math.sin(i * 0.33) * 0.18;
    }
    tradable.push({ month: d.toISOString().slice(0, 7), t: +t.toFixed(1), nt: +nt.toFixed(1) });
  }
  return tradable;
}

export const tradableIPC = tradableSeries();

// IRF curves — monthly cumulative response (figure 7)
// Political: monotonic rising to peak at h=24
// Fiscal: oscillating, peak at h=21 at +1.42
// Labor: flat then small peak at h=15 at +0.90
function irfCurve(peak: number, peakH: number, shape: 'rise' | 'wobble' | 'flat'): { h: number; beta: number; lo: number; hi: number }[] {
  const arr = [];
  for (let h = 0; h <= 25; h++) {
    let b = 0;
    if (shape === 'rise') {
      b = peak * (h / peakH) * (h <= peakH ? 1 : 1 + (h - peakH) * 0.005);
      if (h > peakH) b = peak + (h - peakH) * 0.02;
      b += Math.sin(h * 0.6) * 0.25;
    } else if (shape === 'wobble') {
      b = peak * Math.pow(h / peakH, 1.2) + Math.sin(h * 0.8) * 0.4;
      if (h > peakH) b = peak + Math.sin(h * 0.8) * 0.4;
    } else {
      b = peak * Math.pow(Math.sin((h / peakH) * (Math.PI / 2)), 2) + Math.sin(h * 0.5) * 0.18;
      if (h > peakH) b = peak * 0.7 + Math.sin(h * 0.5) * 0.25;
    }
    // 90% CI band — widens with horizon, tighter for political
    const band = shape === 'rise' ? 1.8 + h * 0.12 : shape === 'wobble' ? 1.6 + h * 0.09 : 1.2 + h * 0.07;
    arr.push({ h, beta: +b.toFixed(2), lo: +(b - band).toFixed(2), hi: +(b + band).toFixed(2) });
  }
  return arr;
}

export const irfAggregate = {
  political: irfCurve(4.93, 24, 'rise'),
  fiscal:    irfCurve(1.42, 21, 'wobble'),
  labor:     irfCurve(0.90, 15, 'flat'),
};

export const irfTradable = {
  political: irfCurve(5.59, 24, 'rise'),
  fiscal:    irfCurve(1.70, 21, 'wobble'),
  labor:     irfCurve(0.92, 4,  'flat'),
};

export const irfNonTradable = {
  political: irfCurve(2.84, 17, 'rise'),
  fiscal:    irfCurve(0.53, 21, 'wobble'),
  labor:     irfCurve(1.59, 22, 'rise'),
};

// Persistence propagation — rho=0.536 → 1, 1.54, 1.83, 2.02, 2.13, 2.15
export const persistenceSteps = [
  { step: 'Initial',  value: 1.00 },
  { step: 't+1',      value: 1.54 },
  { step: 't+2',      value: 1.83 },
  { step: 't+3',      value: 2.02 },
  { step: 't+4',      value: 2.13 },
  { step: 'Long terme', value: 2.15 },
];
