import { ArrowUpRight, Clock, ClipboardCheck, Users, BookOpen, Printer } from "lucide-react";
import { PageHeading } from "../components/page-heading";
import { PATH_CHAPTERS } from "../data/path";
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
  const printSheet = (mode: "poster" | "worksheet") => {
    const className = `print-${mode}`;
    document.body.classList.add(className);
    window.print();
    window.setTimeout(() => document.body.classList.remove(className), 1000);
  };

  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <div className="print-cover" aria-hidden="true">
        <span className="print-cover-brand">IL FATTORE UMANO</span>
        <h1>Guida didattica</h1>
        <p>Obiettivi, tempi, valutazione e inclusione</p>
        <p>prof. Riefolo Giovanni · Ferraris-Fermi, Verona</p>
        <p className="print-cover-url">riefolog-cyber.github.io/aifattoredisumano</p>
        <p>Versione 13 novembre 2026 · Uso didattico</p>
      </div>
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
            <li>
              <button className="inline-link" onClick={() => onNavigate("Fonti")}>
                Fonti e letture <ArrowUpRight size={13} />
              </button>{" "}
              raccolgono riferimenti verificabili, crediti e criteri per distinguere dato,
              interpretazione e ipotesi.
            </li>
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

        <section className="teachers-card teacher-pack">
          <span className="label">
            <Printer size={14} /> PACCHETTO CLASSE
          </span>
          <h3>Porta via il percorso.</h3>
          <p>
            Tre stampati pronti: il poster delle sei tappe per la parete, la scheda di lettura per
            gli studenti e la guida completa con la rubrica.
          </p>
          <div className="teacher-pack-actions">
            <button onClick={() => printSheet("poster")}>
              <Printer size={14} /> Poster del percorso
            </button>
            <button onClick={() => printSheet("worksheet")}>
              <Printer size={14} /> Scheda studente
            </button>
            <button onClick={() => window.print()}>
              <Printer size={14} /> Guida completa
            </button>
          </div>
          <p className="teachers-note">
            La chiave del questionario è nella Guida didattica, capitolo 5.{" "}
            <button className="inline-link" onClick={() => onRead(0, 4)}>
              Apri la chiave <ArrowUpRight size={13} />
            </button>
          </p>
        </section>

        <section className="teachers-card rubric-card">
          <span className="label">
            <ClipboardCheck size={14} /> RUBRICA · AUTOVALUTAZIONE
          </span>
          <h3>Valutare il processo, non solo la risposta.</h3>
          <p className="rubric-intro">
            Quattro criteri, tre livelli. Usa la rubrica per il feedback e per l’autovalutazione;
            non è una griglia di voto automatico.
          </p>
          <div className="rubric-scroll">
            <table className="rubric-table">
              <caption>Criteri per il dibattito e l’argomentazione</caption>
              <thead>
                <tr>
                  <th scope="col">Criterio</th>
                  <th scope="col">In avvio</th>
                  <th scope="col">In cammino</th>
                  <th scope="col">Consolidato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tesi e comprensione</th>
                  <td>La posizione non è chiara o non usa i concetti del capitolo.</td>
                  <td>Tesi riconoscibile e qualche concetto chiave usato correttamente.</td>
                  <td>Tesi chiara, concetti distinti e limiti riconosciuti.</td>
                </tr>
                <tr>
                  <th scope="row">Argomentazione e prove</th>
                  <td>Afferma senza esempi né prove.</td>
                  <td>Porta un esempio pertinente.</td>
                  <td>
                    Usa esempi e controesempi; distingue fatti, interpretazioni e ipotesi.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Ascolto e obiezione</th>
                  <td>Interviene senza riformulare la posizione altrui.</td>
                  <td>Riformula in parte e risponde.</td>
                  <td>
                    Riformula la tesi opposta e risponde nel merito, anche cambiando posizione.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Linguaggio e voce</th>
                  <td>Formule generiche o prese da un modello.</td>
                  <td>Frasi chiare, lessico parziale.</td>
                  <td>Lessico preciso, voce personale, registro adeguato.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rubric-self">
            <h4>Autovalutazione dello studente</h4>
            <ul>
              <li>So spiegare la tesi opposta con parole mie.</li>
              <li>Ho portato almeno una prova e ho detto da dove viene.</li>
              <li>Ho cambiato qualcosa nella mia posizione dopo il confronto? Perché?</li>
              <li>Ho usato parole mie o formule prese da un modello?</li>
            </ul>
          </div>
        </section>

        <section className="poster-sheet" aria-hidden="true">
          <span className="print-cover-brand">IL FATTORE UMANO</span>
          <h1>Il percorso in sei tappe</h1>
          <p className="sheet-deck">
            Una mappa per orientarsi tra cognizione, linguaggio, potere e autonomia.
          </p>
          <ol className="poster-list">
            {PATH_CHAPTERS.map((chapter) => (
              <li key={chapter.order}>
                <b>0{chapter.order}</b>
                <div>
                  <span>{chapter.tag}</span>
                  <strong>{chapter.shortTitle}</strong>
                  <small>{chapter.deck}</small>
                </div>
              </li>
            ))}
          </ol>
          <p className="sheet-footer">
            prof. Riefolo Giovanni · Ferraris-Fermi, Verona
            <br />
            riefolog-cyber.github.io/aifattoredisumano
          </p>
        </section>

        <section className="worksheet-sheet" aria-hidden="true">
          <span className="print-cover-brand">IL FATTORE UMANO · SCHEDA STUDENTE</span>
          <h1>Leggere, fermarsi, interrogare.</h1>
          <p className="sheet-deck">Nome: ______________________ Classe: __________ Data: __________</p>
          <ol className="worksheet-list">
            {PATH_CHAPTERS.map((chapter) => (
              <li key={chapter.order}>
                <strong>
                  0{chapter.order}. {chapter.shortTitle}
                </strong>
                <span>Una frase da ricordare:</span>
                <i />
                <span>Una domanda che resta aperta:</span>
                <i />
              </li>
            ))}
          </ol>
          <div className="worksheet-final">
            <strong>Dopo il percorso: la mia tesi in tre righe.</strong>
            <i />
            <i />
            <i />
          </div>
        </section>
      </div>
    </main>
  );
}
