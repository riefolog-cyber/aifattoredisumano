import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Download, Minus, Plus, RotateCcw } from "lucide-react";
import { PATH_CHAPTERS, type PathChapter } from "../data/path";
import { downloadText } from "../lib/download";

type MapNode = PathChapter & { x: number; y: number; theme: string };

const POSITIONS: Record<string, { x: number; y: number; theme: string }> = {
  "1:0": { x: 500, y: 82, theme: "Cognizione" },
  "1:1": { x: 790, y: 178, theme: "Cognizione" },
  "1:2": { x: 790, y: 420, theme: "Linguaggio" },
  "1:3": { x: 500, y: 518, theme: "Potere" },
  "0:3": { x: 210, y: 420, theme: "Tempo" },
  "1:5": { x: 210, y: 178, theme: "Tempo" },
};

const NODES: MapNode[] = PATH_CHAPTERS.map((chapter) => ({
  ...chapter,
  ...POSITIONS[`${chapter.doc}:${chapter.section}`],
}));

const FILTERS = ["Tutti", "Cognizione", "Linguaggio", "Potere", "Tempo"];

const EDGES: [string, string][] = [
  ["1:0", "1:1"],
  ["1:1", "1:2"],
  ["1:2", "1:3"],
  ["1:3", "0:3"],
  ["0:3", "1:5"],
  ["1:5", "1:0"],
  ["1:0", "1:2"],
  ["1:1", "1:3"],
];

type ConceptMapProps = {
  onOpenChapter: (doc: number, section: number) => void;
};

export function ConceptMap({ onOpenChapter }: ConceptMapProps) {
  const [filter, setFilter] = useState("Tutti");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(
    null,
  );

  const active = (node: MapNode) => filter === "Tutti" || node.theme === filter;
  const nodeByKey = new Map(NODES.map((node) => [`${node.doc}:${node.section}`, node]));

  const zoomBy = (delta: number) => setZoom((value) => Math.min(1.8, Math.max(0.7, value + delta)));
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const current = drag.current;
    if (!current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = ((event.clientX - current.x) / rect.width) * 1000;
    const dy = ((event.clientY - current.y) / rect.height) * 600;
    if (Math.abs(dx) + Math.abs(dy) > 4) current.moved = true;
    setPan({ x: current.panX + dx, y: current.panY + dy });
  };

  const downloadSvg = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "1000");
    clone.setAttribute("height", "600");
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = `
      .map-bg{fill:#11191d}.map-grid{fill:url(#map-grid)}
      .map-edge{stroke:#52616a;stroke-width:1.4}.map-edge.active{stroke:#d5f86f;stroke-width:2}
      .map-core{fill:#d5f86f}.map-core-line{stroke:#d5f86f;stroke-width:2}
      .map-node circle{fill:#192329;stroke:#a6b1b4;stroke-width:1.5}
      .map-node.active circle{stroke:#d5f86f;stroke-width:2.5}
      .map-node text{fill:#edf0e9;font-family:Poppins,sans-serif}
      .map-node .map-num{fill:#d5f86f;font-family:monospace}
      .map-node .map-sub{fill:#a6b1b4}
      .map-core-label{fill:#11191d;font-family:Poppins,sans-serif}
      .map-core-sub{fill:#314019;font-family:Poppins,sans-serif}
    `;
    clone.prepend(style);
    downloadText("il-fattore-umano-mappa.svg", clone.outerHTML, "image/svg+xml;charset=utf-8");
  };

  return (
    <section className="native-map" aria-labelledby="mappa-title">
      <div className="native-map-head">
        <div>
          <span className="label">MAPPA CONCETTUALE · NATIVA</span>
          <h2 id="mappa-title">Una visione d’insieme.</h2>
          <p>
            Sei tappe, un’unica domanda. Seleziona un nodo per aprire il capitolo, trascina per
            esplorare, filtra per tema.
          </p>
        </div>
        <div className="map-filters" role="group" aria-label="Filtra la mappa per tema">
          {FILTERS.map((item) => (
            <button
              key={item}
              className={filter === item ? "selected" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="map-stage">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 600"
          className="map-svg"
          aria-label="Mappa concettuale delle sei tappe del percorso"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <defs>
            <pattern id="map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#d5f86f" opacity=".12" />
            </pattern>
          </defs>
          <rect className="map-bg" width="1000" height="600" />
          <rect className="map-grid" width="1000" height="600" />
          <g transform={`translate(${500 + pan.x} ${300 + pan.y}) scale(${zoom}) translate(-500 -300)`}>
            {EDGES.map(([from, to]) => {
              const a = nodeByKey.get(from);
              const b = nodeByKey.get(to);
              if (!a || !b) return null;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={`map-edge ${active(a) && active(b) ? "active" : ""}`}
                />
              );
            })}
            {NODES.map((node) => {
              const [x, y] = [node.x, node.y];
              const isActive = active(node);
              return (
                <line
                  key={`core-${node.section}`}
                  x1="500"
                  y1="300"
                  x2={x}
                  y2={y}
                  className={`map-edge ${isActive ? "active" : ""}`}
                />
              );
            })}
            <circle cx="500" cy="300" r="54" className="map-core" />
            <circle cx="500" cy="300" r="68" className="map-core-line" fill="none" />
            <text x="500" y="294" textAnchor="middle" className="map-core-label">
              AUTONOMIA
            </text>
            <text x="500" y="314" textAnchor="middle" className="map-core-sub">
              la posta in gioco
            </text>
            {NODES.map((node) => (
              <g
                key={`${node.doc}:${node.section}`}
                className={`map-node ${active(node) ? "active" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Apri la tappa ${node.order}: ${node.shortTitle}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => onOpenChapter(node.doc, node.section)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpenChapter(node.doc, node.section);
                  }
                }}
              >
                <circle cx={node.x} cy={node.y} r="30" />
                <text x={node.x} y={node.y - 3} textAnchor="middle" className="map-num">
                  0{node.order}
                </text>
                <text x={node.x} y={node.y + 16} textAnchor="middle" className="map-sub">
                  {node.tag.toLowerCase()}
                </text>
              </g>
            ))}
            {NODES.map((node, index) => {
              const above = index === 0 || index === 5;
              return (
                <text
                  key={`label-${node.section}`}
                  x={node.x}
                  y={node.y + (above ? -44 : 52)}
                  textAnchor="middle"
                  className={`map-label ${active(node) ? "active" : ""}`}
                >
                  {node.shortTitle}
                </text>
              );
            })}
          </g>
        </svg>
        <div className="map-controls">
          <button onClick={() => zoomBy(0.15)} aria-label="Ingrandisci la mappa">
            <Plus size={16} />
          </button>
          <button onClick={() => zoomBy(-0.15)} aria-label="Riduci la mappa">
            <Minus size={16} />
          </button>
          <button onClick={reset} aria-label="Ripristina la mappa">
            <RotateCcw size={15} />
          </button>
          <button onClick={downloadSvg} className="map-download">
            <Download size={15} /> SVG
          </button>
        </div>
        <p className="map-hint">Trascina per esplorare · + / − per lo zoom</p>
      </div>
      <div className="map-index" aria-label="Tappe della mappa">
        {NODES.map((node) => (
          <button
            key={`index-${node.doc}:${node.section}`}
            className={active(node) ? "" : "dim"}
            onClick={() => onOpenChapter(node.doc, node.section)}
          >
            <span>0{node.order}</span>
            <strong>{node.shortTitle}</strong>
            <small>{node.tag.toLowerCase()}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

export function MiniMap({
  doc,
  section,
  onSelect,
}: {
  doc: number;
  section: number;
  onSelect: (doc: number, section: number) => void;
}) {
  return (
    <nav className="mini-map" aria-label="Mappa del percorso">
      <span className="label">MAPPA DEL PERCORSO</span>
      <ol>
        {PATH_CHAPTERS.map((chapter) => {
          const current = chapter.doc === doc && chapter.section === section;
          return (
            <li key={chapter.order}>
              <button
                className={current ? "active" : ""}
                aria-current={current ? "step" : undefined}
                onClick={() => onSelect(chapter.doc, chapter.section)}
              >
                <span>0{chapter.order}</span>
                {chapter.shortTitle}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
