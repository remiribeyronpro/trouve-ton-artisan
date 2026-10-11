# MCD / MLD — Trouve ton artisan !

## 1. Modèle Conceptuel de Données (MCD)

### Entités

**CATÉGORIE**
- id
- nom

**SPÉCIALITÉ**
- id
- nom

**ARTISAN**
- id
- nom
- note
- ville
- a_propos
- email
- site_web
- top

### Associations et cardinalités

**CATÉGORIE (0,N) — possède — (1,1) SPÉCIALITÉ**

**SPÉCIALITÉ (0,N) — regroupe — (1,1) ARTISAN**

### Règles de gestion

- Une catégorie peut contenir zéro à plusieurs spécialités.
- Une spécialité appartient obligatoirement à une seule catégorie.
- Une spécialité peut regrouper zéro à plusieurs artisans.
- Un artisan appartient obligatoirement à une seule spécialité.

## 2. Modèle Logique de Données (MLD)

**CATEGORIE**
- #id
- nom (UNIQUE, NOT NULL)

**SPECIALITE**
- #id
- nom (NOT NULL)
- categorie_id (FK → CATEGORIE.id, NOT NULL)
- UNIQUE(nom, categorie_id)

**ARTISAN**
- #id
- nom (NOT NULL)
- note (NOT NULL)
- ville (NOT NULL)
- a_propos (NOT NULL)
- email (NOT NULL)
- site_web (NULL autorisé)
- top (NOT NULL, valeur par défaut FALSE)
- specialite_id (FK → SPECIALITE.id, NOT NULL)

## 3. Contraintes d'intégrité

- Les identifiants sont des clés primaires auto-incrémentées.
- Les clés étrangères garantissent les relations entre les tables.
- Les notes des artisans sont comprises entre 0 et 5.
- La suppression d'une catégorie liée à une spécialité est interdite.
- La suppression d'une spécialité liée à un artisan est interdite.
- Les mises à jour des clés référencées sont propagées avec ON UPDATE CASCADE.