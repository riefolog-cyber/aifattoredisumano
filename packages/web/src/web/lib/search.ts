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

export const MAX_SEARCH_RESULTS = 60;

export function searchDocuments(
  documents: readonly SearchDocument[],
  query: string,
  limit = MAX_SEARCH_RESULTS,
): SearchResult[] {
  const term = query.toLowerCase().trim();
  if (term.length < 2) return [];
  const results: SearchResult[] = [];
  for (let di = 0; di < documents.length; di++) {
    const document = documents[di];
    for (let si = 0; si < document.sections.length; si++) {
      const section = document.sections[si];
      for (const paragraph of section.paragraphs) {
        if (paragraph.text.toLowerCase().includes(term)) {
          results.push({ di, si, title: section.title, doc: document.name, text: paragraph.text });
          if (results.length >= limit) return results;
        }
      }
    }
  }
  return results;
}
