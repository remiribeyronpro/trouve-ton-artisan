export default function Rating({ value }) {
  const rounded = Math.round(Number(value));
  return (
    <span className="rating" aria-label={`Note ${value} sur 5`}>
      <span aria-hidden="true">{"★".repeat(rounded)}{"☆".repeat(5-rounded)}</span>
      <strong>{Number(value).toFixed(1)}/5</strong>
    </span>
  );
}
