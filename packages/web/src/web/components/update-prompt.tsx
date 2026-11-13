import { useEffect, useState } from "react";

/** Avvisa quando una nuova versione del service worker prende il controllo. */
export function UpdatePrompt() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !navigator.serviceWorker.controller) return;
    const onControllerChange = () => setReady(true);
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () =>
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
  }, []);

  if (!ready) return null;
  return (
    <div className="update-prompt" role="status">
      <span>Nuova versione disponibile.</span>
      <button onClick={() => window.location.reload()}>Ricarica</button>
    </div>
  );
}
