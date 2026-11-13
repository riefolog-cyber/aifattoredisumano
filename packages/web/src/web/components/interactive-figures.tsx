import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function DelegaSimulator() {
  const [mode, setMode] = useState<"oracolo" | "socratico">("socratico");
  const oracle = mode === "oracolo";
  const product = oracle ? 96 : 78;
  const competence = oracle ? 24 : 84;

  return (
    <div className="concept-diagram interactive-diagram">
      <div className="diagram-control" role="group" aria-label="Modalità di delega">
        <button
          aria-pressed={oracle}
          className={oracle ? "selected" : ""}
          onClick={() => setMode("oracolo")}
        >
          Oracolo
        </button>
        <button
          aria-pressed={!oracle}
          className={!oracle ? "selected" : ""}
          onClick={() => setMode("socratico")}
        >
          Socratico
        </button>
      </div>
      <div className="diagram-meters" aria-live="polite">
        <div className="diagram-meter">
          <span>Prodotto</span>
          <div className="meter-track">
            <i style={{ width: `${product}%` }} />
          </div>
          <b>{product}%</b>
        </div>
        <div className={`diagram-meter ${oracle ? "meter-warn" : "meter-good"}`}>
          <span>Competenza trattenuta</span>
          <div className="meter-track">
            <i style={{ width: `${competence}%` }} />
          </div>
          <b>{competence}%</b>
        </div>
      </div>
      <div className="diagram-verdict">
        {oracle ? (
          <p>
            <strong>Il prodotto è perfetto, la competenza no.</strong> Senza la macchina resta il
            debito epistemico: il passaggio che doveva essere appreso non è stato percorso.
          </p>
        ) : (
          <p>
            <strong>Un prodotto meno levigato, una competenza che resta.</strong> L’indizio sblocca
            il passaggio, ma il ragionamento continua a essere tuo.
          </p>
        )}
        <span className="diagram-legend">
          <span className="legend-product" /> prodotto
          <span className="legend-competence" /> competenza
        </span>
      </div>
    </div>
  );
}

const POWER_NODES = [
  {
    id: "calcolo",
    label: "Calcolo",
    detail:
      "La potenza di calcolo è concentrata in pochi data center. Chi la possiede decide quali modelli possono esistere e a quali condizioni.",
  },
  {
    id: "dati",
    label: "Dati",
    detail:
      "I dati non sono un bene neutro: la loro raccolta e selezione costruisce il mondo che il modello impara a descrivere.",
  },
  {
    id: "energia",
    label: "Energia",
    detail:
      "Addestrare e far girare i modelli richiede energia e reti. La dipendenza energetica è parte della geopolitica dell’IA.",
  },
  {
    id: "regole",
    label: "Regole",
    detail:
      "Chi scrive le regole stabilisce cosa è rischio, cosa è innovazione e chi paga i costi. È qui che entra in gioco la sovranità democratica.",
  },
] as const;

export function PotereExplorer() {
  const [selected, setSelected] = useState<(typeof POWER_NODES)[number]["id"]>("calcolo");
  const active = POWER_NODES.find((node) => node.id === selected) ?? POWER_NODES[0];

  return (
    <div className="concept-diagram interactive-diagram">
      <div className="diagram-power" role="group" aria-label="Nodi del potere digitale">
        <button
          className={`diagram-node node-calcolo ${selected === "calcolo" ? "selected" : ""}`}
          aria-pressed={selected === "calcolo"}
          onClick={() => setSelected("calcolo")}
        >
          Calcolo
        </button>
        <button
          className={`diagram-node node-dati ${selected === "dati" ? "selected" : ""}`}
          aria-pressed={selected === "dati"}
          onClick={() => setSelected("dati")}
        >
          Dati
        </button>
        <div className="diagram-core">
          <strong>Infrastruttura</strong>
          <small>calcolo · dati · energia · regole</small>
        </div>
        <button
          className={`diagram-node node-energia ${selected === "energia" ? "selected" : ""}`}
          aria-pressed={selected === "energia"}
          onClick={() => setSelected("energia")}
        >
          Energia
        </button>
        <button
          className={`diagram-node node-regole ${selected === "regole" ? "selected" : ""}`}
          aria-pressed={selected === "regole"}
          onClick={() => setSelected("regole")}
        >
          Regole
        </button>
      </div>
      <p className="diagram-detail" aria-live="polite">
        <strong>{active.label}:</strong> {active.detail}
      </p>
    </div>
  );
}

export function TempoSwitch() {
  const [mode, setMode] = useState<"istante" | "prospettiva">("prospettiva");
  const instant = mode === "istante";

  return (
    <div className="concept-diagram interactive-diagram">
      <div className="diagram-control" role="group" aria-label="Modo del tempo">
        <button
          aria-pressed={instant}
          className={instant ? "selected" : ""}
          onClick={() => setMode("istante")}
        >
          Presente istantaneo
        </button>
        <button
          aria-pressed={!instant}
          className={!instant ? "selected" : ""}
          onClick={() => setMode("prospettiva")}
        >
          Prospettiva
        </button>
      </div>
      {instant ? (
        <div className="tempo-now" aria-hidden="true">
          {[92, 70, 84, 58, 76].map((width, index) => (
            <span key={index} style={{ width: `${width}%` }} />
          ))}
        </div>
      ) : (
        <div className="diagram-timeline tempo-line" aria-hidden="true">
          <span>Memoria</span>
          <i>→</i>
          <span>Presente</span>
          <i>→</i>
          <span>Progetto</span>
        </div>
      )}
      <p className="diagram-detail" aria-live="polite">
        {instant
          ? "Ogni istante vale per sé: senza continuità non c’è confronto, correzione né responsabilità."
          : "La memoria diventa il motore che collega ciò che è stato a ciò che scegliamo di costruire."}
      </p>
    </div>
  );
}

export function VoceSwitch() {
  const [mode, setMode] = useState<"standard" | "personale">("standard");
  const personal = mode === "personale";

  return (
    <div className="concept-diagram interactive-diagram">
      <div className="diagram-control" role="group" aria-label="Tipo di voce">
        <button
          aria-pressed={!personal}
          className={!personal ? "selected" : ""}
          onClick={() => setMode("standard")}
        >
          Testo standard
        </button>
        <button
          aria-pressed={personal}
          className={personal ? "selected" : ""}
          onClick={() => setMode("personale")}
        >
          Voce personale
        </button>
      </div>
      <div className={`voce-sample ${personal ? "voce-personale" : ""}`} aria-live="polite">
        {personal ? (
          <p>
            Quando ho chiesto all’IA di spiegarmi il debito epistemico, la risposta era
            impeccabile. Ma non ricordavo un passaggio: ho dovuto rileggere il capitolo e
            riscriverlo con parole mie. Solo allora ho capito.
          </p>
        ) : (
          <p>
            L’intelligenza artificiale rappresenta una tecnologia <mark>innovativa</mark> che offre
            numerose <mark>opportunità</mark> nel campo dell’apprendimento. È{" "}
            <mark>fondamentale</mark> utilizzarla in modo consapevole e responsabile.
          </p>
        )}
      </div>
      <p className="diagram-detail">
        {personal ? (
          <>
            <Check size={14} aria-hidden="true" /> Una voce personale mostra il percorso: esitazione,
            verifica, ritorno. Non è meno corretta: è più riconoscibile.
          </>
        ) : (
          <>
            <ArrowRight size={14} aria-hidden="true" /> La forma è corretta, ma potrebbe essere la
            risposta di chiunque. La fluidità non dimostra che ci sia qualcuno a pensarla.
          </>
        )}
      </p>
    </div>
  );
}
