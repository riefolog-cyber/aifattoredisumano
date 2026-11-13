import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowLeftRight, Pause, Play, Printer, RotateCcw, Shuffle, X } from "lucide-react";

const DEFAULT_DURATION = 60;
const DURATIONS = [60, 120, 180] as const;
const ROUNDS = 3;
const OBSERVER_MOVES = ["Tesi", "Obiezione", "Prova", "Domanda"] as const;

const ROLES = [
  {
    name: "Moderatore",
    text: "Distribuisce la parola, riporta la domanda al centro e chiude ogni intervento.",
  },
  {
    name: "Timekeeper",
    text: "Tiene il tempo, segnala l’ultimo minuto e passa la parola allo schieramento successivo.",
  },
  {
    name: "Fact-checker",
    text: "Verifica dati, citazioni e riferimenti ai documenti prima che diventino argomenti.",
  },
  {
    name: "Portavoce",
    text: "Espone la posizione del gruppo in una frase chiara, poi lascia spazio alle obiezioni.",
  },
  {
    name: "Verbalizzatore",
    text: "Annota le mosse e prepara la sintesi finale con ciò che resta aperto.",
  },
  {
    name: "Osservatore",
    text: "Ascolta e tocca le mosse che riconosce: tesi, obiezione, prova, domanda. Alla fine segnala cosa è mancato.",
  },
] as const;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

type ClassroomModeProps = {
  title: string;
  question: string;
  left: string;
  right: string;
  agenda?: string[];
  onClose: () => void;
};

export function ClassroomMode({
  title,
  question,
  left,
  right,
  agenda = [],
  onClose,
}: ClassroomModeProps) {
  const [seconds, setSeconds] = useState(DEFAULT_DURATION);
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION);
  const [running, setRunning] = useState(false);
  const [turn, setTurn] = useState(0);
  const [startingSide, setStartingSide] = useState<"left" | "right">("left");
  const [observerCounts, setObserverCounts] = useState<Record<string, number>>({});
  const [role, setRole] = useState<(typeof ROLES)[number] | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const round = Math.floor(turn / 2) + 1;
  const side = (turn % 2 === 0) === (startingSide === "left") ? "left" : "right";
  const team = side === "left" ? left : right;
  const startingTeam = startingSide === "left" ? left : right;
  const lastTurn = turn >= ROUNDS * 2 - 1;
  const expired = seconds === 0;

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add("classroom-open");
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove("classroom-open");
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) setRunning(false);
  }, [seconds, running]);

  const start = () => {
    if (expired) return;
    setRunning((value) => !value);
  };

  const nextTurn = () => {
    if (lastTurn) return;
    setRunning(false);
    setTurn((value) => value + 1);
    setSeconds(duration);
  };

  const reset = () => {
    setRunning(false);
    setTurn(0);
    setSeconds(duration);
    setObserverCounts({});
  };

  const changeDuration = (value: number) => {
    if (running) return;
    setDuration(value);
    setSeconds(value);
  };

  const toggleStartingSide = () => {
    if (turn > 0 || running) return;
    setStartingSide((value) => (value === "left" ? "right" : "left"));
  };

  const tapObserver = (move: string) => {
    setObserverCounts((counts) => ({ ...counts, [move]: (counts[move] ?? 0) + 1 }));
  };

  const drawRole = () => {
    const next = ROLES[Math.floor(Math.random() * ROLES.length)];
    setRole(next);
  };

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;
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

  return createPortal(
    <div className="classroom-overlay">
      <div
        ref={dialogRef}
        className="classroom-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="classroom-title"
        onKeyDown={trapFocus}
      >
        <div className="classroom-top">
          <div>
            <span className="label">MODALITÀ AULA · DIBATTITO A TURNI</span>
            <h2 id="classroom-title">{title}</h2>
          </div>
          <button ref={closeRef} className="classroom-close" onClick={onClose} aria-label="Chiudi modalità aula">
            <X size={19} />
          </button>
        </div>

        {agenda.length > 0 && (
          <section className="classroom-agenda" aria-labelledby="classroom-agenda-title">
            <div className="classroom-agenda-head">
              <span className="label" id="classroom-agenda-title">
                SCALETTA DEL DIBATTITO
              </span>
              <span>{agenda.length} mosse</span>
            </div>
            <ol>
              {agenda.map((move, index) => {
                const current = agenda.length === ROUNDS && round === index + 1;
                return (
                  <li
                    key={`${move}-${index}`}
                    className={current ? "current" : ""}
                    aria-current={current ? "step" : undefined}
                  >
                    <span>0{index + 1}</span>
                    <strong>{move}</strong>
                    {current && <i aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        <div className="classroom-setup">
          <div className="classroom-duration" role="group" aria-label="Durata del turno">
            <span className="label">DURATA</span>
            {DURATIONS.map((value) => (
              <button
                key={value}
                type="button"
                className={duration === value ? "selected" : ""}
                aria-pressed={duration === value}
                aria-label={`${value / 60} ${value === 60 ? "minuto" : "minuti"}`}
                disabled={running}
                onClick={() => changeDuration(value)}
              >
                {value / 60}′
              </button>
            ))}
          </div>
          <button
            type="button"
            className="classroom-start-side"
            onClick={toggleStartingSide}
            disabled={turn > 0 || running}
            aria-label="Cambia il lato che inizia"
          >
            <ArrowLeftRight size={14} /> Inizia da: {startingTeam}
          </button>
        </div>

        <div className="classroom-grid">
          <section className={`classroom-stage team-${side}`}>
            <div className="classroom-round">
              <span>ROUND {round} / {ROUNDS}</span>
              <div className="classroom-dots" aria-hidden="true">
                {Array.from({ length: ROUNDS * 2 }, (_, index) => (
                  <i key={index} className={index <= turn ? "done" : ""} />
                ))}
              </div>
            </div>
            <div className="classroom-turn">
              <span className="label">TURNO {turn + 1} · TOCCA A</span>
              <h3>{team}</h3>
              <p>{turn % 2 === 0 ? left : right}</p>
            </div>
            <div
              className={`classroom-timer ${seconds <= 10 ? "danger" : ""}`}
              role="timer"
              aria-label={`Tempo rimasto: ${formatTime(seconds)}`}
            >
              {formatTime(seconds)}
            </div>
            <p className={`classroom-status ${expired ? "expired" : ""}`} role="status">
              {expired
                ? "Tempo scaduto: passa la parola."
                : running
                  ? "Intervento in corso. Ascolta senza interrompere."
                  : "Premi Avvia quando il turno è pronto."}
            </p>
            <div className="classroom-actions">
              <button className="classroom-primary" onClick={start} disabled={expired}>
                {running ? <Pause size={16} /> : <Play size={16} />}
                {running ? "Pausa" : expired ? "Tempo scaduto" : "Avvia"}
              </button>
              <button onClick={nextTurn} disabled={lastTurn}>
                Turno successivo
              </button>
              <button onClick={reset} aria-label="Azzera turni e timer">
                <RotateCcw size={15} /> Azzera
              </button>
              <button onClick={() => window.print()}>
                <Printer size={15} /> Stampa scheda
              </button>
            </div>
          </section>

          <aside className="classroom-role" aria-live="polite">
            <span className="label">CARTA RUOLO</span>
            {role ? (
              <div className="classroom-role-card">
                <strong>{role.name}</strong>
                <p>{role.text}</p>
              </div>
            ) : (
              <p className="classroom-role-empty">
                Estrai un ruolo per rendere operativo il gruppo: chi modera, chi tiene il tempo,
                chi verifica.
              </p>
            )}
            <button className="classroom-role-draw" onClick={drawRole}>
              <Shuffle size={15} /> {role ? "Estrai un altro ruolo" : "Estrai una carta"}
            </button>
            <div className="classroom-observer">
              <div className="classroom-observer-head">
                <span className="label">MAPPA DELL’ASCOLTO</span>
                <button
                  type="button"
                  onClick={() => setObserverCounts({})}
                  disabled={!Object.values(observerCounts).some(Boolean)}
                >
                  Azzera
                </button>
              </div>
              <div className="observer-taps" role="group" aria-label="Mosse ascoltate">
                {OBSERVER_MOVES.map((move) => (
                  <button
                    key={move}
                    type="button"
                    onClick={() => tapObserver(move)}
                    aria-label={`Segna ${move}`}
                  >
                    <span>{move}</span>
                    <b>{observerCounts[move] ?? 0}</b>
                  </button>
                ))}
              </div>
            </div>
            <p className="classroom-hint">
              Il timer non parte da solo: decidi tu quando aprire il turno. Il dibattito resta
              tuo, non della macchina.
            </p>
          </aside>
        </div>

        <section className="classroom-sheet" aria-hidden="true">
          <p className="classroom-sheet-label">IL FATTORE UMANO · SCHEDA D’AULA</p>
          <h2>{title}</h2>
          <p className="classroom-sheet-question">«{question}»</p>
          <div className="classroom-sheet-poles">
            <span>{left}</span>
            <span>{right}</span>
          </div>
          {agenda.length > 0 && (
            <>
              <h3>Scaletta</h3>
              <ol>
                {agenda.map((move, index) => (
                  <li key={`${move}-${index}`}>
                    {index + 1}. {move}
                  </li>
                ))}
              </ol>
            </>
          )}
          <h3>Ruoli</h3>
          <p>{ROLES.map((item) => item.name).join(" · ")}</p>
          <p className="classroom-sheet-note">
            {ROUNDS} round · turni da {DURATIONS[0]}–{DURATIONS[DURATIONS.length - 1]} secondi ·
            chi ascolta non interrompe.
          </p>
        </section>
      </div>
    </div>,
    document.body,
  );
}
