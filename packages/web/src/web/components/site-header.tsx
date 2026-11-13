import { useEffect, useRef, useState } from "react";
import { Brain, Menu, Moon, Search, Sun } from "lucide-react";
import { TABS, type Tab } from "../lib/site";
import type { Theme } from "../lib/theme";

type SiteHeaderProps = {
  tab: Tab;
  completedCount: number;
  theme: Theme;
  onNavigate: (tab: Tab) => void;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
};

export function SiteHeader({
  tab,
  completedCount,
  theme,
  onNavigate,
  onToggleTheme,
  onOpenSearch,
}: SiteHeaderProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  // Fonti è una pagina di riferimento: si raggiunge dal footer e da Docenti,
  // non occupa una voce nella navigazione principale.
  const navTabs = TABS.filter((item) => item !== "Fonti");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileMenu) return;
    const close = () => setMobileMenu(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (navRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileMenu]);

  const go = (next: Tab) => {
    setMobileMenu(false);
    onNavigate(next);
  };

  return (
    <header className="header">
      <button className="brand" onClick={() => go("Percorso")} aria-label="Il Fattore Umano, home">
        <span className="brand-icon">
          <Brain size={24} />
        </span>
        <span>
          IL FATTORE
          <br />
          <b>UMANO</b>
        </span>
      </button>
      <nav
        className={mobileMenu ? "nav open" : "nav"}
        id="main-nav"
        ref={navRef}
        aria-label="Navigazione principale"
      >
        {navTabs.map((item) => (
          <button
            key={item}
            onClick={() => go(item)}
            className={tab === item ? "active" : ""}
            aria-current={tab === item ? "page" : undefined}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="header-tools">
        <button
          className="search-button"
          onClick={onOpenSearch}
          aria-label="Cerca nei documenti"
          aria-keyshortcuts="/ Control+K Meta+K"
          title="Cerca nei documenti ( / )"
        >
          <Search size={19} />
          <span>Cerca</span>
        </button>
        <button
          className="theme-button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Attiva il tema chiaro" : "Attiva il tema scuro"}
          aria-pressed={theme === "light"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === "dark" ? "Tema chiaro" : "Tema scuro"}</span>
        </button>
        <button
          className="my-progress"
          onClick={() => {
            go("Percorso");
            window.setTimeout(
              () => document.getElementById("percorso")?.scrollIntoView({ behavior: "smooth" }),
              80,
            );
          }}
        >
          <span className="progress-dot" />
          {completedCount}/6 <span>capitoli</span>
        </button>
        <button
          className="menu-button"
          ref={menuButtonRef}
          aria-label={mobileMenu ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenu}
          aria-controls="main-nav"
          onClick={() => setMobileMenu((open) => !open)}
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
