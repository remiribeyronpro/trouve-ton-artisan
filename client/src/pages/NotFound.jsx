
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container section not-found">
      <p className="error-code">404</p>

      <h1>Cette page n'existe pas</h1>

      <img
        src="/404-pages.png"
        alt="Illustration d'une page introuvable"
        className="not-found-image"
      />

      <p>
        La page que vous recherchez a peut-être été
        déplacée, supprimée ou n'existe pas.
      </p>

      <Link className="btn btn-primary" to="/">
        Retour à l'accueil
      </Link>
    </section>
  );
}
