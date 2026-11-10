export const approaches = [
  {
    name: "Senza IA",
    short: "Autonomo",
    tone: "autonomous",
    label: "COSTRUISCI IL PROCEDIMENTO",
    role: "Sei tu a scegliere la strada, sperimentare e correggere.",
    benefit: "Rende visibili ragionamento e lacune personali.",
    risk: "Puoi bloccarti o consolidare un errore senza feedback.",
    when: "Primo tentativo, esercizio di base e prova finale.",
    safeguard: "Confronta il procedimento con un criterio, una fonte o un docente.",
  },
  {
    name: "IA Socratica",
    short: "Socratico",
    tone: "socratic",
    label: "RICEVI AIUTO, NON LA SOLUZIONE",
    role: "Il tutor pone domande; i passaggi decisivi restano tuoi.",
    benefit: "Offre sostegno mirato senza consegnare tutto il compito.",
    risk: "Anche un indizio può essere fuorviante o diventare una dipendenza.",
    when: "Dopo un tentativo autonomo, per superare un ostacolo preciso.",
    safeguard: "Chiedi un solo indizio, motiva il passaggio e riprova senza aiuto.",
  },
  {
    name: "IA Oracolo",
    short: "Oracolo",
    tone: "oracle",
    label: "RICEVI UN PRODOTTO COMPLETO",
    role: "La macchina propone la soluzione; a te resta il controllo.",
    benefit: "Fornisce un esempio completo da esaminare e discutere.",
    risk: "Copiare il prodotto può nascondere una comprensione incompleta.",
    when: "Confronto critico dopo il tentativo, o attività già padroneggiate.",
    safeguard: "Non fermarti al risultato: controlla, ricostruisci e adatta.",
  },
];

export const scenarios = [
  {
    id: "math",
    name: "Matematica",
    subject: "UN’EQUAZIONE, TRE STRADE",
    title: "Il risultato è 4. Ma il procedimento è tuo?",
    task: "Risolvi 2x + 5 = 13 e spiega perché ogni passaggio conserva l’uguaglianza.",
    goal: "Saper giustificare le operazioni e riutilizzarle in un’equazione diversa.",
    paths: [
      [
        {
          title: "Prova prima di cercare aiuto",
          text: "Scrivi l’equazione e individua ciò che impedisce di isolare x. Quale operazione annulla il +5?",
          action: "Formula la tua prima ipotesi.",
        },
        {
          title: "Costruisci e controlla",
          text: "Sottrai 5 a entrambi i membri: 2x = 8. Dividi entrambi per 2: x = 4. Controlla: 2 × 4 + 5 = 13.",
          action: "Spiega perché operi su entrambi i membri.",
        },
        {
          title: "Trasferisci il metodo",
          text: "Chiudi l’esempio. Affronta 3x + 4 = 19: scegli le operazioni e controlla il risultato sostituendolo.",
          action: "Risolvi un problema simile senza supporto.",
        },
      ],
      [
        {
          title: "Chiedi un indizio preciso",
          text: "«Ho provato a isolare x, ma non so come eliminare +5. Fammi una domanda, senza darmi la soluzione.»",
          action: "Mostra il tentativo e il punto di blocco.",
        },
        {
          title: "Il tutor apre una domanda",
          text: "«Qual è l’operazione inversa di aggiungere 5? Se la applichi a sinistra, che cosa devi fare a destra? Ora che resta 2x, come isoli x?»",
          action: "Scrivi e motiva tu ogni passaggio.",
        },
        {
          title: "Togli il sostegno",
          text: "Il tutor si ferma. Risolvi 3x + 4 = 19 senza altri indizi e verifica con la sostituzione.",
          action: "L’aiuto serve se riesci poi a farne a meno.",
        },
      ],
      [
        {
          title: "Chiedi il risultato completo",
          text: "«Risolvi 2x + 5 = 13 e mostrami tutti i passaggi.»",
          action: "La richiesta delega la costruzione della soluzione.",
        },
        {
          title: "Leggi il prodotto",
          text: "«2x + 5 = 13 → 2x = 8 → x = 4.» L’output è corretto, ma leggerlo non dimostra che sai ricostruirlo.",
          action: "Controlla la soluzione, non limitarti a copiarla.",
        },
        {
          title: "Metti alla prova la comprensione",
          text: "Nascondi l’output e risolvi 3x + 4 = 19. Se non sai da dove iniziare, torna al ragionamento, non a un’altra risposta pronta.",
          action: "Distingui riconoscere un risultato dal saperlo ottenere.",
        },
      ],
    ],
    questions: [
      {
        title: "Trasferisci il procedimento",
        prompt: "In 3x + 4 = 19, quale coppia di passaggi è corretta?",
        options: [
          "Sottraggo 4 da entrambi i membri, poi divido entrambi per 3: x = 5.",
          "Sottraggo 4 soltanto a sinistra: x = 19/3.",
          "Divido soltanto 19 per 3, poi sottraggo 4.",
        ],
        correct: 0,
        feedback:
          "Ottieni 3x = 15 e quindi x = 5. La stessa operazione su entrambi i membri mantiene l’uguaglianza. La sostituzione conferma: 3 × 5 + 4 = 19.",
      },
      {
        title: "Progetta un aiuto socratico",
        prompt: "Uno studente si blocca. Quale risposta lascia a lui il passo decisivo?",
        options: [
          "La soluzione è x = 5: copiala e prosegui.",
          "Quale operazione annulla +4? Che cosa devi fare all’altro membro?",
          "Non posso aiutarti in nessun modo.",
        ],
        correct: 1,
        feedback:
          "La domanda indirizza l’attenzione verso un’operazione senza eseguirla al posto dello studente. Il passo decisivo e la spiegazione restano suoi.",
      },
    ],
    reflection: "Spiega con parole tue perché sottrarre 4 soltanto da un membro non è corretto.",
    criteria: [
      "Ho spiegato il principio dell’uguaglianza.",
      "Ho indicato l’operazione su entrambi i membri.",
      "Ho controllato il risultato con la sostituzione.",
    ],
  },
  {
    id: "writing",
    name: "Scrittura",
    subject: "UNA TESI, UNA VOCE PERSONALE",
    title: "Un testo impeccabile non è ancora la tua voce.",
    task: "Scrivi un breve paragrafo sulla tesi: «A scuola l’IA dovrebbe aiutare il ragionamento, non sostituirlo». Inserisci un esempio e un’obiezione.",
    goal: "Costruire una posizione motivata, concreta e riconoscibile come propria.",
    paths: [
      [
        {
          title: "Parti da un’esperienza",
          text: "Ricorda un compito in cui un aiuto ti ha sbloccato oppure ha fatto il lavoro al posto tuo. Scrivi una tesi provvisoria e un esempio concreto.",
          action: "Trova materiale che appartenga alla tua esperienza.",
        },
        {
          title: "Organizza il ragionamento",
          text: "Collega tesi, esempio e obiezione. «Un indizio può aiutarmi a ripartire; una soluzione copiata non mi permette di capire l’errore. Ma chi è bloccato ha comunque bisogno di sostegno.»",
          action: "Rivedi i collegamenti, non soltanto la grammatica.",
        },
        {
          title: "Difendi ciò che hai scritto",
          text: "Senza leggere il paragrafo, spiega a un compagno la tua posizione. Riesci a rispondere a un’obiezione diversa?",
          action: "Metti alla prova la solidità dell’argomento.",
        },
      ],
      [
        {
          title: "Chiedi domande sulla bozza",
          text: "«Questa è la mia tesi. Non riscriverla: chiedimi quale esperienza la sostiene e quale obiezione dovrei considerare.»",
          action: "Dai al tutor una tua idea da interrogare.",
        },
        {
          title: "Rendi concreta l’idea",
          text: "«Quando un indizio ti ha aiutato davvero? Come distingueresti aiuto e sostituzione? Che cosa risponderesti a chi dice che l’IA fa risparmiare tempo?»",
          action: "Scegli esempi e formulazioni personali.",
        },
        {
          title: "Riscrivi senza il tutor",
          text: "Allontana gli indizi e riscrivi la tesi in poche frasi. Conserva la tua voce e chiarisci l’obiezione più forte.",
          action: "Usa l’aiuto per chiarire, non per farti rappresentare.",
        },
      ],
      [
        {
          title: "Delega la stesura",
          text: "«Scrivi un paragrafo argomentativo completo sull’uso dell’IA a scuola, con esempio e obiezione.»",
          action: "La macchina sceglie parole e struttura.",
        },
        {
          title: "Esamina un testo già pronto",
          text: "«L’IA può sostenere l’apprendimento offrendo indicazioni mirate. Per esempio, può guidare nella risoluzione di un problema. Benché faccia risparmiare tempo, dovrebbe lasciare spazio al ragionamento autonomo.»",
          action: "È una bozza plausibile: dove manca la tua esperienza?",
        },
        {
          title: "Rendilo davvero tuo",
          text: "Non consegnare la bozza così com’è. Individua una frase generica, sostituiscila con un’esperienza concreta e difendi la tesi a voce senza leggere.",
          action: "Un esempio completo è utile se lo metti in discussione.",
        },
      ],
    ],
    questions: [
      {
        title: "Riconosci la concretezza",
        prompt: "Quale frase aggiunge un esempio concreto, anziché una formulazione generica?",
        options: [
          "L’IA è una tecnologia rivoluzionaria per la società.",
          "L’apprendimento è importante per il futuro.",
          "Nel problema di ieri, un indizio mi ha fatto notare l’operazione sbagliata; la risposta copiata non me l’avrebbe mostrata.",
        ],
        correct: 2,
        feedback:
          "La terza frase collega la tesi a un episodio e a una differenza osservabile. Un esempio concreto permette al lettore di seguire e discutere il ragionamento.",
      },
      {
        title: "Scegli una revisione socratica",
        prompt: "Quale richiesta mantiene la responsabilità del testo nelle tue mani?",
        options: [
          "Scrivi al posto mio una conclusione molto convincente.",
          "Indica dove manca un esempio e fammi una domanda per trovarlo, senza riscrivere il testo.",
          "Rendi il mio testo perfetto senza spiegare le modifiche.",
        ],
        correct: 1,
        feedback:
          "La richiesta individua il problema e cerca una domanda guida. Restano allo studente l’esperienza, la scelta delle parole e la revisione.",
      },
    ],
    reflection:
      "Scrivi la tua tesi in tre frasi: una posizione, un esempio concreto e un’obiezione a cui rispondere.",
    criteria: [
      "Ho espresso una posizione precisa.",
      "Ho usato un esempio concreto, non una formula generica.",
      "Ho considerato un’obiezione e so discuterla a voce.",
    ],
  },
  {
    id: "analysis",
    name: "Analisi",
    subject: "DAL DATO ALL’INTERPRETAZIONE",
    title: "Capire un’affermazione è più che riassumerla.",
    task: "Analizza questa frase: «Se una classe consegna temi migliori usando l’IA, allora ha imparato di più». Individua la conclusione, il presupposto e una prova utile.",
    goal: "Distinguere qualità del prodotto e apprendimento, senza deduzioni automatiche.",
    paths: [
      [
        {
          title: "Scomponi l’affermazione",
          text: "Sottolinea il dato iniziale («temi migliori») e la conclusione («ha imparato di più»). Quale passaggio logico li collega?",
          action: "Separa ciò che osservi da ciò che deduci.",
        },
        {
          title: "Interroga il presupposto",
          text: "La frase presuppone che un prodotto migliore dimostri una competenza maggiore. Ma il prodotto potrebbe dipendere dal supporto esterno.",
          action: "Cerca una spiegazione alternativa.",
        },
        {
          title: "Proponi una prova",
          text: "Chiedi agli studenti di argomentare su una nuova traccia senza IA, con criteri espliciti. Il risultato aiuta a capire se la competenza si trasferisce.",
          action: "Progetta una prova coerente con la conclusione.",
        },
      ],
      [
        {
          title: "Chiedi di essere interrogato",
          text: "«Non analizzare la frase al posto mio. Aiutami a distinguere dato, conclusione e presupposto con una domanda per volta.»",
          action: "Definisci il tipo di sostegno che vuoi.",
        },
        {
          title: "Segui le domande",
          text: "«Che cosa dimostra direttamente il testo migliore? Può esistere un’altra causa? Che cosa dovrebbe saper fare lo studente quando l’aiuto viene tolto?»",
          action: "Formula tu l’ipotesi alternativa.",
        },
        {
          title: "Cambia contesto",
          text: "Valuta senza aiuto: «Chi usa una calcolatrice ottiene più risposte corrette, quindi conosce meglio l’aritmetica». Il ragionamento regge?",
          action: "Riutilizza la distinzione in un caso nuovo.",
        },
      ],
      [
        {
          title: "Chiedi un’analisi completa",
          text: "«Analizza questa frase e spiegami il suo errore logico.»",
          action: "Affidi alla macchina l’identificazione del problema.",
        },
        {
          title: "Leggi un’interpretazione",
          text: "«La frase confonde il miglioramento del prodotto con l’apprendimento. Per sostenere la conclusione servirebbe una prova autonoma su un nuovo compito.»",
          action: "Comprendi perché la lettura è plausibile, non solo come suona.",
        },
        {
          title: "Ricostruisci l’analisi",
          text: "Chiudi l’output. Spiega la differenza fra risultato assistito e competenza autonoma con un esempio diverso.",
          action: "Verifica se sai usare la distinzione, non solo ripeterla.",
        },
      ],
    ],
    questions: [
      {
        title: "Individua il presupposto",
        prompt:
          "Quale presupposto nascosto collega i temi migliori all’idea di avere imparato di più?",
        options: [
          "Un prodotto migliore dimostra necessariamente maggiore competenza dello studente.",
          "La classe ha consegnato dei temi.",
          "La qualità dei temi può essere valutata con criteri.",
        ],
        correct: 0,
        feedback:
          "Il passaggio non dimostrato è l’equivalenza fra prodotto e competenza. Le altre due risposte riguardano il contesto, non il collegamento logico decisivo.",
      },
      {
        title: "Scegli la prova pertinente",
        prompt: "Quale attività aiuta di più a valutare l’apprendimento autonomo?",
        options: [
          "Far generare alla stessa IA un tema più lungo.",
          "Contare quante parole hanno i temi assistiti.",
          "Proporre una nuova traccia senza IA e chiedere di motivare le scelte argomentative.",
        ],
        correct: 2,
        feedback:
          "Una nuova traccia senza supporto mette alla prova trasferimento e spiegazione. Lunghezza e qualità dell’output assistito, da sole, non dimostrano autonomia.",
      },
    ],
    reflection:
      "Scrivi una spiegazione alternativa dei temi migliori e descrivi una prova che potrebbe distinguerla dall’apprendimento reale.",
    criteria: [
      "Ho distinto osservazione e conclusione.",
      "Ho indicato una spiegazione alternativa.",
      "Ho proposto una prova senza supporto su un compito nuovo.",
    ],
  },
];
