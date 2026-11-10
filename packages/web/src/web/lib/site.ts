export const AUTHOR = {
  name: "prof. Riefolo Giovanni",
  role: "docente IRC al Ferraris-Fermi di Verona",
};

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=szGJP-uXSaM";
export const YOUTUBE_THUMB = "https://i.ytimg.com/vi/szGJP-uXSaM/maxresdefault.jpg";
export const YOUTUBE_THUMB_FALLBACK = "https://i.ytimg.com/vi/szGJP-uXSaM/hqdefault.jpg";

export const TABS = ["Percorso", "Documenti", "Laboratorio", "Glossario", "Dibattito"] as const;
export type Tab = (typeof TABS)[number];

export const TAB_SLUGS: Record<Tab, string> = {
  Percorso: "percorso",
  Documenti: "documenti",
  Laboratorio: "laboratorio",
  Glossario: "glossario",
  Dibattito: "dibattito",
};

export const PAGE_TITLES: Record<Tab, string> = {
  Percorso: "Il Fattore Disumano — Il pensiero resta tuo",
  Documenti: "Documenti — Il Fattore Disumano",
  Laboratorio: "Laboratorio — Il Fattore Disumano",
  Glossario: "Glossario — Il Fattore Disumano",
  Dibattito: "Dibattito — Il Fattore Disumano",
};

export const STORAGE_KEYS = {
  completed: "fd-completed",
  notes: "fd-notes",
  bestScore: "fd-best-score",
  theme: "fd-theme",
  quiz: "fd-quiz",
} as const;

export const CHAPTERS = [
  ["La bussola e la mente", "Ripensare la neutralità della tecnologia.", "ORIENTAMENTO", 0],
  ["Il costo della delega", "Attrito cognitivo, apprendimento e autonomia.", "COGNIZIONE", 1],
  ["Le parole che ci somigliano", "Linguaggio, antropofonia e omologazione.", "LINGUAGGIO", 2],
  ["Chi governa l’algoritmo?", "Potere, infrastrutture e sovranità digitale.", "POTERE", 3],
  ["Riprendersi il tempo", "Memoria, lentezza e pensiero prospettico.", "TEMPORALITÀ", 4],
  ["Dall’oracolo al dialogo", "Pratiche per un uso consapevole dell’IA.", "PROSPETTIVE", 5],
] as const;

export function tabFromHash(): Tab | null {
  if (typeof window === "undefined") return null;
  const slug = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  const match = Object.entries(TAB_SLUGS).find(([, value]) => value === slug);
  return match ? (match[0] as Tab) : null;
}
