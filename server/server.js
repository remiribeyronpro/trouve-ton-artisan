
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
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

// Chemin vers les fichiers React compilés
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../client/dist");

// Origines autorisées
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

// API : conserver ces routes avant React
app.use("/api", api);

// Fichiers statiques du frontend React
app.use(express.static(clientDist));

// Les routes API inconnues restent en erreur 404
app.use("/api", notFound);

// Permettre à React de gérer ses propres URLs
app.get("*", (req, res, next) => {
  res.sendFile(
    path.join(clientDist, "index.html"),
    (error) => {
      if (error) next(error);
    }
  );
});

// Gestion des erreurs
app.use(errorHandler);

// Connexion à MySQL et démarrage
async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Connexion MySQL réussie !");

    app.listen(port, () => {
      console.log(
        `Serveur démarré sur le port ${port}`
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
