import { describe, expect, it } from "vitest";
import { quiz, quizAreas } from "../data/quiz";
import { QUIZ_SOURCES } from "../data/quiz-sources";
import documents from "../data/documents.json";
import {
  emptyQuizProgress,
  isQuizComplete,
  quizScore,
  selectQuizQuestions,
  type QuizQuestion,
} from "./quiz";

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

describe("banca domande", () => {
  it("copre le sei aree e ha risposte valide", () => {
    expect(quiz.length).toBeGreaterThanOrEqual(25);
    expect(new Set(quiz.map((item) => item.area))).toEqual(new Set(quizAreas));
    expect(new Set(quiz.map((item) => item.q)).size).toBe(quiz.length);
    expect(
      quiz.some((item) => /kranzberg|atlas of ai|crawford|floridi|zuboff/i.test(item.q + item.explanation)),
    ).toBe(false);
    const correctPositions = [0, 0, 0];
    for (const item of quiz) {
      expect(item.a).toHaveLength(3);
      expect(item.correct).toBeGreaterThanOrEqual(0);
      expect(item.correct).toBeLessThan(item.a.length);
      expect(item.explanation.length).toBeGreaterThan(40);
      correctPositions[item.correct] += 1;
    }
    for (const count of correctPositions) expect(count).toBeGreaterThanOrEqual(5);
  });
});

describe("riferimenti al testo", () => {
  it("ogni domanda rimanda a un passaggio realmente presente", () => {
    expect(QUIZ_SOURCES).toHaveLength(quiz.length);
    QUIZ_SOURCES.forEach((source, index) => {
      const section = documents.documents[source.doc]?.sections[source.section];
      expect(section, `domanda ${index + 1}: sezione ${source.doc}:${source.section}`).toBeDefined();
      const found = section?.paragraphs.some((paragraph) =>
        paragraph.text.toLowerCase().includes(source.term.toLowerCase()),
      );
      expect(found, `domanda ${index + 1}: termine «${source.term}»`).toBe(true);
    });
  });
});

describe("selectQuizQuestions", () => {
  const bank = [
    ...Array.from({ length: 4 }, (_, i) => ({ area: "A", q: `A${i}` })),
    ...Array.from({ length: 4 }, (_, i) => ({ area: "B", q: `B${i}` })),
    ...Array.from({ length: 4 }, (_, i) => ({ area: "C", q: `C${i}` })),
  ];

  it("estrae il numero richiesto e copre tutte le aree", () => {
    const picked = selectQuizQuestions(bank, 6, 42);
    expect(picked).toHaveLength(6);
    expect(new Set(picked.map((item) => item.area))).toEqual(new Set(["A", "B", "C"]));
  });

  it("è stabile con lo stesso seed e cambia con seed diversi", () => {
    expect(selectQuizQuestions(bank, 6, 7).map((item) => item.q)).toEqual(
      selectQuizQuestions(bank, 6, 7).map((item) => item.q),
    );
    expect(selectQuizQuestions(bank, 6, 7).map((item) => item.q)).not.toEqual(
      selectQuizQuestions(bank, 6, 8).map((item) => item.q),
    );
  });
});
