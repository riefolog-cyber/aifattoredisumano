import { useEffect } from "react";

/**
 * Precarica un modulo quando il browser è inattivo, così l'apertura
 * del laboratorio è immediata senza pesare sul primo caricamento.
 */
export function useIdlePrefetch(load: () => Promise<unknown>) {
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) void load();
    };
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(run, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(run, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [load]);
}
