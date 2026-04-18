import { RatioLabel } from '../ui/primitives';

/** Pre vs Post slope comparison bar — the "×13" punchline */
export function SlopeCompare() {
  const preH = 8;    // height% for 3.2
  const postH = 100; // height% for 42
  return (
    <div className="flex items-end gap-6 h-full">
      {/* Pre bar */}
      <div className="flex-1 flex flex-col items-center justify-end h-full">
        <div className="text-[12px] text-ink-2 mb-1.5">Pré-2018</div>
        <div className="w-full relative" style={{ height: `${preH}%`, minHeight: 24 }}>
          <div className="absolute inset-0 hatch-blue-light rounded-t-[8px] border border-blue-300" />
        </div>
        <div className="mt-2 text-[20px] font-medium text-ink tabular-nums">3,2 <span className="text-[12px] text-ink-2">pts/an</span></div>
      </div>

      {/* Arrow + ratio */}
      <div className="flex flex-col items-center pb-16">
        <RatioLabel>×13</RatioLabel>
        <i className="ph-bold ph-arrow-right text-[22px] text-ink mt-2" />
      </div>

      {/* Post bar */}
      <div className="flex-1 flex flex-col items-center justify-end h-full">
        <div className="text-[12px] text-ink-2 mb-1.5">Post-2018</div>
        <div className="w-full relative" style={{ height: `${postH}%` }}>
          <div className="absolute inset-0 bg-blue-700 rounded-t-[8px]" />
          <div className="absolute inset-0 hatch-blue opacity-60 rounded-t-[8px]" />
        </div>
        <div className="mt-2 text-[20px] font-medium text-ink tabular-nums">42 <span className="text-[12px] text-ink-2">pts/an</span></div>
      </div>
    </div>
  );
}
