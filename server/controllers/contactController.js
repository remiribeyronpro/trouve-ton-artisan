
import { Artisan } from "../models/index.js";

// Validation et nettoyage des données
function clean(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength + 1);
}

// Vérification du format de l'e-mail
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Contrôleur du formulaire de contact
export async function contactArtisan(req, res, next) {
  try {
    // Vérification de l'identifiant
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Identifiant d'artisan invalide."
      });
    }

    // Vérification de l'existence de l'artisan
    const artisan = await Artisan.findByPk(id);

    if (!artisan) {
      return res.status(404).json({
        message: "Artisan introuvable."
      });
    }

    // Récupération et nettoyage des champs
    const name = clean(req.body?.name, 100);
    const email = clean(req.body?.email, 160);
    const subject = clean(req.body?.subject, 160);
    const message = clean(req.body?.message, 3000);

    // Validation côté serveur
    const isValid =
      name.length >= 2 &&
      name.length <= 100 &&
      isValidEmail(email) &&
      email.length <= 160 &&
      subject.length >= 3 &&
      subject.length <= 160 &&
      message.length >= 10 &&
      message.length <= 3000;

    if (!isValid) {
      return res.status(400).json({
        message:
          "Veuillez vérifier les champs du formulaire."
      });
    }

    // Simulation de l'envoi du message
    // Aucune donnée personnelle n'est affichée
    // dans les logs du serveur.
    console.log(
      `[CONTACT SIMULÉ] Artisan ID : ${artisan.id}`
    );

    // Réponse envoyée au frontend
    return res.status(200).json({
      message:
        "Votre demande a été simulée avec succès.",
      simulated: true
    });

  } catch (error) {
    next(error);
  }
}
