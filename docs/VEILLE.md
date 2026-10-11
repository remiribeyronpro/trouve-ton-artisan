# Veille sur les vulnérabilités

Sources recommandées pour la veille :
- OWASP Top 10 : risques web courants.
- GitHub Advisory Database : vulnérabilités de dépendances.
- npm audit : audit local des dépendances Node.
- Bulletins de sécurité Node.js, Express, Sequelize, Vite et React.

Risques particulièrement pertinents :
- injection SQL ;
- XSS ;
- mauvaise configuration CORS ;
- exposition de secrets ;
- abus du formulaire de contact / spam ;
- dépendances vulnérables ;
- fuite d'informations via les erreurs.

Réponses intégrées au projet :
Sequelize, validation serveur, Helmet, CORS restreint, rate limiting, `.env`, limites de taille et messages d'erreur génériques.
