import { Component, type ReactNode } from "react";

type ErrorBoundaryState = { failed: boolean };

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-fallback">
        <p className="eyebrow">QUALCOSA NON HA FUNZIONATO</p>
        <h1>La pagina non si è caricata.</h1>
        <p>Ricarica per riprovare: i progressi restano salvati su questo dispositivo.</p>
        <div className="error-actions">
          <button className="primary" onClick={() => window.location.reload()}>
            Ricarica
          </button>
          <a className="text-button" href={import.meta.env.BASE_URL}>
            Torna al percorso
          </a>
        </div>
      </main>
    );
  }
}
