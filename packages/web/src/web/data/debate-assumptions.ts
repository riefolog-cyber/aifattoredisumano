export type DebateAssumption = {
  statement: string;
  options: string[];
  correct: number;
  feedback: string;
};

/** Una premessa implicita da riconoscere, una traccia alla volta. */
export const debateAssumptions: DebateAssumption[] = [
  {
    statement:
      "Se l’IA scrive meglio e più in fretta, gli studenti non hanno più bisogno di imparare a scrivere.",
    options: [
      "Gli studenti non sanno scrivere.",
      "Scrivere serve soltanto a produrre un testo corretto e rapido.",
      "L’IA non può migliorare.",
    ],
    correct: 1,
    feedback:
      "L’assunzione è che scrivere sia solo il prodotto. Se invece è il processo in cui si scelgono idee, ordine e parole, la velocità della macchina non elimina il bisogno di imparare.",
  },
  {
    statement: "L’attrito cognitivo è utile, quindi ogni difficoltà va mantenuta.",
    options: [
      "Gli studenti evitano sempre la fatica.",
      "L’apprendimento richiede sempre sofferenza fisica.",
      "Ogni difficoltà, anche arbitraria, produce apprendimento.",
    ],
    correct: 2,
    feedback:
      "L’assunzione è che difficoltà e apprendimento crescano sempre insieme. In realtà l’attrito va calibrato: troppo produce rinuncia, troppo poco non forma.",
  },
  {
    statement: "Se la voce personale non è unica, allora non esiste.",
    options: [
      "L’unicità è l’unica prova dell’autorialità.",
      "Ogni testo è automaticamente personale.",
      "La voce dipende solo dal lessico.",
    ],
    correct: 0,
    feedback:
      "L’assunzione è che senza unicità assoluta non ci sia voce. La voce si riconosce invece nelle scelte, negli esempi e nelle obiezioni che un testo sa porre, anche quando non è irripetibile.",
  },
  {
    statement: "Se l’IA ha prodotto il testo, allora non appartiene a chi lo firma.",
    options: [
      "Chi firma un testo lo ha sempre scritto da solo.",
      "L’autorialità dipende solo dall’esecuzione materiale, non dalle scelte.",
      "L’IA non può essere usata in modo trasparente.",
    ],
    correct: 1,
    feedback:
      "L’assunzione è che l’autore coincida con chi esegue materialmente il testo. L’autorialità riguarda invece le scelte, la selezione delle fonti e la responsabilità di ciò che si firma.",
  },
  {
    statement: "Poiché non possiamo controllare ogni uso dell’IA, è inutile stabilire regole.",
    options: [
      "Le regole funzionano solo con la sorveglianza totale.",
      "Gli studenti non rispettano mai le regole.",
      "Ciò che non è controllabile perfettamente non merita regole.",
    ],
    correct: 2,
    feedback:
      "L’assunzione è che una regola valga solo se è controllabile fino in fondo. Le regole servono anche a rendere pubblici i criteri, orientare le scelte e rendere discutibili gli abusi.",
  },
];
