import type { ReactNode } from 'react';
import { paper } from '../../data/paper';
import type { Lang } from '../../data/i18n';
import { L, t } from '../../data/i18n';
import { ChipDashed } from '../ui/primitives';
import { SearchBox } from './SearchBox';

export function ContentShell({
  lang, activeLabel, kicker, title, children, onNavigate,
}: { lang: Lang; activeLabel: string; kicker?: string; title: string; children: ReactNode; onNavigate: (id: string) => void }) {
  return (
    <main className="flex-1 overflow-y-auto scroll-thin bg-page min-w-0">
      {/* Sticky top header */}
      <header className="sticky top-0 z-10 bg-page/95 backdrop-blur-sm border-b border-edge">
        {/* Breadcrumb row — hidden on mobile (paper ID lives in the compact top bar) */}
        <div className="hidden sm:flex px-5 md:px-8 py-4 items-center gap-4">
          <div className="flex items-center gap-2 text-[13px] text-ink-2 min-w-0">
            <span>BRH</span>
            <i className="ph ph-caret-right text-[11px] text-ink-3" />
            <span className="text-ink">{paper.id}</span>
            <i className="ph ph-caret-right text-[11px] text-ink-3" />
            <span className="text-ink font-medium truncate">{activeLabel}</span>
          </div>
          <div className="flex-1" />
          <SearchBox lang={lang} onNavigate={onNavigate} />
          <a href={paper.pdfUrl} download="BRH-WP-2026-01.pdf"
             className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-ink text-white text-[13.5px] font-medium hover:bg-blue-900 transition whitespace-nowrap">
            <i className="ph ph-download-simple text-[16px]" />
            <span>{L(t.nav.download, lang)}</span>
          </a>
        </div>

        <div className="px-5 md:px-8 pt-5 sm:pt-6 pb-5 sm:pb-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-[22px] sm:text-[26px] md:text-[28px] xl:text-[32px] leading-tight text-ink font-medium min-w-0">{title}</h1>
            {/* Mobile PDF button floats beside title for quick access */}
            <a href={paper.pdfUrl} download="BRH-WP-2026-01.pdf"
               className="sm:hidden shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-ink text-white text-[12.5px] font-medium hover:bg-blue-900 transition whitespace-nowrap">
              <i className="ph ph-download-simple text-[14px]" />
              PDF
            </a>
          </div>
          {kicker && <p className="text-[13.5px] sm:text-[14px] text-ink-2 mt-2 leading-relaxed">{kicker}</p>}

          {/* Filter chips — hidden on mobile (info lives in subtitle + view-level source footers), full row on ≥sm */}
          <div className="hidden sm:flex flex-wrap gap-2 mt-4">
            <ChipDashed icon={<i className="ph ph-calendar-blank text-[16px]" />} label={lang === 'fr' ? 'Période' : 'Peryòd'} value="1998–2024" />
            <ChipDashed icon={<i className="ph ph-database text-[16px]" />} label={lang === 'fr' ? 'Source' : 'Sous'} value="IHSI · BRH · JobPaw" />
            <ChipDashed icon={<i className="ph ph-repeat text-[16px]" />} label={lang === 'fr' ? 'Fréquence' : 'Frekans'} value="Mensuelle" />
          </div>
        </div>
      </header>

      <div className="px-5 md:px-8 py-6 pb-24">{children}</div>

      <footer className="px-5 md:px-8 py-[32px] border-t border-edge text-[13px] text-ink-2 flex items-center">
        Banque de la République d'Haïti · DREF · {paper.id} · {paper.date} · <span className="underline decoration-dotted ml-1">brh.ht</span>
      </footer>
    </main>
  );
}
