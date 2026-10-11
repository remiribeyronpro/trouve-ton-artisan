
import { Link } from "react-router-dom";

export default function NotFound() {
  const image404 = `${import.meta.env.BASE_URL}404-pages.png`;

  return (
    <section className="container section not-found">
      <p className="error-code">404</p>

      <h1>Cette page n'existe pas</h1>

      <img
        src={image404}
        alt="Illustration d'une page introuvable"
        className="not-found-image"
      />

      <p>
        La page que vous recherchez a peut-être été
        déplacée, supprimée ou n'existe pas.
      </p>

      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </section>
  );
}
