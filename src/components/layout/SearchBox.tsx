import { useEffect, useRef, useState } from 'react';
import type { Lang } from '../../data/i18n';
import { t } from '../../data/i18n';

export function SearchBox({ lang, onNavigate }: { lang: Lang; onNavigate: (id: string) => void }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click outside closes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  // Filter questions
  const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const query = normalize(q);
  const all = t.questions.map(qn => ({
    id: qn.id,
    label: lang === 'fr' ? qn.fr : qn.ht,
    group: qn.group,
  }));
  const results = query.length === 0
    ? all
    : all.filter(r => normalize(r.label).includes(query) || normalize(r.id).includes(query));

  const groupLabel: Record<string, string> = {
    essential: lang === 'fr' ? "L'essentiel" : "Sa k enpòtan",
    causes: lang === 'fr' ? 'Causes' : 'Kòz',
    mechanisms: lang === 'fr' ? 'Mécanismes' : 'Mekanism',
    consequences: lang === 'fr' ? 'Conséquences' : 'Konsekans',
  };

  function pick(id: string) {
    onNavigate(id);
    setQ('');
    setOpen(false);
    inputRef.current?.blur();
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[idx]) { e.preventDefault(); pick(results[idx].id); }
  }

  return (
    <div ref={wrapRef} className="hidden lg:block relative">
      <label className="flex items-center gap-2.5 bg-card border border-edge-strong rounded-[10px] px-3.5 py-2 text-[14px] text-ink-2 w-64 hover:border-ink-3 focus-within:border-ink transition">
        <i className="ph ph-magnifying-glass text-[16px] text-ink-2 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={q}
          onFocus={() => setOpen(true)}
          onChange={e => { setQ(e.target.value); setIdx(0); setOpen(true); }}
          onKeyDown={onInputKeyDown}
          placeholder={lang === 'fr' ? 'Rechercher…' : 'Chache…'}
          className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-2 min-w-0"
        />
        <span className="ml-auto text-[12px] text-ink-3 tabular-nums font-medium shrink-0">⌘K</span>
      </label>

      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 w-[380px] max-h-[70vh] overflow-y-auto scroll-thin bg-card border border-edge-strong rounded-[12px] shadow-[0_10px_40px_rgba(15,23,42,0.15)] z-50 p-2">
          {results.length === 0 ? (
            <div className="py-6 text-center text-[13px] text-ink-2">
              {lang === 'fr' ? 'Aucun résultat.' : 'Anyen pa jwenn.'}
            </div>
          ) : (
            <>
              {(['essential','causes','mechanisms','consequences'] as const).map(g => {
                const groupResults = results.filter(r => r.group === g);
                if (groupResults.length === 0) return null;
                return (
                  <div key={g} className="mb-2 last:mb-0">
                    <div className="px-3 py-1.5 text-[11px] tracking-[0.08em] text-ink-3 uppercase font-medium">{groupLabel[g]}</div>
                    {groupResults.map((r) => {
                      const flatIdx = results.indexOf(r);
                      const active = flatIdx === idx;
                      return (
                        <button
                          key={r.id}
                          onMouseEnter={() => setIdx(flatIdx)}
                          onClick={() => pick(r.id)}
                          className={`w-full text-left px-3 py-2 rounded-[8px] text-[13.5px] leading-snug flex items-center gap-2 transition ${active ? 'bg-blue-50 text-ink' : 'text-ink-2 hover:bg-hover'}`}
                        >
                          <i className="ph ph-arrow-right text-[12px] text-ink-3 shrink-0" />
                          <span className="flex-1">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
              <div className="border-t border-edge mt-2 pt-2 px-3 pb-1 text-[11px] text-ink-3 flex items-center gap-3">
                <span><kbd className="font-mono">↑↓</kbd> naviguer</span>
                <span><kbd className="font-mono">↵</kbd> ouvrir</span>
                <span><kbd className="font-mono">esc</kbd> fermer</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
