import { useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeftRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Timer,
  Trash2,
  Upload,
} from "lucide-react";
import content from "../data/documents.json";
import { debateGuides } from "../data/debate-guides";
import { debateStances } from "../data/debate-stances";
import { debateChallenges } from "../data/debate-challenges";
import { debateAssumptions } from "../data/debate-assumptions";
import { ClassroomMode } from "../components/classroom-mode";
import { PageHeading } from "../components/page-heading";
import { downloadJson, downloadText } from "../lib/download";
import { STORAGE_KEYS } from "../lib/site";
import { useStored } from "../lib/use-stored";

const MOVES = [
  {
    marker: "TESI",
    label: "Formula una tesi",
    short: "Tesi",
    hint: "Prendi posizione in una frase chiara, poi giustificala.",
  },
  {
    marker: "OBIEZIONE",
    label: "Cerca un’obiezione",
    short: "Obiezione",
    hint: "Dai voce al punto di vista contrario, senza indebolirlo.",
  },
  {
    marker: "DOMANDA APERTA",
    label: "Apri una domanda",
    short: "Domanda",
    hint: "Chiudi con ciò che resta irrisolto e porta il dubbio in aula.",
  },
] as const;

export function DebateSection() {
  const [notes, setNotes, noteError] = useStored<Record<string, string>>(STORAGE_KEYS.notes, {});
  const [debate, setDebate] = useState(0);
  const [classroomOpen, setClassroomOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [stances, setStances] = useStored<Record<string, number>>(STORAGE_KEYS.debateStance, {});
  const [movesState, setMovesState] = useStored<Record<string, string[]>>(
    STORAGE_KEYS.debateMoves,
    {},
  );
  const [challengeAnswers, setChallengeAnswers] = useStored<Record<string, number>>(
    STORAGE_KEYS.debateChallenges,
    {},
  );
  const [followUpAnswers, setFollowUpAnswers] = useStored<Record<string, number>>(
    STORAGE_KEYS.debateFollowups,
    {},
  );
  const [assumptionAnswers, setAssumptionAnswers] = useStored<Record<string, number>>(
    STORAGE_KEYS.debateAssumptions,
    {},
  );
  const currentNote = notes[debate] || "";
  const explored = content.debates.filter(
    (_, index) =>
      typeof stances[index] === "number" ||
      (movesState[index]?.length ?? 0) > 0 ||
      challengeAnswers[index] !== undefined,
  ).length;
  const challengesWon = content.debates.filter(
    (_, index) => challengeAnswers[index] === debateChallenges[index]?.correct,
  ).length;
  const rawStance = stances[debate];
  const stance =
    typeof rawStance === "number" && rawStance >= 0 && rawStance <= 4 ? rawStance : undefined;
  const pole = debateStances[debate] ?? debateStances[0];
  const stanceText =
    stance === undefined
      ? "In ascolto"
      : stance === 2
        ? "In equilibrio"
        : stance < 2
          ? `Ti avvicini a «${pole.left}»`
          : `Ti avvicini a «${pole.right}»`;
  const selectedMoves = movesState[debate] ?? [];
  const agendaFor = (index: number) => {
    const moves = movesState[index] ?? [];
    return moves.length === MOVES.length &&
      MOVES.every((move, position) => moves[position] === move.marker)
      ? MOVES.map((move) => move.short)
      : [];
  };
  const classroomAgenda = agendaFor(debate);
  const sequenceCorrect = classroomAgenda.length === MOVES.length;
  const sequenceOutOfOrder = selectedMoves.length === MOVES.length && !sequenceCorrect;
  const challenge = debateChallenges[debate] ?? debateChallenges[0];
  const challengeChoice = challengeAnswers[debate];
  const challengeAnswered = challengeChoice !== undefined;
  const followUp = challenge.followUp;
  const followUpChoice = followUpAnswers[debate];
  const followUpAnswered = followUp !== undefined && followUpChoice !== undefined;
  const assumption = debateAssumptions[debate] ?? debateAssumptions[0];
  const assumptionChoice = assumptionAnswers[debate];
  const assumptionAnswered = assumptionChoice !== undefined;
  const noteWords = currentNote.trim() ? currentNote.trim().split(/\s+/).length : 0;

  const setStance = (value: number) => {
    setStances({ ...stances, [debate]: value });
  };

  const flipStance = () => {
    if (stance === undefined || stance === 2) return;
    setStance(4 - stance);
  };

  const toggleMove = (marker: string) => {
    const next = selectedMoves.includes(marker)
      ? selectedMoves.filter((value) => value !== marker)
      : [...selectedMoves, marker];
    setMovesState({ ...movesState, [debate]: next });
  };

  const moveSelection = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= selectedMoves.length) return;
    const next = [...selectedMoves];
    [next[index], next[target]] = [next[target], next[index]];
    setMovesState({ ...movesState, [debate]: next });
  };

  const chooseChallenge = (index: number) => {
    if (challengeAnswered) return;
    setChallengeAnswers({ ...challengeAnswers, [debate]: index });
  };

  const chooseFollowUp = (index: number) => {
    if (!followUp || followUpAnswered) return;
    setFollowUpAnswers({ ...followUpAnswers, [debate]: index });
  };

  const chooseAssumption = (index: number) => {
    if (assumptionAnswered) return;
    setAssumptionAnswers({ ...assumptionAnswers, [debate]: index });
  };

  const resetAssumption = () => {
    const next = { ...assumptionAnswers };
    delete next[debate];
    setAssumptionAnswers(next);
  };

  const resetChallenge = () => {
    const next = { ...challengeAnswers };
    delete next[debate];
    setChallengeAnswers(next);
    const nextFollowUp = { ...followUpAnswers };
    delete nextFollowUp[debate];
    setFollowUpAnswers(nextFollowUp);
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
          const agenda = agendaFor(index);
          const sequence =
            agenda.length > 0 ? `**Scaletta verificata:** ${agenda.join(" → ")}\n\n` : "";
          return `## ${String(index + 1).padStart(2, "0")}. ${item.title}\n\n> ${
            item.question
          }\n\n${sequence}${body}\n\n*${words} parole*\n`;
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
        text="Cinque tracce per il confronto in aula: schierati, scegli le mosse e riconosci la replica più forte."
      />
      <div className="debate-layout">
        <aside className="debate-sidebar">
          <div className="debate-progress-card">
            <span className="label">LE TUE TRACCE</span>
            <strong>
              {explored}
              <span>/5</span>
            </strong>
            <div
              className="debate-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={explored}
              aria-label="Tracce esplorate"
            >
              <span style={{ width: `${(explored / content.debates.length) * 100}%` }} />
            </div>
            <p>
              {explored}/5 tracce esplorate · {challengesWon}/5 sfide riconosciute. Posizione e
              mosse restano tue.
            </p>
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
          <div className="debate-aula-entry">
            <button onClick={() => setClassroomOpen(true)}>
              <Timer size={15} /> Modalità aula
            </button>
            <span>Timer 60s · turni alternati · 3 round</span>
          </div>
          <section className="debate-stance" aria-labelledby="stance-label">
            <div className="stance-head">
              <span className="label" id="stance-label">
                DOVE TI COLLOCHI?
              </span>
              <span className="stance-state" aria-live="polite">
                {stanceText}
              </span>
            </div>
            <div className="stance-control">
              <span>{pole.left}</span>
              <input
                className="stance-range"
                type="range"
                min="0"
                max="4"
                step="1"
                value={stance ?? 2}
                aria-label="La mia posizione su questa traccia"
                aria-valuetext={stanceText}
                onChange={(event) => setStance(Number(event.target.value))}
              />
              <span>{pole.right}</span>
            </div>
            <div className="stance-foot">
              <span>Trascina il cursore o usa le frecce.</span>
              <button
                onClick={flipStance}
                disabled={stance === undefined || stance === 2}
              >
                <ArrowLeftRight size={13} /> Mettiti dall’altra parte
              </button>
            </div>
          </section>
          <section className="debate-challenge" aria-labelledby="challenge-label">
            <div className="challenge-head">
              <span className="label" id="challenge-label">
                SFIDA LAMPO · SCEGLI LA REPLICA PIÙ FORTE
              </span>
              <span
                className={`challenge-state ${challengeAnswered ? (challengeChoice === challenge.correct ? "ok" : "no") : ""}`}
                aria-live="polite"
              >
                {!challengeAnswered
                  ? "Da provare"
                  : challengeChoice === challenge.correct
                    ? "Replica forte"
                    : "Da rivedere"}
              </span>
            </div>
            <p className="challenge-prompt">«{challenge.objection}»</p>
            <div className="challenge-options" role="group" aria-label="Possibili repliche">
              {challenge.options.map((option, index) => {
                const chosen = challengeChoice === index;
                const correct = challengeAnswered && index === challenge.correct;
                return (
                  <button
                    key={option}
                    className={[
                      correct ? "correct" : "",
                      challengeAnswered && chosen && !correct ? "incorrect" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={chosen}
                    disabled={challengeAnswered}
                    onClick={() => chooseChallenge(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {challengeAnswered && (
              <div
                className={`challenge-feedback ${
                  challengeChoice === challenge.correct ? "ok" : "no"
                }`}
                role="status"
              >
                <strong>
                  {challengeChoice === challenge.correct
                    ? "Questa è la replica più forte."
                    : "Non ancora: la replica più forte è un’altra."}
                </strong>
                <p>{challenge.feedback}</p>
                <button className="text-button" onClick={resetChallenge}>
                  Riprova
                </button>
              </div>
            )}
            {challengeAnswered && challengeChoice === challenge.correct && followUp && (
              <div className="challenge-followup">
                <div className="challenge-level-head">
                  <span className="label">LIVELLO 2 · E SE TI RISPONDESSERO COSÌ?</span>
                  <span
                    className={`challenge-state ${
                      followUpAnswered
                        ? followUpChoice === followUp.correct
                          ? "ok"
                          : "no"
                        : ""
                    }`}
                    aria-live="polite"
                  >
                    {!followUpAnswered
                      ? "Da provare"
                      : followUpChoice === followUp.correct
                        ? "Replica forte"
                        : "Da rivedere"}
                  </span>
                </div>
                <p className="challenge-prompt">«{followUp.objection}»</p>
                <div className="challenge-options" role="group" aria-label="Possibili repliche">
                  {followUp.options.map((option, index) => {
                    const chosen = followUpChoice === index;
                    const correct = followUpAnswered && index === followUp.correct;
                    return (
                      <button
                        key={option}
                        className={[
                          correct ? "correct" : "",
                          followUpAnswered && chosen && !correct ? "incorrect" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-pressed={chosen}
                        disabled={followUpAnswered}
                        onClick={() => chooseFollowUp(index)}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                {followUpAnswered && (
                  <div
                    className={`challenge-feedback ${
                      followUpChoice === followUp.correct ? "ok" : "no"
                    }`}
                    role="status"
                  >
                    <strong>
                      {followUpChoice === followUp.correct
                        ? "Anche il secondo passaggio regge."
                        : "La catena si interrompe qui: rileggi la replica più forte."}
                    </strong>
                    <p>{followUp.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </section>
          <section className="debate-challenge debate-assumption" aria-labelledby="assumption-label">
            <div className="challenge-head">
              <span className="label" id="assumption-label">
                MICRO-SFIDA · TROVA L’ASSUNZIONE NASCOSTA
              </span>
              <span
                className={`challenge-state ${
                  assumptionAnswered
                    ? assumptionChoice === assumption.correct
                      ? "ok"
                      : "no"
                    : ""
                }`}
                aria-live="polite"
              >
                {!assumptionAnswered
                  ? "Da provare"
                  : assumptionChoice === assumption.correct
                    ? "Trovata"
                    : "Da rivedere"}
              </span>
            </div>
            <p className="challenge-prompt">«{assumption.statement}»</p>
            <p className="assumption-prompt">Quale premessa dà per scontata?</p>
            <div className="challenge-options" role="group" aria-label="Assunzioni possibili">
              {assumption.options.map((option, index) => {
                const chosen = assumptionChoice === index;
                const correct = assumptionAnswered && index === assumption.correct;
                return (
                  <button
                    key={option}
                    className={[
                      correct ? "correct" : "",
                      assumptionAnswered && chosen && !correct ? "incorrect" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={chosen}
                    disabled={assumptionAnswered}
                    onClick={() => chooseAssumption(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {assumptionAnswered && (
              <div
                className={`challenge-feedback ${
                  assumptionChoice === assumption.correct ? "ok" : "no"
                }`}
                role="status"
              >
                <strong>
                  {assumptionChoice === assumption.correct
                    ? "Assunzione trovata."
                    : "Non è questa l’assunzione."}
                </strong>
                <p>{assumption.feedback}</p>
                <button className="text-button" onClick={resetAssumption}>
                  Riprova
                </button>
              </div>
            )}
          </section>
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
            <div className="method-head">
              <span className="label">METODO IN TRE MOSSE — SCEGLI, NON SCRIVERE</span>
              <span className="method-count" aria-live="polite">
                {selectedMoves.length}/3 mosse
              </span>
            </div>
            <div className="method-cards">
              {MOVES.map((move, index) => {
                const done = selectedMoves.includes(move.marker);
                const position = done ? selectedMoves.indexOf(move.marker) + 1 : 0;
                return (
                  <button
                    key={move.marker}
                    className={done ? "done" : ""}
                    aria-pressed={done}
                    onClick={() => toggleMove(move.marker)}
                  >
                    <b>0{index + 1}</b>
                    <strong>{move.label}</strong>
                    <small>{move.hint}</small>
                    <span className="method-status">
                      {done ? `${position}° scelta · togli` : "Scegli"}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              className="method-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={MOVES.length}
              aria-valuenow={selectedMoves.length}
              aria-label="Mosse argomentative selezionate"
            >
              <span style={{ width: `${(selectedMoves.length / MOVES.length) * 100}%` }} />
            </div>
            <div className="method-builder">
              <div className="method-sequence-head">
                <span className="label">LA TUA SEQUENZA</span>
                <span className="method-sequence-count" aria-live="polite">
                  {selectedMoves.length}/3
                </span>
              </div>
              {selectedMoves.length === 0 ? (
                <p className="method-empty">
                  Scegli una mossa per iniziare la catena. L’ordine lo costruisci tu.
                </p>
              ) : (
                <ol className="method-sequence" aria-label="Sequenza delle mosse scelte">
                  {selectedMoves.map((marker, index) => {
                    const move = MOVES.find((value) => value.marker === marker);
                    const name = move?.short ?? marker;
                    return (
                      <li key={marker}>
                        <span className="sequence-index">{index + 1}</span>
                        <strong>{name}</strong>
                        <span className="sequence-actions">
                          <button
                            type="button"
                            disabled={index === 0}
                            aria-label={`Sposta ${name} indietro`}
                            onClick={() => moveSelection(index, -1)}
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            disabled={index === selectedMoves.length - 1}
                            aria-label={`Sposta ${name} avanti`}
                            onClick={() => moveSelection(index, 1)}
                          >
                            →
                          </button>
                          <button
                            type="button"
                            aria-label={`Rimuovi ${name}`}
                            onClick={() => toggleMove(marker)}
                          >
                            ×
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
            <p
              className={`method-hint ${sequenceCorrect ? "ok" : sequenceOutOfOrder ? "wrong" : ""}`}
              aria-live="polite"
            >
              {sequenceCorrect
                ? "Ordine corretto: la scaletta è pronta per l’aula."
                : sequenceOutOfOrder
                  ? "L’ordine non regge: usa le frecce per rimettere tesi, obiezione e domanda."
                  : selectedMoves.length === 0
                    ? "Scegli le mosse da mettere in campo: nessun testo da scrivere."
                    : `Hai scelto ${selectedMoves.length} ${selectedMoves.length === 1 ? "mossa" : "mosse"} su 3.`}
            </p>
          </div>
          <details className="debate-notebook">
            <summary>
              <span className="notebook-title">
                <span className="label">QUADERNO PERSONALE</span>
                <strong>Scrivi solo se vuoi</strong>
              </span>
              <span className="notebook-meta">
                {noteWords > 0 ? `${noteWords} parole` : "Facoltativo"}
              </span>
            </summary>
            <div className="notebook-body">
              <label className="notes-label" htmlFor="notes">
                Il tuo spazio di riflessione{" "}
                <span>
                  {noteError
                    ? "Salvataggio non disponibile"
                    : "Salvato automaticamente nel browser"}
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
            </div>
          </details>
        </section>
      </div>
      {classroomOpen && (
        <ClassroomMode
          title={content.debates[debate].title}
          question={content.debates[debate].question}
          left={pole.left}
          right={pole.right}
          agenda={classroomAgenda}
          onClose={() => setClassroomOpen(false)}
        />
      )}
    </main>
  );
}
