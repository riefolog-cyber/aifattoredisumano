// Entry point referenced by index.html — composition only, real bootstrap
// lives in __main.tsx (template-managed).
// Font self-hosted (niente richieste a Google Fonts, disponibili anche offline).
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./__main";

// PWA: la registrazione avviene solo in produzione, così il dev server
// (e l'HMR di Vite) non viene mai intercettato dal service worker.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // offline non disponibile: il sito funziona comunque online
    });
  });
}
