# Mesures de sécurité

1. Helmet : ajoute des en-têtes HTTP de protection.
2. CORS : n'autorise que l'origine du frontend déclarée dans CLIENT_URL.
3. Validation serveur : contrôle e-mail, tailles minimales et maximales.
4. Rate limiting : limite les soumissions répétées du formulaire de contact.
5. Limite JSON : empêche les corps de requêtes anormalement volumineux.
6. Sequelize : paramètres SQL gérés par l'ORM, sans concaténation de saisies utilisateur.
7. Variables d'environnement : identifiants BDD et SMTP absents du dépôt.
8. Erreurs génériques : les détails internes ne sont pas renvoyés au navigateur.
9. Liens externes : `rel="noreferrer"` avec `target="_blank"`.
10. Dépendances : exécuter régulièrement `npm audit` et mettre à jour les correctifs.
