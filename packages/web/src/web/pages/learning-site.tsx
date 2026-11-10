import { useEffect, useMemo, useState } from "react";
import content from "../data/documents.json";
import { SearchDialog } from "../components/search-dialog";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { DebateSection } from "../sections/debate-section";
import { DocumentsSection } from "../sections/documents-section";
import { GlossarySection } from "../sections/glossary-section";
import { HomeSection } from "../sections/home-section";
import { LabSection, type LabView } from "../sections/lab-section";
import { searchDocuments, type SearchResult } from "../lib/search";
import { STORAGE_KEYS, type Tab } from "../lib/site";
import { applyTheme, initialTheme, type Theme } from "../lib/theme";
import { useHashTab } from "../lib/use-hash-tab";
import { useIdlePrefetch } from "../lib/use-idle-prefetch";
import { usePageMeta } from "../lib/use-page-meta";
import { useStored } from "../lib/use-stored";

const prefetchLaboratory = () => import("../components/model-comparison");

export default function LearningSite() {
  const [tab, navigate] = useHashTab("Percorso");
  usePageMeta(tab);

  const [docIndex, setDocIndex] = useState(0);
  const [section, setSection] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [labView, setLabView] = useState<LabView>("confronto");
  const [completed, setCompleted] = useStored<number[]>(STORAGE_KEYS.completed, []);
  const [bestScore, setBestScore] = useStored<number | null>(STORAGE_KEYS.bestScore, null);
  const [theme, setTheme] = useStored<Theme>(STORAGE_KEYS.theme, initialTheme);

  useIdlePrefetch(prefetchLaboratory);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const results = useMemo(() => searchDocuments(content.documents, query), [query]);

  const go = (next: Tab) => {
    navigate(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const read = (documentIndex: number, sectionIndex: number) => {
    setDocIndex(documentIndex);
    setSection(sectionIndex);
    setSearchOpen(false);
    go("Documenti");
  };

  const selectResult = (result: SearchResult) => read(result.di, result.si);

  const toggleComplete = (index: number) => {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index],
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
        completedCount={completed.length}
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

      {tab === "Glossario" && <GlossarySection />}

      {tab === "Dibattito" && <DebateSection />}

      <SiteFooter
        onOpenDocuments={() => {
          setDocIndex(0);
          setSection(0);
          go("Documenti");
        }}
      />

      {searchOpen && (
        <SearchDialog
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
