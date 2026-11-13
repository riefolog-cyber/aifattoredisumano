import type { CoverMotif, PathChapter } from "../data/path";

type ChapterCoverProps = {
  chapter: PathChapter;
  fullTitle: string;
  total: number;
  minutes: number;
};

export function ChapterCover({ chapter, fullTitle, total, minutes }: ChapterCoverProps) {
  const number = String(chapter.order).padStart(2, "0");
  return (
    <header className={`chapter-cover cover-${chapter.motif}`}>
      <div className="cover-copy">
        <div className="cover-kicker">
          <span>TAPPA {number}</span>
          <span>{chapter.tag}</span>
        </div>
        <h2>{chapter.shortTitle}</h2>
        <p className="cover-full-title">{fullTitle.replace(/^\d+\.\s*/, "")}</p>
        <p className="cover-deck">{chapter.deck}</p>
        <div className="cover-meta">
          <span>{minutes} min di lettura</span>
          <span>
            {chapter.order} / {total}
          </span>
        </div>
      </div>
      <CoverArt motif={chapter.motif} />
    </header>
  );
}

function CoverArt({ motif }: { motif: CoverMotif }) {
  return (
    <div className="cover-art" aria-hidden="true">
      <svg viewBox="0 0 320 320" fill="none">
        <circle cx="160" cy="160" r="138" className="cover-orbit" />
        <circle cx="160" cy="160" r="112" className="cover-orbit cover-orbit-faint" />
        {motif === "compass" && <Compass />}
        {motif === "steps" && <Steps />}
        {motif === "wave" && <Wave />}
        {motif === "network" && <Network />}
        {motif === "hourglass" && <Hourglass />}
        {motif === "dialogue" && <Dialogue />}
      </svg>
    </div>
  );
}

function Compass() {
  return (
    <g>
      <circle cx="160" cy="160" r="74" className="cover-line" />
      <circle cx="160" cy="160" r="58" className="cover-line cover-line-faint" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={160 + 74 * Math.cos(rad)}
            y1={160 + 74 * Math.sin(rad)}
            x2={160 + (deg % 90 === 0 ? 54 : 64) * Math.cos(rad)}
            y2={160 + (deg % 90 === 0 ? 54 : 64) * Math.sin(rad)}
            className="cover-line"
          />
        );
      })}
      <polygon points="160,102 170,160 150,160" className="cover-accent" />
      <polygon points="160,218 170,160 150,160" className="cover-line" />
      <circle cx="160" cy="160" r="5" className="cover-accent" />
    </g>
  );
}

function Steps() {
  return (
    <g>
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x={58 + index * 72}
            y={190 - index * 46}
            width="58"
            height="58"
            className={index === 2 ? "cover-accent-fill" : "cover-line"}
          />
          <text x={87 + index * 72} y={224 - index * 46} className="cover-number" textAnchor="middle">
            0{index + 1}
          </text>
          {index < 2 && (
            <path d={`M${120 + index * 72} ${218 - index * 46}l14-10v20z`} className="cover-accent" />
          )}
        </g>
      ))}
    </g>
  );
}

function Wave() {
  return (
    <g>
      <path
        d="M48 174c18-30 36-30 54 0s36 30 54 0 36-30 54 0 30 24 56 8"
        className="cover-line"
      />
      <path
        d="M48 200c14-14 28-14 42 0s28 14 42 0 28-14 42 0 28 14 42 0 20-10 40-4"
        className="cover-accent"
      />
      {[86, 140, 194, 248].map((x, index) => (
        <line
          key={x}
          x1={x}
          y1={120}
          x2={x}
          y2={220 - index * 8}
          className="cover-line cover-line-faint"
        />
      ))}
    </g>
  );
}

function Network() {
  const nodes: [number, number][] = [
    [160, 160],
    [160, 76],
    [244, 118],
    [244, 202],
    [160, 244],
    [76, 202],
    [76, 118],
  ];
  return (
    <g>
      {nodes.slice(1).map(([x, y]) => (
        <line key={`${x}-${y}`} x1="160" y1="160" x2={x} y2={y} className="cover-line" />
      ))}
      {nodes.slice(1).map(([x, y], index) => (
        <line
          key={`ring-${x}-${y}`}
          x1={x}
          y1={y}
          x2={nodes[((index + 1) % 6) + 1][0]}
          y2={nodes[((index + 1) % 6) + 1][1]}
          className="cover-line cover-line-faint"
        />
      ))}
      {nodes.slice(1).map(([x, y]) => (
        <circle key={`node-${x}-${y}`} cx={x} cy={y} r="18" className="cover-line" />
      ))}
      <circle cx="160" cy="160" r="27" className="cover-accent-fill" />
    </g>
  );
}

function Hourglass() {
  return (
    <g>
      <path d="M106 64h108M106 256h108" className="cover-line" />
      <path d="M118 64h84l-30 72h-24zM118 256h84l-30-72h-24z" className="cover-line" />
      <path d="M146 190h28l-14 46z" className="cover-accent-fill" />
      {[0, 1, 2].map((index) => (
        <circle key={index} cx={154 + index * 6} cy={122 + index * 9} r="2.4" className="cover-accent" />
      ))}
    </g>
  );
}

function Dialogue() {
  return (
    <g>
      <rect x="62" y="96" width="108" height="72" rx="12" className="cover-line" />
      <path d="M88 168v22l22-22z" className="cover-line" />
      <rect x="150" y="150" width="108" height="72" rx="12" className="cover-line" />
      <path d="M232 222v22l-22-22z" className="cover-line" />
      <text x="116" y="142" textAnchor="middle" className="cover-glyph">
        ?
      </text>
      <text x="204" y="196" textAnchor="middle" className="cover-glyph">
        …
      </text>
    </g>
  );
}
