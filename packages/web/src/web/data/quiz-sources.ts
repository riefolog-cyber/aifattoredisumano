export type QuizSource = {
  doc: number;
  section: number;
  term: string;
};

/**
 * Un riferimento per ogni domanda della banca, nello stesso ordine di quiz.ts.
 * `term` viene cercato nel capitolo: serve a ritrovare il paragrafo esatto
 * senza duplicare gli indici, che cambierebbero a ogni correzione editoriale.
 */
export const QUIZ_SOURCES: QuizSource[] = [
  { doc: 1, section: 0, term: "bussola" },
  { doc: 0, section: 1, term: "debito epistemico" },
  { doc: 1, section: 1, term: "scaffolding" },
  { doc: 0, section: 1, term: "escavatore" },
  { doc: 1, section: 2, term: "gelato industriale" },
  { doc: 1, section: 2, term: "antropofonia" },
  { doc: 1, section: 1, term: "Socratico" },
  { doc: 1, section: 3, term: "Feudalesimo" },
  { doc: 0, section: 3, term: "pietre focaie" },
  { doc: 0, section: 3, term: "dittatura del tempo reale" },
  { doc: 1, section: 0, term: "bussola" },
  { doc: 1, section: 1, term: "oracolo" },
  { doc: 1, section: 0, term: "riprogramma" },
  { doc: 1, section: 1, term: "indizi" },
  { doc: 1, section: 1, term: "Crollo drammatico" },
  { doc: 1, section: 1, term: "delega" },
  { doc: 1, section: 1, term: "processo" },
  { doc: 1, section: 1, term: "oracolo" },
  { doc: 1, section: 1, term: "esternalizzazione" },
  { doc: 1, section: 2, term: "fluidità" },
  { doc: 0, section: 2, term: "omologato" },
  { doc: 0, section: 2, term: "veicolo neutro" },
  { doc: 1, section: 3, term: "server" },
  { doc: 1, section: 3, term: "Catechon" },
  { doc: 1, section: 3, term: "tecnovassalli" },
  { doc: 1, section: 4, term: "memoria continua" },
  { doc: 1, section: 4, term: "eterno presente" },
  { doc: 0, section: 3, term: "oasi di tempo lento" },
];
