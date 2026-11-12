export const quizAreas = [
  "Strumenti e metafore",
  "Delega e autonomia",
  "Pratiche di studio",
  "Linguaggio e voce",
  "Potere e infrastrutture",
  "Tempo e giudizio",
] as const;

export type QuizArea = (typeof quizAreas)[number];

export const quiz: { q: string; a: string[]; correct: number; explanation: string; area: QuizArea }[] = [
  {
    area: "Strumenti e metafore",
    q: "Che cosa distingue una «bussola» dalla metafora della riprogrammazione?",
    a: [
      "La prima è uno strumento esterno; la seconda sottolinea l’influenza sui modi di pensare.",
      "La bussola è più precisa di un modello linguistico.",
      "Non esiste alcuna differenza.",
    ],
    correct: 0,
    explanation:
      "Nella guida, la bussola rappresenta la neutralità dello strumento. La riprogrammazione invita invece a interrogarsi su come l’uso della tecnologia influenzi abitudini e processi cognitivi.",
  },
  {
    area: "Delega e autonomia",
    q: "Che cosa indica il «debito epistemico» nel testo?",
    a: [
      "Il costo economico di un abbonamento all’IA.",
      "L’accumulo di lacune quando si delega sistematicamente il ragionamento.",
      "La quantità di dati necessaria per addestrare un modello.",
    ],
    correct: 1,
    explanation:
      "È una metafora: ottenere subito il prodotto non significa aver acquisito il procedimento. La verifica decisiva è riuscire a ragionare anche senza lo strumento.",
  },
  {
    area: "Pratiche di studio",
    q: "Quando un tutor socratico fa bene a farsi da parte?",
    a: [
      "Quando lo studente chiede la soluzione completa.",
      "Quando lo studente riesce a proseguire da solo: il sostegno va ridotto fino a sparire.",
      "Mai: l’aiuto deve restare sempre uguale dall’inizio alla fine.",
    ],
    correct: 1,
    explanation:
      "Lo scaffolding è temporaneo per definizione: sostiene il processo finché serve e si ritira gradualmente. Un aiuto che non si toglie mai diventa dipendenza, non autonomia.",
  },
  {
    area: "Delega e autonomia",
    q: "Perché la metafora dell’escavatore è problematica a scuola?",
    a: [
      "Perché conta la formazione delle competenze, non soltanto il prodotto finale.",
      "Perché nessuna tecnologia può essere utile.",
      "Perché scrivere a mano è sempre più veloce.",
    ],
    correct: 0,
    explanation:
      "In un cantiere conta ottenere una buca. A scuola contano anche i tentativi, gli errori e le competenze che il compito permette di costruire.",
  },
  {
    area: "Linguaggio e voce",
    q: "Che cosa rappresenta l’«effetto gelato industriale»?",
    a: [
      "Un errore grammaticale ricorrente.",
      "Un testo levigato ma omologato, privo di voce personale.",
      "Una tecnica di apprendimento accelerato.",
    ],
    correct: 1,
    explanation:
      "La metafora descrive una qualità espressiva: correttezza formale e uniformità possono coesistere. È una tesi critica dei documenti, non una proprietà di ogni testo generato.",
  },
  {
    area: "Linguaggio e voce",
    q: "L’«antropofonia», nel glossario, è…",
    a: [
      "La traduzione automatica del linguaggio umano.",
      "La capacità dimostrata delle macchine di provare emozioni.",
      "L’attribuzione di coscienza o intenzione a una voce artificiale fluida.",
    ],
    correct: 2,
    explanation:
      "Il termine invita a distinguere la fluidità del linguaggio dall’evidenza di un’esperienza cosciente.",
  },
  {
    area: "Pratiche di studio",
    q: "Quale pratica protegge l’autonomia durante l’uso dell’IA?",
    a: [
      "Provare prima, chiedere un indizio e ricostruire poi il procedimento da soli.",
      "Copiare la risposta senza controllarla.",
      "Valutare solo la qualità della pagina consegnata.",
    ],
    correct: 0,
    explanation:
      "Tentativo autonomo, aiuto mirato e verifica senza supporto rendono visibile il processo di apprendimento, non soltanto l’output.",
  },
  {
    area: "Potere e infrastrutture",
    q: "Nell’analisi sistemica, «feudalesimo digitale» indica…",
    a: [
      "La scomparsa di ogni infrastruttura fisica.",
      "La concentrazione del controllo di infrastrutture e potere tecnologico.",
      "Un metodo per insegnare la storia medievale.",
    ],
    correct: 1,
    explanation:
      "È una categoria interpretativa del testo: il controllo di calcolo, dati ed energia può creare dipendenze e porre problemi di sovranità democratica.",
  },
  {
    area: "Tempo e giudizio",
    q: "Che cosa evoca la metafora delle «pietre focaie»?",
    a: [
      "La trasmissione istantanea di informazioni.",
      "L’eliminazione della fatica di studiare.",
      "La comprensione che nasce dal confronto lento tra concetti ed esperienze.",
    ],
    correct: 2,
    explanation:
      "L’immagine valorizza l’attrito intellettuale e la discussione: la comprensione richiede confronto, tempo e partecipazione attiva.",
  },
  {
    area: "Tempo e giudizio",
    q: "Come affrontare una tesi scientifica priva di fonte precisa?",
    a: [
      "Cercare la fonte primaria e distinguere risultati, interpretazioni e limiti.",
      "Accettarla se il testo è scritto bene.",
      "Rifiutarla automaticamente senza approfondire.",
    ],
    correct: 0,
    explanation:
      "Il giudizio critico non coincide né con l’accettazione automatica né con il rifiuto pregiudiziale. Confrontare fonti, risultati e limiti aiuta a formulare un giudizio autonomo.",
  },
];
