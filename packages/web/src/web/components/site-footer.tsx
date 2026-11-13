import { ArrowUpRight, Brain } from "lucide-react";
import { AUTHOR } from "../lib/site";

type SiteFooterProps = {
  onOpenDocuments: () => void;
  onOpenSources: () => void;
};

export function SiteFooter({ onOpenDocuments, onOpenSources }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div>
        <Brain size={19} />
        <span>IL FATTORE UMANO</span>
      </div>
      <p>
        La tecnologia come strumento. Il pensiero come scelta.
        <span className="footer-credit">
          Realizzato dal {AUTHOR.name} — {AUTHOR.role}.
        </span>
      </p>
      <nav className="footer-links" aria-label="Riferimenti">
        <button onClick={onOpenDocuments}>
          Testi integrali <ArrowUpRight size={14} />
        </button>
        <button onClick={onOpenSources}>
          Fonti e letture <ArrowUpRight size={14} />
        </button>
      </nav>
    </footer>
  );
}
