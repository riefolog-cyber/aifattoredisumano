import { useEffect } from "react";
import { PAGE_TITLES, TAB_SLUGS, type Tab } from "./site";

/**
 * Aggiorna titolo, canonical e og:url in base alla scheda attiva.
 * Il canonical resta senza hash (pagina unica), og:url include la scheda.
 */
export function usePageMeta(tab: Tab) {
  useEffect(() => {
    document.title = PAGE_TITLES[tab];

    const baseUrl = window.location.origin + window.location.pathname;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = baseUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = `${baseUrl}#/${TAB_SLUGS[tab]}`;

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = PAGE_TITLES[tab];
  }, [tab]);
}
