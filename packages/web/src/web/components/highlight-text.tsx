/** Evidenzia le occorrenze esatte di un termine, senza distinzione di maiuscole. */
export function HighlightText({ text, term }: { text: string; term: string }) {
  const needle = term.trim();
  if (needle.length < 2) return <>{text}</>;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lower = needle.toLowerCase();
  return (
    <>
      {text.split(new RegExp(`(${escaped})`, "gi")).map((part, index) =>
        part.toLowerCase() === lower ? (
          <mark className="search-term" key={index}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
