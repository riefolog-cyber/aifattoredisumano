import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Lightbulb,
  RotateCcw,
  Target,
} from "lucide-react";
import { approaches, scenarios } from "../data/comparisons";
import "./model-comparison.css";

type Work = {
  choices: (number | null)[];
  submitted: boolean[];
  reflection: string;
  checks: boolean[];
  reviewed: boolean;
};
const emptyWork = (): Work => ({
  choices: [null, null],
  submitted: [false, false],
  reflection: "",
  checks: [false, false, false],
  reviewed: false,
});
const stages = ["Il punto di partenza", "Il processo", "Senza supporto"];

export function ModelComparison() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [focus, setFocus] = useState<number | null>(null);
  const [works, setWorks] = useState<Record<string, Work>>({});
  const scenario = scenarios[scenarioIndex];
  const work = works[scenario.id] || emptyWork();
  const changeWork = (patch: Partial<Work>) =>
    setWorks((prev) => ({
      ...prev,
      [scenario.id]: { ...(prev[scenario.id] || emptyWork()), ...patch },
    }));
  const answered = work.submitted.filter(Boolean).length;
  const completed = scenarios.filter(
    (s) => works[s.id]?.submitted.every(Boolean) && works[s.id]?.reviewed,
  ).length;
  const switchScenario = (i: number) => {
    setScenarioIndex(i);
    setStage(0);
    setShowAll(false);
  };
  return (
    <div className="comparison-lab">
      <div className="compare-intro">
        <div>
          <div className="eyebrow">STESSO COMPITO. DIVERSA RESPONSABILITÀ.</div>
          <h2>Tre strade, non tre livelli di intelligenza.</h2>
          <p>
            Confronta chi fa il lavoro, quali aiuti riceve e che cosa resta quando lo strumento si
            spegne.
          </p>
        </div>
        <span className="compare-counter">
          <Target size={18} />
          <b>{completed}/3</b> attività completate
        </span>
      </div>
      <div className="scenario-selector" aria-label="Scegli lo scenario">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            className={scenarioIndex === i ? "selected" : ""}
            aria-pressed={scenarioIndex === i}
            onClick={() => switchScenario(i)}
          >
            <span>0{i + 1}</span>
            {s.name}
            <span className="scenario-status">
              {works[s.id]?.reviewed && works[s.id]?.submitted.every(Boolean) ? (
                <Check size={15} />
              ) : (
                <ArrowRight size={15} />
              )}
            </span>
          </button>
        ))}
      </div>
      <section className="scenario-brief" aria-label="Il compito comune">
        <div className="eyebrow">{scenario.subject}</div>
        <h3>{scenario.title}</h3>
        <div className="brief-columns">
          <div>
            <span className="label">IL COMPITO COMUNE</span>
            <p>{scenario.task}</p>
          </div>
          <div>
            <span className="label">
              <Target size={13} /> L’OBIETTIVO DI APPRENDIMENTO
            </span>
            <p>{scenario.goal}</p>
          </div>
        </div>
      </section>
      <div className="comparison-controls">
        <div className="approach-filter" aria-label="Modalità da confrontare">
          <button
            aria-pressed={focus === null}
            className={focus === null ? "selected" : ""}
            onClick={() => setFocus(null)}
          >
            Tutte a confronto
          </button>
          {approaches.map((a, i) => (
            <button
              key={a.name}
              aria-pressed={focus === i}
              className={focus === i ? "selected " + a.tone : ""}
              onClick={() => setFocus(i)}
            >
              {a.short}
            </button>
          ))}
        </div>
        <button className="reveal-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Torna alle tappe" : "Mostra tutte le tappe"}
          <BookOpen size={15} />
        </button>
      </div>
      {!showAll && (
        <div className="stage-navigation">
          <div className="stage-buttons">
            {stages.map((s, i) => (
              <button
                key={s}
                className={stage === i ? "selected" : stage > i ? "visited" : ""}
                aria-pressed={stage === i}
                onClick={() => setStage(i)}
              >
                <span>{i + 1}</span>
                {s}
              </button>
            ))}
          </div>
          <div className="stage-arrows">
            <button
              aria-label="Tappa precedente"
              disabled={stage === 0}
              onClick={() => setStage(stage - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              aria-label="Tappa successiva"
              disabled={stage === 2}
              onClick={() => setStage(stage + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
      <div className={"approach-columns " + (focus !== null ? "focused" : "")}>
        {approaches.map(
          (a, i) =>
            (focus === null || focus === i) && (
              <article className={"approach-column " + a.tone} key={a.name}>
                <div className="approach-heading">
                  <span className="approach-symbol">
                    {i === 0 ? (
                      <Target size={21} />
                    ) : i === 1 ? (
                      <CircleHelp size={23} />
                    ) : (
                      <Lightbulb size={22} />
                    )}
                  </span>
                  <div>
                    <div className="label">{a.label}</div>
                    <h3>{a.name}</h3>
                  </div>
                  <span className="approach-index">0{i + 1}</span>
                </div>
                <p className="approach-role">{a.role}</p>
                <div className="path-stages">
                  {scenario.paths[i].map(
                    (item, j) =>
                      (showAll || stage === j) && (
                        <section className="path-stage" key={item.title}>
                          <span className="label">
                            TAPPA {j + 1} · {stages[j].toUpperCase()}
                          </span>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                          <div className="student-action">
                            <ArrowRight size={14} />
                            <span>{item.action}</span>
                          </div>
                        </section>
                      ),
                  )}
                </div>
                <div className="approach-bottom">
                  <span className="label">CHI FA IL PASSO DECISIVO?</span>
                  <strong>
                    {i === 0
                      ? "Tu, in autonomia."
                      : i === 1
                        ? "Tu, con una domanda guida."
                        : "La macchina; tu devi ricostruirlo."}
                  </strong>
                </div>
              </article>
            ),
        )}
      </div>
      <div className="comparison-caption">
        <span className="mini-dot" />
        Esempi didattici predefiniti, non una chat in tempo reale. Il confronto descrive pratiche
        d’uso, non punteggi o risultati sperimentali.
      </div>
      <details className="comparison-matrix">
        <summary>
          <span>
            <LayersIcon /> Vantaggi, limiti e contesti d’uso
          </span>
          <span className="matrix-summary-hint">Apri la sintesi</span>
        </summary>
        <div className="matrix-scroll">
          <table>
            <caption>Confronto qualitativo delle tre modalità</caption>
            <thead>
              <tr>
                <th scope="col">Che cosa cambia</th>
                {approaches.map((a) => (
                  <th scope="col" key={a.name} className={a.tone}>
                    {a.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Vantaggio", "benefit"],
                ["Possibile limite", "risk"],
                ["Quando usarla", "when"],
                ["Buona pratica", "safeguard"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  {approaches.map((a) => (
                    <td key={a.name}>{a[key as "benefit" | "risk" | "when" | "safeguard"]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <section className="guided-activity" aria-label="Attività guidata">
        <div className="activity-heading">
          <div>
            <span className="eyebrow">ORA TOCCA A TE / {scenario.name.toUpperCase()}</span>
            <h3>Dalla lettura alla prova.</h3>
            <p>Applica la distinzione, poi spiega il ragionamento con parole tue.</p>
          </div>
          <span className="activity-count">{answered}/2 risposte esplorate</span>
        </div>
        <div className="guided-questions">
          {scenario.questions.map((q, qi) => (
            <div className="guided-question" key={q.title}>
              <div className="label">
                ESERCIZIO 0{qi + 1} · {q.title.toUpperCase()}
              </div>
              <h4>{q.prompt}</h4>
              <div className="guided-options">
                {q.options.map((option, oi) => (
                  <button
                    key={option}
                    disabled={work.submitted[qi]}
                    aria-pressed={work.choices[qi] === oi}
                    onClick={() =>
                      changeWork({ choices: work.choices.map((v, i) => (i === qi ? oi : v)) })
                    }
                    className={
                      (work.choices[qi] === oi ? "picked " : "") +
                      (work.submitted[qi] && oi === q.correct
                        ? "correct"
                        : work.submitted[qi] && work.choices[qi] === oi
                          ? "incorrect"
                          : "")
                    }
                  >
                    <span>{String.fromCharCode(65 + oi)}</span>
                    {option}
                    {work.submitted[qi] && oi === q.correct && <Check size={16} />}
                  </button>
                ))}
              </div>
              {work.submitted[qi] ? (
                <>
                  <div className="guided-feedback" aria-live="polite">
                    <strong>
                      {work.choices[qi] === q.correct
                        ? "Hai individuato il punto decisivo."
                        : "Il punto da distinguere è questo."}
                    </strong>
                    <p>{q.feedback}</p>
                  </div>
                  <button
                    className="activity-retry"
                    onClick={() =>
                      changeWork({
                        submitted: work.submitted.map((v, i) => (i === qi ? false : v)),
                        choices: work.choices.map((v, i) => (i === qi ? null : v)),
                      })
                    }
                  >
                    <RotateCcw size={13} /> Riprova questo esercizio
                  </button>
                </>
              ) : (
                <button
                  className="activity-check"
                  disabled={work.choices[qi] === null}
                  onClick={() =>
                    changeWork({ submitted: work.submitted.map((v, i) => (i === qi ? true : v)) })
                  }
                >
                  Confronta la risposta <ArrowRight size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="reflection-workspace">
          <div className="reflection-copy">
            <span className="label">03 · RENDI VISIBILE IL TUO RAGIONAMENTO</span>
            <h4>Non basta scegliere. Prova a spiegare.</h4>
            <p>{scenario.reflection}</p>
            <div className="reflection-tip">
              <Lightbulb size={17} />
              <span>
                Non c’è una valutazione automatica del testo. Usa i criteri per rileggere la tua
                spiegazione.
              </span>
            </div>
          </div>
          <div className="reflection-editor">
            <label htmlFor="compare-reflection">La tua spiegazione</label>
            <textarea
              id="compare-reflection"
              aria-label="La tua spiegazione"
              value={work.reflection}
              onChange={(e) =>
                changeWork({
                  reflection: e.target.value,
                  reviewed: false,
                  checks: [false, false, false],
                })
              }
              placeholder="Scrivi i passaggi del tuo ragionamento…"
            />
            <fieldset>
              <legend>Rileggi e indica i criteri che hai soddisfatto</legend>
              {scenario.criteria.map((criterion, i) => (
                <label key={criterion}>
                  <input
                    type="checkbox"
                      aria-label={criterion}
                    checked={work.checks[i]}
                    onChange={(e) =>
                      changeWork({
                        checks: work.checks.map((v, j) => (j === i ? e.target.checked : v)),
                        reviewed: false,
                      })
                    }
                  />
                  <span>{criterion}</span>
                </label>
              ))}
            </fieldset>
            <button
              className="primary"
              disabled={!work.reflection.trim() || !work.checks.some(Boolean)}
              onClick={() => changeWork({ reviewed: true })}
            >
              Fai il punto <ArrowRight size={16} />
            </button>
            {work.reviewed && (
              <div className="reflection-feedback" aria-live="polite">
                <strong>
                  {work.checks.every(Boolean)
                    ? "Hai completato la rilettura con tutti i criteri."
                    : "Hai individuato da dove continuare."}
                </strong>
                <p>
                  {work.checks.every(Boolean)
                    ? "Adesso prova a spiegare lo stesso concetto a voce, senza leggere. I criteri sono un’autovalutazione, non un voto sulla qualità del testo."
                    : `Per rafforzare la spiegazione, torna su: ${scenario.criteria.filter((_, i) => !work.checks[i]).join(" ")} Questo feedback si basa sui criteri che hai selezionato.`}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="activity-footer">
          <p>
            Risposte e riflessioni restano disponibili mentre esplori questi scenari. Non vengono
            salvate dopo la chiusura del laboratorio.
          </p>
          <button onClick={() => switchScenario((scenarioIndex + 1) % scenarios.length)}>
            Passa a {scenarios[(scenarioIndex + 1) % scenarios.length].name.toLowerCase()}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

function LayersIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
