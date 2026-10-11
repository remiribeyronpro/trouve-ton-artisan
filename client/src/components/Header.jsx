
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import logo from "../assets/Logo.png";
import { api } from "../services/api";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const data = await api.categories();

        if (!Array.isArray(data)) {
          throw new Error("Format des catégories invalide.");
        }

        if (active) {
          setCategories(data);
          setError("");
        }
      } catch (err) {
        if (active) {
          console.error("Erreur catégories :", err);
          setError("Catégories indisponibles.");
        }
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  function submit(e) {
    e.preventDefault();

    const q = search.trim();

    if (q) {
      navigate(`/artisans?search=${encodeURIComponent(q)}`);
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
