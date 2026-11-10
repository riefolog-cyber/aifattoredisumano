export function PageHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="page-heading">
      <div className="eyebrow">{label}</div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
