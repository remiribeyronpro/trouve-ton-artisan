
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../services/api";
import Rating from "../components/Rating";

export default function ArtisanDetail() {
  const { id } = useParams();

  // États du composant
  const [artisan, setArtisan] = useState(null);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);

  // Récupération des informations de l'artisan
  useEffect(() => {
    let active = true;

    setArtisan(null);
    setStatus("");
    setSuccess(false);

    async function loadArtisan() {
      try {
        const data = await api.artisan(id);

        if (active) {
          setArtisan(data || false);
        }
      } catch (error) {
        console.error(
          "Erreur de chargement de l'artisan :",
          error
        );

        if (active) {
          setArtisan(false);
        }
      }
    }

    loadArtisan();

    return () => {
      active = false;
    };
  }, [id]);

  // Référencement SEO dynamique
  useEffect(() => {
    if (!artisan || !artisan.nom) return;

    const specialty =
      artisan.Specialite?.nom || "professionnel";

    document.title =
      `${artisan.nom} | Trouve ton artisan !`;

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute(
        "content",
        `Découvrez ${artisan.nom}, ${specialty} à ${artisan.ville}. Consultez sa fiche et contactez-le.`
      );
    }
  }, [artisan]);

  // Simulation du formulaire de contact
  async function submit(event) {
    event.preventDefault();

    if (sending) return;

    const formElement = event.currentTarget;

    const formData = new FormData(formElement);

    const payload = Object.fromEntries(
      formData.entries()
    );

    setSending(true);
    setSuccess(false);
    setStatus("Envoi en cours…");

    try {
      await api.contact(id, payload);

      setSuccess(true);

      setStatus(
        "Votre demande de contact a été simulée avec succès."
      );

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error(
        "Erreur du formulaire :",
        error
      );

      setSuccess(false);

      setStatus(
        error.message ||
        "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setSending(false);
    }
  }

  // Chargement
  if (artisan === null) {
    return (
      <section className="container section">
        <p role="status">
          Chargement des informations de l'artisan…
        </p>
      </section>
    );
  }

  // Artisan introuvable
  if (artisan === false) {
    return (
      <section className="container section">
        <h1>Artisan introuvable</h1>
        <p>
          Impossible de récupérer les informations
          de cet artisan.
        </p>
      </section>
    );
  }

  return (
    <section className="container section">
      <div className="detail-grid">

        {/* Informations de l'artisan */}
        <article className="artisan-detail">

          <p className="eyebrow">
            {artisan.Specialite?.Categorie?.nom}
            {" · "}
            {artisan.Specialite?.nom}
          </p>

          <h1>{artisan.nom}</h1>

          <Rating value={artisan.note} />

          <p className="location">
            📍 {artisan.ville}
          </p>

          <h2>À propos</h2>

          <p>{artisan.a_propos}</p>

          {artisan.site_web && (
            <p>
              <a
                className="external-link"
                href={artisan.site_web}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter le site web ↗
              </a>
            </p>
          )}

        </article>

        {/* Formulaire de contact */}
        <aside className="contact-card">

          <h2>Contacter cet artisan</h2>

          <p>
            Présentez votre besoin à cet artisan.
            Ce formulaire fonctionne en mode
            démonstration : aucun e-mail réel
            n'est envoyé.
          </p>

          <form
            ref={formRef}
            onSubmit={submit}
          >

            <label htmlFor="name">
              Nom
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              disabled={sending}
            />

            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={160}
              disabled={sending}
            />

            <label htmlFor="subject">
              Objet
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              required
              minLength={3}
              maxLength={160}
              disabled={sending}
            />

            <label htmlFor="message">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              required
              minLength={10}
              maxLength={3000}
              disabled={sending}
            />

            <button
              className="btn btn-primary"
              type="submit"
              disabled={sending}
            >
              {sending
                ? "Envoi en cours…"
                : "Envoyer ma demande"}
            </button>

          </form>

          {status && (
            <p
              className="form-status"
              role={success ? "status" : "alert"}
              aria-live="polite"
            >
              {status}
            </p>
          )}

        </aside>
      </div>
    </section>
  );
}
