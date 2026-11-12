import { useState } from "react";
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
      <nav className={mobileMenu ? "nav open" : "nav"} aria-label="Navigazione principale">
        {TABS.map((item) => (
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
        <button className="search-button" onClick={onOpenSearch} aria-label="Cerca nei documenti">
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
          aria-label={mobileMenu ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu((open) => !open)}
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
