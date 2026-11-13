import { ArrowUpRight, Clock, ClipboardCheck, Users, BookOpen, Printer } from "lucide-react";
import { PageHeading } from "../components/page-heading";
import { CHAPTERS, type Tab } from "../lib/site";

type TeachersSectionProps = {
  onNavigate: (tab: Tab) => void;
  onRead: (docIndex: number, section: number) => void;
  onOpenLab: () => void;
  onStartQuiz: () => void;
};

const modules = [
  {
    title: "Modulo 1 · Orientarsi",
    time: "2 ore",
    text: "Video introduttivo e capitoli 1-2 in lettura guidata. Obiettivo: distinguere lo strumento dai suoi effetti sul pensiero.",
  },
  {
    title: "Modulo 2 · Approfondire",
    time: "2 ore",
    text: "Capitoli 3-5 con glossario alla mano e laboratorio di confronto in coppie. Obiettivo: riconoscere delega, voce e potere.",
  },
  {
    title: "Modulo 3 · Prendere posizione",
    time: "2 ore",
    text: "Capitolo 6, una traccia di dibattito con la guida d'aula e l'autoverifica da 10 domande. Obiettivo: argomentare e autovalutarsi.",
  },
];

export function TeachersSection({ onNavigate, onRead, onOpenLab, onStartQuiz }: TeachersSectionProps) {
  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="GUIDA DIDATTICA · SCUOLA SECONDARIA"
        title="Porta il percorso in classe."
        text="Obiettivi, tempi e strumenti: tutto ciò che serve per usare questo sito in un percorso di 6 ore, senza account e senza costi."
      />
      <div className="doc-toolbar teachers-toolbar">
        <button className="text-button" onClick={() => window.print()}>
          <Printer size={16} /> Stampa / PDF della guida
        </button>
      </div>
      <div className="teachers-grid">
        <section className="teachers-card">
          <span className="label">
            <BookOpen size={14} /> OBIETTIVI
          </span>
          <ul>
            <li>Distinguere l'uso di uno strumento dai suoi effetti sui processi cognitivi.</li>
            <li>Riconoscere delega eccessiva, omologazione del linguaggio e concentrazione del potere tecnologico.</li>
            <li>Praticare un uso consapevole dell'IA: tentativo autonomo, aiuto mirato, verifica senza supporto.</li>
            <li>Argomentare una posizione in un dibattito regolato e valutarne le ragioni contrarie.</li>
          </ul>
        </section>
        <section className="teachers-card">
          <span className="label">
            <Clock size={14} /> TEMPI CONSIGLIATI
          </span>
          <div className="teachers-modules">
            {modules.map((module) => (
              <div key={module.title}>
                <strong>{module.title}</strong>
                <span className="teachers-time">{module.time}</span>
                <p>{module.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="teachers-card">
          <span className="label">
            <Users size={14} /> COME USARE GLI STRUMENTI
          </span>
          <ul>
            <li>
              <button className="inline-link" onClick={() => onRead(1, 0)}>
                I 6 capitoli <ArrowUpRight size={13} />
              </button>{" "}
              si leggono in autonomia o in lettura guidata; la spunta "Segna come letto" registra il progresso nel browser.
            </li>
            <li>
              <button className="inline-link" onClick={onOpenLab}>
                Il confronto dei modelli <ArrowUpRight size={13} />
              </button>{" "}
              funziona in coppie: uno studente esplora, l'altro annota chi fa il passo decisivo.
            </li>
            <li>
              <button className="inline-link" onClick={onStartQuiz}>
                L'autoverifica <ArrowUpRight size={13} />
              </button>{" "}
              (10 domande) va proposta alla fine: il riepilogo per aree indica che cosa riprendere.
            </li>
            <li>
              <button className="inline-link" onClick={() => onNavigate("Dibattito")}>
                I dibattiti <ArrowUpRight size={13} />
              </button>{" "}
              seguono la guida d'aula in tre mosse; gli appunti restano sul dispositivo dello studente.
            </li>
          </ul>
        </section>
        <section className="teachers-card">
          <span className="label">
            <ClipboardCheck size={14} /> VALUTAZIONE E INCLUSIONE
          </span>
          <ul>
            <li>Valutate il diario del processo (tentativi, errori, revisioni), non solo il prodotto finale.</li>
            <li>L'esito del quiz si esporta come promemoria personale: usatelo come autovalutazione, non come voto.</li>
            <li>Tutti i contenuti funzionano da tastiera e con lettori di schermo; i video rimandano a YouTube con sottotitoli.</li>
            <li>Nessun dato lascia il dispositivo: appunti, progressi e risultati vivono nel browser dello studente.</li>
          </ul>
          <p className="teachers-note">
            Capitoli di riferimento:{" "}
            {CHAPTERS.map(([title, , , doc, section], order) => (
              <span key={`${doc}:${section}`}>
                <button className="inline-link" onClick={() => onRead(doc, section)}>
                  {order + 1}. {title}
                </button>
                {order < CHAPTERS.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </section>
      </div>
    </main>
  );
}
