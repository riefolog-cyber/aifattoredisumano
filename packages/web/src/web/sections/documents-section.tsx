import { Check, ChevronLeft, ChevronRight, Search } from "lucide-react";
import content from "../data/documents.json";
import { PageHeading } from "../components/page-heading";

type DocumentsSectionProps = {
  docIndex: number;
  section: number;
  completed: number[];
  onSelectDoc: (index: number) => void;
  onSelectSection: (index: number) => void;
  onToggleComplete: (index: number) => void;
  onOpenSearch: () => void;
};

export function DocumentsSection({
  docIndex,
  section,
  completed,
  onSelectDoc,
  onSelectSection,
  onToggleComplete,
  onOpenSearch,
}: DocumentsSectionProps) {
  const currentDoc = content.documents[docIndex];
  const currentSection = currentDoc.sections[section];

  const goToSection = (index: number) => {
    onSelectSection(index);
    window.scrollTo({ top: 200, behavior: "smooth" });
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
        <button className="text-button" onClick={onOpenSearch}>
          <Search size={17} /> Cerca nei testi
        </button>
      </div>
      <div className="reader-layout">
        <aside className="reader-sidebar">
          <div className="label">INDICE DEL DOCUMENTO</div>
          {currentDoc.sections.map((item, index) => (
            <button
              key={item.title}
              className={index === section ? "selected" : ""}
              aria-current={index === section ? "true" : undefined}
              onClick={() => goToSection(index)}
            >
              <span>0{index + 1}</span>
              {item.title.replace(/^\d+\. /, "")}
            </button>
          ))}
        </aside>
        <article className="reading-paper">
          <div className="reading-meta">
            {currentDoc.name} <span>CAPITOLO {section + 1} / 6</span>
          </div>
          <h2>{currentSection.title.replace(/^\d+\. /, "")}</h2>
          {currentSection.paragraphs.map((paragraph, index) => {
            const heading = paragraph.style.startsWith("Heading");
            const table =
              paragraph.text.includes(",") &&
              /^Gruppo|^Controllo,|^IA Oracolo,|^IA Socratico,|^Modello|^Approccio/.test(
                paragraph.text,
              );
            return (
              <div className="paragraph-block" key={index}>
                {heading ? (
                  <h3>{paragraph.text}</h3>
                ) : table ? (
                  <div className="original-table-row">{paragraph.text}</div>
                ) : (
                  <p className={paragraph.text.startsWith("Risposta") ? "original-answer" : ""}>
                    {paragraph.text}
                  </p>
                )}
              </div>
            );
          })}
          <div className="reading-footer">
            <button
              disabled={section === 0}
              onClick={() => {
                onSelectSection(section - 1);
                window.scrollTo({ top: 200, behavior: "instant" });
              }}
            >
              <ChevronLeft size={17} /> Precedente
            </button>
            {docIndex === 1 && (
              <button
                className="mark-complete"
                aria-pressed={completed.includes(section)}
                onClick={() => onToggleComplete(section)}
              >
                <Check size={17} />
                {completed.includes(section) ? "Capitolo completato" : "Segna come letto"}
              </button>
            )}
            <button
              disabled={section === currentDoc.sections.length - 1}
              onClick={() => {
                onSelectSection(section + 1);
                window.scrollTo({ top: 200, behavior: "instant" });
              }}
            >
              Successivo <ChevronRight size={17} />
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
