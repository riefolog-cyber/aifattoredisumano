import { useEffect, useState } from "react";
import { TAB_SLUGS, tabFromHash, type Tab } from "./site";

/**
 * Sincronizza la scheda attiva con l'hash dell'URL (#/documenti, #/dibattito…)
 * così i link diretti e i pulsanti avanti/indietro del browser funzionano.
 */
export function useHashTab(fallback: Tab = "Percorso") {
  const [tab, setTab] = useState<Tab>(() => tabFromHash() ?? fallback);

  useEffect(() => {
    if (!tabFromHash()) {
      window.history.replaceState(null, "", `#/${TAB_SLUGS[fallback]}`);
    }
    const sync = () => setTab(tabFromHash() ?? fallback);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [fallback]);

  const navigate = (next: Tab) => {
    setTab(next);
    const hash = `#/${TAB_SLUGS[next]}`;
    if (window.location.hash !== hash) window.location.hash = hash;
  };

  return [tab, navigate] as const;
}
