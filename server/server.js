
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import "dotenv/config";

import api from "./routes/api.js";
import { sequelize } from "./config/database.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT || 3001);

// Répertoire du serveur
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Emplacement des fichiers React
// En local : client/dist
// Sur alwaysdata : chemin défini dans CLIENT_DIST
const clientDist = process.env.CLIENT_DIST
  ? path.resolve(process.env.CLIENT_DIST)
  : path.resolve(__dirname, "../client/dist");

const indexHtml = path.join(clientDist, "index.html");

// Origines autorisées pour les requêtes CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(
    ...process.env.CLIENT_URL
      .split(",")
      .map(origin => origin.trim())
      .filter(Boolean)
  );
}

// Sécurité
app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204
  })
);

app.use(
  express.json({
    limit: "20kb",
    strict: true
  })
);

// Vérification du serveur
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Routes API
app.use("/api", api);

// Routes API inconnues : erreur 404
app.use("/api", notFound);

// Fichiers statiques React
app.use(express.static(clientDist));

// Navigation React : renvoyer index.html
// Uniquement pour les requêtes GET HTML
app.get("*", (req, res, next) => {
  if (!req.accepts("html")) {
    return next();
  }

  res.sendFile(indexHtml, error => {
    if (error) next(error);
  });
});

// Autres routes inconnues
app.use(notFound);

// Gestion centralisée des erreurs
app.use(errorHandler);

// Connexion MySQL et démarrage du serveur
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Connexion MySQL réussie !");

    if (fs.existsSync(indexHtml)) {
      console.log("Frontend React trouvé :", clientDist);
    } else {
      console.warn(
        "ATTENTION : index.html introuvable dans",
        clientDist
      );
    }

    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error(
      "Impossible de démarrer le serveur :",
      error.message
    );

    process.exit(1);
  }
}

startServer();
