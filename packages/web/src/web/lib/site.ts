export const AUTHOR = {
  name: "prof. Riefolo Giovanni",
  role: "docente IRC al Ferraris-Fermi di Verona",
};

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=szGJP-uXSaM";
export const YOUTUBE_THUMB = "https://i.ytimg.com/vi/szGJP-uXSaM/maxresdefault.jpg";
export const YOUTUBE_THUMB_FALLBACK = "https://i.ytimg.com/vi/szGJP-uXSaM/hqdefault.jpg";

export const TABS = [
  "Percorso",
  "Documenti",
  "Laboratorio",
  "Glossario",
  "Dibattito",
  "Docenti",
  "Fonti",
] as const;
export type Tab = (typeof TABS)[number];

export const TAB_SLUGS: Record<Tab, string> = {
  Percorso: "percorso",
  Documenti: "documenti",
  Laboratorio: "laboratorio",
  Glossario: "glossario",
  Dibattito: "dibattito",
  Docenti: "docenti",
  Fonti: "fonti",
};

export const PAGE_TITLES: Record<Tab, string> = {
  Percorso: "Il Fattore Umano — Il pensiero resta tuo",
  Documenti: "Documenti — Il Fattore Umano",
  Laboratorio: "Laboratorio — Il Fattore Umano",
  Glossario: "Glossario — Il Fattore Umano",
  Dibattito: "Dibattito — Il Fattore Umano",
  Docenti: "Per i docenti — Il Fattore Umano",
  Fonti: "Fonti e letture — Il Fattore Umano",
};

/**
 * Il glossario in coda alla Guida didattica (0:5) duplica la sezione
 * Glossario dedicata: resta nascosto per non ripetere gli stessi termini.
 * La sezione 1:4 ("Temporalità Disintegrata") era nascosta per errore
 * insieme al glossario ed è stata ripristinata. I testi restano in
 * documents.json; la correzione editoriale del riferimento a Leone XIV è
 * documentata nella pagina Fonti.
 */
export const HIDDEN_SECTIONS: ReadonlySet<string> = new Set(["0:5"]);

export function isSectionVisible(docIndex: number, sectionIndex: number) {
  return !HIDDEN_SECTIONS.has(`${docIndex}:${sectionIndex}`);
}

export const STORAGE_KEYS = {
  completed: "fd-completed",
  notes: "fd-notes",
  bestScore: "fd-best-score",
  theme: "fd-theme",
  quiz: "fd-quiz",
  quizSeed: "fd-quiz-seed",
  quizVersion: "fd-quiz-version",
  readingScale: "fd-reading-scale",
} as const;

export const CHAPTERS = [
  ["La bussola e la mente", "Ripensare la neutralità della tecnologia.", "ORIENTAMENTO", 1, 0],
  ["Il costo della delega", "Attrito cognitivo, apprendimento e autonomia.", "COGNIZIONE", 1, 1],
  ["Le parole che ci somigliano", "Linguaggio, antropofonia e omologazione.", "LINGUAGGIO", 1, 2],
  ["Chi governa l’algoritmo?", "Potere, infrastrutture e sovranità digitale.", "POTERE", 1, 3],
  ["Riprendersi il tempo", "Memoria, lentezza e pensiero prospettico.", "TEMPORALITÀ", 0, 3],
  ["Dall’oracolo al dialogo", "Pratiche per un uso consapevole dell’IA.", "PROSPETTIVE", 1, 5],
] as const;

export type ChapterRef = { doc: number; section: number };

export function chapterKey(doc: number, section: number) {
  return `${doc}:${section}`;
}

/**
 * Normalizza i progressi salvati: le versioni precedenti usavano indici
 * numerici del secondo documento, ora convertiti in chiavi "doc:sezione".
 */
export function normalizeCompleted(value: readonly (number | string)[]): string[] {
  const out: string[] = [];
  for (const item of value) {
    const key = typeof item === "number" ? chapterKey(1, item) : item;
    if (/^\d+:\d+$/.test(key) && !out.includes(key)) out.push(key);
  }
  return out;
}

export function tabFromHash(): Tab | null {
  if (typeof window === "undefined") return null;
  const slug = window.location.hash.replace(/^#\/?/, "").split("/")[0].toLowerCase();
  const match = Object.entries(TAB_SLUGS).find(([, value]) => value === slug);
  return match ? (match[0] as Tab) : null;
}

/**
 * I capitoli hanno un link diretto: #/documenti/<documento>/<capitolo>, con
 * indici a base 1 per essere leggibili e condivisibili.
 */
export function chapterFromHash(): ChapterRef | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/^#\/documenti\/(\d+)\/(\d+)\/?$/);
  if (!match) return null;
  return { doc: Number(match[1]) - 1, section: Number(match[2]) - 1 };
}

export function chapterHash(doc: number, section: number) {
  return `#/documenti/${doc + 1}/${section + 1}`;
}
