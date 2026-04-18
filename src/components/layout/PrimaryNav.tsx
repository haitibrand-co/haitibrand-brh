import { paper } from '../../data/paper';
import type { Lang } from '../../data/i18n';
import { L, t } from '../../data/i18n';
import { NavPill, VerifiedCheck } from '../ui/primitives';

export function PrimaryNav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <aside className="w-[250px] shrink-0 bg-page flex flex-col h-full">
      {/* Brand — text only, logo lives in the institution footer */}
      <div className="px-4 pt-6 pb-3">
        <div className="text-[15px] font-medium leading-tight text-ink">BRH · DREF</div>
        <div className="text-[12px] text-ink-2 leading-tight mt-1">Direction de la Recherche</div>
      </div>

      {/* Paper meta card */}
      <div className="mx-3 my-2 p-3.5 rounded-[12px] bg-card border border-edge">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-1.5 py-0.5 rounded-[5px] bg-blue-50 text-blue-700 text-[11px] font-medium tabular-nums">{paper.id}</span>
          <VerifiedCheck size={13} />
          <span className="text-[11px] text-ink-2 ml-auto">{paper.date}</span>
        </div>
        <div className="text-[13.5px] font-medium leading-snug text-ink">
          {L(paper.title, lang)}
        </div>
        <div className="text-[12px] text-ink mt-2.5 leading-snug space-y-1">
          {paper.authors.map((a, i) => (
            <div key={i}>{a}</div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="px-3 mt-3">
        <div className="px-2 py-1 text-[11.5px] font-medium tracking-[0.08em] text-ink-2 uppercase">{L(t.nav.rubriques, lang)}</div>
        <nav className="space-y-0.5 mt-1">
          <NavPill active icon={<i className="ph ph-squares-four text-[18px]" />}>{lang === 'fr' ? 'Aperçu' : 'Apèsi'}</NavPill>
          <NavPill icon={<i className="ph ph-book-open text-[18px]" />}>{lang === 'fr' ? 'Faits stylisés' : 'Fè estilize'}</NavPill>
          <NavPill icon={<i className="ph ph-flask text-[18px]" />}>{lang === 'fr' ? 'Modèle' : 'Modèl'}</NavPill>
          <NavPill icon={<i className="ph ph-quotes text-[18px]" />}>{lang === 'fr' ? 'Références' : 'Referans'}</NavPill>
        </nav>
      </div>

      <div className="px-3 mt-4">
        <div className="px-2 py-1 text-[11.5px] font-medium tracking-[0.08em] text-ink-2 uppercase">{L(t.nav.donnees, lang)}</div>
        <nav className="space-y-0.5 mt-1">
          <NavPill icon={<i className="ph ph-database text-[18px]" />}>IPC · IHSI</NavPill>
          <NavPill icon={<i className="ph ph-chart-bar text-[18px]" />}>Macro · BRH</NavPill>
          <NavPill icon={<i className="ph ph-users-three text-[18px]" />}>{lang === 'fr' ? 'Travail · JobPaw' : 'Travay · JobPaw'}</NavPill>
        </nav>
      </div>

      {/* Language toggle — sits right after Données */}
      <div className="mx-3 mt-4">
        <div className="px-1 py-1 text-[11px] font-medium tracking-[0.08em] text-ink-2 uppercase mb-1.5">
          {lang === 'fr' ? 'Langue' : 'Lang'}
        </div>
        <div className="relative p-1 rounded-[10px] flex bg-rail">
          {(['fr', 'ht'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 py-2 text-[13px] font-medium rounded-[8px] transition relative z-10
                ${lang === l ? 'bg-card text-ink shadow-pill' : 'text-ink-2 hover:text-ink'}`}
            >
              {l === 'fr' ? 'Français' : 'Kreyòl'}
            </button>
          ))}
        </div>
      </div>

      {/* PDF file row — no fake dropdown */}
      <div className="mx-3 mt-3">
        <div className="flex items-center gap-2.5 border border-edge rounded-[10px] px-3 py-2.5 bg-card">
          <i className="ph ph-file-pdf text-[18px] text-blue-700" />
          <span className="text-[12.5px] truncate flex-1 font-medium">BRH-WP-2026-01.pdf</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button onClick={() => navigator.clipboard?.writeText(paper.brhUrl)} className="border border-edge rounded-[10px] px-2 py-2 text-[12.5px] text-ink-2 hover:bg-hover transition flex items-center justify-center gap-1.5 whitespace-nowrap">
            <i className="ph ph-copy text-[18px]" />
            {lang === 'fr' ? 'Copier' : 'Kopi'}
          </button>
          <a href={paper.brhUrl} target="_blank" rel="noopener noreferrer" className="border border-edge rounded-[10px] px-2 py-2 text-[12.5px] text-ink-2 hover:bg-hover transition flex items-center justify-center gap-1.5 whitespace-nowrap">
            <i className="ph ph-arrow-square-out text-[18px]" />
            {lang === 'fr' ? 'Ouvrir' : 'Louvri'}
          </a>
        </div>
      </div>

      <div className="flex-1" />

      {/* HaitiBrand signature — same card look, flush to bottom (no mb) */}
      <div className="mx-3 mb-3 px-4 py-3.5 rounded-[10px] bg-rail">
        <div className="text-[10px] uppercase tracking-[0.12em] text-ink-2 font-medium leading-none mb-2.5" style={{ paddingLeft: '4px' }}>
          {lang === 'fr' ? 'Développé par' : 'Devlope pa'}
        </div>
        <img src="/hb-logo.svg" alt="HaitiBrand" className="h-[18px] w-auto object-contain block" />
      </div>
    </aside>
  );
}
