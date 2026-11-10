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
