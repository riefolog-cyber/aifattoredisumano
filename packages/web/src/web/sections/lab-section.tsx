import { lazy, Suspense, useEffect, type Dispatch, type SetStateAction } from "react";
import { ArrowRight, Check, Download, Layers, ListChecks } from "lucide-react";
import { quiz } from "../data/quiz";
import { PageHeading } from "../components/page-heading";
import { downloadText } from "../lib/download";
import {
  emptyQuizProgress,
  isQuizComplete,
  quizScore,
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

export function LabSection({ labView, bestScore, onLabViewChange, onBestScore }: LabSectionProps) {
  const [progress, setProgress] = useStored<QuizProgress>(STORAGE_KEYS.quiz, emptyQuizProgress);
  const answers = progress.answers;
  const score = quizScore(answers, quiz);
  const complete = isQuizComplete(progress, quiz);
  const question = quiz[Math.min(progress.pos, quiz.length - 1)];

  useEffect(() => {
    if (!complete) return;
    onBestScore((current) => (current === null || score > current ? score : current));
  }, [complete, score, onBestScore]);

  const exportResult = () => {
    const lines = [
      "IL FATTORE DISUMANO — ESITO DELL'AUTOVERIFICA",
      new Date().toLocaleString("it-IT"),
      `Punteggio: ${score}/${quiz.length}`,
      "",
      ...quiz.map((item, index) => {
        const given = answers[index];
        return [
          `${index + 1}. ${item.q}`,
          `Risposta data: ${given !== undefined ? item.a[given] : "—"}`,
          `Risposta corretta: ${item.a[item.correct]}`,
          given === item.correct ? "Esito: corretta" : "Esito: da rivedere",
        ].join("\n");
      }),
    ];
    downloadText("il-fattore-disumano-esito.txt", lines.join("\n\n"));
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
          <ListChecks size={17} /> Autoverifica · 10 domande
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
                <span>/10</span>
              </h2>
              <h3>
                {score >= 8
                  ? "Il pensiero critico è in movimento."
                  : "Ogni dubbio è un punto di partenza."}
              </h3>
              <p>
                Rileggi le spiegazioni e torna ai capitoli per approfondire. Miglior risultato
                salvato in questo browser: {bestScore ?? score}/10.
              </p>
              <div className="results-review">
                {quiz.map((item, index) => (
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
                <button className="primary" onClick={() => setProgress(emptyQuizProgress)}>
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
                <span className="label">DOMANDA {progress.pos + 1} / 10</span>
                <span className="small-muted">
                  {answers.length > 0
                    ? `Ripresa automatica · ${answers.length}/10 risposte`
                    : "Comprensione, non memorizzazione"}
                </span>
              </div>
              <div className="quiz-progress">
                <span style={{ width: `${progress.pos * 10}%` }} />
              </div>
              <h2>{question.q}</h2>
              <div className="answer-options">
                {question.a.map((answer, index) => (
                  <button
                    key={answer}
                    disabled={progress.submitted}
                    onClick={() => setProgress({ ...progress, selected: index })}
                    aria-pressed={progress.selected === index}
                    className={
                      (progress.selected === index ? "picked " : "") +
                      (progress.submitted && index === question.correct
                        ? "correct "
                        : progress.submitted && progress.selected === index
                          ? "incorrect"
                          : "")
                    }
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
                    {progress.pos === quiz.length - 1 ? "Vedi il risultato" : "Prossima domanda"}
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
