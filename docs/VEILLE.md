# Veille technologique et sécurité — Trouve ton artisan !

## 1. Objectif de la veille

La veille technologique permet de suivre les évolutions des technologies utilisées dans le projet « Trouve ton artisan ! » et d'identifier les vulnérabilités susceptibles d'affecter l'application.

Elle concerne principalement :

- React et Vite pour le frontend.
- Node.js et Express pour le backend.
- Sequelize pour l'accès aux données.
- MySQL / MariaDB pour la base de données.
- Les dépendances npm utilisées par le projet.

## 2. Sources de veille

| Source | Informations recherchées |
|---|---|
| [OWASP Top 10](https://owasp.org/www-project-top-ten/) | Principaux risques de sécurité des applications web |
| [GitHub Advisory Database](https://github.com/advisories) | Vulnérabilités connues dans les bibliothèques |
| [Node.js Security](https://nodejs.org/en/security) | Bulletins de sécurité Node.js |
| [npm](https://docs.npmjs.com/cli/commands/npm-audit) | Audit des dépendances du projet |
| [React](https://react.dev/) | Évolutions et recommandations officielles |
| [Vite](https://vite.dev/) | Mises à jour et changements techniques |
| [Sequelize](https://sequelize.org/) | Documentation et évolutions de l'ORM |

## 3. Risques identifiés

### Injection SQL

Une injection SQL peut survenir lorsque des données utilisateur sont intégrées de manière non sécurisée dans une requête.

**Mesure appliquée :** utilisation de Sequelize pour construire les requêtes et validation des données côté serveur.

### Cross-Site Scripting (XSS)

Une attaque XSS consiste à faire exécuter du code malveillant dans le navigateur d'un utilisateur.

**Mesures appliquées :** utilisation de React, qui échappe les valeurs affichées par défaut, et configuration d'en-têtes HTTP avec Helmet.

### Mauvaise configuration CORS

Une configuration CORS trop permissive peut permettre à des sites non prévus de lire certaines réponses de l'API depuis un navigateur.

**Mesure appliquée :** définition d'une liste d'origines autorisées dans Express.

### Exposition de données sensibles

Des identifiants de base de données ou des clés secrètes publiés dans un dépôt peuvent compromettre l'application.

**Mesure appliquée :** utilisation de variables d'environnement et exclusion des fichiers `.env` du dépôt Git.

### Abus du formulaire de contact

Des soumissions répétées peuvent provoquer du spam ou une consommation excessive des ressources.

**Mesures appliquées :** validation des champs, limitation du nombre de requêtes et restriction de la taille des données JSON.

### Dépendances vulnérables

Les bibliothèques utilisées peuvent contenir des vulnérabilités découvertes après leur installation.

**Mesure recommandée :** vérifier régulièrement les dépendances et appliquer les correctifs compatibles.

## 4. Méthode de veille

La démarche recommandée est la suivante :

1. Consulter régulièrement les bulletins de sécurité des technologies utilisées.
2. Exécuter `npm audit` dans les dossiers `client` et `server`.
3. Examiner les vulnérabilités signalées et leur niveau de gravité.
4. Identifier les versions corrigées.
5. Tester les mises à jour dans l'environnement local.
6. Déployer les corrections après validation.

Une vérification mensuelle est recommandée, ainsi qu'une vérification supplémentaire avant chaque déploiement important.

## 5. Outils de vérification

Pour analyser les dépendances du frontend :

```bash
cd client
npm audit
```

Pour analyser les dépendances du backend :

```bash
cd server
npm audit
```

Les résultats doivent être examinés avant toute mise à jour. La commande `npm audit fix --force` ne doit pas être exécutée automatiquement, car elle peut installer des versions incompatibles.

## 6. Suivi des vulnérabilités

Pour assurer la traçabilité, chaque vulnérabilité importante peut être documentée avec :

- La date de découverte.
- La bibliothèque concernée.
- Le niveau de gravité.
- La version affectée.
- Le correctif disponible.
- La date de mise à jour.
- Le résultat des tests après correction.

Ce suivi permet de justifier les décisions techniques et les actions de maintenance.

## 7. Améliorations envisagées

Plusieurs évolutions pourraient renforcer la sécurité du projet :

- Mettre en place des alertes automatiques avec GitHub Dependabot.
- Ajouter des tests automatisés.
- Renforcer la protection antispam du formulaire.
- Mettre en place une surveillance des erreurs de production.
- Réaliser des audits de sécurité périodiques.

## Conclusion

La veille technologique constitue une activité continue du développement web.

Pour « Trouve ton artisan ! », elle permet de surveiller les vulnérabilités liées aux dépendances JavaScript, aux communications HTTP et à la gestion des données.

Les mesures déjà intégrées contribuent à réduire certains risques, tandis que les vérifications régulières et les mises à jour permettent de maintenir le niveau de sécurité de l'application.