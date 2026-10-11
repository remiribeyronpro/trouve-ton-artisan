
/**
 * Gestion des routes inexistantes
 */
export function notFound(req, res) {
  return res.status(404).json({
    message: "Ressource introuvable."
  });
}

/**
 * Gestion centralisée des erreurs
 */
export function errorHandler(err, req, res, next) {
  // Journalisation côté serveur
  console.error("Erreur API :", err);

  // JSON invalide
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      message: "Le format JSON envoyé est invalide."
    });
  }

  // Requête trop volumineuse
  if (err.status === 413) {
    return res.status(413).json({
      message: "La requête est trop volumineuse."
    });
  }

  // Erreur de validation Sequelize
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Les données fournies sont invalides."
    });
  }

  // Erreur générique
  return res.status(500).json({
    message: "Erreur interne du serveur."
  });
}
