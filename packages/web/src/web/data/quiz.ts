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
    q: "Che cosa fornisce lo scaffolding socratico al posto della soluzione finale?",
    a: [
      "Indizi e domande guida che sostengono la scoperta autonoma.",
      "La risposta completa, da copiare e consegnare.",
      "Un voto anticipato sul prodotto finale.",
    ],
    correct: 0,
    explanation:
      "Il documento definisce lo scaffolding socratico come il modello in cui l’insegnante o la tecnologia offrono indizi e quesiti, non la soluzione finale, per guidare l’alunno alla scoperta autonoma.",
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
    q: "Perché il documento parla di «dittatura del tempo reale»?",
    a: [
      "Perché riguarda soltanto i social network.",
      "Perché rallenta il pensiero e favorisce la riflessione.",
      "Perché esige risposte immediate e riduce pausa, analisi di profondità e dubbio.",
    ],
    correct: 2,
    explanation:
      "La scuola è descritta come un’oasi di tempo lento: rivendica pausa, analisi di profondità e dubbio contro la dittatura del tempo reale che esige risposte immediate.",
  },
  {
    area: "Strumenti e metafore",
    q: "Che cosa critica il documento con l’espressione «falsa neutralità della tecnologia»?",
    a: [
      "L’idea che la tecnologia sia sempre dannosa e vada rifiutata.",
      "L’idea che la neutralità riguardi soltanto i social network.",
      "L’idea che l’IA sia uno strumento esterno e neutrale, mentre modifica processi cognitivi, linguaggio e rapporti di potere.",
    ],
    correct: 2,
    explanation:
      "Il documento smonta la narrazione della bussola neutrale: l’IA non è un oggetto esterno che lascia intatti pensiero e potere, ma un agente che contribuisce a trasformarli.",
  },
  {
    area: "Strumenti e metafore",
    q: "Perché la bussola è una metafora diversa dall’oracolo?",
    a: [
      "La bussola dà la risposta esatta; l’oracolo orienta.",
      "La bussola orienta il cammino lasciando a chi la usa la scelta della direzione; l’oracolo promette la risposta.",
      "Sono la stessa cosa detta in modo diverso.",
    ],
    correct: 1,
    explanation:
      "La bussola aiuta a orientarsi ma non decide dove andare. L’oracolo, invece, tende a sostituire il giudizio con una risposta da accettare.",
  },
  {
    area: "Strumenti e metafore",
    q: "Che cosa significa «riprogrammazione della mente» nel percorso?",
    a: [
      "Un intervento chirurgico sul cervello.",
      "L’influenza dell’uso quotidiano dell’IA su abitudini e processi cognitivi.",
      "L’addestramento tecnico dei modelli linguistici.",
    ],
    correct: 1,
    explanation:
      "È una metafora: non descrive un intervento fisico, ma la possibilità che l’uso ripetuto di uno strumento modifichi il modo in cui prestiamo attenzione, ricordiamo e ragioniamo.",
  },
  {
    area: "Delega e autonomia",
    q: "Che cosa rende un aiuto davvero «mirato»?",
    a: [
      "Fornisce la soluzione completa.",
      "Sblocca un passaggio senza sostituire il ragionamento.",
      "Aumenta il numero di risposte disponibili.",
    ],
    correct: 1,
    explanation:
      "Un aiuto mirato interviene sul punto che blocca il processo e lascia alla persona il compito di proseguire. La soluzione completa salta il passaggio che doveva essere appreso.",
  },
  {
    area: "Delega e autonomia",
    q: "Perché le verifiche individuali sono decisive nel confronto tra i gruppi?",
    a: [
      "Perché mostrano se la competenza resta quando l’IA non è disponibile.",
      "Perché misurano la velocità di scrittura.",
      "Perché premiano chi ha usato più spesso l’IA.",
    ],
    correct: 0,
    explanation:
      "Nel documento, il gruppo che usa l’IA come oracolo ottiene ottimi prodotti ma crolla nelle verifiche individuali: la competenza non è stata interiorizzata.",
  },
  {
    area: "Delega e autonomia",
    q: "Che cosa rischia chi delega sempre il processo?",
    a: [
      "Di accumulare debito epistemico: ottiene il prodotto senza la competenza.",
      "Di diventare più autonomo.",
      "Di ridurre il carico cognitivo in modo permanente e positivo.",
    ],
    correct: 0,
    explanation:
      "Il debito epistemico è il divario tra il risultato consegnato e il procedimento che non è stato appreso. Prima o poi va saldato, spesso quando lo strumento non è disponibile.",
  },
  {
    area: "Pratiche di studio",
    q: "Che cosa distingue l’output dal processo nell’apprendimento?",
    a: [
      "Sono due parole per dire la stessa cosa.",
      "L’output è il voto; il processo è la consegna.",
      "L’output è il compito consegnato; il processo è la maturazione delle competenze e delle reti neurali.",
    ],
    correct: 2,
    explanation:
      "Il documento separa il completamento del compito (output) dalla maturazione biologica del cervello (processo): un prodotto eccellente non dimostra da solo che la competenza si è formata.",
  },
  {
    area: "Pratiche di studio",
    q: "Che cosa emerge dal confronto tra studio autonomo e IA «oracolo»?",
    a: [
      "Lo studio autonomo consolida i procedimenti; l’IA oracolo dà prodotti eccellenti ma crolla nelle verifiche individuali.",
      "L’IA oracolo rende più competenti anche senza macchina.",
      "I due gruppi ottengono gli stessi risultati in ogni prova.",
    ],
    correct: 0,
    explanation:
      "Il documento riporta il crollo drastico del gruppo IA Oracolo nelle verifiche individuali, mentre il gruppo di controllo sviluppa una comprensione più solida dei procedimenti.",
  },
  {
    area: "Pratiche di studio",
    q: "Che cosa indica l’«esternalizzazione della memoria di lavoro»?",
    a: [
      "Aumentare la memoria del dispositivo.",
      "Ricordare più vocaboli stranieri.",
      "Affidare alla macchina il lavoro cognitivo che dovrebbe essere esercitato, indebolendo le reti complesse.",
    ],
    correct: 2,
    explanation:
      "Il documento descrive l’esternalizzazione della memoria di lavoro come il trasferimento alla macchina di un lavoro cognitivo che, se svolto in autonomia, rafforzerebbe le reti neurali complesse.",
  },
  {
    area: "Linguaggio e voce",
    q: "Che cosa non dimostra un testo fluido?",
    a: [
      "La correttezza grammaticale.",
      "La presenza di comprensione o coscienza.",
      "La capacità di seguire una consegna.",
    ],
    correct: 1,
    explanation:
      "Un testo può essere scorrevole e corretto senza che chi lo produce comprenda ciò che dice. La fluidità è una proprietà della forma, non una prova di esperienza cosciente.",
  },
  {
    area: "Linguaggio e voce",
    q: "Perché l’omologazione linguistica è un rischio?",
    a: [
      "Riduce la varietà delle voci e la responsabilità di chi scrive.",
      "Rende i testi più chiari.",
      "Aumenta la memoria lessicale.",
    ],
    correct: 0,
    explanation:
      "Quando le formule si uniformano, diminuisce la varietà espressiva e diventa più difficile riconoscere chi pensa e chi si limita a riprodurre uno stile standard.",
  },
  {
    area: "Linguaggio e voce",
    q: "Che cosa sostiene il documento sul rapporto tra linguaggio e realtà?",
    a: [
      "Il linguaggio trasporta informazioni senza influenzare il pensiero.",
      "Il linguaggio conta solo nella comunicazione orale.",
      "Il linguaggio non è un veicolo neutro: è la struttura con cui definiamo ed esploriamo la realtà.",
    ],
    correct: 2,
    explanation:
      "Il documento afferma che il linguaggio non è un mero veicolo neutro, ma la struttura stessa con cui l’essere umano definisce ed esplora la realtà.",
  },
  {
    area: "Potere e infrastrutture",
    q: "Perché server, data center e risorse energetiche sono una questione di potere?",
    a: [
      "Perché sono risorse naturali illimitate.",
      "Perché riguardano soltanto gli ingegneri.",
      "Perché chi li controlla stabilisce accessi, costi e dipendenze.",
    ],
    correct: 2,
    explanation:
      "Il documento indica tra le priorità politiche la governance di server, data center e risorse energetiche: la concentrazione delle infrastrutture crea dipendenza e tocca la sovranità.",
  },
  {
    area: "Potere e infrastrutture",
    q: "Che cosa indica il «Catechon» nel testo?",
    a: [
      "Un algoritmo di controllo.",
      "L’argine istituzionale che trattiene il caos e difende la sovranità.",
      "Una tecnica di addestramento dei modelli.",
    ],
    correct: 1,
    explanation:
      "Il riferimento teologico-politico serve a pensare il ruolo dello Stato democratico come argine alla concentrazione di potere tecnofinanziario.",
  },
  {
    area: "Potere e infrastrutture",
    q: "Che cosa contraddistingue i «tecnovassalli transnazionali»?",
    a: [
      "L’uso dell’IA solo per attività didattiche.",
      "Il controllo di infrastrutture fisiche di calcolo, energia e algoritmi predittivi.",
      "La proprietà di tutti i dati degli studenti.",
    ],
    correct: 1,
    explanation:
      "Il documento descrive una ristretta classe di tecnovassalli che controlla infrastrutture, potenza di calcolo, energia e algoritmi predittivi, creando dipendenze su scala globale.",
  },
  {
    area: "Tempo e giudizio",
    q: "Perché la memoria continua conta per il giudizio?",
    a: [
      "Permette di confrontare, correggere e progettare.",
      "Serve a ricordare più dati a memoria.",
      "Rallenta inutilmente le decisioni.",
    ],
    correct: 0,
    explanation:
      "Senza continuità tra passato e presente non c’è confronto né correzione. La memoria permette di capire che cosa è cambiato e di progettare il passo successivo.",
  },
  {
    area: "Tempo e giudizio",
    q: "Che cosa produce l’«eterno presente istantaneo»?",
    a: [
      "Più capacità di pianificare il futuro.",
      "Un aumento della memoria a lungo termine.",
      "La perdita di memoria continua e di prospettiva storica.",
    ],
    correct: 2,
    explanation:
      "Il documento descrive l’IA come un eterno presente istantaneo, privo di memoria continua e persistenza storica: senza questo spessore diventa difficile esercitare il giudizio strategico.",
  },
  {
    area: "Tempo e giudizio",
    q: "Che cosa rivendica la scuola come «oasi di tempo lento»?",
    a: [
      "Velocità e risposte immediate.",
      "Pausa, analisi di profondità e dubbio.",
      "La delega completa all’IA.",
    ],
    correct: 1,
    explanation:
      "Il documento rivendica la scuola come luogo di pausa, analisi di profondità e dubbio, contro la dittatura del tempo reale che esige risposte immediate.",
  },
];
