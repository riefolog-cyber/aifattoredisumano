import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import content from "../data/documents.json";
import { PageHeading } from "../components/page-heading";

export function GlossarySection() {
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
        text="Otto concetti fondamentali dalla guida originale. Apri una voce per esplorarne il significato."
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
