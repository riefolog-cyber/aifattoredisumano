import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  FlaskConical,
  ListChecks,
  Play,
} from "lucide-react";
import { MindDiagram } from "../components/mind-diagram";
import { AuthorCredit } from "../components/author-credit";
import {
  CHAPTERS,
  YOUTUBE_THUMB,
  YOUTUBE_THUMB_FALLBACK,
  YOUTUBE_URL,
  type Tab,
} from "../lib/site";

type HomeSectionProps = {
  completed: number[];
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
  const nextChapter = completed.length
    ? (CHAPTERS.find((chapter) => !completed.includes(chapter[3]))?.[3] ?? 0)
    : 0;

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
            <button className="primary" onClick={() => onRead(1, nextChapter)}>
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
              <FileText size={14} /> 2 documenti originali
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

      <section className="path-layout" id="percorso">
        <div className="path-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ESPLORA · COMPRENDI · METTI IN DISCUSSIONE</div>
              <h2>Una mappa per orientarsi.</h2>
              <a
                className="text-button concept-map-link"
                href="/digimap-fattore-disumano.html"
                target="_blank"
                rel="noreferrer noopener"
              >
                Apri la mappa concettuale interattiva <ArrowUpRight size={16} />
              </a>
            </div>
            <span className="small-muted">IL PERCORSO / 01—06</span>
          </div>
          <div className="chapter-list">
            {CHAPTERS.map(([title, description, tag, index]) => (
              <button key={index} className="chapter-row" onClick={() => onRead(1, index)}>
                <span className={"chapter-number " + (completed.includes(index) ? "done" : "")}>
                  {completed.includes(index) ? <Check size={20} /> : `0${index + 1}`}
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
