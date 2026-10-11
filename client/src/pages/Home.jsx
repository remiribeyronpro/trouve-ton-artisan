
import { useEffect, useState } from "react";
import ArtisanCard from "../components/ArtisanCard";

export default function Home() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTopArtisans() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/artisans",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des artisans.");
        }

        const artisans = await response.json();

        if (!Array.isArray(artisans)) {
          throw new Error("Format des données invalide.");
        }

        const artisansDuMois = artisans
          .filter((artisan) => artisan.top === true)
          .slice(0, 3);

        setTop(artisansDuMois);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Impossible de charger les artisans du mois.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTopArtisans();

    return () => controller.abort();
  }, []);

  const steps = [
    ["01", "Choisir une catégorie",
      "Sélectionnez le domaine qui correspond à votre besoin."],
    ["02", "Choisir un artisan",
      "Comparez les professionnels proposés."],
    ["03", "Consulter sa fiche",
      "Découvrez sa note, sa spécialité et sa présentation."],
    ["04", "Le contacter",
      "Envoyez votre demande grâce au formulaire de contact."]
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Auvergne-Rhône-Alpes</p>
          <h1>Trouvez l'artisan qu'il vous faut</h1>
          <p>
            Découvrez des professionnels de la région,
            consultez leur fiche et contactez-les simplement.
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">Comment faire ?</p>
          <h2>Trouver mon artisan en 4 étapes</h2>
        </div>

        <div className="steps">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Sélection régionale</p>
            <h2>Les artisans du mois</h2>
          </div>

          {loading && (
            <p role="status">Chargement des artisans...</p>
          )}

          {error && (
            <p role="alert">{error}</p>
          )}

          {!loading && !error && top.length === 0 && (
            <p>Aucun artisan du mois disponible.</p>
          )}

          {!loading && !error && top.length > 0 && (
            <div className="row g-4">
              {top.map((artisan) => (
                <div className="col-md-4" key={artisan.id}>
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
