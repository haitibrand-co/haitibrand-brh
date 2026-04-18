import { useEffect, useState } from 'react';
import { PrimaryNav } from './components/layout/PrimaryNav';
import { QuestionRail } from './components/layout/QuestionRail';
import { ContentShell } from './components/layout/ContentShell';
import type { Lang } from './data/i18n';
import { L, t } from './data/i18n';
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

  return (
    <div className="h-screen flex bg-page overflow-hidden">
      {/* Primary nav: hidden at mobile; full-width drawer or static */}
      {!isNarrow && <PrimaryNav lang={lang} setLang={setLang} />}

      {/* Question rail: visible at ≥1280px, drawer below */}
      {!isCompact && <QuestionRail lang={lang} activeId={active} setActive={setActive} />}

      {/* Compact: top-of-content "Questions" dropdown trigger */}
      {isCompact && (
        <>
          {railOpen && (
            <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setRailOpen(false)} />
          )}
          <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ${railOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <QuestionRail lang={lang} activeId={active} setActive={onPick} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {isCompact && (
          <div className="bg-card border-b border-edge px-5 py-2 flex items-center gap-3">
            <button
              onClick={() => setRailOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-edge bg-page text-[12px] text-ink-2 hover:bg-hover"
            >
              <i className="ph ph-list text-[14px]" />
              {lang === 'fr' ? 'Questions' : 'Kesyon'}
            </button>
            <span className="text-[12px] text-ink-2 truncate">{label}</span>
          </div>
        )}

        <ContentShell lang={lang} activeLabel={label} title={title} kicker={kicker} onNavigate={onPick}>
          <div key={active} className="view-enter">
            <View lang={lang} />
          </div>
        </ContentShell>
      </div>
    </div>
  );
}

export default App;
