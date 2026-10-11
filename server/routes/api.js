
import { Router } from "express";
import rateLimit from "express-rate-limit";

// Contrôleurs
import {
  getCategories
} from "../controllers/categoryController.js";

import {
  getArtisans,
  getTopArtisans,
  getArtisan
} from "../controllers/artisanController.js";

import {
  contactArtisan
} from "../controllers/contactController.js";

const router = Router();

// Limitation des demandes de contact
// Maximum 10 requêtes par IP toutes les 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Trop de demandes de contact. Veuillez réessayer dans 15 minutes."
  }
});

// Vérification de l'API
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Récupération des catégories
router.get("/categories", getCategories);

// Artisans du mois
router.get("/artisans/top", getTopArtisans);

// Liste et recherche des artisans
router.get("/artisans", getArtisans);

// Détails d'un artisan
router.get("/artisans/:id", getArtisan);

// Formulaire de contact simulé
router.post(
  "/artisans/:id/contact",
  contactLimiter,
  contactArtisan
);

export default router;
