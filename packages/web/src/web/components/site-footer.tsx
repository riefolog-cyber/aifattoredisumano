import { ArrowUpRight, Brain } from "lucide-react";
import { AUTHOR } from "../lib/site";

export function SiteFooter({ onOpenDocuments }: { onOpenDocuments: () => void }) {
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
      <button onClick={onOpenDocuments}>
        Fonti e documenti <ArrowUpRight size={14} />
      </button>
    </footer>
  );
}
