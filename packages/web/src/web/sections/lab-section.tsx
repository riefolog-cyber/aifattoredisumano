import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ArrowRight, Check, Download, Layers, ListChecks } from "lucide-react";
import { quiz, quizAreas } from "../data/quiz";
import { PageHeading } from "../components/page-heading";
import { downloadText } from "../lib/download";
import {
  QUIZ_SIZE,
  QUIZ_VERSION,
  emptyQuizProgress,
  isQuizComplete,
  quizScore,
  selectQuizQuestions,
  type QuizProgress,
} from "../lib/quiz";
import { STORAGE_KEYS } from "../lib/site";
import { useStored } from "../lib/use-stored";

const ModelComparison = lazy(() =>
  import("../components/model-comparison").then((module) => ({
    default: module.ModelComparison,
  })),
);

export type LabView = "confronto" | "quiz";

type LabSectionProps = {
  labView: LabView;
  bestScore: number | null;
  onLabViewChange: (view: LabView) => void;
  onBestScore: Dispatch<SetStateAction<number | null>>;
};

function createQuizSeed() {
  return Math.floor(Math.random() * 1_000_000_000) + 1;
}

function saveQuizSeed(seed: number) {
  window.localStorage.setItem(STORAGE_KEYS.quizSeed, String(seed));
}

function readQuizSeed() {
  const raw = window.localStorage.getItem(STORAGE_KEYS.quizSeed);
  const value = raw ? Number(raw) : Number.NaN;
  if (Number.isFinite(value) && value > 0) return value;
  const seed = createQuizSeed();
  saveQuizSeed(seed);
  return seed;
}

function AreaSummary({
  answers,
  questions,
}: {
  answers: (number | undefined)[];
  questions: typeof quiz;
}) {
  const summary = quizAreas
    .map((area) => {
      const indices = questions
        .map((item, index) => (item.area === area ? index : -1))
        .filter((index) => index >= 0);
      const wrong = indices.filter((index) => answers[index] !== questions[index].correct);
      return { area, total: indices.length, wrong: wrong.length };
    })
    .filter((entry) => entry.total > 0);
  const weak = summary.filter((entry) => entry.wrong > 0);
  return (
    <div className="quiz-areas" aria-live="polite">
      <span className="label">DOVE CONCENTRARTI</span>
      {weak.length === 0 ? (
        <p className="areas-ok">Nessun punto debole: hai colto tutte le aree del percorso.</p>
      ) : (
        <ul>
          {weak.map((entry) => (
            <li key={entry.area}>
              <strong>{entry.area}</strong>
              <span>
                {entry.wrong} da rivedere su {entry.total}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LabSection({ labView, bestScore, onLabViewChange, onBestScore }: LabSectionProps) {
  const [progress, setProgress] = useStored<QuizProgress>(STORAGE_KEYS.quiz, emptyQuizProgress);
  const [seed, setSeed] = useState(readQuizSeed);
  const questions = useMemo(() => selectQuizQuestions(quiz, QUIZ_SIZE, seed), [seed]);
  const answers = progress.answers;
  const score = quizScore(answers, questions);
  const complete = isQuizComplete(progress, questions);
  const question = questions[Math.min(progress.pos, questions.length - 1)];

  // Le riprese salvate con una banca o un formato precedente non sono più
  // allineate alle nuove estrazioni: si azzerano una sola volta.
  useEffect(() => {
    const key = STORAGE_KEYS.quizVersion;
    if (window.localStorage.getItem(key) === String(QUIZ_VERSION)) return;
    window.localStorage.setItem(key, String(QUIZ_VERSION));
    setProgress(emptyQuizProgress);
  }, [setProgress]);

  useEffect(() => {
    if (!complete) return;
    onBestScore((current) => (current === null || score > current ? score : current));
  }, [complete, score, onBestScore]);

  const restartQuiz = () => {
    const nextSeed = createQuizSeed();
    saveQuizSeed(nextSeed);
    setSeed(nextSeed);
    setProgress(emptyQuizProgress);
  };

  const optionState = (index: number) => {
    if (!progress.submitted) return progress.selected === index ? "picked" : "";
    if (index === question.correct) return "correct";
    return progress.selected === index ? "incorrect" : "";
  };

  const exportResult = () => {
    const lines = [
      "IL FATTORE UMANO — ESITO DELL'AUTOVERIFICA",
      new Date().toLocaleString("it-IT"),
      `Punteggio: ${score}/${questions.length}`,
      "",
      ...questions.map((item, index) => {
        const given = answers[index];
        return [
          `${index + 1}. ${item.q}`,
          `Risposta data: ${given !== undefined ? item.a[given] : "—"}`,
          `Risposta corretta: ${item.a[item.correct]}`,
          given === item.correct ? "Esito: corretta" : "Esito: da rivedere",
        ].join("\n");
      }),
    ];
    downloadText("il-fattore-umano-esito.txt", lines.join("\n\n"));
  };

  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="DAL PRODOTTO AL PROCESSO"
        title="Allena il tuo giudizio."
        text="Non conta soltanto trovare una risposta. Conta capire come ci sei arrivato."
      />
      <div className="segmented lab-tabs">
        <button
          className={labView === "confronto" ? "selected" : ""}
          aria-pressed={labView === "confronto"}
          onClick={() => onLabViewChange("confronto")}
        >
          <Layers size={17} /> Confronto dei modelli
        </button>
        <button
          className={labView === "quiz" ? "selected" : ""}
          aria-pressed={labView === "quiz"}
          onClick={() => onLabViewChange("quiz")}
        >
          <ListChecks size={17} /> Autoverifica · {QUIZ_SIZE} domande
        </button>
      </div>
      {labView === "confronto" ? (
        <Suspense
          fallback={
            <p className="lab-loading" role="status">
              Caricamento del laboratorio…
            </p>
          }
        >
          <ModelComparison />
        </Suspense>
      ) : (
        <section className="quiz-panel">
          {complete ? (
            <div className="quiz-result">
              <span className="eyebrow">IL TUO RISULTATO</span>
              <h2>
                {score}
                <span>/{questions.length}</span>
              </h2>
              <h3>
                {score >= 8
                  ? "Il pensiero critico è in movimento."
                  : "Ogni dubbio è un punto di partenza."}
              </h3>
              <p>
                Rileggi le spiegazioni e torna ai capitoli per approfondire. Miglior risultato
                salvato in questo browser: {bestScore ?? score}/{questions.length}.
              </p>
              <AreaSummary answers={answers} questions={questions} />
              <div className="results-review">
                {questions.map((item, index) => (
                  <details key={item.q}>
                    <summary>
                      <span className={answers[index] === item.correct ? "right" : "wrong"}>
                        {answers[index] === item.correct ? "✓" : "×"}
                      </span>
                      {index + 1}. {item.q}
                    </summary>
                    <p>La tua risposta: {item.a[answers[index]]}</p>
                    <p>
                      <b>Risposta corretta:</b> {item.a[item.correct]}
                    </p>
                    <p>{item.explanation}</p>
                  </details>
                ))}
              </div>
              <div className="quiz-result-actions">
                <button className="primary" onClick={restartQuiz}>
                  Riprova il quiz <ArrowRight size={17} />
                </button>
                <button className="text-button" onClick={exportResult}>
                  <Download size={16} /> Esporta l’esito
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="quiz-top">
                <span className="label">
                  DOMANDA {progress.pos + 1} / {questions.length}
                </span>
                <span className="small-muted">
                  {answers.length > 0
                    ? `Ripresa automatica · ${answers.length}/${questions.length} risposte`
                    : "Comprensione, non memorizzazione"}
                </span>
              </div>
              <div className="quiz-progress">
                <span style={{ width: `${(progress.pos / questions.length) * 100}%` }} />
              </div>
              <h2>{question.q}</h2>
              <div className="answer-options">
                {question.a.map((answer, index) => (
                  <button
                    key={answer}
                    disabled={progress.submitted}
                    onClick={() => setProgress({ ...progress, selected: index })}
                    aria-pressed={progress.selected === index}
                    className={optionState(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {answer}
                    {progress.submitted && index === question.correct && <Check size={19} />}
                  </button>
                ))}
              </div>
              {progress.submitted && (
                <div className="quiz-explanation">
                  <strong>
                    {progress.selected === question.correct
                      ? "Esatto."
                      : "Una distinzione da approfondire."}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}
              <div className="quiz-actions">
                {!progress.submitted ? (
                  <button
                    className="primary"
                    disabled={progress.selected === null}
                    onClick={() => setProgress({ ...progress, submitted: true })}
                  >
                    Verifica la risposta <Check size={17} />
                  </button>
                ) : (
                  <button
                    className="primary"
                    onClick={() =>
                      setProgress({
                        answers: [...progress.answers, progress.selected ?? 0],
                        pos: progress.pos + 1,
                        selected: null,
                        submitted: false,
                      })
                    }
                  >
                    {progress.pos === questions.length - 1
                      ? "Vedi il risultato"
                      : "Prossima domanda"}
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
}
