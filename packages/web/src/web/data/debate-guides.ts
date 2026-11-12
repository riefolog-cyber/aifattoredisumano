export type DebateStep = {
  title: string;
  text: string;
  minutes: number;
};

export type DebateGuide = {
  duration: string;
  setting: string;
  steps: DebateStep[];
  closing: string;
};

export const debateGuides: DebateGuide[] = [
  {
    duration: "50 minuti",
    setting: "Classe intera, banchi a ferro di cavallo",
    steps: [
      {
        title: "Posizionamento iniziale",
        text: "Ognuno scrive in due righe se a scuola conta di più il prodotto o il processo, poi alza la mano per schierarsi.",
        minutes: 10,
      },
      {
        title: "Confronto guidato",
        text: "A turno, una voce per schieramento: tesi in una frase, un esempio concreto, un'obiezione accolta.",
        minutes: 25,
      },
      {
        title: "Sintesi personale",
        text: "Riscrivi la tua posizione iniziale: che cosa hai cambiato e perché? Appuntala nello spazio di riflessione.",
        minutes: 15,
      },
    ],
    closing: "Chiudi chiedendo: in quale compito useresti l'IA come escavatore e in quale come palestra?",
  },
  {
    duration: "50 minuti",
    setting: "Piccoli gruppi da 3-4, poi plenaria",
    steps: [
      {
        title: "Memoria di fatica",
        text: "Ogni gruppo ricorda un momento in cui sbagliare è servito a capire davvero. Un portavoce lo racconta in un minuto.",
        minutes: 15,
      },
      {
        title: "Caso concreto",
        text: "Discutete: un esercizio svolto senza fatica grazie all'IA lascia una traccia nella memoria? Perché?",
        minutes: 20,
      },
      {
        title: "Regola condivisa",
        text: "La classe formula una regola sull'errore: quando è prezioso e quando va evitato. Scrivetela negli appunti.",
        minutes: 15,
      },
    ],
    closing: "Consegna a casa: un errore recente trasformato in spiegazione per un compagno.",
  },
  {
    duration: "45 minuti",
    setting: "Coppie, poi confronto collettivo",
    steps: [
      {
        title: "Esperimento di voce",
        text: "In coppia: leggete ad alta voce un vostro testo e uno generato. Che differenze sentite nel ritmo e nelle scelte?",
        minutes: 15,
      },
      {
        title: "Caccia alle tracce",
        text: "Sottolineate tre espressioni che suonano «vostre» e tre che suonano «di tutti». Discutete da dove vengono.",
        minutes: 15,
      },
      {
        title: "Patto di stile",
        text: "Ognuno sceglie una propria espressione da proteggere e la annota: sarà il suo marcatore di voce.",
        minutes: 15,
      },
    ],
    closing: "Rileggi un tuo tema di mesi fa: riconosci la tua voce? Che cosa è cambiato?",
  },
  {
    duration: "60 minuti",
    setting: "Classe intera con lavagna divisa in due",
    steps: [
      {
        title: "Il problema",
        text: "L'insegnante presenta un compito scritto «perfetto»: come capire chi lo ha pensato? Raccolta di ipotesi.",
        minutes: 15,
      },
      {
        title: "Progettazione",
        text: "A gruppi: disegnate una prova che l'IA non possa svolgere al posto vostro. Presentazione in tre minuti ciascuna.",
        minutes: 30,
      },
      {
        title: "Criteri",
        text: "Dalle proposte, la classe ricava tre criteri di valutazione del processo, da appendere in aula.",
        minutes: 15,
      },
    ],
    closing: "Prossimo compito: consegna anche il diario del processo, non solo il prodotto.",
  },
  {
    duration: "45 minuti",
    setting: "Dibattito formale a due schieramenti",
    steps: [
      {
        title: "Apertura",
        text: "Due portavoce aprono: uno per il divieto, uno per l'integrazione. Due minuti ciascuno, senza interruzioni.",
        minutes: 10,
      },
      {
        title: "Contraddittorio",
        text: "Domande incrociate: ogni schieramento pone tre domande all'altro. Vale solo rispondere, non attaccare.",
        minutes: 20,
      },
      {
        title: "Terza via",
        text: "Tutti insieme: esiste una posizione intermedia praticabile nella nostra scuola? Formulatela in una frase.",
        minutes: 15,
      },
    ],
    closing: "Voto finale: la classe adotta per un mese la regola trovata e poi la verifica.",
  },
];
