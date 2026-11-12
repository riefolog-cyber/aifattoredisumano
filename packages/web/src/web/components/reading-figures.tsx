export type FigureKind =
  | "bussola"
  | "circuiti"
  | "voci"
  | "clessidra"
  | "dialogo"
  | "rete"
  | "bilancia";

export type SectionFigure = {
  kind: FigureKind;
  caption: string;
};

/**
 * Una figura illustrativa per capitolo della Biblioteca: grafica vettoriale
 * leggera sul tema del testo, senza modificare i contenuti originali.
 */
export const FIGURE_FOR_SECTION: Record<string, SectionFigure> = {
  "0:0": {
    kind: "bussola",
    caption: "La bussola orienta senza cambiare chi la impugna.",
  },
  "0:1": {
    kind: "circuiti",
    caption: "I circuiti non esercitati si potano: il cervello risparmia, la competenza si assottiglia.",
  },
  "0:2": {
    kind: "voci",
    caption: "Voci diverse, stesso stampo: il rischio dell'omologazione.",
  },
  "0:3": {
    kind: "clessidra",
    caption: "Il pensiero ha bisogno di tempo lento.",
  },
  "0:4": {
    kind: "dialogo",
    caption: "Domanda e risposta: il dialogo che fa pensare.",
  },
  "1:0": {
    kind: "bilancia",
    caption: "Soppesare i fatti prima di giudicare.",
  },
  "1:1": {
    kind: "circuiti",
    caption: "Delegare tutto atrofizza i circuiti complessi.",
  },
  "1:2": {
    kind: "voci",
    caption: "Fluido non significa pensato: la forma non garantisce il pensiero.",
  },
  "1:3": {
    kind: "rete",
    caption: "Pochi nodi, molto potere: la rete accentrata.",
  },
  "1:4": {
    kind: "clessidra",
    caption: "L'istante divora la prospettiva.",
  },
  "1:5": {
    kind: "dialogo",
    caption: "Dall'oracolo al dialogo: ricomporre il metodo.",
  },
};

const INK = "#33413c";
const FAINT = "#9aa59e";
const ACID = "#5f8607";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 150"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

function Bussola() {
  return (
    <Frame>
      <circle cx="200" cy="75" r="52" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="200" cy="75" r="44" fill="none" stroke={INK} strokeWidth="0.75" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const long = deg % 90 === 0;
        const r1 = long ? 52 : 48;
        const r2 = long ? 44 : 48;
        return (
          <line
            key={deg}
            x1={200 + r1 * Math.cos(rad)}
            y1={75 + r1 * Math.sin(rad)}
            x2={200 + r2 * Math.cos(rad)}
            y2={75 + r2 * Math.sin(rad)}
            stroke={INK}
            strokeWidth={long ? 2 : 1}
          />
        );
      })}
      <polygon points="200,35 206,75 194,75" fill={ACID} />
      <polygon points="200,115 206,75 194,75" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="200" cy="75" r="4" fill={INK} />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">STRUMENTO · MENTE</text>
    </Frame>
  );
}

function Circuiti() {
  const nodes: [number, number][] = [
    [60, 45], [130, 30], [200, 55], [270, 35], [340, 60],
    [90, 105], [170, 115], [250, 100], [320, 115],
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 8], [5, 6], [6, 7], [7, 8]];
  const pruned: [number, number][] = [[4, 8]];
  return (
    <Frame>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={INK} strokeWidth="1.5"
        />
      ))}
      {pruned.map(([a, b], i) => (
        <line
          key={`p${i}`}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={FAINT} strokeWidth="1.5" strokeDasharray="5 4"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={i === 2 ? ACID : "#f5f5ed"} stroke={INK} strokeWidth="2" />
      ))}
      <circle cx={nodes[8][0]} cy={nodes[8][1]} r="9" fill="none" stroke={FAINT} strokeWidth="1" strokeDasharray="3 3" />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">USALO O PERDILO</text>
    </Frame>
  );
}

function Voci() {
  return (
    <Frame>
      <path
        d="M40 45 Q70 15 100 45 T160 45 T220 45 Q250 45 260 25 Q270 45 300 45 T360 45"
        fill="none" stroke={INK} strokeWidth="2"
      />
      <path
        d="M40 95 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0"
        fill="none" stroke={ACID} strokeWidth="2"
      />
      <text x="40" y="30" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="2">VOCI VIVE</text>
      <text x="40" y="125" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="2">STESSO STAMPO</text>
    </Frame>
  );
}

function Clessidra() {
  return (
    <Frame>
      <line x1="160" y1="20" x2="240" y2="20" stroke={INK} strokeWidth="2.5" />
      <line x1="160" y1="115" x2="240" y2="115" stroke={INK} strokeWidth="2.5" />
      <path d="M165 20 L235 20 L210 67 L235 115 L165 115 L190 67 Z" fill="none" stroke={INK} strokeWidth="2" />
      <polygon points="190,67 210,67 200,100" fill={ACID} opacity="0.85" />
      <circle cx="200" cy="45" r="1.6" fill={INK} />
      <circle cx="196" cy="52" r="1.6" fill={INK} />
      <circle cx="204" cy="55" r="1.6" fill={INK} />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">TEMPO LENTO</text>
    </Frame>
  );
}

function Dialogo() {
  return (
    <Frame>
      <rect x="70" y="30" width="120" height="56" rx="12" fill="none" stroke={INK} strokeWidth="2" />
      <polygon points="100,86 100,102 118,86" fill="none" stroke={INK} strokeWidth="2" />
      <text x="130" y="65" textAnchor="middle" fontSize="26" fill={ACID} fontFamily="Georgia, serif">?</text>
      <rect x="210" y="55" width="120" height="56" rx="12" fill={INK} opacity="0.08" stroke={INK} strokeWidth="2" />
      <polygon points="300,111 300,127 282,111" fill="#f5f5ed" stroke={INK} strokeWidth="2" />
      <text x="270" y="90" textAnchor="middle" fontSize="22" fill={INK} fontFamily="Georgia, serif">…</text>
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">DOMANDA · RISPOSTA</text>
    </Frame>
  );
}

function Rete() {
  const sats: [number, number][] = [[90, 45], [150, 100], [250, 100], [310, 45], [200, 30], [120, 110]];
  return (
    <Frame>
      {sats.map(([x, y], i) => (
        <line key={i} x1="200" y1="72" x2={x} y2={y} stroke={INK} strokeWidth="1.25" opacity="0.7" />
      ))}
      {sats.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#f5f5ed" stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="200" cy="72" r="16" fill={ACID} />
      <circle cx="200" cy="72" r="16" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="200" cy="72" r="5" fill="#f5f5ed" />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">POCHI NODI · MOLTO POTERE</text>
    </Frame>
  );
}

function Bilancia() {
  return (
    <Frame>
      <line x1="200" y1="18" x2="200" y2="118" stroke={INK} strokeWidth="2.5" />
      <line x1="120" y1="42" x2="280" y2="42" stroke={INK} strokeWidth="2" />
      <line x1="185" y1="118" x2="215" y2="118" stroke={INK} strokeWidth="2.5" />
      <line x1="140" y1="42" x2="115" y2="80" stroke={INK} strokeWidth="1.5" />
      <line x1="140" y1="42" x2="165" y2="80" stroke={INK} strokeWidth="1.5" />
      <path d="M105 80 A35 22 0 0 0 175 80" fill="none" stroke={INK} strokeWidth="2" />
      <line x1="260" y1="42" x2="235" y2="80" stroke={INK} strokeWidth="1.5" />
      <line x1="260" y1="42" x2="285" y2="80" stroke={INK} strokeWidth="1.5" />
      <path d="M225 80 A35 22 0 0 0 295 80" fill="none" stroke={ACID} strokeWidth="2.5" />
      <circle cx="200" cy="42" r="4" fill={INK} />
      <text x="200" y="140" textAnchor="middle" fontSize="9" fill={INK} fontFamily="monospace" letterSpacing="3">FATTI · PROVE · GIUDIZIO</text>
    </Frame>
  );
}

export function ReadingFigure({ kind }: { kind: FigureKind }) {
  switch (kind) {
    case "bussola":
      return <Bussola />;
    case "circuiti":
      return <Circuiti />;
    case "voci":
      return <Voci />;
    case "clessidra":
      return <Clessidra />;
    case "dialogo":
      return <Dialogo />;
    case "rete":
      return <Rete />;
    case "bilancia":
      return <Bilancia />;
  }
}
