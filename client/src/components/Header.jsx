
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import logo from "../assets/Logo.png";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/categories",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Impossible de charger les catégories.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Format des catégories invalide.");
        }

        setCategories(data);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Erreur catégories :", err);
          setError("Catégories indisponibles.");
        }
      }
    }

    loadCategories();

    return () => controller.abort();
  }, []);

  function submit(e) {
    e.preventDefault();

    const q = search.trim();

    if (q) {
      navigate(
        `/artisans?search=${encodeURIComponent(q)}`
      );
    }
  }

  return (
    <header className="site-header">
      <div className="container header-top">

        <Link
          to="/"
          className="brand"
          aria-label="Trouve ton artisan - Accueil"
        >
          <img
            src={logo}
            alt="Trouve ton artisan - Auvergne-Rhône-Alpes"
          />
        </Link>

        <form
          className="search-form"
          role="search"
          onSubmit={submit}
        >
          <label
            className="visually-hidden"
            htmlFor="site-search"
          >
            Rechercher un artisan
          </label>

          <input
            id="site-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un artisan..."
          />

          <button type="submit">
            Rechercher
          </button>
        </form>
      </div>

      <nav
        className="category-nav"
        aria-label="Catégories d'artisans"
      >
        <div className="container nav-scroll">

          <NavLink to="/" end>
            Accueil
          </NavLink>

          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/categorie/${encodeURIComponent(category.nom)}`}
            >
              {category.nom}
            </NavLink>
          ))}

        </div>
      </nav>

      {error && (
        <p role="alert" className="container">
          {error}
        </p>
      )}
    </header>
  );
}
