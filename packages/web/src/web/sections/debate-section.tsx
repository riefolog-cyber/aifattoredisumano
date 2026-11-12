import { useRef, useState, type ChangeEvent } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Trash2,
  Upload,
} from "lucide-react";
import content from "../data/documents.json";
import { debateGuides } from "../data/debate-guides";
import { PageHeading } from "../components/page-heading";
import { downloadJson, downloadText } from "../lib/download";
import { STORAGE_KEYS } from "../lib/site";
import { useStored } from "../lib/use-stored";

const SCAFFOLDS = {
  tesi: "TESI\nSostengo che…\nPerché…\n\n",
  obiezione: "OBIEZIONE\nSi potrebbe obiettare che…\nLa tesi regge se…\n\n",
  domanda: "DOMANDA APERTA\nResta da capire…\nPerché questo punto conta…\n",
} as const;

export function DebateSection() {
  const [notes, setNotes, noteError] = useStored<Record<string, string>>(STORAGE_KEYS.notes, {});
  const [debate, setDebate] = useState(0);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const currentNote = notes[debate] || "";
  const notesDone = content.debates.filter((_, index) => (notes[index] || "").trim().length > 0).length;

  const insertScaffold = (scaffold: string) => {
    const next = currentNote.trim()
      ? `${currentNote.replace(/\s+$/, "")}\n\n${scaffold}`
      : scaffold;
    setNotes({ ...notes, [debate]: next });
    requestAnimationFrame(() => {
      const field = notesRef.current;
      field?.focus();
      field?.setSelectionRange(next.length, next.length);
    });
  };

  const copyNote = async () => {
    try {
      await navigator.clipboard.writeText(currentNote);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      notesRef.current?.select();
    }
  };

  const clearNote = () => {
    if (!currentNote.trim() || window.confirm("Cancellare gli appunti di questa traccia?")) {
      setNotes({ ...notes, [debate]: "" });
      setStatus("");
    }
  };

  const exportNotes = (format: "md" | "json") => {
    if (format === "json") {
      downloadJson("il-fattore-umano-appunti.json", {
        exportedAt: new Date().toISOString(),
        notes: Object.fromEntries(
          content.debates.map((_, index) => [String(index), notes[index] || ""]),
        ),
      });
    } else {
      const exportedOn = new Date().toLocaleString("it-IT");
      const markdown = content.debates
        .map((item, index) => {
          const body = notes[index]?.trim() || "(Nessun appunto)";
          const words = body ? body.split(/\s+/).filter(Boolean).length : 0;
          return `## ${String(index + 1).padStart(2, "0")}. ${item.title}\n\n> ${
            item.question
          }\n\n${body}\n\n*${words} parole*\n`;
        })
        .join("\n---\n\n");
      downloadText(
        "il-fattore-umano-appunti.md",
        `# Il Fattore Umano — Appunti di dibattito\n\n*Esportato il ${exportedOn}*\n\n${markdown}`,
        "text/markdown;charset=utf-8",
      );
    }
    setStatus(format === "json" ? "Backup JSON esportato." : "Appunti esportati in Markdown.");
  };

  const importNotes = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const candidate =
        parsed && typeof parsed === "object" && "notes" in parsed
          ? (parsed as { notes: unknown }).notes
          : parsed;
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
        throw new Error("formato non riconosciuto");
      }
      const clean: Record<string, string> = {};
      for (const [key, value] of Object.entries(candidate)) {
        if (/^\d+$/.test(key) && typeof value === "string") clean[key] = value;
      }
      if (Object.keys(clean).length === 0) throw new Error("nessun appunto");
      const hasNotes = Object.values(notes).some((value) => value.trim().length > 0);
      if (hasNotes && !window.confirm("Sostituire gli appunti presenti con quelli del file?")) {
        return;
      }
      setNotes(clean);
      setStatus(`Importati ${Object.keys(clean).length} appunti.`);
    } catch {
      setStatus("File non valido: serve un backup JSON esportato da questo sito.");
    }
  };

  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="IL PENSIERO SI COSTRUISCE INSIEME"
        title="Prendi posizione. Poi dubita."
        text="Cinque tracce per il confronto in aula. Annota una tesi, un’obiezione e le domande che restano aperte."
      />
      <div className="debate-layout">
        <aside className="debate-sidebar">
          <div className="debate-progress-card">
            <span className="label">I TUOI APPUNTI</span>
            <strong>
              {notesDone}
              <span>/5</span>
            </strong>
            <div
              className="debate-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={notesDone}
              aria-label="Tracce con appunti"
            >
              <span style={{ width: `${(notesDone / content.debates.length) * 100}%` }} />
            </div>
            <p>Una traccia alla volta: tesi, obiezione e domanda aperta.</p>
          </div>
          {content.debates.map((item, index) => (
            <button
              key={item.title}
              className={debate === index ? "selected" : ""}
              onClick={() => setDebate(index)}
              aria-current={debate === index ? "true" : undefined}
            >
              <span>0{index + 1}</span>
              {item.title}
              {notes[index]?.trim() && <span className="note-indicator" aria-label="Appunti presenti" />}
            </button>
          ))}
          <button className="debate-export-all" onClick={() => exportNotes("md")}>
            <Download size={15} /> Esporta tutti gli appunti
          </button>
          <div className="debate-backup">
            <span className="label">BACKUP</span>
            <div>
              <button onClick={() => exportNotes("md")} aria-label="Esporta gli appunti in Markdown">
                <Download size={14} /> .md
              </button>
              <button onClick={() => exportNotes("json")} aria-label="Esporta gli appunti in JSON">
                <Download size={14} /> .json
              </button>
              <button onClick={() => fileRef.current?.click()} aria-label="Importa appunti da JSON">
                <Upload size={14} /> Importa
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={importNotes}
            />
            {status && (
              <p className="debate-status" role="status">
                {status}
              </p>
            )}
          </div>
        </aside>
        <section className="debate-panel">
          <header className="debate-panel-top">
            <span className="debate-index">
              TRACCIA
              <b>0{debate + 1}</b>
            </span>
            <div>
              <div className="eyebrow">DIBATTITO IN AULA · {debate + 1} DI 5</div>
              <h2>{content.debates[debate].title}</h2>
            </div>
            <div className="debate-nav">
              <button
                aria-label="Traccia precedente"
                disabled={debate === 0}
                onClick={() => setDebate(debate - 1)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Traccia successiva"
                disabled={debate === content.debates.length - 1}
                onClick={() => setDebate(debate + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </header>
          <blockquote className="debate-question">{content.debates[debate].question}</blockquote>
          <details className="debate-guide">
            <summary>
              <span>Guida per l'aula · {debateGuides[debate].duration}</span>
              <span className="matrix-summary-hint">{debateGuides[debate].setting}</span>
            </summary>
            <ol>
              {debateGuides[debate].steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span className="guide-minutes">{step.minutes} min</span>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="guide-closing">{debateGuides[debate].closing}</p>
          </details>
          <div className="debate-method">
            <span className="label">METODO IN TRE MOSSE — TOCCA PER INSERIRE</span>
            <div className="method-cards">
              <button onClick={() => insertScaffold(SCAFFOLDS.tesi)}>
                <b>01</b>
                <strong>Formula una tesi</strong>
                <small>Prendi posizione in una frase chiara, poi giustificala.</small>
              </button>
              <button onClick={() => insertScaffold(SCAFFOLDS.obiezione)}>
                <b>02</b>
                <strong>Cerca un’obiezione</strong>
                <small>Dai voce al punto di vista contrario, senza indebolirlo.</small>
              </button>
              <button onClick={() => insertScaffold(SCAFFOLDS.domanda)}>
                <b>03</b>
                <strong>Apri una domanda</strong>
                <small>Chiudi con ciò che resta irrisolto e porta il dubbio in aula.</small>
              </button>
            </div>
          </div>
          <label className="notes-label" htmlFor="notes">
            Il tuo spazio di riflessione{" "}
            <span>
              {noteError ? "Salvataggio non disponibile" : "Salvato automaticamente nel browser"}
            </span>
          </label>
          <div className="notes-field">
            <textarea
              id="notes"
              ref={notesRef}
              aria-label="Il tuo spazio di riflessione"
              value={currentNote}
              onChange={(event) => setNotes({ ...notes, [debate]: event.target.value })}
              placeholder={"La mia tesi…\nUn’obiezione possibile…\nUna domanda ancora aperta…"}
            />
            <span className="notes-counter">{currentNote.length} caratteri</span>
          </div>
          <div className="notes-footer">
            <span className="small-muted">
              Appunti privati su questo dispositivo. Nessuna sincronizzazione.
            </span>
            <div className="notes-actions">
              <button className="text-button" onClick={copyNote} disabled={!currentNote.trim()}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copiato" : "Copia"}
              </button>
              <button
                className="text-button danger"
                onClick={clearNote}
                disabled={!currentNote.trim()}
              >
                <Trash2 size={15} /> Cancella
              </button>
              <button className="text-button" onClick={() => exportNotes("md")}>
                <Download size={15} /> Esporta tutti
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
