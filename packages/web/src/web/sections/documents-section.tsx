import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Check, ChevronLeft, ChevronRight, Download, Printer, Search, Upload } from "lucide-react";
import content from "../data/documents.json";
import { chapterKey, isSectionVisible } from "../lib/site";
import { HighlightText } from "../components/highlight-text";
import { PageHeading } from "../components/page-heading";
import { FIGURE_FOR_SECTION, ReadingFigure } from "../components/reading-figures";

type DocumentsSectionProps = {
  docIndex: number;
  section: number;
  focus: { di: number; si: number; pi: number; query: string; shown: boolean } | null;
  onFocusShown: () => void;
  completed: string[];
  onSelectDoc: (index: number) => void;
  onSelectSection: (index: number) => void;
  onToggleComplete: (key: string) => void;
  onOpenSearch: () => void;
  onExportProgress: () => string;
  onImportProgress: (file: File) => Promise<string>;
};

export function DocumentsSection({
  docIndex,
  section,
  focus,
  onFocusShown,
  completed,
  onSelectDoc,
  onSelectSection,
  onToggleComplete,
  onOpenSearch,
  onExportProgress,
  onImportProgress,
}: DocumentsSectionProps) {
  const safeDocIndex = Math.min(Math.max(docIndex, 0), content.documents.length - 1);
  const currentDoc = content.documents[safeDocIndex];
  const visibleIndices = currentDoc.sections
    .map((_, index) => index)
    .filter((index) => isSectionVisible(safeDocIndex, index));
  const safeSection = visibleIndices.includes(section)
    ? section
    : (visibleIndices[0] ?? 0);
  const currentSection = currentDoc.sections[safeSection];
  const position = visibleIndices.indexOf(safeSection);
  const activeFocus =
    focus && focus.di === safeDocIndex && focus.si === safeSection ? focus : null;
  const searchTerm = activeFocus ? activeFocus.query.trim() : "";
  const figureAfter =
    currentSection.paragraphs.length > 3
      ? 2
      : Math.max(currentSection.paragraphs.length - 1, 0);

  const goToSection = (index: number) => {
    if (!visibleIndices.includes(index)) return;
    onSelectSection(index);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  const paperRef = useRef<HTMLElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [hitParagraph, setHitParagraph] = useState<number | null>(null);
  const [progressStatus, setProgressStatus] = useState("");

  const importProgress = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setProgressStatus(await onImportProgress(file));
  };

  // Apre il capitolo di un risultato di ricerca sul paragrafo trovato:
  // scroll e alone valgono una sola volta, anche se si torna sulla sezione.
  useEffect(() => {
    if (!activeFocus) {
      setHitParagraph(null);
      return;
    }
    if (activeFocus.shown) return;
    const target = paperRef.current?.querySelector<HTMLElement>(
      `.paragraph-block[data-paragraph="${activeFocus.pi}"]`,
    );
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    setHitParagraph(activeFocus.pi);
    onFocusShown();
  }, [activeFocus, onFocusShown]);

  useEffect(() => {
    if (hitParagraph === null) return;
    const timer = window.setTimeout(() => setHitParagraph(null), 2400);
    return () => window.clearTimeout(timer);
  }, [hitParagraph]);

  const words = currentSection.paragraphs.reduce(
    (total, paragraph) => total + paragraph.text.split(/\s+/).filter(Boolean).length,
    0,
  );
  const minutes = Math.max(1, Math.round(words / 180));

  useEffect(() => {
    const update = () => {
      const paper = paperRef.current;
      if (!paper) return;
      const total = paper.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const read = Math.min(Math.max(-paper.getBoundingClientRect().top, 0), total);
      setProgress(read / total);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [safeDocIndex, safeSection]);

  useEffect(() => {
    const paper = paperRef.current;
    if (!paper || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    paper.classList.add("reveal");
    const blocks = paper.querySelectorAll(".paragraph-block");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    blocks.forEach((block) => observer.observe(block));
    return () => {
      observer.disconnect();
      paper.classList.remove("reveal");
    };
  }, [safeDocIndex, safeSection]);

  const stepSection = (delta: number) => {
    const next = visibleIndices[position + delta];
    if (next === undefined) return;
    onSelectSection(next);
    window.scrollTo({ top: 200, behavior: "auto" });
  };

  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="LA BIBLIOTECA DEL PERCORSO"
        title="Leggi. Fermati. Interroga."
        text="Due documenti, un unico filo: l’autonomia del pensiero. Esplora i testi integrali del percorso."
      />
      <div className="doc-toolbar">
        <div className="segmented">
          {content.documents.map((document, index) => (
            <button
              key={document.name}
              className={docIndex === index ? "selected" : ""}
              aria-pressed={docIndex === index}
              onClick={() => onSelectDoc(index)}
            >
              {document.name}
            </button>
          ))}
        </div>
        <div className="doc-tools">
          <button className="text-button" onClick={onOpenSearch}>
            <Search size={17} /> Cerca nei testi
          </button>
          <button
            className="text-button"
            title="Capitoli letti e record del quiz"
            onClick={() => setProgressStatus(onExportProgress())}
          >
            <Download size={16} /> Esporta progressi
          </button>
          <button
            className="text-button"
            title="Ripristina capitoli letti e record del quiz"
            onClick={() => importRef.current?.click()}
          >
            <Upload size={16} /> Importa
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={importProgress}
          />
        </div>
      </div>
      {progressStatus && (
        <p className="progress-status" role="status">
          {progressStatus}
        </p>
      )}
      <div className="reader-layout">
        <aside className="reader-sidebar">
          <div className="label">INDICE DEL DOCUMENTO</div>
          {visibleIndices.map((index) => {
            const item = currentDoc.sections[index];
            return (
              <button
                key={item.title}
                className={index === safeSection ? "selected" : ""}
                aria-current={index === safeSection ? "true" : undefined}
                onClick={() => goToSection(index)}
              >
                <span>0{visibleIndices.indexOf(index) + 1}</span>
                {item.title.replace(/^\d+\. /, "")}
                {completed.includes(chapterKey(safeDocIndex, index)) && (
                  <span className="read-dot" aria-label="Capitolo letto" />
                )}
              </button>
            );
          })}
        </aside>
        <article className="reading-paper" ref={paperRef} key={`${safeDocIndex}-${safeSection}`}>
          <div className="reading-visual">
            <span className="reading-num" aria-hidden="true">
              {String(position + 1).padStart(2, "0")}
            </span>
            <div className="reading-meta">
              {currentDoc.name} <span>CAPITOLO {position + 1} / {visibleIndices.length}</span>
            </div>
            <h2>{currentSection.title.replace(/^\d+\. /, "")}</h2>
            <div className="reading-stats">
              <span>{currentSection.paragraphs.length} paragrafi</span>
              <span>~{minutes} min di lettura</span>
            </div>
          </div>
          <div className="reading-progress" aria-hidden="true">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          {currentSection.paragraphs.map((paragraph, index) => {
            const figure =
              index === figureAfter ? FIGURE_FOR_SECTION[`${safeDocIndex}:${safeSection}`] : undefined;
            const heading = paragraph.style.startsWith("Heading");
            const table =
              paragraph.text.includes(",") &&
              /^Gruppo|^Controllo,|^IA Oracolo,|^IA Socratico,|^Modello|^Approccio/.test(
                paragraph.text,
              );
            return (
              <div
                className={`paragraph-block${hitParagraph === index ? " search-hit" : ""}`}
                data-paragraph={index}
                key={index}
              >
                {figure && (
                  <figure className="reading-figure">
                    <ReadingFigure kind={figure.kind} />
                    <figcaption>{figure.caption}</figcaption>
                  </figure>
                )}
                {heading ? (
                  <h3>
                    <HighlightText text={paragraph.text} term={searchTerm} />
                  </h3>
                ) : table ? (
                  <div className="original-table-row">
                    <HighlightText text={paragraph.text} term={searchTerm} />
                  </div>
                ) : (
                  <p className={paragraph.text.startsWith("Risposta") ? "original-answer" : ""}>
                    <HighlightText text={paragraph.text} term={searchTerm} />
                  </p>
                )}
              </div>
            );
          })}
          <div className="reading-footer">
            <button
              disabled={position <= 0}
              onClick={() => stepSection(-1)}
            >
              <ChevronLeft size={17} /> Precedente
            </button>
            <button
              className="mark-complete"
              aria-pressed={completed.includes(chapterKey(safeDocIndex, safeSection))}
              onClick={() => onToggleComplete(chapterKey(safeDocIndex, safeSection))}
            >
              <Check size={17} />
              {completed.includes(chapterKey(safeDocIndex, safeSection))
                ? "Capitolo completato"
                : "Segna come letto"}
            </button>
            <button
              disabled={position >= visibleIndices.length - 1}
              onClick={() => stepSection(1)}
            >
              Successivo <ChevronRight size={17} />
            </button>
            <button onClick={() => window.print()}>
              <Printer size={16} /> Stampa / PDF
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
