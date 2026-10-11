# Trouve ton artisan !

Application web réalisée dans le cadre d'un projet de formation en développement web, à partir du cahier des charges « Trouve ton artisan ! » de la Région Auvergne-Rhône-Alpes.

## Liens du projet

- **Site en ligne :** https://chercheartisan.alwaysdata.net/site/
- **Dépôt GitHub :** https://github.com/remiribeyronpro/trouve-ton-artisan
- **API :** https://chercheartisan.alwaysdata.net/api/health

## Présentation

L'application « Trouve ton artisan ! » permet aux visiteurs de rechercher des artisans de la région Auvergne-Rhône-Alpes, de consulter leurs informations et d'utiliser un formulaire de contact.

Le projet repose sur une architecture séparant le frontend React, une API REST développée avec Node.js et Express, et une base de données relationnelle MySQL/MariaDB.

## Fonctionnalités

- Page d'accueil présentant les quatre étapes pour trouver un artisan.
- Affichage des trois artisans du mois.
- Navigation par catégorie : Alimentation, Bâtiment, Fabrication et Services.
- Recherche d'artisans par nom.
- Consultation des fiches détaillées.
- Formulaire de contact avec validation et confirmation simulée.
- Pages d'informations légales.
- Page d'erreur 404 personnalisée.
- Interface responsive adaptée aux différentes tailles d'écran.

## Technologies utilisées

### Frontend

- React
- React Router
- Vite
- Bootstrap
- Sass

### Backend

- Node.js
- Express
- Sequelize
- MySQL / MariaDB

### Sécurité

- Helmet
- CORS
- Validation côté serveur
- Limitation du nombre de requêtes
- Gestion centralisée des erreurs
- Variables d'environnement

## Structure du projet

```text
trouve-ton-artisan/
├── client/             # Application React
├── server/             # API Node.js / Express
├── database/           # Scripts SQL
│   ├── create_database.sql
│   └── seed_database.sql
├── docs/               # Documentation du projet
│   ├── MCD-MLD.md
│   ├── SECURITE.md
│   ├── VEILLE.md
│   └── CHECKLIST.md
├── README.md
└── package.json
```

## Prérequis

- Node.js 20 ou supérieur recommandé
- npm
- MySQL ou MariaDB
- Un éditeur de code comme Visual Studio Code

## Installation en local

### 1. Base de données

Créer une base de données MySQL nommée :

```sql
CREATE DATABASE IF NOT EXISTS chercheartisan_trouve_ton_artisan;
```

Exécuter ensuite les scripts SQL dans cet ordre :

1. `database/create_database.sql`
2. `database/seed_database.sql`

**Attention :** le script de création supprime les tables existantes avant de les recréer. Il ne doit pas être exécuté sur une base contenant des données à conserver.

Le script d'alimentation ajoute les catégories, spécialités et 17 artisans du projet.

### 2. Backend

Ouvrir un terminal à la racine du projet :

```bash
cd server
npm install
```

Créer un fichier `.env` à partir du modèle `.env.example`.

Renseigner les paramètres de connexion à la base de données.

Démarrer l'API :

```bash
npm run dev
```

L'API est accessible localement sur le port 3001 avec la configuration prévue pour le développement.

Exemple de route de vérification :

```text
http://localhost:3001/api/health
```

### 3. Frontend

Ouvrir un deuxième terminal à la racine du projet :

```bash
cd client
npm install
```

Créer un fichier `.env` à partir de `.env.example` et configurer l'URL de l'API :

```env
VITE_API_URL=http://localhost:3001/api
```

Démarrer l'application :

```bash
npm run dev
```

Ouvrir l'adresse affichée par Vite, généralement :

```text
http://localhost:5173
```

## Routes de l'API

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/health` | Vérification de l'API |
| GET | `/api/categories` | Liste des catégories |
| GET | `/api/artisans` | Liste des artisans |
| GET | `/api/artisans?category=Services` | Filtrage par catégorie |
| GET | `/api/artisans?search=labbe` | Recherche d'artisans |
| GET | `/api/artisans/top` | Artisans du mois |
| GET | `/api/artisans/:id` | Fiche détaillée |
| POST | `/api/artisans/:id/contact` | Simulation du formulaire de contact |

## Formulaire de contact

Le formulaire permet au visiteur de renseigner :

- Son nom.
- Son adresse e-mail.
- L'objet de sa demande.
- Son message.

Les informations sont validées côté serveur avant le traitement de la demande.

**Important : l'envoi d'e-mails est simulé.** L'API retourne une confirmation après validation, mais aucun e-mail n'est réellement transmis à l'artisan.

L'intégration d'un service d'envoi d'e-mails constitue une amélioration possible du projet.

## Sécurité

Plusieurs mesures ont été mises en place :

- En-têtes HTTP de protection avec Helmet.
- Configuration CORS limitant les origines autorisées.
- Limitation des corps JSON à 20 Ko.
- Validation des données reçues par le formulaire.
- Limitation à 10 requêtes de contact par adresse IP sur 15 minutes.
- Utilisation de Sequelize pour l'accès à la base de données.
- Stockage des paramètres sensibles dans des variables d'environnement.
- Exclusion des fichiers `.env` du dépôt Git.
- Gestion centralisée des erreurs.

Des informations complémentaires figurent dans `docs/SECURITE.md` et `docs/VEILLE.md`.

## Accessibilité et responsive design

L'interface comprend notamment :

- Une structure HTML sémantique.
- Une navigation au clavier.
- Un lien d'évitement vers le contenu principal.
- Des labels associés aux champs des formulaires.
- Des styles de focus visibles.
- Une adaptation aux différentes tailles d'écran.
- Une prise en compte de `prefers-reduced-motion`.

Ces mesures contribuent à l'accessibilité sans constituer une certification complète de conformité RGAA.

## Modélisation de la base de données

La base de données comprend trois tables principales :

- `categories`
- `specialites`
- `artisans`

Chaque spécialité appartient à une catégorie et chaque artisan est associé à une spécialité.

Le modèle conceptuel et le modèle logique sont documentés dans :

`docs/MCD-MLD.md`

## Déploiement

L'application est hébergée sur **Alwaysdata**.

### Frontend

Le frontend est compilé avec :

```bash
cd client
npm run build
```

La configuration Vite utilise le chemin de base suivant :

```js
base: "/site/"
```

Les fichiers générés dans `client/dist` sont déployés sur l'hébergement web.

Un fichier `.htaccess` permet de gérer les accès directs aux routes React.

### Backend

L'API Node.js / Express est exécutée sur Alwaysdata et utilise une base MySQL/MariaDB.

### Configuration de production

Le frontend utilise :

```env
VITE_API_URL=https://chercheartisan.alwaysdata.net/api
```

Les identifiants de connexion à la base de données sont configurés dans l'environnement serveur et ne sont pas publiés dans le dépôt.

## Tests réalisés

Des vérifications manuelles ont été effectuées sur les fonctionnalités principales :

- Chargement des catégories.
- Affichage des 17 artisans.
- Affichage des trois artisans du mois.
- Recherche et filtrage.
- Consultation des fiches détaillées.
- Soumission simulée du formulaire de contact.
- Vérification des routes API.
- Affichage de la page 404 personnalisée.
- Accès direct aux routes React en production.
- Compilation du frontend avec Vite.

## Documentation

Le dossier `docs/` contient :

- `MCD-MLD.md` : modélisation de la base de données.
- `SECURITE.md` : mesures de sécurité.
- `VEILLE.md` : veille technologique et sécurité.
- `CHECKLIST.md` : suivi des livrables.

## Livrables

- Code source frontend React.
- Code source backend Node.js / Express.
- Scripts SQL de création et d'alimentation.
- Documentation technique.
- Dépôt GitHub.
- Application déployée sur Alwaysdata.

## Limites du projet

- L'envoi réel des e-mails n'est pas implémenté.
- Les maquettes Figma ne sont pas fournies.
- Les tests réalisés sont principalement manuels.

## Auteur

Projet réalisé dans le cadre d'une formation en développement web.