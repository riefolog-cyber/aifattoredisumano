/**
 * Sintesi in tre punti delle tappe del percorso. Le chiavi sono "doc:sezione"
 * e seguono gli indici di documents.json. Le sezioni fuori percorso non hanno
 * sintesi: si leggono come approfondimenti integrali.
 */
export const CHAPTER_SUMMARIES: Record<string, string[]> = {
  "1:0": [
    "La tecnologia non è neutrale: orienta abitudini, attenzione e relazioni.",
    "La metafora dello strumento convive con quella della riprogrammazione della mente.",
    "La domanda guida: stiamo usando l’IA o stiamo cambiando il nostro modo di pensare?",
  ],
  "1:1": [
    "L’attrito è parte dell’apprendimento: errore, sforzo e revisione consolidano la competenza.",
    "Delegare il processo produce debito epistemico: il prodotto arriva, il procedimento no.",
    "Lo scaffolding è temporaneo e deve ritirarsi quando la persona sa proseguire da sola.",
  ],
  "1:2": [
    "La fluidità del linguaggio non dimostra comprensione né coscienza.",
    "L’antropofonia è l’illusione di ascoltare una voce umana consapevole.",
    "L’effetto gelato industriale: testi levigati, uniformi, privi di voce personale.",
  ],
  "1:3": [
    "Calcolo, dati ed energia sono infrastrutture: chi le controlla crea dipendenza.",
    "Il feudalesimo digitale descrive la concentrazione di potere tecnologico.",
    "Lo Stato e le regole come argine: la sovranità democratica non è un dettaglio tecnico.",
  ],
  "1:4": [
    "L’eterno presente istantaneo erode memoria continua e prospettiva.",
    "Senza tempo lungo è difficile progettare, correggere e assumersi responsabilità.",
    "Il pensiero critico richiede pause, ritorni e confronto tra passato e futuro.",
  ],
  "0:3": [
    "Il pensiero ha bisogno di tempo lento e di attenzione sostenuta.",
    "L’accelerazione permanente riduce la profondità e favorisce risposte automatiche.",
    "Rileggere, fermarsi e riformulare sono pratiche di autonomia, non perdite di tempo.",
  ],
  "1:5": [
    "L’oracolo promette risposte; il dialogo costruisce domande e verifiche.",
    "La sequenza che protegge l’autonomia è tentativo, aiuto mirato, verifica.",
    "La scelta matura non è rifiuto né adesione: è uso consapevole, con regole e limiti.",
  ],
};
