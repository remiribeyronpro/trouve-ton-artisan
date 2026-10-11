
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import api from "./routes/api.js";
import { sequelize } from "./config/database.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorHandler.js";

const app = express();

const port = Number(process.env.PORT || 3001);

// Origines autorisées pour le frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(
    ...process.env.CLIENT_URL
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
}

// Masquer la technologie utilisée
app.disable("x-powered-by");

// En-têtes de sécurité HTTP
app.use(helmet());

// Configuration CORS
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204
  })
);

// Limiter la taille des requêtes JSON
app.use(
  express.json({
    limit: "20kb",
    strict: true
  })
);

// Route de vérification du serveur
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// Routes de l'API
app.use("/api", api);

// Gestion des routes inconnues
app.use(notFound);

// Gestion centralisée des erreurs
app.use(errorHandler);

// Connexion à MySQL et démarrage
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Connexion MySQL réussie !");

    app.listen(port, () => {
      console.log(
        `API démarrée sur le port ${port}`
      );
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
