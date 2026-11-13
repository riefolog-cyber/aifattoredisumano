import type { QuizArea } from "./quiz";

export type CoverMotif =
  | "compass"
  | "steps"
  | "wave"
  | "network"
  | "hourglass"
  | "dialogue";

export type PathChapter = {
  order: number;
  doc: number;
  section: number;
  tag: string;
  shortTitle: string;
  deck: string;
  motif: CoverMotif;
  quote: string;
  quoteSource: string;
  marginTerm: string;
  marginText: string;
  area: QuizArea;
};

export const PATH_CHAPTERS: PathChapter[] = [
  {
    order: 1,
    doc: 1,
    section: 0,
    tag: "ORIENTAMENTO",
    shortTitle: "La bussola e la mente",
    deck: "Uno strumento che orienta, o una forza che riscrive il modo in cui pensiamo?",
    motif: "compass",
    quote:
      "La bussola è un dispositivo neutrale ed esterno, capace di indicare dati oggettivi senza modificare la natura dell’osservatore.",
    quoteSource: "Analisi sistemica, cap. 1",
    marginTerm: "Falsa neutralità",
    marginText:
      "La tecnologia non è un mezzo neutro: orienta ciò che notiamo, come lo nominiamo e quali scelte sembrano ovvie.",
    area: "Strumenti e metafore",
  },
  {
    order: 2,
    doc: 1,
    section: 1,
    tag: "COGNIZIONE",
    shortTitle: "Il costo della delega",
    deck: "Il prodotto è eccellente. Il processo che avrebbe dovuto formare la competenza, che fine ha fatto?",
    motif: "steps",
    quote:
      "La costante delega del ragionamento ai modelli di linguaggio altera radicalmente questo quadro.",
    quoteSource: "Analisi sistemica, cap. 2",
    marginTerm: "Debito epistemico",
    marginText:
      "Il prodotto arriva subito; il procedimento che avrebbe consolidato la competenza resta non appreso.",
    area: "Delega e autonomia",
  },
  {
    order: 3,
    doc: 1,
    section: 2,
    tag: "LINGUAGGIO",
    shortTitle: "Le parole che ci somigliano",
    deck: "Una voce fluida non è ancora una voce consapevole.",
    motif: "wave",
    quote:
      "Prodotti linguistici caratterizzati da una sintassi impeccabile e privi di difetti evidenti, ma completamente omologati…",
    quoteSource: "Analisi sistemica, cap. 3",
    marginTerm: "Antropofonia",
    marginText:
      "L’illusione di ascoltare una voce cosciente quando il testo è solo una risposta statistica fluida.",
    area: "Linguaggio e voce",
  },
  {
    order: 4,
    doc: 1,
    section: 3,
    tag: "POTERE",
    shortTitle: "Chi governa l’algoritmo?",
    deck: "Chi possiede calcolo, dati ed energia possiede anche le condizioni del discorso.",
    motif: "network",
    quote:
      "La concentrazione delle infrastrutture tecnologiche, della potenza di calcolo e delle reti satellitari ha creato una ristretta classe di tecnovassalli transnazionali.",
    quoteSource: "Analisi sistemica, cap. 4",
    marginTerm: "Tecnovassalli",
    marginText:
      "Chi controlla infrastrutture, calcolo ed energia può creare dipendenze che nessun singolo utente può negoziare.",
    area: "Potere e infrastrutture",
  },
  {
    order: 5,
    doc: 0,
    section: 3,
    tag: "TEMPORALITÀ",
    shortTitle: "Riprendersi il tempo",
    deck: "Il presente istantaneo cancella la memoria che serve per scegliere.",
    motif: "hourglass",
    quote:
      "La scuola deve rimanere un’oasi di tempo lento: un luogo in cui si rivendica il valore della pausa, dell’analisi di profondità e del dubbio.",
    quoteSource: "Guida didattica, cap. 4",
    marginTerm: "Tempo lento",
    marginText:
      "Pausa, analisi e dubbio non sono rallentamenti: sono le condizioni del giudizio.",
    area: "Tempo e giudizio",
  },
  {
    order: 6,
    doc: 1,
    section: 5,
    tag: "PROSPETTIVE",
    shortTitle: "Dall’oracolo al dialogo",
    deck: "Dall’oracolo che risponde al dialogo che fa pensare.",
    motif: "dialogue",
    quote:
      "La tecnologia deve ritornare a essere uno strumento al servizio della crescita personale.",
    quoteSource: "Analisi sistemica, cap. 6",
    marginTerm: "Scaffolding",
    marginText:
      "L’aiuto è temporaneo: fornisce indizi e domande, non la soluzione finale.",
    area: "Pratiche di studio",
  },
];

export const PATH_BY_KEY = new Map(
  PATH_CHAPTERS.map((chapter) => [`${chapter.doc}:${chapter.section}`, chapter]),
);

export const QUIZ_AREA_CHAPTER: Record<QuizArea, { doc: number; section: number }> = {
  "Strumenti e metafore": { doc: 1, section: 0 },
  "Delega e autonomia": { doc: 1, section: 1 },
  "Pratiche di studio": { doc: 1, section: 5 },
  "Linguaggio e voce": { doc: 1, section: 2 },
  "Potere e infrastrutture": { doc: 1, section: 3 },
  "Tempo e giudizio": { doc: 0, section: 3 },
};
