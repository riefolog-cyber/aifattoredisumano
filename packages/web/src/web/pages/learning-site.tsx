import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import content from "../data/documents.json";
import { SearchDialog } from "../components/search-dialog";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { UpdatePrompt } from "../components/update-prompt";
import { DebateSection } from "../sections/debate-section";
import { DocumentsSection } from "../sections/documents-section";
import { GlossarySection } from "../sections/glossary-section";
import { HomeSection } from "../sections/home-section";
import { TeachersSection } from "../sections/teachers-section";
import { LabSection, type LabView } from "../sections/lab-section";
import { downloadJson } from "../lib/download";
import { buildProgressSnapshot, parseProgressSnapshot } from "../lib/progress";
import { searchDocuments, type SearchResult } from "../lib/search";
import {
  CHAPTERS,
  STORAGE_KEYS,
  chapterFromHash,
  chapterHash,
  chapterKey,
  isSectionVisible,
  normalizeCompleted,
  type ChapterRef,
  type Tab,
} from "../lib/site";
import { applyTheme, initialTheme, type Theme } from "../lib/theme";
import { useHashTab } from "../lib/use-hash-tab";
import { useIdlePrefetch } from "../lib/use-idle-prefetch";
import { usePageMeta } from "../lib/use-page-meta";
import { useStored } from "../lib/use-stored";

const prefetchLaboratory = () => import("../components/model-comparison");

type SearchFocus = {
  di: number;
  si: number;
  pi: number;
  query: string;
  shown: boolean;
};

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

function resolveChapter(ref: ChapterRef | null): ChapterRef {
  if (!ref) return { doc: 0, section: 0 };
  const doc = Math.min(Math.max(ref.doc, 0), content.documents.length - 1);
  const sections = content.documents[doc].sections;
  let section = Math.min(Math.max(ref.section, 0), sections.length - 1);
  if (!isSectionVisible(doc, section)) {
    section = sections.findIndex((_, index) => isSectionVisible(doc, index));
  }
  return { doc, section: Math.max(section, 0) };
}

export default function LearningSite() {
  const [tab, navigate] = useHashTab("Percorso");
  usePageMeta(tab);

  const [docIndex, setDocIndex] = useState(() => resolveChapter(chapterFromHash()).doc);
  const [section, setSection] = useState(() => resolveChapter(chapterFromHash()).section);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState<SearchFocus | null>(null);
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
  const [announcement, setAnnouncement] = useState("");
  const previousTab = useRef(tab);

  useIdlePrefetch(prefetchLaboratory);

  // Le schede sono route interne: sposta il focus e annuncia il cambio.
  useEffect(() => {
    if (previousTab.current === tab) return;
    previousTab.current = tab;
    const main = document.getElementById("contenuto");
    main?.focus({ preventScroll: true });
    setAnnouncement(`Sezione ${tab} aperta.`);
  }, [tab]);

  // "/" e Ctrl/Cmd+K aprono la ricerca; "/" resta affidabile anche dove
  // il browser riserva Ctrl+K alla barra degli indirizzi.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen(true);
        return;
      }
      const target = event.target instanceof HTMLElement ? event.target : null;
      const typing =
        target?.isContentEditable ||
        (target ? ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) : false);
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Il riferimento alla ricerca vale solo mentre si legge quel capitolo.
  useEffect(() => {
    if (tab !== "Documenti") setSearchFocus(null);
  }, [tab]);

  // Il capitolo aperto resta nell'URL, così è condivisibile e ricaricabile.
  useEffect(() => {
    if (tab !== "Documenti") return;
    const next = chapterHash(docIndex, section);
    if (window.location.hash !== next) window.history.replaceState(null, "", next);
  }, [tab, docIndex, section]);

  useEffect(() => {
    const syncChapter = () => {
      const ref = chapterFromHash();
      if (!ref) return;
      const next = resolveChapter(ref);
      setDocIndex(next.doc);
      setSection(next.section);
    };
    window.addEventListener("hashchange", syncChapter);
    return () => window.removeEventListener("hashchange", syncChapter);
  }, []);

  const results = useMemo(
    () => searchDocuments(searchableDocuments, deferredQuery),
    [deferredQuery],
  );

  const go = (next: Tab) => {
    setSearchFocus(null);
    navigate(next);
    if (next === "Documenti") {
      window.history.replaceState(null, "", chapterHash(docIndex, section));
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const read = (
    documentIndex: number,
    sectionIndex: number,
    match?: { pi: number; query: string },
  ) => {
    setDocIndex(documentIndex);
    setSection(sectionIndex);
    setSearchOpen(false);
    setSearchFocus(
      match ? { di: documentIndex, si: sectionIndex, ...match, shown: false } : null,
    );
    navigate("Documenti");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const selectResult = (result: SearchResult) =>
    read(result.di, result.si, { pi: result.pi, query: deferredQuery });

  const markSearchFocusShown = useCallback(() => {
    setSearchFocus((current) => (current && !current.shown ? { ...current, shown: true } : current));
  }, []);

  const toggleComplete = (key: string) => {
    const next = normalizeCompleted(completedStored);
    setCompletedStored(
      next.includes(key) ? next.filter((value) => value !== key) : [...next, key],
    );
  };

  const exportProgress = () => {
    downloadJson("il-fattore-umano-progressi.json", buildProgressSnapshot(completed, bestScore));
    return `Backup creato: ${completed.length} capitoli completati${
      bestScore !== null ? `, record ${bestScore}/10` : ""
    }.`;
  };

  const importProgress = async (file: File) => {
    try {
      const parsed = parseProgressSnapshot(await file.text());
      if (
        (completed.length > 0 || bestScore !== null) &&
        !window.confirm("Sostituire i progressi presenti con quelli del file?")
      ) {
        return "Importazione annullata.";
      }
      setCompletedStored(parsed.completed);
      setBestScore(parsed.bestScore);
      return `Importati ${parsed.completed.length} capitoli completati.`;
    } catch (error) {
      return error instanceof Error ? error.message : "File non valido.";
    }
  };

  return (
    <div className="site-shell">
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

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
          focus={searchFocus}
          onFocusShown={markSearchFocusShown}
          completed={completed}
          onSelectDoc={(index) => {
            setDocIndex(index);
            setSection(0);
            setSearchFocus(null);
          }}
          onSelectSection={(index) => {
            setSection(index);
            setSearchFocus(null);
          }}
          onToggleComplete={toggleComplete}
          onOpenSearch={() => setSearchOpen(true)}
          onExportProgress={exportProgress}
          onImportProgress={importProgress}
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

      <UpdatePrompt />

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
