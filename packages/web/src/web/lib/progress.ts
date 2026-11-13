import { normalizeCompleted } from "./site";

export type ProgressSnapshot = {
  app: "il-fattore-umano";
  version: 1;
  exportedAt: string;
  completed: string[];
  bestScore: number | null;
};

export function buildProgressSnapshot(
  completed: readonly string[],
  bestScore: number | null,
): ProgressSnapshot {
  return {
    app: "il-fattore-umano",
    version: 1,
    exportedAt: new Date().toISOString(),
    completed: normalizeCompleted(completed),
    bestScore,
  };
}

/** Legge un backup dei progressi; lancia un errore leggibile se non è valido. */
export function parseProgressSnapshot(text: string): {
  completed: string[];
  bestScore: number | null;
} {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Il file non è un JSON valido.");
  }
  if (!data || typeof data !== "object") throw new Error("Formato non riconosciuto.");
  const record = data as Record<string, unknown>;
  if (record.app !== "il-fattore-umano" || record.version !== 1) {
    throw new Error("Il file non è un backup dei progressi di questo sito.");
  }
  if (
    !Array.isArray(record.completed) ||
    record.completed.some((value) => typeof value !== "string" || !/^\d+:\d+$/.test(value))
  ) {
    throw new Error("Elenco dei capitoli non valido.");
  }
  const bestScore = record.bestScore;
  if (
    bestScore !== null &&
    (typeof bestScore !== "number" || !Number.isInteger(bestScore) || bestScore < 0 || bestScore > 10)
  ) {
    throw new Error("Punteggio del quiz non valido.");
  }
  return {
    completed: normalizeCompleted(record.completed as string[]),
    bestScore: bestScore as number | null,
  };
}
