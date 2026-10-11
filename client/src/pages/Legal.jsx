
const legalContent = {
  "Mentions légales": {
    sections: [
      {
        heading: "Éditeur du site",
        text: "Trouve ton artisan est un site de démonstration réalisé dans le cadre d'un projet de formation en développement web. Il présente un annuaire fictif d'artisans de la région Auvergne-Rhône-Alpes. Ce site n'est pas un service officiel de la Région."
      },
      {
        heading: "Hébergement",
        text: "Le site fonctionne actuellement dans un environnement de développement local. Les informations relatives à son hébergement public seront précisées en cas de mise en ligne."
      },
      {
        heading: "Propriété intellectuelle",
        text: "Les contenus, éléments graphiques et composants du site sont utilisés à des fins pédagogiques. Les droits des éléments provenant de tiers restent la propriété de leurs titulaires respectifs."
      },
      {
        heading: "Responsabilité",
        text: "Les informations relatives aux artisans sont fictives ou utilisées à des fins de démonstration. Elles ne constituent pas des recommandations professionnelles."
      }
    ]
  },

  "Données personnelles": {
    sections: [
      {
        heading: "Collecte des données",
        text: "Le formulaire de contact demande un nom, une adresse e-mail, un objet et un message. Ces informations servent à simuler une demande de contact auprès d'un artisan."
      },
      {
        heading: "Utilisation des données",
        text: "Dans la configuration de démonstration, aucune demande n'est envoyée par e-mail à un artisan. Les données saisies peuvent néanmoins être transmises au serveur local et apparaître dans les journaux de développement."
      },
      {
        heading: "Conservation des données",
        text: "Les durées et modalités de conservation devront être définies et documentées avant toute mise en production."
      },
      {
        heading: "Vos droits",
        text: "Dans le cadre d'une mise en ligne réelle, les informations relatives au responsable du traitement, aux droits des personnes et aux modalités de contact devront être complétées conformément au RGPD."
      }
    ]
  },

  "Accessibilité": {
    sections: [
      {
        heading: "Notre démarche",
        text: "Ce projet cherche à proposer une navigation claire, des contenus lisibles et des formulaires compréhensibles sur ordinateur, tablette et smartphone."
      },
      {
        heading: "Fonctionnalités",
        text: "Le site utilise des titres structurés, des libellés de formulaires, des liens de navigation et une mise en page responsive."
      },
      {
        heading: "État de conformité",
        text: "Aucun audit complet de conformité au Référentiel général d'amélioration de l'accessibilité (RGAA) n'a encore été réalisé. La conformité du site ne peut donc pas être attestée."
      },
      {
        heading: "Amélioration continue",
        text: "Des vérifications complémentaires seront nécessaires, notamment concernant la navigation au clavier, les contrastes, les lecteurs d'écran et les messages d'erreur."
      }
    ]
  },

  "Cookies": {
    sections: [
      {
        heading: "Utilisation des cookies",
        text: "Dans sa configuration de démonstration, le projet ne prévoit pas de cookies publicitaires ni de traceurs statistiques."
      },
      {
        heading: "Cookies techniques",
        text: "Des outils de développement ou des services tiers peuvent utiliser des mécanismes techniques de stockage. Leur présence devra être vérifiée avant la mise en ligne."
      },
      {
        heading: "Gestion des préférences",
        text: "Si des traceurs soumis au consentement sont ajoutés ultérieurement, un dispositif permettant d'accepter ou de refuser leur utilisation devra être mis en place."
      }
    ]
  }
};

export default function Legal({ title }) {
  const content = legalContent[title];

  return (
    <section className="container section legal-page">
      <p className="eyebrow">Informations</p>
      <h1>{title}</h1>

      {content ? (
        <div className="legal-content">
          {content.sections.map((section) => (
            <article className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Page introuvable</h2>
          <p>Le contenu demandé n'est pas disponible.</p>
        </div>
      )}
    </section>
  );
}
