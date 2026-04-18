import { useEffect, useState } from 'react';
import { PrimaryNav } from './components/layout/PrimaryNav';
import { QuestionRail } from './components/layout/QuestionRail';
import { ContentShell } from './components/layout/ContentShell';
import type { Lang } from './data/i18n';
import { L, t } from './data/i18n';
import { paper } from './data/paper';
import { VHero } from './views/VHero';
import { VHierarchy } from './views/VHierarchy';
import { VTradable } from './views/VTradable';
import {
  VRupture,
  VDistribution,
  VLabor,
  VModel,
  VPolicy,
  VData,
  VPolitical,
  VFiscal,
} from './views/VOthers';
import { DebugInspector } from './components/dev/DebugInspector';

function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [active, setActive] = useState('hero');
  const [railOpen, setRailOpen] = useState(false);
  // Lazy-init from matchMedia so first paint is correct on narrow viewports
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1279px)').matches
  );
  const [isNarrow, setIsNarrow] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );

  useEffect(() => {
    const mCompact = window.matchMedia('(max-width: 1279px)');
    const mNarrow  = window.matchMedia('(max-width: 1023px)');
    const sync = () => { setIsCompact(mCompact.matches); setIsNarrow(mNarrow.matches); };
    sync();
    mCompact.addEventListener('change', sync);
    mNarrow.addEventListener('change', sync);
    return () => { mCompact.removeEventListener('change', sync); mNarrow.removeEventListener('change', sync); };
  }, []);

  // Close rail drawer when a question is picked
  const onPick = (id: string) => { setActive(id); setRailOpen(false); };

  const q = t.questions.find((x) => x.id === active) ?? t.questions[0];
  const label = lang === 'fr' ? q.fr : q.ht;

  const views: Record<string, (props: { lang: Lang }) => React.ReactElement> = {
    hero: VHero, rupture: VRupture, distribution: VDistribution,
    hierarchy: VHierarchy, political: VPolitical, fiscal: VFiscal,
    tradable: VTradable, labor: VLabor, model: VModel,
    policy: VPolicy, data: VData,
  };
  const View = views[active] ?? VHero;
  const meta = (t.v as any)[active];
  const title = meta?.title ? L(meta.title, lang) : label;
  const kicker = meta?.kicker ? L(meta.kicker, lang) : '';
  const synopsis = meta?.synopsis ? L(meta.synopsis, lang) : '';

  return (
    <div className="h-screen flex bg-rail overflow-hidden">
      {/* Primary nav — flush to top/left/bottom, no rounding */}
      {!isNarrow && <PrimaryNav lang={lang} setLang={setLang} />}

      {/* Spacer — grey strip between PrimaryNav card and QuestionRail */}
      {!isNarrow && !isCompact && <div className="w-3 sm:w-4 md:w-5 shrink-0" />}

      {/* Question rail: visible at ≥1280px, drawer below */}
      {!isCompact && <QuestionRail lang={lang} activeId={active} setActive={setActive} />}

      {/* Compact: drawer with rail + primary nav */}
      {isCompact && (
        <>
          {railOpen && (
            <div className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]" onClick={() => setRailOpen(false)} />
          )}
          <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-250 ease-out flex ${railOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Close button floating on top-right of drawer */}
            {railOpen && (
              <button
                onClick={() => setRailOpen(false)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-card border border-edge flex items-center justify-center text-ink hover:bg-hover shadow-pill"
                aria-label="Fermer"
              >
                <i className="ph-bold ph-x text-[16px]" />
              </button>
            )}
            <QuestionRail lang={lang} activeId={active} setActive={onPick} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0 bg-rail p-3 sm:p-4 md:p-5 overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col bg-page rounded-[20px] overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04)] border border-edge">
        <ContentShell lang={lang} activeLabel={label} title={title} kicker={kicker} synopsis={synopsis} onNavigate={onPick}>
          <div key={active} className="view-enter">
            <View lang={lang} />
          </div>
        </ContentShell>
        </div>
      </div>

      {/* Compact+mobile bottom action bar — always provides access to Questions when rail is hidden */}
      {isCompact && (
        <div
          className="fixed bottom-0 inset-x-0 z-30 bg-card border-t border-edge flex gap-2 px-4 pt-3"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 10px)' }}
        >
          <button
            onClick={() => setRailOpen(true)}
            aria-label={lang === 'fr' ? 'Ouvrir les questions' : 'Louvri kesyon yo'}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-[12px] bg-ink text-white text-[14px] font-medium hover:bg-blue-900 transition min-h-[48px]"
          >
            <i className="ph-bold ph-list text-[16px]" />
            {lang === 'fr' ? 'Questions' : 'Kesyon'}
          </button>
          <a
            href={paper.pdfUrl}
            download="BRH-WP-2026-01.pdf"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-[12px] border border-edge bg-card text-ink text-[14px] font-medium hover:bg-hover transition min-h-[48px]"
          >
            <i className="ph-bold ph-download-simple text-[16px]" />
            PDF
          </a>
        </div>
      )}

      {import.meta.env.DEV && <DebugInspector />}
    </div>
  );
}

export default App;
