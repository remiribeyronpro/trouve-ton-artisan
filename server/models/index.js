import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Categorie = sequelize.define("Categorie", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(80), allowNull: false, unique: true }
}, { tableName: "categories" });

export const Specialite = sequelize.define("Specialite", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: "specialites" });

export const Artisan = sequelize.define("Artisan", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING(160), allowNull: false },
  note: { type: DataTypes.DECIMAL(2,1), allowNull: false },
  ville: { type: DataTypes.STRING(120), allowNull: false },
  a_propos: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(190), allowNull: false },
  site_web: { type: DataTypes.STRING(255), allowNull: true },
  top: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { tableName: "artisans" });

Categorie.hasMany(Specialite, { foreignKey: "categorie_id" });
Specialite.belongsTo(Categorie, { foreignKey: "categorie_id" });
Specialite.hasMany(Artisan, { foreignKey: "specialite_id" });
Artisan.belongsTo(Specialite, { foreignKey: "specialite_id" });
