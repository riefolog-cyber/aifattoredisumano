import { useState } from "react";
import { Download, Quote } from "lucide-react";
import type { PathChapter } from "../data/path";

type ChapterShareProps = {
  chapter: PathChapter;
};

const WIDTH = 1200;
const HEIGHT = 630;

function wrapLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function ChapterShare({ chapter }: ChapterShareProps) {
  const [status, setStatus] = useState("");

  const downloadCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const context = canvas.getContext("2d");
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#11191d");
    gradient.addColorStop(1, "#1b2a26");
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, HEIGHT);

    context.strokeStyle = "rgba(213, 248, 111, 0.12)";
    context.lineWidth = 1;
    for (let x = 40; x < WIDTH; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, HEIGHT);
      context.stroke();
    }
    for (let y = 40; y < HEIGHT; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(WIDTH, y);
      context.stroke();
    }

    context.fillStyle = "#d5f86f";
    context.font = "600 18px Poppins, sans-serif";
    context.letterSpacing = "3px";
    context.fillText("IL FATTORE UMANO", 70, 82);
    context.fillStyle = "#a6b1b4";
    context.font = "500 15px Poppins, sans-serif";
    context.fillText(
      `TAPPA ${String(chapter.order).padStart(2, "0")} · ${chapter.tag}`,
      70,
      112,
    );

    context.fillStyle = "#edf0e9";
    context.font = "italic 50px Georgia, serif";
    const lines = wrapLines(context, `“${chapter.quote}”`, 1000).slice(0, 6);
    lines.forEach((line, index) => context.fillText(line, 70, 220 + index * 66));

    context.fillStyle = "#d5f86f";
    context.fillRect(70, 560, 68, 3);
    context.fillStyle = "#a6b1b4";
    context.font = "500 18px Poppins, sans-serif";
    context.fillText(chapter.quoteSource, 154, 566);
    context.fillText("riefolog-cyber.github.io/aifattoredisumano", 70, 604);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `il-fattore-umano-tappa-${String(chapter.order).padStart(2, "0")}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Card scaricata.");
    }, "image/png");
  };

  const copyQuote = async () => {
    const text = `“${chapter.quote}” — ${chapter.quoteSource}\nIl Fattore Umano · Tappa ${chapter.order}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Citazione copiata.");
    } catch {
      setStatus("Copia non disponibile: seleziona la citazione a mano.");
    }
  };

  return (
    <aside className="share-card" aria-label={`Condividi la tappa ${chapter.order}`}>
      <div className="share-quote">
        <Quote size={20} aria-hidden="true" />
        <blockquote>“{chapter.quote}”</blockquote>
        <span>{chapter.quoteSource}</span>
      </div>
      <div className="share-actions">
        <button className="text-button" onClick={downloadCard}>
          <Download size={15} /> Scarica card
        </button>
        <button className="text-button" onClick={copyQuote}>
          Copia citazione
        </button>
        {status && <span role="status">{status}</span>}
      </div>
    </aside>
  );
}
