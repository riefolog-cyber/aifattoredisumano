import { GraduationCap } from "lucide-react";
import { AUTHOR } from "../lib/site";

export function AuthorCredit() {
  return (
    <aside className="author-credit" aria-label="Crediti del progetto">
      <span className="author-icon">
        <GraduationCap size={21} />
      </span>
      <div>
        <span className="label">REALIZZATO DA</span>
        <p>
          <strong>{AUTHOR.name}</strong>
          <span>{AUTHOR.role}</span>
        </p>
      </div>
    </aside>
  );
}
