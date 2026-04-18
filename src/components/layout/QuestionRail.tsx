import type { Lang } from '../../data/i18n';
import { L, t } from '../../data/i18n';

export function QuestionRail({
  lang, activeId, setActive,
}: { lang: Lang; activeId: string; setActive: (id: string) => void }) {
  const groups = ['essential', 'causes', 'mechanisms', 'consequences'] as const;
  return (
    <aside className="w-[280px] shrink-0 bg-rail flex flex-col overflow-hidden">
      <div className="px-5 pt-[116px] pb-4">
        <h2 className="text-[17px] font-medium text-ink">{L(t.nav.readerQs, lang)}</h2>
        <p className="text-[12.5px] text-ink-2 mt-1">{lang === 'fr' ? 'Cliquez pour explorer.' : 'Klike pou w eksplore.'}</p>
      </div>

      <div className="px-3 pb-4 space-y-4 overflow-y-auto scroll-thin flex-1">
        {groups.map(g => (
          <div key={g}>
            <div className="px-3 py-1.5 text-[11.5px] tracking-[0.08em] text-ink-2 uppercase font-medium">
              {L(t.nav[g as keyof typeof t.nav] as any, lang)}
            </div>
            <div className="space-y-1 mt-1">
              {t.questions.filter(q => q.group === g).map(q => (
                <button
                  key={q.id}
                  onClick={() => setActive(q.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-[10px] text-[14px] leading-snug transition
                    ${activeId === q.id ? 'bg-card shadow-pill text-ink font-medium' : 'text-ink-2 hover:bg-hover'}`}
                >
                  {(lang === 'fr' ? q.fr : q.ht).replace(/ ([?!:;»])/g, '\u00A0$1').replace(/« /g, '«\u00A0')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Institution signature — fixed 84px block, top divider aligns with content footer */}
      <div className="h-[84px] border-t border-edge px-5 flex items-center gap-3">
        <img src="/brh-logo.png" alt="BRH" className="w-9 h-9 object-contain shrink-0" />
        <div className="text-[13px] font-medium leading-snug text-ink">
          Banque de la République d'Haïti
        </div>
      </div>
    </aside>
  );
}
