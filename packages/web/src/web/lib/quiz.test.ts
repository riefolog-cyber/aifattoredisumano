import { describe, expect, it } from "vitest";
import { emptyQuizProgress, isQuizComplete, quizScore, type QuizQuestion } from "./quiz";

const questions: QuizQuestion[] = [
  { q: "Domanda 1", a: ["A", "B"], correct: 0, explanation: "" },
  { q: "Domanda 2", a: ["A", "B"], correct: 1, explanation: "" },
  { q: "Domanda 3", a: ["A", "B"], correct: 1, explanation: "" },
];

describe("quizScore", () => {
  it("conta solo le risposte corrette", () => {
    expect(quizScore([0, 1, 0], questions)).toBe(2);
    expect(quizScore([1, 0, 0], questions)).toBe(0);
    expect(quizScore([], questions)).toBe(0);
  });

  it("ignora risposte oltre la lunghezza del quiz", () => {
    expect(quizScore([0, 1, 1, 1], questions)).toBe(3);
  });
});

describe("isQuizComplete", () => {
  it("è falso finché mancano risposte", () => {
    expect(isQuizComplete({ ...emptyQuizProgress, answers: [0, 1] }, questions)).toBe(false);
  });

  it("è vero quando tutte le domande hanno una risposta", () => {
    expect(isQuizComplete({ ...emptyQuizProgress, answers: [0, 1, 1] }, questions)).toBe(true);
  });
});
