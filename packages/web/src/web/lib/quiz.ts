export type QuizQuestion = {
  q: string;
  a: string[];
  correct: number;
  explanation: string;
};

export type QuizProgress = {
  answers: number[];
  pos: number;
  selected: number | null;
  submitted: boolean;
};

export const QUIZ_SIZE = 10;
/** Cambia quando la banca domande cambia: azzera le riprese non compatibili. */
export const QUIZ_VERSION = 3;

export const emptyQuizProgress: QuizProgress = {
  answers: [],
  pos: 0,
  selected: null,
  submitted: false,
};

export function quizScore(answers: readonly number[], questions: readonly QuizQuestion[]) {
  return answers.reduce(
    (sum, answer, index) => sum + Number(answer === questions[index]?.correct),
    0,
  );
}

export function isQuizComplete(progress: QuizProgress, questions: readonly QuizQuestion[]) {
  return progress.answers.length >= questions.length;
}

function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const pool = [...items];
  let state = seed >>> 0 || 1;
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Estrae un quiz bilanciato: mescola la banca con un seed stabile e prende
 * una domanda per area a ogni giro, così ogni tentativo copre tutte le aree.
 */
export function selectQuizQuestions<T extends { area: string }>(
  bank: readonly T[],
  count: number,
  seed: number,
): T[] {
  const byArea = new Map<string, T[]>();
  for (const item of seededShuffle(bank, seed)) {
    const group = byArea.get(item.area) ?? [];
    group.push(item);
    byArea.set(item.area, group);
  }

  const groups = [...byArea.values()];
  const target = Math.min(count, bank.length);
  const picked: T[] = [];
  for (let round = 0; picked.length < target; round += 1) {
    const before = picked.length;
    for (const group of groups) {
      const item = group[round];
      if (!item) continue;
      picked.push(item);
      if (picked.length === target) return picked;
    }
    if (picked.length === before) break;
  }
  return picked;
}
