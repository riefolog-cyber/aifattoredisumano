import { describe, expect, it } from "vitest";
import { buildProgressSnapshot, parseProgressSnapshot } from "./progress";

describe("progressi esportabili", () => {
  it("crea un backup versionato e normalizza i capitoli", () => {
    const snapshot = buildProgressSnapshot(["1:0", "0:2"], 7);
    expect(snapshot).toMatchObject({
      app: "il-fattore-umano",
      version: 1,
      completed: ["1:0", "0:2"],
      bestScore: 7,
    });
  });

  it("rilegge un backup valido", () => {
    const snapshot = buildProgressSnapshot(["1:0"], null);
    expect(parseProgressSnapshot(JSON.stringify(snapshot))).toEqual({
      completed: ["1:0"],
      bestScore: null,
    });
  });

  it("rifiuta file di altre applicazioni o con capitoli non validi", () => {
    expect(() => parseProgressSnapshot("{")).toThrow("JSON valido");
    expect(() => parseProgressSnapshot(JSON.stringify({ app: "altro", version: 1 }))).toThrow(
      "backup dei progressi",
    );
    expect(() =>
      parseProgressSnapshot(
        JSON.stringify({ app: "il-fattore-umano", version: 1, completed: ["x"], bestScore: null }),
      ),
    ).toThrow("capitoli");
    expect(() =>
      parseProgressSnapshot(
        JSON.stringify({ app: "il-fattore-umano", version: 1, completed: [], bestScore: 12 }),
      ),
    ).toThrow("Punteggio");
  });
});
