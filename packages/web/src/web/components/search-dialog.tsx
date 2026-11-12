import { useEffect, useRef, type KeyboardEvent } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { MAX_SEARCH_RESULTS, makeSnippet, type SearchResult } from "../lib/search";

type SearchDialogProps = {
  highlightQuery: string;
  query: string;
  results: SearchResult[];
  onQueryChange: (value: string) => void;
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
};

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), a[href], select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SearchDialog({
  highlightQuery,
  query,
  results,
  onQueryChange,
  onSelect,
  onClose,
}: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    inputRef.current?.focus();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      className="search-overlay"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-label="Ricerca nei documenti"
    >
      <section className="search-modal" ref={modalRef} onKeyDown={handleKeyDown}>
        <div className="search-modal-top">
          <Search size={22} />
          <input
            ref={inputRef}
            aria-label="Cerca nei documenti"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cerca nei due documenti…"
          />
          <button onClick={onClose} aria-label="Chiudi ricerca">
            <X size={22} />
          </button>
        </div>
        <div className="search-results">
          {query.trim().length < 2 ? (
            <p className="empty-state">
              Scrivi almeno due caratteri. Cerca un concetto, un autore o una frase.
            </p>
          ) : (
            <>
              <div className="search-count" role="status" aria-live="polite">
                {results.length >= MAX_SEARCH_RESULTS ? `Primi ${results.length} passaggi — affina la ricerca` : `${results.length} passaggi trovati`}
              </div>
              {results.map((result, index) => (
                <button key={`${result.di}-${result.si}-${index}`} onClick={() => onSelect(result)}>
                  <span className="label">
                    {result.doc} · CAPITOLO {result.si + 1}
                  </span>
                  <h3>{result.title.replace(/^\d+\. /, "")}</h3>
                  <p>
                    {result.text.length > 300 ? makeSnippet(result.text, highlightQuery) : result.text}
                  </p>
                  <span className="result-link">
                    Apri il capitolo <ArrowUpRight size={14} />
                  </span>
                </button>
              ))}
              {results.length === 0 && (
                <p className="empty-state">Nessun passaggio trovato. Prova una parola diversa.</p>
              )}
            </>
          )}
        </div>
      </section>
    </dialog>
  );
}
