import { useEffect, useRef, useState } from 'react';

type Info = {
  tag: string;
  w: number;
  h: number;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  color: string;
  bg: string;
  padding: string;
  margin: string;
  text: string;
};

/** Dev-only floating inspector. Hold Option/Alt to reveal, release to hide. */
export function DebugInspector() {
  const [holding, setHolding] = useState(false);
  const [info, setInfo] = useState<Info | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const lastEl = useRef<Element | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.altKey) setHolding(true); };
    const up   = (e: KeyboardEvent) => { if (!e.altKey) setHolding(false); };
    const blur = () => setHolding(false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, []);

  useEffect(() => {
    if (!holding) { setInfo(null); return; }
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el || el === lastEl.current) {
          setPos({ x: e.clientX, y: e.clientY });
          return;
        }
        // Skip our own overlay
        if ((el as HTMLElement).dataset?.debugInspector === 'true' ||
            el.closest('[data-debug-inspector="true"]')) return;
        lastEl.current = el;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        setInfo({
          tag: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''),
          w: Math.round(r.width),
          h: Math.round(r.height),
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily.split(',')[0].replace(/"/g, '').trim(),
          color: rgbToHex(cs.color),
          bg: rgbToHex(cs.backgroundColor),
          padding: cs.padding,
          margin: cs.margin,
          text: (el.textContent || '').slice(0, 40).replace(/\s+/g, ' ').trim(),
        });
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [holding]);

  if (!holding || !info) return null;

  // Position tooltip — offset from cursor, flip to left/above when near edges
  const pad = 14;
  const w = 300;
  const h = 220;
  const right = pos.x + pad + w > window.innerWidth;
  const bottom = pos.y + pad + h > window.innerHeight;
  const left = right ? pos.x - w - pad : pos.x + pad;
  const top = bottom ? pos.y - h - pad : pos.y + pad;

  return (
    <div
      data-debug-inspector="true"
      className="fixed z-[9999] pointer-events-none select-none bg-black/92 text-white rounded-lg shadow-2xl border border-white/10"
      style={{ left, top, width: w, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
    >
      <div className="px-3 py-2 border-b border-white/10 text-[11px] text-blue-300 truncate">{info.tag}</div>
      <div className="px-3 py-2 space-y-1 text-[11px] leading-relaxed">
        <Row label="size" value={`${info.w} × ${info.h}px`} />
        <Row label="font" value={`${info.fontSize} · ${info.fontWeight} · ${info.fontFamily}`} />
        <Row label="color" value={info.color} swatch={info.color} />
        <Row label="bg"    value={info.bg}    swatch={info.bg} />
        <Row label="pad"   value={info.padding} />
        <Row label="mar"   value={info.margin} />
        {info.text && <Row label="text" value={`"${info.text}"`} />}
      </div>
      <div className="px-3 py-1.5 border-t border-white/10 text-[9.5px] text-white/40">hold ⌥ option</div>
    </div>
  );
}

function Row({ label, value, swatch }: { label: string; value: string; swatch?: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-white/40 w-10 shrink-0">{label}</span>
      {swatch && swatch !== 'transparent' && swatch !== 'rgba(0, 0, 0, 0)' && (
        <span className="w-3 h-3 rounded-sm shrink-0 mt-0.5 ring-1 ring-white/20" style={{ background: swatch }} />
      )}
      <span className="text-white/90 break-all">{value}</span>
    </div>
  );
}

function rgbToHex(rgb: string): string {
  if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return 'transparent';
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return rgb;
  const [, r, g, b, a] = m;
  const hex = '#' + [r, g, b].map(n => parseInt(n).toString(16).padStart(2, '0')).join('').toUpperCase();
  return a && +a < 1 ? `${hex} · ${Math.round(+a * 100)}%` : hex;
}
