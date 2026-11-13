import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  useEffect(() => {
    if (activeIndex < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-result-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (dialog && !dialog.open) dialog.showModal();
    inputRef.current?.focus();
    return () => {
      if (dialog?.open) dialog.close();
      opener?.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (results.length === 0) return;
      event.preventDefault();
      setActiveIndex((index) => {
        if (event.key === "ArrowDown") return index >= results.length - 1 ? 0 : index + 1;
        return index <= 0 ? results.length - 1 : index - 1;
      });
      return;
    }
    if (
      event.key === "Enter" &&
      results.length > 0 &&
      document.activeElement === inputRef.current
    ) {
      event.preventDefault();
      onSelect(results[activeIndex >= 0 ? activeIndex : 0]);
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
            type="text"
            role="combobox"
            aria-label="Cerca nei documenti"
            aria-expanded={results.length > 0}
            aria-controls="search-result-list"
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
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
              {results.length === 0 ? (
                <p className="empty-state">Nessun passaggio trovato. Prova una parola diversa.</p>
              ) : (
                <div
                  className="search-result-list"
                  id="search-result-list"
                  ref={listRef}
                  role="listbox"
                  aria-label="Passaggi trovati"
                >
                  {results.map((result, index) => (
                    <button
                      key={`${result.di}-${result.si}-${index}`}
                      id={`search-result-${index}`}
                      data-result-index={index}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={index === activeIndex ? "active" : ""}
                      onClick={() => onSelect(result)}
                    >
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
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </dialog>
  );
}
