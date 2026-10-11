import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function ArtisanCard({ artisan }) {
  return (
    <article className="artisan-card h-100">
      <div className="artisan-card__body">
        <p className="eyebrow">{artisan.Specialite?.nom}</p>
        <h3>{artisan.nom}</h3>
        <Rating value={artisan.note} />
        <p className="location">📍 {artisan.ville}</p>
        <Link className="btn btn-primary" to={`/artisan/${artisan.id}`}>Voir l'artisan</Link>
      </div>
    </article>
  );
}
