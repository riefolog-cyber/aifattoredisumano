export type DebateFollowUp = {
  objection: string;
  options: string[];
  correct: number;
  feedback: string;
};

export type DebateChallenge = DebateFollowUp & {
  followUp?: DebateFollowUp;
};

/** Una replica da riconoscere, una traccia alla volta. */
export const debateChallenges: DebateChallenge[] = [
  {
    objection: "Se l’IA scrive meglio e più in fretta, perché costringere gli studenti a fare da soli?",
    options: [
      "Perché a scuola ogni tecnologia va rifiutata.",
      "Perché il prodotto è solo una parte: è il processo che costruisce la competenza.",
      "Perché scrivere a mano è sempre più veloce.",
    ],
    correct: 1,
    feedback:
      "La replica forte non demonizza lo strumento: distingue il prodotto dal processo e chiede alla scuola di proteggere il secondo.",
    followUp: {
      objection: "Ma allora perché non usare l’IA per la bozza e riservare il processo alla revisione?",
      options: [
        "Perché usare l’IA è sempre sbagliato.",
        "Perché la bozza è già il processo: è lì che si impara a scegliere e a sbagliare.",
        "Perché la revisione è l’unica cosa che conta.",
      ],
      correct: 1,
      feedback:
        "Il punto non è vietare la bozza, ma non svuotarla. Se la macchina scrive la prima versione, il passaggio in cui si formano le scelte non è stato percorso.",
    },
  },
  {
    objection: "La frustrazione fa male: un buon insegnante dovrebbe eliminarla.",
    options: [
      "Sì, ogni difficoltà va rimossa.",
      "No, gli studenti devono soffrire per imparare.",
      "L’attrito giusto è una palestra: va scelto e dosato, non eliminato.",
    ],
    correct: 2,
    feedback:
      "Non si difende la sofferenza in sé. Si difende l’attrito cognitivo che rende visibile il ragionamento e consolidata la competenza.",
    followUp: {
      objection: "Se l’attrito è così utile, perché non aumentarlo sempre?",
      options: [
        "Perché l’attrito va dosato: troppo produce rinuncia, troppo poco non forma.",
        "Perché gli studenti non devono mai essere aiutati.",
        "Perché la difficoltà è utile solo se dura almeno un’ora.",
      ],
      correct: 0,
      feedback:
        "La sfida giusta è alla portata ma non banale. Il compito dell’insegnante è calibrare la difficoltà, non massimizzarla.",
    },
  },
  {
    objection: "Se il testo è corretto e scorrevole, che importa se suona come tutti gli altri?",
    options: [
      "La correttezza formale è l’unico criterio.",
      "Una voce standard può nascondere l’assenza di una voce personale: contano scelte e responsabilità.",
      "L’IA non sa scrivere, quindi il problema non esiste.",
    ],
    correct: 1,
    feedback:
      "La fluidità non è una prova di pensiero. La replica forte sposta l’attenzione dalla superficie del testo alle scelte di chi lo firma.",
    followUp: {
      objection: "Ma la voce personale non è solo un mito romantico?",
      options: [
        "Sì: conta soltanto la correttezza grammaticale.",
        "No: si riconosce nelle scelte, negli esempi e nelle obiezioni che il testo sa porre.",
        "No: basta usare parole difficili.",
      ],
      correct: 1,
      feedback:
        "La voce non è un’aura misteriosa: è il modo in cui qualcuno seleziona, collega e risponde. Sono scelte riconoscibili e valutabili.",
    },
  },
  {
    objection:
      "Se non possiamo distinguere un testo umano da uno generato, tanto vale smettere di assegnare compiti scritti.",
    options: [
      "Aboliamo i compiti scritti.",
      "Valutiamo il processo: bozze, fonti, revisioni e colloquio.",
      "Vietiamo l’IA con un software di rilevamento.",
    ],
    correct: 1,
    feedback:
      "Il punto non è inseguire un detector, ma rendere visibile il percorso e valutare ciò che l’IA non può sostituire: scelte, fonti, revisione.",
    followUp: {
      objection: "E se lo studente dichiara di aver usato l’IA? Allora il problema è risolto?",
      options: [
        "Sì: la dichiarazione sostituisce la valutazione del processo.",
        "No: la dichiarazione aiuta la trasparenza, ma non dimostra da sola cosa è stato appreso.",
        "No: chi dichiara l’uso va penalizzato.",
      ],
      correct: 1,
      feedback:
        "Dichiarare è un atto di responsabilità, non una prova di competenza. Serve a rendere discutibile il percorso, non a chiudere la valutazione.",
    },
  },
  {
    objection: "Integrare l’IA a scuola significa consegnarla alle big tech.",
    options: [
      "Allora ogni integrazione è sbagliata.",
      "Le big tech sono neutrali.",
      "L’integrazione guidata stabilisce regole, competenze e controllo pubblico.",
    ],
    correct: 2,
    feedback:
      "Si può criticare il potere tecnofinanziario senza rinunciare a educare all’uso. La differenza la fanno regole, trasparenza e controllo democratico.",
    followUp: {
      objection: "E chi decide le regole dell’integrazione? Non rischiano di deciderle le aziende?",
      options: [
        "Le decide il fornitore, perché conosce meglio lo strumento.",
        "Le decide la comunità scolastica, con criteri pubblici e verificabili.",
        "Non servono regole: basta la buona volontà dei docenti.",
      ],
      correct: 1,
      feedback:
        "Il controllo democratico non si improvvisa: si costruisce con criteri pubblici, trasparenza sui dati e possibilità di verifica da parte della scuola.",
    },
  },
];
