
import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

// Composants communs
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Artisans from "./pages/Artisans";
import ArtisanDetail from "./pages/ArtisanDetail";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

// Configuration SEO
const SITE_NAME = "Trouve ton artisan !";

const DEFAULT_DESCRIPTION =
  "Trouvez un artisan en Auvergne-Rhône-Alpes. Découvrez les spécialités et contactez facilement un professionnel.";

// Gestion des titres et descriptions SEO
function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  noIndex = false,
}) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;

    // Description
    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      description
    );

    // Indexation
    let metaRobots = document.querySelector(
      'meta[name="robots"]'
    );

    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }

    metaRobots.setAttribute(
      "content",
      noIndex ? "noindex, follow" : "index, follow"
    );
  }, [title, description, noIndex]);

  return null;
}

// Page d'accueil
function HomePage() {
  return (
    <>
      <SEO
        title="Accueil"
        description="Trouvez facilement un artisan en Auvergne-Rhône-Alpes. Découvrez les professionnels et leurs spécialités."
      />
      <Home />
    </>
  );
}

// Liste des artisans et catégories
function ArtisansPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.trim();

  let title = "Tous les artisans";

  if (category) {
    title = `Artisans - ${category}`;
  } else if (search) {
    title = `Recherche - ${search}`;
  }

  const description = category
    ? `Découvrez les artisans de la catégorie ${category} en Auvergne-Rhône-Alpes.`
    : search
      ? `Résultats de recherche pour ${search} parmi les artisans d'Auvergne-Rhône-Alpes.`
      : "Consultez notre annuaire d'artisans en Auvergne-Rhône-Alpes.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        noIndex={Boolean(search)}
      />

      <Artisans />
    </>
  );
}

// Fiche artisan
// Le SEO est directement géré dans ArtisanDetail.jsx
function ArtisanPage() {
  return <ArtisanDetail />;
}

// Pages légales
function LegalPage({ title }) {
  return (
    <>
      <SEO
        title={title}
        description={`Consultez les informations relatives à ${title.toLowerCase()} du site Trouve ton artisan !`}
      />

      <Legal title={title} />
    </>
  );
}

// Page 404
function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page introuvable - 404"
        description="La page demandée est introuvable sur le site Trouve ton artisan !"
        noIndex
      />

      <NotFound />
    </>
  );
}

// Application principale
export default function App() {
  const location = useLocation();

  // Retour en haut lors d'un changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Réinitialisation de la directive robots
  // avant l'affichage de chaque nouvelle route
  useEffect(() => {
    const robots = document.querySelector(
      'meta[name="robots"]'
    );

    if (robots) {
      robots.setAttribute("content", "index, follow");
    }
  }, [location.pathname, location.search]);

  return (
    <div className="app-shell">

      <Header />

      <main id="main-content">
        <Routes>

          {/* Accueil */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Tous les artisans */}
          <Route
            path="/artisans"
            element={<ArtisansPage />}
          />

          {/* Artisans par catégorie */}
          <Route
            path="/categorie/:category"
            element={<ArtisansPage />}
          />

          {/* Fiche d'un artisan */}
          <Route
            path="/artisan/:id"
            element={<ArtisanPage />}
          />

          {/* Mentions légales */}
          <Route
            path="/mentions-legales"
            element={
              <LegalPage title="Mentions légales" />
            }
          />

          {/* Données personnelles */}
          <Route
            path="/donnees-personnelles"
            element={
              <LegalPage title="Données personnelles" />
            }
          />

          {/* Accessibilité */}
          <Route
            path="/accessibilite"
            element={
              <LegalPage title="Accessibilité" />
            }
          />

          {/* Cookies */}
          <Route
            path="/cookies"
            element={
              <LegalPage title="Cookies" />
            }
          />

          {/* Page 404 */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}
