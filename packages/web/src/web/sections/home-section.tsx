import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  FlaskConical,
  GraduationCap,
  ListChecks,
  MessagesSquare,
  Play,
  TextQuote,
} from "lucide-react";
import { MindDiagram } from "../components/mind-diagram";
import { AuthorCredit } from "../components/author-credit";
import {
  CHAPTERS,
  YOUTUBE_THUMB,
  YOUTUBE_THUMB_FALLBACK,
  YOUTUBE_URL,
  chapterKey,
  type Tab,
} from "../lib/site";

type HomeSectionProps = {
  completed: string[];
  bestScore: number | null;
  onRead: (docIndex: number, section: number) => void;
  onNavigate: (tab: Tab) => void;
  onStartQuiz: () => void;
  onOpenLab: () => void;
};

export function HomeSection({
  completed,
  bestScore,
  onRead,
  onNavigate,
  onStartQuiz,
  onOpenLab,
}: HomeSectionProps) {
  const nextChapter =
    CHAPTERS.find(([, , , doc, section]) => !completed.includes(chapterKey(doc, section))) ??
    CHAPTERS[0];
  const [, , , nextDoc, nextSection] = nextChapter;

  return (
    <main className="home-main" id="contenuto" tabIndex={-1}>
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
            <button className="primary" onClick={() => onRead(nextDoc, nextSection)}>
              Inizia il percorso <ArrowUpRight size={19} />
            </button>
            <button className="text-button" onClick={() => onNavigate("Documenti")}>
              Esplora i documenti <ArrowRight size={17} />
            </button>
          </div>
          <div className="hero-meta">
            <span>
              <BookOpen size={14} /> 6 capitoli tematici
            </span>
            <span>
              <FileText size={14} /> 11 sezioni integrali
            </span>
            <span>
              <ListChecks size={14} /> 10 domande
            </span>
          </div>
        </div>
        <MindDiagram />
      </section>

      <AuthorCredit />

      <div className="manifesto">
        <span className="label">LA DOMANDA DI FONDO</span>
        <p>
          Stiamo usando uno strumento,{" "}
          <span>o stiamo cambiando il nostro modo di pensare?</span>
        </p>
        <ArrowDownGraphic />
      </div>

      <section className="video-feature" aria-labelledby="video-title">
        <a
          className="video-thumb"
          href={YOUTUBE_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Guarda il video su YouTube"
        >
          <img
            src={YOUTUBE_THUMB}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              if (event.currentTarget.src !== YOUTUBE_THUMB_FALLBACK)
                event.currentTarget.src = YOUTUBE_THUMB_FALLBACK;
            }}
          />
          <span className="video-badge">YOUTUBE · VIDEO</span>
          <span className="video-play">
            <Play size={22} fill="currentColor" />
          </span>
        </a>
        <div className="video-copy">
          <div className="eyebrow">
            <span className="tiny-line" /> GUARDA · ASCOLTA · DISCUTI
          </div>
          <h2 id="video-title">
            L’intelligenza artificiale è una bussola… o sta riprogrammando la nostra mente?
          </h2>
          <p>
            Un video introduttivo al percorso: dalla metafora dello strumento al rischio di
            delegare il pensiero. Guardalo prima di iniziare, oppure torna qui dopo i capitoli per
            rileggere la domanda con occhi diversi.
          </p>
          <a className="video-link" href={YOUTUBE_URL} target="_blank" rel="noreferrer noopener">
            Apri su YouTube <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section className="guida-percorso" aria-label="Come affrontare il percorso">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DA DOVE COMINCIARE</div>
            <h2>Il percorso in quattro mosse.</h2>
          </div>
          <span className="small-muted"> CIRCA 6 ORE</span>
        </div>
        <ol>
          <li>
            <span className="percorso-num">01</span>
            <Play size={18} />
            <div>
              <strong>Guarda e lasciati interrogare</strong>
              <p>Il video e la domanda di fondo: usi uno strumento o stai cambiando pensiero?</p>
              <a className="inline-link" href={YOUTUBE_URL} target="_blank" rel="noreferrer noopener">
                Vai al video <ArrowUpRight size={13} />
              </a>
            </div>
          </li>
          <li>
            <span className="percorso-num">02</span>
            <BookOpen size={18} />
            <div>
              <strong>Leggi i sei capitoli</strong>
              <p>Due documenti integrali, dal falso mito della neutralità alle pratiche consapevoli.</p>
              <button className="inline-link" onClick={() => onRead(nextDoc, nextSection)}>
                {completed.length ? "Riprendi da dove eri" : "Inizia dal primo capitolo"}{" "}
                <ArrowUpRight size={13} />
              </button>
            </div>
          </li>
          <li>
            <span className="percorso-num">03</span>
            <FlaskConical size={18} />
            <div>
              <strong>Sperimenta nel laboratorio</strong>
              <p>Confronta tre modi di usare l'IA e verifica con 10 domande quanto hai compreso.</p>
              <button className="inline-link" onClick={onOpenLab}>
                Entra nel laboratorio <ArrowUpRight size={13} />
              </button>
            </div>
          </li>
          <li>
            <span className="percorso-num">04</span>
            <MessagesSquare size={18} />
            <div>
              <strong>Discuti in aula</strong>
              <p>Cinque tracce con guida in tre mosse: tesi, obiezione, domanda aperta.</p>
              <button className="inline-link" onClick={() => onNavigate("Dibattito")}>
                Vai ai dibattiti <ArrowUpRight size={13} />
              </button>
            </div>
          </li>
        </ol>
      </section>

      <section className="path-layout" id="percorso">
        <div className="path-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ESPLORA · COMPRENDI · METTI IN DISCUSSIONE</div>
              <h2>Una mappa per orientarsi.</h2>
            </div>
            <span className="small-muted">IL PERCORSO / 01—06</span>
          </div>
          <a
            className="concept-map-card"
                          href={`${import.meta.env.BASE_URL}digimap-fattore-umano.html`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="concept-map-shot">
              <img
                src={`${import.meta.env.BASE_URL}images/mappa-concettuale.jpg`}
                alt="Anteprima della mappa concettuale interattiva del percorso"
                loading="lazy"
                decoding="async"
              />
              <span className="concept-map-badge">MAPPA CONCETTUALE · INTERATTIVA</span>
            </span>
            <span className="concept-map-copy">
              <span className="eyebrow">UNA VISIONE D’INSIEME</span>
              <strong>Esplora la mappa concettuale del percorso</strong>
              <span>
                Collegamenti tra cognizione, linguaggio, potere e autonomia: apri la mappa
                interattiva per orientarti tra i temi e approfondirli.
              </span>
              <span className="concept-map-action">
                Apri la mappa <ArrowUpRight size={17} />
              </span>
              <span className="concept-map-note">
                File autonomo di circa 2 MB: si apre in una nuova scheda e richiede una
                connessione.
              </span>
            </span>
          </a>
          <div className="chapter-list">
            {CHAPTERS.map(([title, description, tag, doc, section], order) => (
              <button
                key={chapterKey(doc, section)}
                className="chapter-row"
                onClick={() => onRead(doc, section)}
              >
                <span
                  className={
                    "chapter-number " +
                    (completed.includes(chapterKey(doc, section)) ? "done" : "")
                  }
                >
                  {completed.includes(chapterKey(doc, section)) ? (
                    <Check size={20} />
                  ) : (
                    `0${order + 1}`
                  )}
                </span>
                <span className="chapter-copy">
                  <span className="label">{tag}</span>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
                <ArrowUpRight size={21} />
              </button>
            ))}
          </div>
          <p className="path-note">
            Il percorso segue 6 tappe scelte tra i due documenti. Le sezioni integrali sono 11: le
            altre 5 restano leggibili come approfondimenti.{" "}
            <button className="inline-link" onClick={() => onNavigate("Documenti")}>
              Apri i documenti <ArrowUpRight size={13} />
            </button>
          </p>
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
              Oracolo o alleato? Confronta tre modi di usare l’IA e scopri cosa cambia nel processo
              di apprendimento.
            </p>
            <button onClick={onOpenLab}>
              Entra nel laboratorio <ArrowUpRight size={18} />
            </button>
            <div className="teaser-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
          <button className="quiz-teaser" onClick={onStartQuiz}>
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

      <section className="home-links" aria-label="Strumenti di approfondimento">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OLTRE LA LETTURA</div>
            <h2>Strumenti per capire e discutere.</h2>
          </div>
        </div>
        <div className="home-links-grid">
          <button onClick={() => onNavigate("Glossario")}>
            <TextQuote size={22} />
            <strong>Glossario</strong>
            <span>Dodici concetti chiave con rimandi ai capitoli in cui compaiono.</span>
            <span className="home-link-go">
              Apri il lessico <ArrowUpRight size={15} />
            </span>
          </button>
          <button onClick={() => onNavigate("Dibattito")}>
            <MessagesSquare size={22} />
            <strong>Dibattito</strong>
            <span>Cinque tracce con guida d'aula in tre mosse e appunti privati.</span>
            <span className="home-link-go">
              Vai alle tracce <ArrowUpRight size={15} />
            </span>
          </button>
          <button onClick={() => onNavigate("Docenti")}>
            <GraduationCap size={22} />
            <strong>Per i docenti</strong>
            <span>Obiettivi, tempi e valutazione per un percorso di sei ore in classe.</span>
            <span className="home-link-go">
              Leggi la guida <ArrowUpRight size={15} />
            </span>
          </button>
        </div>
        <button className="text-button home-sources-link" onClick={() => onNavigate("Fonti")}>
          Fonti, letture e crediti <ArrowUpRight size={15} />
        </button>
      </section>
    </main>
  );
}

function ArrowDownGraphic() {
  return (
    <svg width="25" height="35" viewBox="0 0 25 35" fill="none" aria-hidden="true">
      <path d="M12.5 1V30M3 21L12.5 31L22 21" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
