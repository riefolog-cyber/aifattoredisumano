import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  FlaskConical,
  Layers,
  ListChecks,
  Menu,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import content from "../data/documents.json";
import { quiz } from "../data/quiz";
import { MindDiagram } from "../components/mind-diagram";
import { ModelComparison } from "../components/model-comparison";

const tabs = ["Percorso", "Documenti", "Laboratorio", "Glossario", "Dibattito"];
const chapters = [
  ["La bussola e la mente", "Ripensare la neutralità della tecnologia.", "ORIENTAMENTO", 0],
  ["Il costo della delega", "Attrito cognitivo, apprendimento e autonomia.", "COGNIZIONE", 1],
  ["Le parole che ci somigliano", "Linguaggio, antropofonia e omologazione.", "LINGUAGGIO", 2],
  ["Chi governa l’algoritmo?", "Potere, infrastrutture e sovranità digitale.", "POTERE", 3],
  ["Riprendersi il tempo", "Memoria, lentezza e pensiero prospettico.", "TEMPORALITÀ", 4],
  ["Dall’oracolo al dialogo", "Pratiche per un uso consapevole dell’IA.", "PROSPETTIVE", 5],
] as const;

function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? initial;
    } catch {
      return initial;
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [key, value]);
  return [value, setValue, storageError] as const;
}

export default function LearningSite() {
  const [tab, setTab] = useState("Percorso");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [docIndex, setDocIndex] = useState(0);
  const [section, setSection] = useState(0);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [completed, setCompleted] = useStored<number[]>("fd-completed", []);
  const [notes, setNotes, noteError] = useStored<Record<string, string>>("fd-notes", {});
  const [debate, setDebate] = useState(0);
  const [glossQuery, setGlossQuery] = useState("");
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [labView, setLabView] = useState("confronto");
  const [quizPos, setQuizPos] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useStored<number | null>("fd-best-score", null);
  const navigate = (next: string) => {
    setTab(next);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const read = (d: number, s: number) => {
    setDocIndex(d);
    setSection(s);
    setSearchOpen(false);
    navigate("Documenti");
  };
  const startQuiz = () => {
    setLabView("quiz");
    navigate("Laboratorio");
  };
  const currentDoc = content.documents[docIndex];
  const currentSection = currentDoc.sections[section];
  const results =
    query.trim().length >= 2
      ? content.documents.flatMap((d, di) =>
          d.sections.flatMap((s, si) =>
            s.paragraphs
              .filter((p) => p.text.toLowerCase().includes(query.toLowerCase().trim()))
              .map((p) => ({ di, si, title: s.title, doc: d.name, text: p.text })),
          ),
        )
      : [];
  const score = answers.reduce((sum, a, i) => sum + Number(a === quiz[i].correct), 0);
  useEffect(() => {
    if (answers.length === quiz.length && (bestScore === null || score > bestScore))
      setBestScore(score);
  }, [answers.length, score, bestScore, setBestScore]);
  const resetQuiz = () => {
    setQuizPos(0);
    setAnswers([]);
    setSelected(null);
    setSubmitted(false);
  };
  const exportNotes = () => {
    const text = content.debates
      .map((d, i) => `${d.title}\n${d.question}\n\n${notes[i] || "(Nessun appunto)"}\n`)
      .join("\n---\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "il-fattore-disumano-appunti.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="site-shell">
      <header className="header">
        <button
          className="brand"
          onClick={() => navigate("Percorso")}
          aria-label="Il Fattore Disumano, home"
        >
          <span className="brand-icon">
            <Brain size={24} />
          </span>
          <span>
            IL FATTORE
            <br />
            <b>DISUMANO</b>
          </span>
        </button>
        <nav className={mobileMenu ? "nav open" : "nav"} aria-label="Navigazione principale">
          {tabs.map((t) => (
            <button key={t} onClick={() => navigate(t)} className={tab === t ? "active" : ""}>
              {t}
            </button>
          ))}
        </nav>
        <div className="header-tools">
          <button
            className="search-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Cerca nei documenti"
          >
            <Search size={19} />
            <span>Cerca</span>
          </button>
          <button
            className="my-progress"
            onClick={() => {
              navigate("Percorso");
              setTimeout(
                () => document.getElementById("percorso")?.scrollIntoView({ behavior: "smooth" }),
                50,
              );
            }}
          >
            <span className="progress-dot" />
            {completed.length}/6 <span>capitoli</span>
          </button>
          <button
            className="menu-button"
            aria-label="Apri menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {tab === "Percorso" && (
        <>
          <main className="home-main">
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="tiny-line" /> UN PERCORSO DI PENSIERO CRITICO
                </div>
                <h1>
                  L’intelligenza è<br />
                  artificiale.
                  <br />
                  Il pensiero resta <span>tuo.</span>
                </h1>
                <p>
                  Comprendere l’IA, senza delegare la mente.
                  <br />
                  Un viaggio tra cognizione, linguaggio e potere
                  <br className="desktop-break" /> per studenti e docenti.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary"
                    onClick={() =>
                      read(
                        1,
                        completed.length
                          ? (chapters.find((c) => !completed.includes(c[3]))?.[3] ?? 0)
                          : 0,
                      )
                    }
                  >
                    Inizia il percorso <ArrowUpRight size={19} />
                  </button>
                  <button
                    className="text-button"
                    onClick={() => {
                      navigate("Documenti");
                    }}
                  >
                    Esplora i documenti <ArrowRight size={17} />
                  </button>
                </div>
                <div className="hero-meta">
                  <span>
                    <BookOpen size={14} /> 6 capitoli tematici
                  </span>
                  <span>
                    <FileText size={14} /> 2 documenti originali
                  </span>
                  <span>
                    <ListChecks size={14} /> 10 domande
                  </span>
                </div>
              </div>
              <MindDiagram />
            </section>
            <div className="manifesto">
              <span className="label">LA DOMANDA DI FONDO</span>
              <p>
                Stiamo usando uno strumento,{" "}
                <span>o stiamo cambiando il nostro modo di pensare?</span>
              </p>
              <ArrowDownGraphic />
            </div>
            <section className="path-layout" id="percorso">
              <div className="path-section">
                <div className="section-heading">
                  <div>
                    <div className="eyebrow">ESPLORA · COMPRENDI · METTI IN DISCUSSIONE</div>
                    <h2>Una mappa per orientarsi.</h2>
                  </div>
                  <span className="small-muted">IL PERCORSO / 01—06</span>
                </div>
                <div className="chapter-list">
                  {chapters.map(([title, desc, tag, n]) => (
                    <button key={n} className="chapter-row" onClick={() => read(1, n)}>
                      <span className={"chapter-number " + (completed.includes(n) ? "done" : "")}>
                        {completed.includes(n) ? <Check size={20} /> : `0${n + 1}`}
                      </span>
                      <span className="chapter-copy">
                        <span className="label">{tag}</span>
                        <strong>{title}</strong>
                        <span>{desc}</span>
                      </span>
                      <ArrowUpRight size={21} />
                    </button>
                  ))}
                </div>
              </div>
              <aside className="home-aside">
                <div className="lab-teaser">
                  <span className="outline-icon">
                    <FlaskConical size={25} />
                  </span>
                  <div className="eyebrow">NON SOLO TEORIA</div>
                  <h3>
                    Metti alla prova
                    <br />
                    il tuo pensiero.
                  </h3>
                  <p>
                    Oracolo o alleato? Confronta tre modi di usare l’IA e scopri cosa cambia nel
                    processo di apprendimento.
                  </p>
                  <button
                    onClick={() => {
                      setLabView("confronto");
                      navigate("Laboratorio");
                    }}
                  >
                    Entra nel laboratorio <ArrowUpRight size={18} />
                  </button>
                  <div className="teaser-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <button className="quiz-teaser" onClick={startQuiz}>
                  <ListChecks size={23} />
                  <span>
                    <strong>Quanto hai compreso?</strong>
                    <small>
                      10 domande per fare il punto
                      {bestScore !== null ? ` · Record ${bestScore}/10` : ""}
                    </small>
                  </span>
                  <ArrowRight size={18} />
                </button>
              </aside>
            </section>
          </main>
        </>
      )}

      {tab === "Documenti" && (
        <main className="inner-main">
          <PageHeading
            label="LA BIBLIOTECA DEL PERCORSO"
            title="Leggi. Fermati. Interroga."
            text="Due documenti, un unico filo: l’autonomia del pensiero. Esplora i testi integrali e scarica i documenti originali."
          />
          <div className="doc-toolbar">
            <div className="segmented">
              {content.documents.map((d, i) => (
                <button
                  key={d.name}
                  className={docIndex === i ? "selected" : ""}
                  onClick={() => {
                    setDocIndex(i);
                    setSection(0);
                  }}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <button className="text-button" onClick={() => setSearchOpen(true)}>
              <Search size={17} /> Cerca nei testi
            </button>
            <a className="text-button" href={currentDoc.file} download>
              <Download size={17} /> DOCX originale
            </a>
          </div>
          <div className="reader-layout">
            <aside className="reader-sidebar">
              <div className="label">INDICE DEL DOCUMENTO</div>
              {currentDoc.sections.map((s, i) => (
                <button
                  key={s.title}
                  className={i === section ? "selected" : ""}
                  onClick={() => {
                    setSection(i);
                    window.scrollTo({ top: 200, behavior: "smooth" });
                  }}
                >
                  <span>0{i + 1}</span>
                  {s.title.replace(/^\d+\. /, "")}
                </button>
              ))}
            </aside>
            <article className="reading-paper">
              <div className="reading-meta">
                {currentDoc.name} <span>CAPITOLO {section + 1} / 6</span>
              </div>
              <h2>{currentSection.title.replace(/^\d+\. /, "")}</h2>
              {currentSection.paragraphs.map((p, i) => {
                const heading = p.style.startsWith("Heading");
                const table =
                  p.text.includes(",") &&
                  /^Gruppo|^Controllo,|^IA Oracolo,|^IA Socratico,|^Modello|^Approccio/.test(
                    p.text,
                  );
                return (
                  <div className="paragraph-block" key={i}>
                    {heading ? (
                      <h3>{p.text}</h3>
                    ) : table ? (
                      <div className="original-table-row">{p.text}</div>
                    ) : (
                      <p className={p.text.startsWith("Risposta") ? "original-answer" : ""}>
                        {p.text}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="reading-footer">
                <button
                  disabled={section === 0}
                  onClick={() => {
                    setSection(section - 1);
                    window.scrollTo({ top: 200, behavior: "instant" });
                  }}
                >
                  <ChevronLeft size={17} /> Precedente
                </button>
                {docIndex === 1 && (
                  <button
                    className="mark-complete"
                    onClick={() =>
                      setCompleted(
                        completed.includes(section)
                          ? completed.filter((n) => n !== section)
                          : [...completed, section],
                      )
                    }
                  >
                    <Check size={17} />
                    {completed.includes(section) ? "Capitolo completato" : "Segna come letto"}
                  </button>
                )}
                <button
                  disabled={section === 5}
                  onClick={() => {
                    setSection(section + 1);
                    window.scrollTo({ top: 200, behavior: "instant" });
                  }}
                >
                  Successivo <ChevronRight size={17} />
                </button>
              </div>
            </article>
          </div>
        </main>
      )}

      {tab === "Laboratorio" && (
        <main className="inner-main">
          <PageHeading
            label="DAL PRODOTTO AL PROCESSO"
            title="Allena il tuo giudizio."
            text="Non conta soltanto trovare una risposta. Conta capire come ci sei arrivato."
          />
          <div className="segmented lab-tabs">
            <button
              className={labView === "confronto" ? "selected" : ""}
              onClick={() => setLabView("confronto")}
            >
              <Layers size={17} /> Confronto dei modelli
            </button>
            <button
              className={labView === "quiz" ? "selected" : ""}
              onClick={() => setLabView("quiz")}
            >
              <ListChecks size={17} /> Autoverifica · 10 domande
            </button>
          </div>
          {labView === "confronto" ? (
            <ModelComparison />
          ) : (
            <section className="quiz-panel">
              {answers.length === quiz.length ? (
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
                    {quiz.map((q, i) => (
                      <details key={q.q}>
                        <summary>
                          <span className={answers[i] === q.correct ? "right" : "wrong"}>
                            {answers[i] === q.correct ? "✓" : "×"}
                          </span>
                          {i + 1}. {q.q}
                        </summary>
                        <p>La tua risposta: {q.a[answers[i]]}</p>
                        <p>
                          <b>Risposta corretta:</b> {q.a[q.correct]}
                        </p>
                        <p>{q.explanation}</p>
                      </details>
                    ))}
                  </div>
                  <button className="primary" onClick={resetQuiz}>
                    Riprova il quiz <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="quiz-top">
                    <span className="label">DOMANDA {quizPos + 1} / 10</span>
                    <span className="small-muted">Comprensione, non memorizzazione</span>
                  </div>
                  <div className="quiz-progress">
                    <span style={{ width: `${quizPos * 10}%` }} />
                  </div>
                  <h2>{quiz[quizPos].q}</h2>
                  <div className="answer-options">
                    {quiz[quizPos].a.map((a, i) => (
                      <button
                        key={a}
                        disabled={submitted}
                        onClick={() => setSelected(i)}
                        className={
                          (selected === i ? "picked " : "") +
                          (submitted && i === quiz[quizPos].correct
                            ? "correct "
                            : submitted && selected === i
                              ? "incorrect"
                              : "")
                        }
                      >
                        <span>{String.fromCharCode(65 + i)}</span>
                        {a}
                        {submitted && i === quiz[quizPos].correct && <Check size={19} />}
                      </button>
                    ))}
                  </div>
                  {submitted && (
                    <div className="quiz-explanation">
                      <strong>
                        {selected === quiz[quizPos].correct
                          ? "Esatto."
                          : "Una distinzione da approfondire."}
                      </strong>
                      <p>{quiz[quizPos].explanation}</p>
                    </div>
                  )}
                  <div className="quiz-actions">
                    {!submitted ? (
                      <button
                        className="primary"
                        disabled={selected === null}
                        onClick={() => setSubmitted(true)}
                      >
                        Verifica la risposta <Check size={17} />
                      </button>
                    ) : (
                      <button
                        className="primary"
                        onClick={() => {
                          setAnswers([...answers, selected!]);
                          setQuizPos(quizPos + 1);
                          setSelected(null);
                          setSubmitted(false);
                        }}
                      >
                        {quizPos === 9 ? "Vedi il risultato" : "Prossima domanda"}
                        <ArrowRight size={17} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </section>
          )}
        </main>
      )}

      {tab === "Glossario" && (
        <main className="inner-main">
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
              onChange={(e) => setGlossQuery(e.target.value)}
              placeholder="Cerca un termine o un concetto…"
            />
          </label>
          <div className="gloss-list">
            {content.glossary
              .filter((g) =>
                (g.term + " " + g.meaning).toLowerCase().includes(glossQuery.toLowerCase()),
              )
              .map((g, i) => (
                <div className="gloss-item" key={g.term}>
                  <button
                    onClick={() => setOpenTerm(openTerm === g.term ? null : g.term)}
                    aria-expanded={openTerm === g.term}
                  >
                    <span className="chapter-number">{String(i + 1).padStart(2, "0")}</span>
                    <h2>{g.term}</h2>
                    <span className="gloss-toggle">{openTerm === g.term ? "−" : "+"}</span>
                  </button>
                  {openTerm === g.term && (
                    <div className="gloss-definition">
                      <p>{g.meaning}</p>
                      <span className="label">DEFINIZIONE DAL DOCUMENTO ORIGINALE</span>
                    </div>
                  )}
                </div>
              ))}
            {!content.glossary.some((g) =>
              (g.term + " " + g.meaning).toLowerCase().includes(glossQuery.toLowerCase()),
            ) && <p className="empty-state">Nessun termine trovato. Prova un’altra parola.</p>}
          </div>
        </main>
      )}

      {tab === "Dibattito" && (
        <main className="inner-main">
          <PageHeading
            label="IL PENSIERO SI COSTRUISCE INSIEME"
            title="Prendi posizione. Poi dubita."
            text="Cinque tracce per il confronto in aula. Annota una tesi, un’obiezione e le domande che restano aperte."
          />
          <div className="debate-layout">
            <aside className="debate-sidebar">
              {content.debates.map((d, i) => (
                <button
                  key={d.title}
                  className={debate === i ? "selected" : ""}
                  onClick={() => setDebate(i)}
                >
                  <span>0{i + 1}</span>
                  {d.title}
                  {notes[i] && <span className="note-indicator" />}
                </button>
              ))}
            </aside>
            <section className="debate-panel">
              <MessageSquare className="acid" size={27} />
              <div className="eyebrow">TRACCIA {debate + 1} / 5</div>
              <h2>{content.debates[debate].title}</h2>
              <p className="debate-question">{content.debates[debate].question}</p>
              <div className="discussion-hints">
                <span>01 · Formula una tesi</span>
                <span>02 · Cerca un’obiezione</span>
                <span>03 · Quali prove servono?</span>
              </div>
              <label className="notes-label" htmlFor="notes">
                Il tuo spazio di riflessione{" "}
                <span>
                  {noteError
                    ? "Salvataggio non disponibile"
                    : "Salvato automaticamente nel browser"}
                </span>
              </label>
              <textarea
                id="notes"
                aria-label="Il tuo spazio di riflessione"
                value={notes[debate] || ""}
                onChange={(e) => setNotes({ ...notes, [debate]: e.target.value })}
                placeholder="La mia tesi…\nUn’obiezione possibile…\nUna domanda ancora aperta…"
              />
              <div className="notes-footer">
                <span className="small-muted">
                  Appunti privati su questo dispositivo. Nessuna sincronizzazione.
                </span>
                <button className="text-button" onClick={exportNotes}>
                  <Download size={17} /> Esporta appunti
                </button>
              </div>
            </section>
          </div>
        </main>
      )}

      <footer className="footer">
        <div>
          <Brain size={19} />
          <span>IL FATTORE DISUMANO</span>
        </div>
        <p>La tecnologia come strumento. Il pensiero come scelta.</p>
        <button
          onClick={() => {
            setDocIndex(0);
            setSection(0);
            navigate("Documenti");
          }}
        >
          Fonti e documenti <ArrowUpRight size={14} />
        </button>
      </footer>

      {searchOpen && (
        <dialog
          className="search-overlay"
          ref={(node) => {
            if (node && !node.open) node.showModal();
          }}
          onCancel={() => setSearchOpen(false)}
          aria-label="Ricerca nei documenti"
        >
          <section className="search-modal">
            <div className="search-modal-top">
              <Search size={22} />
              <input
                autoFocus
                aria-label="Cerca nei documenti"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                placeholder="Cerca nei due documenti…"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Chiudi ricerca">
                <X size={22} />
              </button>
            </div>
            <div className="search-results">
              {query.trim().length < 2 ? (
                <p className="empty-state">
                  Scrivi almeno due caratteri. Cerca un concetto, un autore o una frase.
                </p>
              ) : (
                <>
                  <div className="search-count">{results.length} passaggi trovati</div>
                  {results.map((r, i) => (
                    <button key={i} onClick={() => read(r.di, r.si)}>
                      <span className="label">
                        {r.doc} · CAPITOLO {r.si + 1}
                      </span>
                      <h3>{r.title.replace(/^\d+\. /, "")}</h3>
                      <p>
                        {r.text.length > 300
                          ? r.text.slice(
                              Math.max(
                                0,
                                r.text.toLowerCase().indexOf(query.toLowerCase().trim()) - 80,
                              ),
                              Math.max(
                                0,
                                r.text.toLowerCase().indexOf(query.toLowerCase().trim()) - 80,
                              ) + 300,
                            ) + "…"
                          : r.text}
                      </p>
                      <span className="result-link">
                        Apri il capitolo <ArrowUpRight size={14} />
                      </span>
                    </button>
                  ))}
                  {results.length === 0 && (
                    <p className="empty-state">
                      Nessun passaggio trovato. Prova una parola diversa.
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        </dialog>
      )}
    </div>
  );
}

function PageHeading({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="page-heading">
      <div className="eyebrow">{label}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
function ArrowDownGraphic() {
  return (
    <svg width="25" height="35" viewBox="0 0 25 35" fill="none" aria-hidden="true">
      <path d="M12.5 1V30M3 21L12.5 31L22 21" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
