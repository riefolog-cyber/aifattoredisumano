import { useDeferredValue, useEffect, useMemo, useState } from "react";
import content from "../data/documents.json";
import { SearchDialog } from "../components/search-dialog";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { DebateSection } from "../sections/debate-section";
import { DocumentsSection } from "../sections/documents-section";
import { GlossarySection } from "../sections/glossary-section";
import { HomeSection } from "../sections/home-section";
import { TeachersSection } from "../sections/teachers-section";
import { LabSection, type LabView } from "../sections/lab-section";
import { searchDocuments, type SearchResult } from "../lib/search";
import {
  CHAPTERS,
  STORAGE_KEYS,
  chapterKey,
  isSectionVisible,
  normalizeCompleted,
  type Tab,
} from "../lib/site";
import { applyTheme, initialTheme, type Theme } from "../lib/theme";
import { useHashTab } from "../lib/use-hash-tab";
import { useIdlePrefetch } from "../lib/use-idle-prefetch";
import { usePageMeta } from "../lib/use-page-meta";
import { useStored } from "../lib/use-stored";

const prefetchLaboratory = () => import("../components/model-comparison");

/**
 * La sezione glossario in coda alla Guida didattica è coperta dal tab
 * Glossario: la si svuota per la ricerca mantenendo gli indici originali.
 */
const searchableDocuments = content.documents.map((document, di) => ({
  ...document,
  sections: document.sections.map((section, si) =>
    isSectionVisible(di, si) ? section : { ...section, paragraphs: [] },
  ),
}));

export default function LearningSite() {
  const [tab, navigate] = useHashTab("Percorso");
  usePageMeta(tab);

  const [docIndex, setDocIndex] = useState(0);
  const [section, setSection] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [labView, setLabView] = useState<LabView>("confronto");
  const [completedStored, setCompletedStored] = useStored<(number | string)[]>(
    STORAGE_KEYS.completed,
    [],
  );
  const completed = useMemo(() => normalizeCompleted(completedStored), [completedStored]);
  const pathCompleted = CHAPTERS.filter(([, , , doc, section]) =>
    completed.includes(chapterKey(doc, section)),
  ).length;
  const [bestScore, setBestScore] = useStored<number | null>(STORAGE_KEYS.bestScore, null);
  const [theme, setTheme] = useStored<Theme>(STORAGE_KEYS.theme, initialTheme);

  useIdlePrefetch(prefetchLaboratory);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const results = useMemo(
    () => searchDocuments(searchableDocuments, deferredQuery),
    [deferredQuery],
  );

  const go = (next: Tab) => {
    navigate(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const read = (documentIndex: number, sectionIndex: number) => {
    setDocIndex(documentIndex);
    setSection(sectionIndex);
    setSearchOpen(false);
    go("Documenti");
  };

  const selectResult = (result: SearchResult) => read(result.di, result.si);

  const toggleComplete = (key: string) => {
    const next = normalizeCompleted(completedStored);
    setCompletedStored(
      next.includes(key) ? next.filter((value) => value !== key) : [...next, key],
    );
  };

  return (
    <div className="site-shell">
      <a
        className="skip-link"
        href="#contenuto"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("contenuto");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Vai al contenuto
      </a>

      <SiteHeader
        tab={tab}
        completedCount={pathCompleted}
        theme={theme}
        onNavigate={go}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {tab === "Percorso" && (
        <HomeSection
          completed={completed}
          bestScore={bestScore}
          onRead={read}
          onNavigate={go}
          onStartQuiz={() => {
            setLabView("quiz");
            go("Laboratorio");
          }}
          onOpenLab={() => {
            setLabView("confronto");
            go("Laboratorio");
          }}
        />
      )}

      {tab === "Documenti" && (
        <DocumentsSection
          docIndex={docIndex}
          section={section}
          completed={completed}
          onSelectDoc={(index) => {
            setDocIndex(index);
            setSection(0);
          }}
          onSelectSection={setSection}
          onToggleComplete={toggleComplete}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {tab === "Laboratorio" && (
        <LabSection
          labView={labView}
          bestScore={bestScore}
          onLabViewChange={setLabView}
          onBestScore={setBestScore}
        />
      )}

      {tab === "Glossario" && <GlossarySection onRead={read} />}

      {tab === "Dibattito" && <DebateSection />}

      {tab === "Docenti" && (
        <TeachersSection
          onNavigate={go}
          onRead={read}
          onOpenLab={() => {
            setLabView("confronto");
            go("Laboratorio");
          }}
          onStartQuiz={() => {
            setLabView("quiz");
            go("Laboratorio");
          }}
        />
      )}

      <SiteFooter
        onOpenDocuments={() => {
          setDocIndex(0);
          setSection(0);
          go("Documenti");
        }}
      />

      {searchOpen && (
        <SearchDialog
          highlightQuery={deferredQuery}
          query={query}
          results={results}
          onQueryChange={setQuery}
          onSelect={selectResult}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </div>
  );
}
