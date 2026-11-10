export type SearchParagraph = { text: string };
export type SearchSection = { title: string; paragraphs: readonly SearchParagraph[] };
export type SearchDocument = { name: string; sections: readonly SearchSection[] };

export type SearchResult = {
  di: number;
  si: number;
  title: string;
  doc: string;
  text: string;
};

export function makeSnippet(text: string, query: string, size = 300) {
  if (text.length <= size) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase().trim());
  const start = Math.max(0, index - 80);
  return text.slice(start, start + size) + "…";
}

export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
): SearchResult[] {
  const term = query.toLowerCase().trim();
  if (term.length < 2) return [];
  return documents.flatMap((document, di) =>
    document.sections.flatMap((section, si) =>
      section.paragraphs
        .filter((paragraph) => paragraph.text.toLowerCase().includes(term))
        .map((paragraph) => ({
          di,
          si,
          title: section.title,
          doc: document.name,
          text: paragraph.text,
        })),
    ),
  );
}
