import { describe, expect, it } from "vitest";
import {
  MAX_SEARCH_RESULTS,
  makeSnippet,
  searchDocuments,
  type SearchDocument,
} from "./search";

const documents: SearchDocument[] = [
  {
    name: "Documento A",
    sections: [
      {
        title: "1. La bussola",
        paragraphs: [
          { text: "La tecnologia è uno strumento, non un sostituto del pensiero." },
          { text: "Delegare la memoria riduce l'attrito cognitivo." },
        ],
      },
    ],
  },
  {
    name: "Documento B",
    sections: [
      {
        title: "1. Il linguaggio",
        paragraphs: [{ text: "Le parole che usiamo somigliano a chi le pronuncia." }],
      },
    ],
  },
];

describe("searchDocuments", () => {
  it("ignora ricerche più corte di due caratteri", () => {
    expect(searchDocuments(documents, "a")).toEqual([]);
    expect(searchDocuments(documents, " ")).toEqual([]);
  });

  it("trova i passaggi e conserva documento, capitolo e titolo", () => {
    const results = searchDocuments(documents, "pensiero");
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({ di: 0, si: 0, doc: "Documento A", title: "1. La bussola" });
  });

  it("cerca senza distinzione tra maiuscole e minuscole e in tutti i documenti", () => {
    const results = searchDocuments(documents, "PAROLE");
    expect(results).toHaveLength(1);
    expect(results[0].doc).toBe("Documento B");
  });

  it("restituisce un array vuoto quando non c'è alcun passaggio", () => {
    expect(searchDocuments(documents, "algoritmo")).toEqual([]);
  });

  it("limita i risultati a MAX_SEARCH_RESULTS per non appesantire il DOM", () => {
    const many: SearchDocument[] = [
      {
        name: "Documento lungo",
        sections: [
          {
            title: "1. Capitolo",
            paragraphs: Array.from({ length: MAX_SEARCH_RESULTS + 40 }, (_, i) => ({
              text: `Paragrafo ${i} con parola comune presente ovunque`,
            })),
          },
        ],
      },
    ];
    const results = searchDocuments(many, "parola comune");
    expect(results).toHaveLength(MAX_SEARCH_RESULTS);
    expect(MAX_SEARCH_RESULTS).toBe(60);
  });

  it("rispetta un limite personalizzato", () => {
    const many: SearchDocument[] = [
      {
        name: "Documento lungo",
        sections: [
          {
            title: "1. Capitolo",
            paragraphs: Array.from({ length: 10 }, (_, i) => ({
              text: `Paragrafo ${i} con parola comune presente ovunque`,
            })),
          },
        ],
      },
    ];
    expect(searchDocuments(many, "parola comune", 3)).toHaveLength(3);
  });
});

describe("makeSnippet", () => {
  it("lascia intatto un testo breve", () => {
    expect(makeSnippet("testo breve", "breve", 100)).toBe("testo breve");
  });

  it("ritaglia il testo attorno alla ricerca", () => {
    const text = `${"x".repeat(200)}parola chiave${"y".repeat(200)}`;
    const snippet = makeSnippet(text, "parola chiave", 120);
    expect(snippet.length).toBeLessThanOrEqual(121);
    expect(snippet).toContain("parola chiave");
    expect(snippet.endsWith("…")).toBe(true);
  });
});
