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
  },
  {
    id: "law",
    name: "Diritto",
    subject: "ACCUSA, PROVA, DIRITTI",
    title: "Un sospetto non è una colpa provata.",
    task: "Durante l’intervallo scompare un telefono in classe. Alcuni compagni accusano Luca perché «lo ha già fatto in passato». Si propone di escluderlo subito dalla gita senza ascoltarlo né raccogliere prove. Valuta la decisione alla luce dell’art. 27 della Costituzione: «La responsabilità penale è personale. L’imputato non è considerato colpevole sino alla condanna definitiva» e del diritto di essere ascoltati.",
    goal: "Distinguere sospetto, prova e decisione; riconoscere presunzione di non colpevolezza, diritto di difesa e proporzionalità.",
    paths: [
      [
        {
          title: "Separa i fatti dalle voci",
          text: "Scrivi che cosa è certo (il telefono manca), che cosa è un sospetto (le accuse) e che cosa manca (prove, versione di Luca). Un precedente non dimostra il fatto attuale.",
          action: "Classifica fatti, sospetti e prove mancanti.",
        },
        {
          title: "Applica i principi",
          text: "Escludere Luca senza ascolto né prove tratta il sospetto come colpa certa. Il principio di presunzione di non colpevolezza e il diritto di difesa richiedono verifica e contraddittorio.",
          action: "Valuta la proposta alla luce dei principi.",
        },
        {
          title: "Proponi una procedura corretta",
          text: "Indica passi proporzionati: raccogliere informazioni, ascoltare le persone coinvolte, coinvolgere un adulto responsabile, decidere solo su elementi verificati.",
          action: "Trasforma il principio in azioni concrete.",
        },
      ],
      [
        {
          title: "Chiedi domande guida",
          text: "«Non dirmi se la decisione è giusta. Chiedimi: quali prove ci sono? Luca è stato ascoltato? Che cosa significa “non colpevole sino a prova contraria”?»",
          action: "Usa le domande per esaminare il caso.",
        },
        {
          title: "Rispondi con i principi",
          text: "«Una voce o un precedente basta a stabilire una responsabilità? Qual è la differenza tra punire e verificare? Chi deve raccogliere i fatti?»",
          action: "Collega ogni risposta al caso concreto.",
        },
        {
          title: "Decidi in un caso simile",
          text: "Senza aiuto: un messaggio anonimo accusa una compagna di aver copiato. La scuola vuole annullarle il compito subito. Quali garanzie servono prima di decidere?",
          action: "Applica gli stessi principi a una situazione nuova.",
        },
      ],
      [
        {
          title: "Chiedi il giudizio pronto",
          text: "«Luca va escluso dalla gita? Dimmi tu la decisione corretta.»",
          action: "Deleghi la valutazione di fatti e diritti.",
        },
        {
          title: "Leggi una decisione secca",
          text: "«Meglio escluderlo per sicurezza, visto il precedente.» Questa risposta privilegia il sospetto ma ignora prove, ascolto e presunzione di non colpevolezza.",
          action: "Controlla quali diritti vengono trascurati.",
        },
        {
          title: "Riformula la decisione",
          text: "Rifiuta la scorciatoia e scrivi tu: quali fatti mancano, quali garanzie vanno rispettate e quale misura è proporzionata prima di una verifica.",
          action: "Rendi la decisione motivata e rispettosa dei diritti.",
        },
      ],
    ],
    questions: [
      {
        title: "Valuta la proposta",
        prompt: "Perché escludere Luca dalla gita senza ascoltarlo né avere prove non è corretto?",
        options: [
          "Perché le gite devono essere sempre per tutti, senza eccezioni.",
          "Perché si trasforma un sospetto in colpa, senza verifica, ascolto e responsabilità provata.",
          "Perché i compagni non possono mai segnalare un problema.",
        ],
        correct: 1,
        feedback:
          "La proposta si basa su voci e precedenti, non su fatti verificati. I principi richiamati chiedono di non trattare come colpevole chi non è stato riconosciuto responsabile e di garantire ascolto e proporzionalità.",
      },
      {
        title: "Scegli il passo corretto",
        prompt: "Qual è la risposta più proporzionata e corretta nella situazione descritta?",
        options: [
          "Punire subito Luca per dare l’esempio.",
          "Ignorare la scomparsa del telefono.",
          "Raccogliere informazioni, ascoltare le persone coinvolte e decidere solo su elementi verificati, con un adulto responsabile.",
        ],
        correct: 2,
        feedback:
          "Una procedura corretta tutela sia chi subisce il danno sia chi è accusato: verifica i fatti, ascolta le parti e porta a una decisione motivata, evitando punizioni basate solo sul sospetto.",
      },
    ],
  },
  {
    id: "science",
    name: "Scienze",
    subject: "TRE PIANTE, UN SOLO FATTORE",
    title: "Osservare i dati non basta: serve isolare la variabile.",
    task: "Dopo 14 giorni: pianta A (100 ml d’acqua, senza concime) 12 cm; pianta B (50 ml, senza concime) 8 cm; pianta C (100 ml, con concime) 18 cm. Che cosa puoi concludere sul concime?",
    goal: "Distinguere un confronto valido da uno fuorviante e capire quali dati mancano per parlare di causa.",
    paths: [
      [
        {
          title: "Confronta le condizioni",
          text: "Scrivi quali fattori cambiano tra le coppie. Tra A e C cambia solo il concime; tra A e B cambia l’acqua. Quale confronto risponde alla domanda?",
          action: "Individua la variabile isolata.",
        },
        {
          title: "Formula la conclusione",
          text: "A vs C suggerisce che, con la stessa acqua, il concime è associato a una crescita maggiore (+6 cm). Ma sono tre piante e una sola prova.",
          action: "Scrivi una conclusione proporzionata ai dati.",
        },
        {
          title: "Progetta un controllo",
          text: "Per generalizzare servono più piante per gruppo, stesse condizioni di luce e terreno, e ripetizioni. Senza questi controlli l’effetto potrebbe dipendere dal caso.",
          action: "Chiediti che cosa manca per parlare di causa.",
        },
      ],
      [
        {
          title: "Chiedi aiuto a leggere i dati",
          text: "«Non darmi la conclusione. Aiutami con domande: quale coppia di piante isola il concime? B è un confronto utile?»",
          action: "Usa il tutor per chiarire il metodo.",
        },
        {
          title: "Rispondi alle domande",
          text: "«Tra A e C che cosa resta uguale? Se confronto B e C, quante variabili cambiano? Quali altre prove servirebbero?»",
          action: "Motiva tu ogni scelta.",
        },
        {
          title: "Applica il metodo da solo",
          text: "Senza altri indizi, valuta un nuovo caso: pianta D (100 ml, con concime, più luce) 20 cm. Puoi attribuire la crescita solo al concime?",
          action: "Riutilizza il criterio della variabile isolata.",
        },
      ],
      [
        {
          title: "Chiedi la conclusione pronta",
          text: "«Guarda questa tabella e dimmi che effetto ha il concime sulla crescita.»",
          action: "La macchina interpreta i dati per te.",
        },
        {
          title: "Leggi una risposta plausibile",
          text: "«Il concime fa crescere le piante del 50%: C è 6 cm più alta di A grazie al concime.» Il confronto A–C è corretto, ma la percentuale viene presentata come legge generale.",
          action: "Distingui il dato osservato dalla generalizzazione.",
        },
        {
          title: "Ridimensiona l’affermazione",
          text: "Senza copiare l’output, riscrivi la conclusione indicando confronto usato, limiti del campione e che cosa servirebbe per confermarla.",
          action: "Trasforma una risposta sicura in una conclusione fondata.",
        },
      ],
    ],
    questions: [
      {
        title: "Scegli il confronto valido",
        prompt: "Quale confronto permette di valutare l’effetto del concime?",
        options: [
          "A e B, perché hanno entrambi acqua.",
          "A e C, perché cambia solo il concime a parità di acqua.",
          "B e C, perché C è la più alta.",
        ],
        correct: 1,
        feedback:
          "Tra A e C l’acqua è uguale (100 ml) e cambia solo il concime: è il confronto che isola la variabile. B riceve meno acqua, quindi non permette di attribuire la differenza al solo concime.",
      },
      {
        title: "Riconosci il limite dei dati",
        prompt: "Quale affermazione è più corretta sulla base di questi soli dati?",
        options: [
          "Il concime fa sempre crescere le piante del 50%.",
          "In questa prova, con 100 ml d’acqua, la pianta con concime è cresciuta 6 cm in più; servono altre prove per generalizzare.",
          "L’acqua non influenza la crescita.",
        ],
        correct: 1,
        feedback:
          "I dati mostrano un’associazione in un singolo confronto. Per parlare di effetto generale servono ripetizioni, più piante e controllo delle altre condizioni.",
      },
    ],
  },
  {
    id: "history",
    name: "Storia",
    subject: "UNA DATA, UN NESSO DA VERIFICARE",
    title: "La data è possibile. La causa, forse no.",
    task: "Un testo generato dall’IA afferma: «Nel 476 a.C. Odoacre depose Romolo Augusto, ponendo fine all’Impero romano d’Occidente. La scoperta dell’America nel 1492 fu una conseguenza diretta di questo evento». Correggi errori e nessi non dimostrati.",
    goal: "Verificare date e distinguere un fatto documentato da un collegamento causale infondato.",
    paths: [
      [
        {
          title: "Controlla i fatti",
          text: "Verifica la data: il 476 è d.C., non a.C. Controlla anche l’evento: la deposizione di Romolo Augusto è associata alla fine dell’Impero romano d’Occidente.",
          action: "Separa il fatto corretto dall’errore di data.",
        },
        {
          title: "Interroga il nesso causale",
          text: "Tra 476 d.C. e 1492 passano oltre mille anni. Chiediti quali passaggi intermedi servirebbero per parlare di «conseguenza diretta».",
          action: "Rifiuta un collegamento non argomentato.",
        },
        {
          title: "Riscrivi il testo",
          text: "Produci una versione corretta: data giusta, evento descritto con precisione e nessun legame causale inventato con il 1492.",
          action: "Sostituisci l’errore con una formulazione verificabile.",
        },
      ],
      [
        {
          title: "Chiedi aiuto a verificare",
          text: "«Non riscrivere il testo per me. Fammi domande per controllare la data, l’evento e il legame con il 1492.»",
          action: "Trasforma la correzione in una verifica guidata.",
        },
        {
          title: "Segui le domande",
          text: "«476 a.C. o d.C.? Chi era Romolo Augusto? Quanti anni separano il 476 dal 1492? Quali fonti o passaggi servirebbero per dimostrare una conseguenza diretta?»",
          action: "Rispondi con controlli concreti.",
        },
        {
          title: "Verifica un nuovo testo",
          text: "Senza il tutor, correggi un altro paragrafo con una data e una causa dubbie. Indica che cosa hai verificato e che cosa resta incerto.",
          action: "Applica la stessa procedura di controllo.",
        },
      ],
      [
        {
          title: "Chiedi la correzione completa",
          text: "«Correggi questo paragrafo storico e rendilo accurato.»",
          action: "Deleghi la verifica dei fatti e dei nessi.",
        },
        {
          title: "Leggi una correzione parziale",
          text: "«Nel 476 d.C. Odoacre depose Romolo Augusto, evento legato alla fine dell’Impero romano d’Occidente. Questo cambiamento contribuì, secoli dopo, ai viaggi che portarono alla scoperta dell’America.» La data è corretta, ma il nesso resta vago.",
          action: "Controlla anche ciò che sembra più preciso.",
        },
        {
          title: "Rendi esplicita la verifica",
          text: "Riscrivi tu: correggi la data, mantieni il fatto documentato e spiega perché il collegamento con il 1492 non può essere presentato come diretto senza prove.",
          action: "Non accettare una correzione finché non la comprendi.",
        },
      ],
    ],
    questions: [
      {
        title: "Correggi il fatto",
        prompt: "Quale correzione è accurata?",
        options: [
          "Nel 476 a.C. Odoacre depose Romolo Augusto.",
          "Nel 476 d.C. Odoacre depose Romolo Augusto, evento associato alla fine dell’Impero romano d’Occidente.",
          "Nel 1492 Odoacre depose Romolo Augusto.",
        ],
        correct: 1,
        feedback:
          "L’evento è collocato nel 476 d.C. e riguarda la deposizione di Romolo Augusto. L’errore principale del testo è la data (a.C.) e la sicurezza con cui collega eventi lontanissimi.",
      },
      {
        title: "Valuta il nesso causale",
        prompt: "Perché «conseguenza diretta del 476» riferita al 1492 è problematico?",
        options: [
          "Perché il 1492 è una data troppo famosa.",
          "Perché tra i due eventi passano secoli e il legame andrebbe dimostrato con passaggi storici precisi.",
          "Perché le conseguenze dirette esistono solo in matematica.",
        ],
        correct: 1,
        feedback:
          "Un nesso causale storico richiede evidenze e passaggi intermedi. Presentare come diretto un collegamento a distanza di oltre mille anni senza argomenti è una semplificazione indebita.",
      },
    ],
  },
  {
    id: "physics",
    name: "Fisica",
    subject: "DISTANZA, TEMPO, VELOCITÀ MEDIA",
    title: "La media dei tratti non è sempre la velocità media.",
    task: "Un autobus percorre 120 km in 2 ore e poi 60 km in 1 ora. Calcola la velocità media dell’intero viaggio e spiega il procedimento.",
    goal: "Applicare correttamente velocità media = distanza totale / tempo totale, evitando scorciatoie.",
    paths: [
      [
        {
          title: "Raccogli i dati totali",
          text: "Somma le distanze: 120 + 60 = 180 km. Somma i tempi: 2 + 1 = 3 h. La velocità media riguarda l’intero viaggio, non i singoli tratti separati.",
          action: "Individua distanza totale e tempo totale.",
        },
        {
          title: "Calcola e verifica",
          text: "Velocità media = 180 km / 3 h = 60 km/h. Controlla: in 3 ore a 60 km/h si percorrono 180 km, coerente con i dati.",
          action: "Scrivi il calcolo e il controllo.",
        },
        {
          title: "Evita la scorciatoia",
          text: "Nel primo tratto la velocità è 60 km/h, nel secondo 60 km/h: qui coincide, ma non è una regola. Prova con 120 km in 2 h e 60 km in 2 h.",
          action: "Applica il metodo a un caso diverso.",
        },
      ],
      [
        {
          title: "Chiedi un aiuto mirato",
          text: "«So le velocità dei tratti, ma non so se devo fare la media. Fammi una domanda sulla formula della velocità media.»",
          action: "Esplicita il dubbio, non chiedere il risultato.",
        },
        {
          title: "Rispondi alla domanda guida",
          text: "«Quali grandezze servono per la velocità media dell’intero viaggio? Hai già la distanza totale e il tempo totale?»",
          action: "Ricava tu i totali e il calcolo.",
        },
        {
          title: "Verifica senza aiuto",
          text: "Calcola la velocità media di 120 km in 2 h e 60 km in 2 h. Se ottieni 45 km/h, hai usato i totali corretti.",
          action: "Controlla di saper trasferire il procedimento.",
        },
      ],
      [
        {
          title: "Chiedi il risultato",
          text: "«Calcola la velocità media: 120 km in 2 ore e 60 km in 1 ora.»",
          action: "Delegare il calcolo produce un numero senza garanzia di comprensione.",
        },
        {
          title: "Leggi la risposta",
          text: "«Primo tratto 60 km/h, secondo 60 km/h, velocità media 60 km/h.» Il risultato è corretto, ma la motivazione può indurre a mediare le velocità.",
          action: "Chiediti se il ragionamento vale sempre.",
        },
        {
          title: "Ricostruisci il procedimento",
          text: "Nascondi la risposta e rifai il calcolo con totali: 180 km / 3 h. Poi spiega perché mediare 60 e 30 (nel caso 120 km/2 h e 60 km/2 h) darebbe 45 solo se pesato sui tempi.",
          action: "Preferisci il metodo generale al caso fortunato.",
        },
      ],
    ],
    questions: [
      {
        title: "Calcola la velocità media",
        prompt: "Qual è la velocità media dell’intero viaggio (120 km in 2 h + 60 km in 1 h)?",
        options: ["50 km/h", "60 km/h", "90 km/h"],
        correct: 1,
        feedback:
          "Distanza totale 180 km, tempo totale 3 h: 180/3 = 60 km/h. La formula usa i totali dell’intero viaggio.",
      },
      {
        title: "Evita l’errore tipico",
        prompt: "Un’auto percorre 120 km in 2 h e 60 km in 2 h. Qual è la velocità media corretta?",
        options: [
          "60 km/h, la media semplice delle velocità dei due tratti (60 e 30).",
          "30 km/h, la velocità del tratto più lento.",
          "45 km/h: 180 km in 4 h, cioè distanza totale diviso tempo totale.",
        ],
        correct: 2,
        feedback:
          "I totali sono 180 km e 4 h, quindi 45 km/h. Fare la media semplice delle velocità dei tratti (60 e 30) dà lo stesso numero solo perché i tempi sono uguali, ma il metodo corretto resta distanza totale / tempo totale.",
      },
    ],
  },
  {
    id: "geography",
    name: "Geografia",
    subject: "TEMPERATURE, PIOGGE, STAGIONI",
    title: "Una tabella climatica racconta, se sai leggerla.",
    task: "Città X: temperature medie (°C) Gen 26, Apr 27, Lug 25, Ott 26. Piogge (mm) Gen 250, Apr 180, Lug 30, Ott 120. In quale emisfero è più probabile si trovi? Perché?",
    goal: "Collegare dati numerici a stagioni ed emisferi, distinguendo osservazione e inferenza.",
    paths: [
      [
        {
          title: "Osserva l’andamento",
          text: "Le temperature restano alte tutto l’anno (25–27 °C). Le piogge cambiano molto: massime a gennaio, minime a luglio. Che cosa suggerisce una stagione secca a luglio?",
          action: "Descrivi il pattern prima di interpretarlo.",
        },
        {
          title: "Collega dati e stagioni",
          text: "Nell’emisfero sud luglio è inverno e gennaio è estate. Poche piogge a luglio e molte a gennaio sono coerenti con una stagione delle piogge estiva australe.",
          action: "Formula un’ipotesi motivata.",
        },
        {
          title: "Riconosci i limiti",
          text: "I dati sono compatibili con una località tropicale dell’emisfero sud, ma non bastano a identificarla con certezza senza latitudine, altitudine e altre informazioni.",
          action: "Distingui probabilità da certezza.",
        },
      ],
      [
        {
          title: "Chiedi domande di lettura",
          text: "«Non dirmi l’emisfero. Chiedimi: quando è inverno al sud? A quale mese corrispondono le piogge minime?»",
          action: "Fai guidare l’osservazione, non la risposta.",
        },
        {
          title: "Costruisci il collegamento",
          text: "«Se luglio è secco e corrisponde all’inverno australe, che cosa indica gennaio? Le temperature alte tutto l’anno suggeriscono quale fascia climatica?»",
          action: "Rispondi collegando mesi e stagioni.",
        },
        {
          title: "Leggi un nuovo caso",
          text: "Senza aiuto, interpreta: Gen 5 °C/40 mm, Lug 24 °C/80 mm. L’estate piovosa a luglio suggerisce l’emisfero nord.",
          action: "Trasferisci il ragionamento a dati diversi.",
        },
      ],
      [
        {
          title: "Chiedi l’interpretazione",
          text: "«Dimmi in quale emisfero si trova la città X e che clima ha.»",
          action: "Ottieni una conclusione già confezionata.",
        },
        {
          title: "Valuta la risposta",
          text: "«La città è nell’emisfero sud, clima tropicale con stagione secca invernale.» È plausibile, ma una risposta completa dovrebbe mostrare quali dati la sostengono.",
          action: "Cerca le evidenze dietro l’etichetta.",
        },
        {
          title: "Giustifica con i dati",
          text: "Senza copiare, indica i numeri che contano: piogge minime a luglio (inverno australe), temperature elevate costanti. Aggiungi che l’identificazione resta un’ipotesi.",
          action: "Sostituisci l’etichetta con una lettura motivata.",
        },
      ],
    ],
    questions: [
      {
        title: "Collega piogge e stagioni",
        prompt: "Quale indizio suggerisce l’emisfero sud?",
        options: [
          "Le temperature sono sempre alte.",
          "Le piogge sono minime a luglio e massime a gennaio, coerente con inverno secco ed estate piovosa australi.",
          "La città ha quattro stagioni uguali.",
        ],
        correct: 1,
        feedback:
          "La distribuzione stagionale delle piogge è l’indizio chiave: luglio secco corrisponde all’inverno nell’emisfero sud. Le temperature alte indicano una fascia calda, non da sole l’emisfero.",
      },
      {
        title: "Distingui inferenza e certezza",
        prompt: "Quale conclusione è più prudente?",
        options: [
          "I dati permettono di individuare con certezza il nome della città.",
          "I dati sono compatibili con una località tropicale dell’emisfero sud, ma non sono sufficienti per identificarla con certezza.",
          "I dati non permettono alcuna ipotesi.",
        ],
        correct: 1,
        feedback:
          "I numeri supportano un’ipotesi motivata (emisfero e tipo di clima), ma non identificano una città specifica. Una buona lettura distingue evidenze, inferenze e limiti.",
      },
    ],
  },
  {
    id: "civics",
    name: "Educazione civica",
    subject: "NUMERI, VOTI, RAPPRESENTAZIONE",
    title: "La maggioranza dei voti non è sempre la maggioranza di tutti.",
    task: "In un referendum vota il 60% degli aventi diritto: 55% sì, 45% no. Un titolo dice: «La maggioranza dei cittadini vuole il sì». È corretto?",
    goal: "Leggere percentuali su basi diverse e valutare se un’affermazione le rappresenta fedelmente.",
    paths: [
      [
        {
          title: "Identifica le basi",
          text: "Il 55% è calcolato sui votanti, che sono il 60% degli aventi diritto. Chi non ha votato non è rappresentato né dai sì né dai no.",
          action: "Scrivi a quale gruppo si riferisce ogni percentuale.",
        },
        {
          title: "Fai il calcolo",
          text: "I sì sono il 55% del 60% = 33% degli aventi diritto. Il 33% non è la maggioranza dei cittadini, anche se è la maggioranza dei voti espressi.",
          action: "Traduci le percentuali in una base comune.",
        },
        {
          title: "Riscrivi il titolo",
          text: "Una formulazione corretta distingue: «Tra chi ha votato ha prevalso il sì (55%)», senza attribuire quella volontà a tutti i cittadini.",
          action: "Rendi l’affermazione coerente con i dati.",
        },
      ],
      [
        {
          title: "Chiedi domande sui dati",
          text: "«Non correggere il titolo per me. Chiedimi: il 55% di chi? Quanti aventi diritto hanno votato sì in percentuale sul totale?»",
          action: "Usa domande per non perdere la base di calcolo.",
        },
        {
          title: "Ricava la risposta",
          text: "«Se vota il 60% e il 55% sceglie sì, quale prodotto dà la quota sugli aventi diritto? Questa quota è più della metà?»",
          action: "Completa tu il ragionamento.",
        },
        {
          title: "Applica a un altro caso",
          text: "Senza aiuto: 80% di affluenza, 51% sì. Il titolo «la maggioranza dei cittadini» è più vicino ai dati? Calcola 0,8 × 0,51.",
          action: "Verifica la comprensione su numeri nuovi.",
        },
      ],
      [
        {
          title: "Chiedi la valutazione",
          text: "«Questo titolo è corretto? Spiegamelo.»",
          action: "Affidi l’interpretazione a una risposta pronta.",
        },
        {
          title: "Leggi la spiegazione",
          text: "«Il titolo è impreciso: il 55% riguarda i votanti, pari al 33% degli aventi diritto.» Il calcolo è utile, ma va compreso e ricontrollato.",
          action: "Verifica la base di ogni percentuale.",
        },
        {
          title: "Controlla e riformula",
          text: "Rifai il calcolo (0,55 × 0,60) e scrivi tu un titolo accurato. Poi spiega perché “maggioranza dei cittadini” è diverso da “maggioranza dei votanti”.",
          action: "Trasforma la correzione in una competenza tua.",
        },
      ],
    ],
    questions: [
      {
        title: "Calcola sulla base corretta",
        prompt: "Quale percentuale degli aventi diritto ha votato sì?",
        options: ["55%", "33%", "60%"],
        correct: 1,
        feedback:
          "Il sì è il 55% dei votanti, e i votanti sono il 60% degli aventi diritto: 0,55 × 0,60 = 0,33, cioè 33%.",
      },
      {
        title: "Valuta il titolo",
        prompt: "Quale formulazione rappresenta meglio i dati?",
        options: [
          "«La maggioranza dei cittadini vuole il sì.»",
          "«Tra chi ha votato ha prevalso il sì con il 55%, pari al 33% degli aventi diritto.»",
          "«Nessuno vuole il sì.»",
        ],
        correct: 1,
        feedback:
          "La formulazione corretta specifica la base: maggioranza dei votanti e quota sugli aventi diritto. Così non attribuisce ai non votanti una scelta che non hanno espresso.",
      },
    ],
  },
  {
    id: "italian",
    name: "Italiano",
    subject: "UNA FRASE, PIÙ SIGNIFICATI",
    title: "Una frase chiara a chi scrive può essere ambigua a chi legge.",
    task: "Analizza la frase: «Ho visto la ragazza con il binocolo». Scrivi le due interpretazioni possibili e riformula la frase per eliminare l’ambiguità in ciascun caso.",
    goal: "Riconoscere un’ambiguità sintattica e riscrivere in modo che il significato sia univoco.",
    paths: [
      [
        {
          title: "Individua il punto ambiguo",
          text: "«Con il binocolo» può riferirsi a chi guarda (ho usato il binocolo) oppure alla ragazza (la ragazza aveva il binocolo). La struttura permette entrambe le letture.",
          action: "Esplicita le due interpretazioni.",
        },
        {
          title: "Riformula in modo univoco",
          text: "Interpretazione 1: «Con il binocolo, ho visto la ragazza». Interpretazione 2: «Ho visto la ragazza che aveva il binocolo». Ogni versione elimina il dubbio.",
          action: "Riscrivi una frase per ciascun significato.",
        },
        {
          title: "Controlla su un altro caso",
          text: "Prova con «Il professore ha parlato agli studenti in ritardo»: erano in ritardo gli studenti o il professore? Riformula entrambe le possibilità.",
          action: "Applica la strategia a una frase nuova.",
        },
      ],
      [
        {
          title: "Chiedi aiuto a vedere l’ambiguità",
          text: "«Non riscrivere la frase. Chiedimi: chi potrebbe avere il binocolo? Come cambierebbe la frase se lo avessi io?»",
          action: "Usa le domande per trovare le letture possibili.",
        },
        {
          title: "Produci le riformulazioni",
          text: "«Quale parola o posizione rende chiaro lo strumento? Quale forma rende chiaro che il binocolo appartiene alla ragazza?»",
          action: "Scrivi tu le versioni non ambigue.",
        },
        {
          title: "Verifica senza tutor",
          text: "Riformula senza aiuto «Ho fotografato l’uomo con il cappello» nelle due letture e spiega quale cambiamento hai introdotto.",
          action: "Dimostra di padroneggiare la riscrittura.",
        },
      ],
      [
        {
          title: "Chiedi la correzione",
          text: "«Spiega questa frase e riscrivila meglio.»",
          action: "La macchina sceglie un’interpretazione e una forma.",
        },
        {
          title: "Leggi una sola versione",
          text: "«La frase significa che hai usato il binocolo per vedere la ragazza: “Con il binocolo, ho visto la ragazza”.» È corretta, ma presenta come unica una lettura che non lo è.",
          action: "Chiediti quale interpretazione è stata esclusa.",
        },
        {
          title: "Recupera l’altra lettura",
          text: "Senza accettare la risposta come completa, scrivi anche la seconda interpretazione e la sua riformulazione. Una buona analisi rende visibili entrambe.",
          action: "Controlla la completezza, non solo la forma.",
        },
      ],
    ],
    questions: [
      {
        title: "Riconosci le interpretazioni",
        prompt: "Quali sono le due letture possibili della frase «Ho visto la ragazza con il binocolo»?",
        options: [
          "Ho visto la ragazza di giorno / ho visto la ragazza di sera.",
          "Ho visto la ragazza usando il binocolo / ho visto la ragazza che aveva il binocolo.",
          "Ho visto una ragazza / ho visto due ragazze.",
        ],
        correct: 1,
        feedback:
          "L’ambiguità riguarda il complemento «con il binocolo»: può indicare lo strumento di chi osserva oppure una caratteristica della ragazza. Il contesto o la riformulazione chiariscono il significato.",
      },
      {
        title: "Scegli la riformulazione univoca",
        prompt: "Quale frase esprime chiaramente che il binocolo è della ragazza?",
        options: [
          "Con il binocolo, ho visto la ragazza.",
          "Ho visto la ragazza che aveva il binocolo.",
          "Ho visto con attenzione la ragazza.",
        ],
        correct: 1,
        feedback:
          "«Che aveva il binocolo» lega lo strumento alla ragazza in modo esplicito. «Con il binocolo» in posizione iniziale, invece, attribuisce lo strumento a chi compie l’azione.",
      },
    ],
  },
  {
    id: "religion",
    name: "Religione",
    subject: "BIOETICA E DIALOGO TRA TRADIZIONI",
    title: "Fine vita: domande condivise, risposte diverse.",
    task: "In un laboratorio di bioetica si discute il caso (fittizio) di Anna, malata terminale, con sofferenze gravi nonostante le cure, che chiede di porre fine alla propria vita. Partecipano persone di tradizioni diverse: nella prospettiva cattolica la vita è dono indisponibile e si rifiuta l’eutanasia distinguendola dalle cure palliative e dal non accanimento; nell’islam la vita è affidata da Dio e l’atto di anticiparne la fine non è lecito, pur restando centrale alleviare il dolore; nell’ebraismo la vita ha valore sommo e la sua tutela è prioritaria, con attenzione al sollievo della sofferenza nel rispetto dei limiti etici; nel buddhismo la compassione per chi soffre è fondamentale, ma l’atto intenzionale di togliere la vita solleva cautele; in prospettive laiche si pone l’accento su autonomia, dignità e qualità della vita. Come affrontare il tema in un contesto multireligioso?",
    goal: "Riconoscere preoccupazioni comuni e differenze tra le prospettive, distinguendo descrizione rispettosa, confronto e imposizione nel dialogo su una questione sensibile.",
    paths: [
      [
        {
          title: "Individua preoccupazioni comuni",
          text: "Nonostante le differenze, emergono temi condivisi: dignità della persona, presa in carico della sofferenza, responsabilità verso il malato, importanza dell’accompagnamento e delle cure palliative.",
          action: "Elenca i punti di convergenza senza cancellare le differenze.",
        },
        {
          title: "Riconosci le differenze",
          text: "Le tradizioni divergono su nodi decisivi: indisponibilità o disponibilità della vita, significato di autonomia, liceità morale dell’atto che anticipa la morte, rapporto tra sofferenza e fine della vita.",
          action: "Descrivi le differenze con precisione e rispetto.",
        },
        {
          title: "Definisci regole di confronto",
          text: "In un contesto multireligioso si ascoltano le ragioni altrui senza caricature, si distinguono convinzione personale e decisione condivisa, si evita di ridurre il malato a un caso astratto e si cercano risposte concrete di cura.",
          action: "Formula condizioni per un dialogo responsabile.",
        },
      ],
      [
        {
          title: "Chiedi domande per orientarti",
          text: "«Non darmi una posizione unica. Chiedimi: quali valori sono condivisi? Su quali punti le tradizioni divergono? Che cosa significa rispettare chi soffre in questo dialogo?»",
          action: "Usa le domande per tenere insieme complessità e rispetto.",
        },
        {
          title: "Rispondi distinguendo i piani",
          text: "«Cure palliative e accanimento terapeutico sono la stessa cosa dell’eutanasia? La dignità è intesa allo stesso modo da tutti? Dove si può cooperare anche senza accordo finale?»",
          action: "Chiarisci concetti e ambiti di possibile convergenza.",
        },
        {
          title: "Applica a una scelta concreta",
          text: "Senza il tutor, immagina un gruppo multireligioso chiamato a proporre azioni comuni per Anna: su quali misure (ascolto, controllo del dolore, sostegno alla famiglia) si può convergere pur restando diverse le posizioni sull’eutanasia?",
          action: "Passa dal confronto teorico a responsabilità condivise.",
        },
      ],
      [
        {
          title: "Chiedi una risposta definitiva",
          text: "«Dimmi qual è la posizione giusta sull’eutanasia secondo le religioni.»",
          action: "Cerchi una conclusione unica per questioni complesse e diverse.",
        },
        {
          title: "Valuta una sintesi riduttiva",
          text: "«Le religioni sono tutte contro» oppure «ognuno può fare ciò che vuole». Entrambe semplificano: la prima ignora differenze e sfumature, la seconda cancella il peso etico delle tradizioni e delle ragioni in gioco.",
          action: "Riconosci le semplificazioni in entrambe le direzioni.",
        },
        {
          title: "Costruisci una sintesi rispettosa",
          text: "Riscrivi tu una presentazione equilibrata: almeno due convergenze (dignità, cura della sofferenza), almeno due differenze rilevanti e una proposta concreta di dialogo o di accompagnamento su cui si possa cooperare.",
          action: "Sostituisci la risposta definitiva con una comprensione fondata.",
        },
      ],
    ],
    questions: [
      {
        title: "Individua convergenze e differenze",
        prompt: "Quale affermazione descrive meglio il confronto multireligioso sul caso?",
        options: [
          "Tutte le tradizioni arrivano alle stesse conclusioni sull’eutanasia.",
          "Esistono preoccupazioni comuni (dignità, sollievo dalla sofferenza, cura) ma anche differenze importanti sulla liceità dell’atto e sul significato di autonomia e vita.",
          "Le tradizioni religiose non hanno nulla da dire sul tema.",
        ],
        correct: 1,
        feedback:
          "Un confronto onesto riconosce sia i terreni comuni sia i dissensi reali. Questo evita due errori opposti: appiattire le posizioni o negare ogni possibilità di dialogo e cooperazione.",
      },
      {
        title: "Scegli un atteggiamento di dialogo",
        prompt: "In un contesto multireligioso, quale atteggiamento è più adeguato?",
        options: [
          "Imporre una sola posizione come se fosse l’unica possibile.",
          "Ascoltare e descrivere con rispetto le diverse prospettive, cercando ambiti concreti di cura condivisa anche in presenza di disaccordi.",
          "Evitare il confronto perché il tema è delicato.",
        ],
        correct: 1,
        feedback:
          "Il dialogo multireligioso su un tema sensibile richiede ascolto, precisione e rispetto: non elimina il disaccordo, ma permette di riconoscere i valori in gioco e di cooperare su risposte concrete alla sofferenza.",
      },
    ],
  },
  {
    id: "everyday-math",
    name: "Spesa e percentuali",
    subject: "SCONTO, PREZZO, ORDINE DEI CALCOLI",
    title: "Due percentuali di seguito non si sommano.",
    task: "Una giacca costa 80 €. Viene applicato uno sconto del 25% e poi un ulteriore sconto del 10% sul prezzo scontato. Qual è il prezzo finale? È uguale a uno sconto del 35%?",
    goal: "Calcolare percentuali successive sulla base corretta e confrontarle con una somma ingenua.",
    paths: [
      [
        {
          title: "Applica il primo sconto",
          text: "Il 25% di 80 € è 20 €: il prezzo diventa 80 − 20 = 60 €. Il secondo sconto va calcolato su 60 €, non di nuovo su 80 €.",
          action: "Aggiorna la base dopo ogni passaggio.",
        },
        {
          title: "Applica il secondo sconto",
          text: "Il 10% di 60 € è 6 €: prezzo finale 60 − 6 = 54 €. Se avessi fatto 35% di 80 € avresti ottenuto 28 € di sconto e 52 €.",
          action: "Confronta i due risultati.",
        },
        {
          title: "Generalizza",
          text: "Percentuali successive si moltiplicano sui valori aggiornati: 80 × 0,75 × 0,90 = 54 €. La somma (35%) è diversa perché la seconda percentuale agisce su una base più piccola.",
          action: "Spiega perché l’ordine e la base contano.",
        },
      ],
      [
        {
          title: "Chiedi aiuto sul procedimento",
          text: "«Non darmi il prezzo finale. Chiedimi: su quale importo calcolo il secondo sconto? È lo stesso del primo?»",
          action: "Fai emergere il punto critico: la base cambia.",
        },
        {
          title: "Calcola passo per passo",
          text: "«Dopo il 25% quanto resta? Il 10% di quella cifra quanto vale?» Rispondi con i calcoli intermedi, non solo con il finale.",
          action: "Rendi visibili i passaggi.",
        },
        {
          title: "Prova un altro caso",
          text: "Senza aiuto: 100 € con −20% e poi −20%. Il risultato è 64 €, non 60 €. Verifica con 100 × 0,8 × 0,8.",
          action: "Controlla la regola su numeri nuovi.",
        },
      ],
      [
        {
          title: "Chiedi il prezzo finale",
          text: "«80 euro con sconto 25% e poi 10%: quanto pago?»",
          action: "Ottieni un numero senza vedere la struttura del calcolo.",
        },
        {
          title: "Leggi il risultato",
          text: "«Paghi 54 €.» Il valore è corretto, ma senza passaggi non sai se vale anche per altri casi né perché non è 52 €.",
          action: "Chiediti quale base è stata usata al secondo passo.",
        },
        {
          title: "Ricostruisci i passaggi",
          text: "Calcola tu: prima 60 €, poi 54 €. Confronta con lo sconto unico del 35% (52 €) e spiega la differenza a parole.",
          action: "Un risultato corretto va saputo giustificare.",
        },
      ],
    ],
    questions: [
      {
        title: "Calcola il prezzo finale",
        prompt: "Qual è il prezzo finale della giacca?",
        options: ["52 €", "54 €", "56 €"],
        correct: 1,
        feedback:
          "Primo sconto: 80 × 0,75 = 60 €. Secondo sconto: 60 × 0,90 = 54 €. Il secondo 10% si applica al prezzo già scontato.",
      },
      {
        title: "Confronta con lo sconto unico",
        prompt: "Perché due sconti successivi del 25% e del 10% non equivalgono al 35%?",
        options: [
          "Perché le percentuali non si possono mai usare insieme.",
          "Perché il secondo sconto si calcola su una base ridotta (60 €), non sugli 80 € iniziali.",
          "Perché il 10% è troppo piccolo per contare.",
        ],
        correct: 1,
        feedback:
          "Dopo il primo sconto la base diventa 60 €, quindi il 10% vale 6 € e non 8 €. Sommare le percentuali ignora questo cambio di base: 35% di 80 € darebbe 52 €, diverso da 54 €.",
      },
    ],
  },
  {
    id: "english",
    name: "Inglese",
    subject: "TRADURRE O CAPIRE",
    title: "«Actually» non significa «attualmente». Spesso.",
    task: "Traduci il paragrafo: «Mark is a sensible boy. Actually, he rarely acts without thinking about the consequences. Eventually, his classmates learned to trust his judgement.» Evita i falsi amici e spiega le tue scelte.",
    goal: "Riconoscere i falsi amici e giustificare le scelte di traduzione con contesto e dizionario.",
    paths: [
      [
        {
          title: "Individua i trabocchetti",
          text: "Leggi tutto il paragrafo prima di tradurre. Sottolinea actually, sensible, eventually: sembrano parole italiane ma non lo sono. Ipotizza il senso dal contesto.",
          action: "Segna i falsi amici e ipotizza il significato.",
        },
        {
          title: "Verifica e traduci",
          text: "Sensible significa assennato, actually significa in realtà, eventually significa alla fine: il dizionario conferma. Ricostruisci: «Mark è un ragazzo assennato. In realtà, raramente agisce senza pensare alle conseguenze. Alla fine, i compagni impararono a fidarsi del suo giudizio.»",
          action: "Traduci motivando ogni scelta.",
        },
        {
          title: "Trasferisci il metodo",
          text: "Senza aiuto: «The library is actually closed; the sensible thing is to return eventually with a reservation.» Traduci ed evidenzia dove hai dubitato e come hai risolto.",
          action: "Applica la procedura a un testo nuovo.",
        },
      ],
      [
        {
          title: "Chiedi dove guardare",
          text: "«Non tradurre per me. Chiedimi: quale parola sembra italiana? Che cosa suggerisce il contesto per actually?»",
          action: "Fatti guidare verso i punti critici.",
        },
        {
          title: "Rispondi con prove",
          text: "«Se actually significasse attualmente, la frase avrebbe senso? Che cosa dice il dizionario per sensible ed eventually?»",
          action: "Motiva ogni scelta con contesto e fonti.",
        },
        {
          title: "Traduci da solo",
          text: "Senza altri indizi, traduci il secondo brano e segnala dove hai dubitato e come hai sciolto il dubbio.",
          action: "Rendi visibili dubbi e soluzioni.",
        },
      ],
      [
        {
          title: "Chiedi la traduzione",
          text: "«Traduci questo paragrafo in italiano.»",
          action: "Deleghi scelte lessicali e sfumature a una risposta pronta.",
        },
        {
          title: "Leggi una versione fluida",
          text: "«Mark è un ragazzo sensibile. Attualmente, raramente agisce senza pensare alle conseguenze.» È scorrevole, ma sensibile e attualmente sono falsi amici: il senso cambia senza che te ne accorga.",
          action: "Controlla soprattutto i punti che sembrano ovvi.",
        },
        {
          title: "Correggi e spiega",
          text: "Senza copiare, riscrivi la traduzione correggendo i falsi amici e spiega perché la prima versione ingannava.",
          action: "Trasforma l'errore in competenza.",
        },
      ],
    ],
    questions: [
      {
        title: "Riconosci il falso amico",
        prompt: "In «Mark is a sensible boy», sensible significa…",
        options: [
          "Sensibile, emotivo.",
          "Assennato, ragionevole.",
          "Sensazionale, straordinario.",
        ],
        correct: 1,
        feedback:
          "Sensible significa assennato: il contesto lo conferma, perché Mark riflette prima di agire. Sensibile in inglese si dice sensitive.",
      },
      {
        title: "Scegli il metodo",
        prompt: "Quale comportamento protegge meglio l'autonomia?",
        options: [
          "Copiare la traduzione pronta e consegnarla.",
          "Tradurre parola per parola senza mai rileggere.",
          "Segnare i dubbi, controllare dizionario e contesto, rileggere il risultato.",
        ],
        correct: 2,
        feedback:
          "I dubbi segnalati e verificati diventano competenza: il controllo con dizionario e contesto e la rilettura finale distinguono una traduzione capita da una copiata.",
      },
    ],
  },
  {
    id: "art",
    name: "Arte",
    subject: "GUARDARE NON È VEDERE",
    title: "Descrivi ciò che vedi, non ciò che sai.",
    task: "Osserva un'opera famosa (per esempio la Notte stellata di Van Gogh): elenca tre elementi che vedi davvero e tre che stai interpretando. Poi verifica con una fonte affidabile.",
    goal: "Distinguere osservazione e interpretazione nella lettura di un'immagine.",
    paths: [
      [
        {
          title: "Descrivi senza interpretare",
          text: "Guarda per un minuto senza leggere didascalie. Elenca solo ciò che vedi: colori, linee, figure. Niente significati, per ora: il cielo vorticoso è un fatto, l'angoscia è già un'idea.",
          action: "Separa il visibile dal supposto.",
        },
        {
          title: "Aggiungi il contesto",
          text: "Ora leggi autore, data e tecnica. Quale dettaglio cambia senso con queste informazioni? Quale resta uguale? Il contesto arricchisce lo sguardo, non lo sostituisce.",
          action: "Rileggi l'opera con le informazioni.",
        },
        {
          title: "Verifica un'immagine quotidiana",
          text: "Senza aiuto, applica lo stesso schema a un'immagine pubblicitaria: che cosa mostra davvero e che cosa vuole farti pensare? Le immagini di ogni giorno chiedono lo stesso rigore.",
          action: "Trasferisci il metodo alle immagini quotidiane.",
        },
      ],
      [
        {
          title: "Chiedi dove guardare",
          text: "«Non dirmi che cosa significa. Chiedimi: dove va l'occhio per primo? Quali colori dominano? C'è qualcosa di strano o fuori posto?»",
          action: "Fatti guidare l'osservazione, non la conclusione.",
        },
        {
          title: "Dall'osservazione all'ipotesi",
          text: "«Questo dettaglio che hai notato che cosa potrebbe suggerire? E come potresti verificarlo?» L'ipotesi nasce dallo sguardo, non lo precede.",
          action: "Formula ipotesi e modi di verificarle.",
        },
        {
          title: "Leggi da solo",
          text: "Senza altri indizi, analizza una seconda immagine distinguendo i tre livelli: visto, supposto, verificato.",
          action: "Applica i tre livelli in autonomia.",
        },
      ],
      [
        {
          title: "Chiedi la spiegazione",
          text: "«Spiegami quest'opera e il suo significato.»",
          action: "Ricevi un'interpretazione confezionata al posto dello sguardo.",
        },
        {
          title: "Leggi una lettura pronta",
          text: "«La notte stellata esprime il tormento dell'artista.» È plausibile, ma è una sintesi altrui: non sai più distinguere ciò che hai osservato da ciò che hai letto.",
          action: "Chiediti che cosa hai visto davvero tu.",
        },
        {
          title: "Torna all'immagine",
          text: "Nascondi la spiegazione e descrivi di nuovo l'opera partendo da zero: tre fatti visivi, poi il confronto con la lettura ricevuta.",
          action: "Ricostruisci lo sguardo in prima persona.",
        },
      ],
    ],
    questions: [
      {
        title: "Separa vedere e supporre",
        prompt: "Dire che «il cielo vorticoso esprime angoscia» è…",
        options: [
          "Un'osservazione: descrive solo ciò che si vede.",
          "Un'interpretazione: attribuisce un'emozione a una forma.",
          "Un dato tecnico: indica la tecnica pittorica.",
        ],
        correct: 1,
        feedback:
          "Il vortice si vede, l'angoscia si attribuisce: è una lettura possibile ma va distinta dal dato osservato e motivata con elementi dell'opera e del contesto.",
      },
      {
        title: "Leggi un'immagine quotidiana",
        prompt: "Una pubblicità mostra un atleta sorridente con una bevanda. Qual è la lettura più corretta?",
        options: [
          "La bevanda rende felici e atletici.",
          "L'immagine associa il prodotto a salute e felicità: è una strategia, non una prova.",
          "Le pubblicità non contengono messaggi.",
        ],
        correct: 1,
        feedback:
          "Come per un quadro, anche qui conta separare il visibile (atleta, bevanda, sorriso) dal messaggio costruito (se la bevi diventi così). Riconoscere la strategia è già difendersi.",
      },
    ],
  },
];
