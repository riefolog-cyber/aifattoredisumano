export type DebateStance = {
  left: string;
  right: string;
};

/** I due poli tra cui lo studente può collocarsi, una traccia alla volta. */
export const debateStances: DebateStance[] = [
  { left: "Prodotto", right: "Processo" },
  { left: "Togliere l’attrito", right: "Coltivare l’attrito" },
  { left: "Voce standard", right: "Voce personale" },
  { left: "Fiducia nel prodotto", right: "Fiducia nel processo" },
  { left: "Divieto", right: "Integrazione guidata" },
];
