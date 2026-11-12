import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import content from "../data/documents.json";
import { isSectionVisible } from "../lib/site";
import { PageHeading } from "../components/page-heading";

type GlossarySectionProps = {
  onRead: (docIndex: number, section: number) => void;
};

type ChapterRef = { di: number; si: number; title: string; doc: string };

function termCandidates(term: string): string[] {
  const base = term.split("(")[0].trim().toLowerCase();
  const candidates = [base];
  if (base.includes(" ")) {
    const distinctive = base
      .split(/[^a-zà-ÿ]+/i)
      .filter((word) => word.length > 4)
      .sort((a, b) => b.length - a.length)[0];
    if (distinctive && distinctive !== base) candidates.push(distinctive);
  }
  return candidates;
}

function findChapters(term: string): ChapterRef[] {
  const refs: ChapterRef[] = [];
  for (const candidate of termCandidates(term)) {
    content.documents.forEach((document, di) => {
      document.sections.forEach((section, si) => {
        if (
          refs.length < 3 &&
          isSectionVisible(di, si) &&
          section.paragraphs.some((paragraph) =>
            paragraph.text.toLowerCase().includes(candidate),
          ) &&
          !refs.some((ref) => ref.di === di && ref.si === si)
        ) {
          refs.push({ di, si, title: section.title, doc: document.name });
        }
      });
    });
    if (refs.length > 0) break;
  }
  return refs;
}

export function GlossarySection({ onRead }: GlossarySectionProps) {
  const [glossQuery, setGlossQuery] = useState("");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filteredGlossary = useMemo(() => {
    const term = glossQuery.toLowerCase();
    return content.glossary.filter((entry) =>
      (entry.term + " " + entry.meaning).toLowerCase().includes(term),
    );
  }, [glossQuery]);

  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="LE PAROLE PER CAPIRE"
        title="Un lessico del pensiero."
        text="Dodici concetti fondamentali dai documenti originali. Apri una voce per esplorarne il significato."
      />
      <label className="gloss-search">
        <Search size={19} />
        <input
          aria-label="Cerca nel glossario"
          value={glossQuery}
          onChange={(event) => setGlossQuery(event.target.value)}
          placeholder="Cerca un termine o un concetto…"
        />
      </label>
      <div className="gloss-list" aria-live="polite">
        {filteredGlossary.map((entry, index) => (
          <div className="gloss-item" key={entry.term}>
            <button
              onClick={() => setOpenTerm(openTerm === entry.term ? null : entry.term)}
              aria-expanded={openTerm === entry.term}
            >
              <span className="chapter-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{entry.term}</h2>
              <span className="gloss-toggle">{openTerm === entry.term ? "−" : "+"}</span>
            </button>
            {openTerm === entry.term && (
              <div className="gloss-definition">
                <p>{entry.meaning}</p>
                <span className="label">DEFINIZIONE DAL DOCUMENTO ORIGINALE</span>
                <GlossRefs term={entry.term} onRead={onRead} />
              </div>
            )}
          </div>
        ))}
        {filteredGlossary.length === 0 && (
          <p className="empty-state">Nessun termine trovato. Prova un’altra parola.</p>
        )}
      </div>
    </main>
  );
}

function GlossRefs({ term, onRead }: { term: string; onRead: (di: number, si: number) => void }) {
  const refs = findChapters(term);
  if (refs.length === 0) return null;
  return (
    <div className="gloss-refs">
      <span className="label">CITATO NEI CAPITOLI</span>
      {refs.map((ref) => (
        <button
          key={`${ref.di}-${ref.si}`}
          className="inline-link"
          onClick={() => onRead(ref.di, ref.si)}
        >
          {ref.doc} · cap. {ref.si + 1}: {ref.title.replace(/^\d+\. /, "")}
        </button>
      ))}
    </div>
  );
}
