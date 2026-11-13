type AreaResult = {
  area: string;
  total: number;
  correct: number;
};

const CENTER = 150;
const RADIUS = 92;

function point(index: number, value: number) {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  return [CENTER + Math.cos(angle) * RADIUS * value, CENTER + Math.sin(angle) * RADIUS * value];
}

function polygon(values: number[]) {
  return values
    .map((value, index) => point(index, value).map((part) => part.toFixed(1)).join(","))
    .join(" ");
}

export function QuizPortrait({ areas }: { areas: AreaResult[] }) {
  const values = areas.map((item) => (item.total ? item.correct / item.total : 0));
  const labelPoints = areas.map((_, index) => point(index, 1.24));
  const description = areas
    .map((item) => `${item.area}: ${item.correct} corrette su ${item.total}`)
    .join("; ");

  return (
    <div className="quiz-portrait">
      <svg viewBox="0 0 300 300" role="img" aria-label={`Ritratto delle sei aree. ${description}`}>
        <title>Ritratto delle sei aree</title>
        <desc>{description}</desc>
        {[0.25, 0.5, 0.75, 1].map((level) => (
          <polygon
            key={level}
            points={polygon(areas.map(() => level))}
            className="portrait-grid"
          />
        ))}
        {areas.map((_, index) => {
          const [x, y] = point(index, 1);
          return <line key={index} x1={CENTER} y1={CENTER} x2={x} y2={y} className="portrait-axis" />;
        })}
        <polygon points={polygon(values)} className="portrait-area" />
        <circle cx={CENTER} cy={CENTER} r="3" className="portrait-center" />
        {areas.map((item, index) => {
          const [x, y] = labelPoints[index];
          const anchor = x < CENTER - 8 ? "end" : x > CENTER + 8 ? "start" : "middle";
          return (
            <text
              key={item.area}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="portrait-label"
            >
              {item.area}
            </text>
          );
        })}
      </svg>
      <ul className="portrait-legend">
        {areas.map((item) => (
          <li key={item.area}>
            <span>{item.area}</span>
            <strong>
              {item.correct}/{item.total}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
