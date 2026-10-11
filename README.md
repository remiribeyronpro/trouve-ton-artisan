# Trouve ton artisan !

Projet web réalisé à partir du cahier des charges « Trouve ton artisan ! » de la Région Auvergne-Rhône-Alpes.

## Stack
- Frontend : ReactJS, React Router, Bootstrap, Sass, Vite
- Backend : Node.js, Express
- ORM : Sequelize
- Base de données : MySQL / MariaDB
- Sécurité : Helmet, CORS restreint, limitation de débit du formulaire, validation serveur

## Prérequis
- Node.js 20+ recommandé
- npm
- MySQL 8+ ou MariaDB récent

## Installation

### 1. Base de données
Exécuter :
```sql
database/create_database.sql
database/seed_database.sql
```

### 2. API
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Adapter les identifiants MySQL dans `.env`.

### 3. Frontend
Dans un second terminal :
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Ouvrir l'adresse indiquée par Vite (généralement `http://localhost:5173`).

## Envoi des messages
Sans configuration SMTP, l'API valide le formulaire et retourne une réponse 202 sans transmettre d'e-mail.
Pour un envoi réel, renseigner `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` et `SMTP_FROM`.

## Routes API
- `GET /api/health`
- `GET /api/categories`
- `GET /api/artisans`
- `GET /api/artisans?category=Services`
- `GET /api/artisans?search=labbe`
- `GET /api/artisans/top`
- `GET /api/artisans/:id`
- `POST /api/artisans/:id/contact`

## Sécurité
- `helmet` pour les en-têtes HTTP de sécurité.
- CORS limité à l'origine du frontend.
- Corps JSON limité à 20 ko.
- Validation et limitation de longueur des données du formulaire.
- Rate limiting sur le formulaire de contact.
- Requêtes générées par Sequelize, évitant la concaténation SQL.
- Secrets dans `.env`, exclu du dépôt Git.
- Messages d'erreur génériques côté client.

## Accessibilité
- HTML sémantique.
- Lien d'évitement.
- Labels explicites.
- Navigation clavier et focus visible.
- Contrastes élevés.
- `prefers-reduced-motion`.
- Mise en page responsive.

## Déploiement
Déployer séparément :
1. la base MySQL/MariaDB ;
2. l'API Node/Express ;
3. le build Vite (`npm run build`).

Renseigner ensuite `CLIENT_URL` côté serveur et `VITE_API_URL` côté client avec les URLs de production.

## Livrables
Les scripts SQL sont dans `/database`. Le dossier de conception et de sécurité est dans `/docs`.
