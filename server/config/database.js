
import { Sequelize } from "sequelize";
import "dotenv/config";

// Configuration de la base de données
const isProduction = process.env.NODE_ENV === "production";

const database = process.env.DB_NAME || "trouve_ton_artisan";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD ?? "";

const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT || 3306);

// Vérification des variables en production
if (isProduction) {
  const requiredVariables = [
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST"
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes : ${missingVariables.join(", ")}`
    );
  }
}

// Connexion Sequelize
export const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    port,
    dialect: "mysql",

    // Ne pas afficher les requêtes SQL
    logging: false,

    // Configuration des modèles
    define: {
      timestamps: false,
      freezeTableName: true
    },

    // Gestion du pool de connexions
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
