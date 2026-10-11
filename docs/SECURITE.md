# Mesures de sécurité — Trouve ton artisan !

## 1. Protection des en-têtes HTTP

Le backend utilise **Helmet** pour ajouter des en-têtes HTTP contribuant à protéger l'application contre certaines attaques courantes.

## 2. Gestion des accès CORS

Le serveur Express utilise **CORS** pour autoriser les origines frontend configurées, notamment l'URL de production définie dans `CLIENT_URL` et les adresses locales utilisées pour le développement.

Cette configuration contrôle les accès entre origines depuis les navigateurs, sans remplacer une authentification ou une validation serveur.

## 3. Validation des formulaires

Les données transmises au formulaire de contact sont vérifiées côté serveur :

- Présence des champs obligatoires.
- Vérification du format de l'adresse e-mail.
- Contrôle des longueurs des champs.
- Vérification de l'existence de l'artisan destinataire.

## 4. Limitation des requêtes

Le formulaire de contact est protégé par **express-rate-limit**.

La configuration prévoit une limite de 10 requêtes par adresse IP sur une période de 15 minutes afin de réduire les soumissions abusives.

## 5. Limitation de la taille des requêtes

Express limite les corps JSON à **20 Ko** afin de réduire les risques liés à l'envoi de données excessivement volumineuses.

## 6. Sécurisation des accès à la base de données

L'application utilise **Sequelize**, un ORM permettant de construire des requêtes SQL sans concaténer directement les saisies des utilisateurs.

La validation des données reste nécessaire pour assurer leur cohérence et leur sécurité.

## 7. Protection des informations sensibles

Les paramètres de connexion à la base de données et les autres secrets éventuels sont conservés dans des variables d'environnement.

Les fichiers `.env` sont exclus du dépôt Git grâce au fichier `.gitignore`.

## 8. Gestion des erreurs

Le backend dispose d'un gestionnaire d'erreurs centralisé.

Les erreurs internes sont traitées sans transmettre de détails techniques sensibles au navigateur.

## 9. Sécurisation des liens externes

Les liens ouvrant un nouvel onglet utilisent les attributs adaptés, notamment `rel="noopener noreferrer"` avec `target="_blank"`, afin de limiter certains risques liés à la navigation externe.

## 10. Maintenance des dépendances

Les dépendances du frontend et du backend doivent être vérifiées régulièrement à l'aide de :

`npm audit`

Les mises à jour de sécurité doivent être appliquées après vérification de leur compatibilité avec le projet.

## 11. Limites et améliorations possibles

Les mesures précédentes contribuent à la sécurité de l'application, mais ne constituent pas un audit de sécurité complet.

Des améliorations restent possibles, notamment :

- L'ajout d'une protection antispam complémentaire.
- La mise en place de tests automatisés de sécurité.
- La surveillance des erreurs et des tentatives d'abus.
- La vérification régulière de la configuration de production.

## Conclusion

Le projet applique plusieurs bonnes pratiques de sécurité côté serveur, au niveau des requêtes HTTP, du formulaire de contact et de l'accès aux données.

Ces protections doivent être maintenues et vérifiées régulièrement.