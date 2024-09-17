const institutionsData = {
  "Institutions": [
    {
      "Nom": "Parlement",
      "Éléments": [
        {
          "Nom": "Chambre Basse",
          "Description": "Partie du parlement représentant directement les citoyens, souvent élue au suffrage universel.",
          "FonctionPrincipale": "Représentation directe des citoyens, initiation de lois."
        },
        {
          "Nom": "Chambre Haute",
          "Description": "Partie du parlement souvent composée de membres nommés ou désignés, représentant des entités ou des régions.",
          "FonctionPrincipale": "Représentation des entités régionales ou des groupes d'intérêts, révision des lois."
        }
      ]
    },
    {
      "Nom": "Cour Suprême",
      "Éléments": [
        {
          "Nom": "Constitutionnalité des Lois",
          "Description": "Examen de la conformité des lois avec la constitution.",
          "FonctionPrincipale": "Protection des normes constitutionnelles, contrôle des lois."
        },
        {
          "Nom": "Jurisprudence",
          "Description": "Ensemble des décisions judiciaires précédentes qui servent de référence pour les affaires futures.",
          "FonctionPrincipale": "Création et clarification des règles de droit."
        }
      ]
    },
    {
      "Nom": "Présidence",
      "Éléments": [
        {
          "Nom": "Président de la République",
          "Description": "Chef de l'État élu, avec des pouvoirs variés selon le système (exécutif, représentatif, etc.).",
          "FonctionPrincipale": "Représentation de l'État, leadership exécutif."
        },
        {
          "Nom": "Vice-Président",
          "Description": "Seconde figure exécutive, souvent responsable de fonctions spécifiques ou de remplacement du Président.",
          "FonctionPrincipale": "Succession au Président, responsabilités particulières."
        }
      ]
    },
    {
      "Nom": "Gouvernement",
      "Éléments": [
        {
          "Nom": "Premier Ministre",
          "Description": "Chef du gouvernement, souvent responsable de la direction de l'exécutif et de l'administration publique.",
          "FonctionPrincipale": "Direction du gouvernement, mise en œuvre des politiques publiques."
        },
        {
          "Nom": "Ministères",
          "Description": "Départements gouvernementaux spécialisés dans des domaines particuliers (économie, éducation, santé, etc.).",
          "FonctionPrincipale": "Gestion des politiques sectorielles, administration des services publics."
        }
      ]
    },
    {
      "Nom": "Conseil Constitutionnel", // Assurez-vous que le nom correspond
      "Éléments": [
        {
          "Nom": "Constitution",
          "Description": "Loi fondamentale du pays, définissant les principes et les valeurs du gouvernement.",
          "FonctionPrincipale": "Définition des principes et valeurs du gouvernement."
        },
        {
          "Nom": "Contrôle de Constitutionnalité",
          "Description": "Vérification que les lois et régulations respectent la constitution.",
          "FonctionPrincipale": "Assurer la primauté de la constitution."
        },
        {
          "Nom": "Avis Juridiques",
          "Description": "Conseils donnés sur les questions de constitutionnalité avant l'adoption des lois.",
          "FonctionPrincipale": "Prévention des conflits constitutionnels."
        }
      ]
    },
    {
      "Nom": "Ministère Public",
      "Éléments": [
        {
          "Nom": "Parquets",
          "Description": "Organismes responsables de la poursuite des infractions pénales au nom de l'État.",
          "FonctionPrincipale": "Poursuite des crimes, représentation des intérêts publics."
        },
        {
          "Nom": "Procureurs",
          "Description": "Agents judiciaires chargés de conduire les enquêtes et les poursuites pénales.",
          "FonctionPrincipale": "Conduite des affaires pénales, protection de l'intérêt public."
        }
      ]
    },
    {
      "Nom": "Commissions de Réforme",
      "Éléments": [
        {
          "Nom": "Commissions d'Étude",
          "Description": "Groupes chargés d'analyser des domaines spécifiques du droit ou de l'administration pour proposer des réformes.",
          "FonctionPrincipale": "Analyse des problèmes, proposition de réformes."
        },
        {
          "Nom": "Groupes de Travail",
          "Description": "Équipes spécialisées créées pour traiter des questions ou des projets spécifiques.",
          "FonctionPrincipale": "Développement de propositions concrètes."
        }
      ]
    },
    {
      "Nom": "Tribunal Administratif",
      "Éléments": [
        {
          "Nom": "Juridictions Administratives",
          "Description": "Tribunaux spécialisés dans le traitement des litiges entre les citoyens et l'administration publique.",
          "FonctionPrincipale": "Résolution des conflits entre individus et administration."
        },
        {
          "Nom": "Recours Administratifs",
          "Description": "Procédures permettant de contester les décisions administratives avant de saisir les juridictions.",
          "FonctionPrincipale": "Protection des droits des administrés, vérification des décisions administratives."
        }
      ]
    },
    {
      "Nom": "Autorité de Régulation",
      "Éléments": [
        {
          "Nom": "Régulateurs Financiers",
          "Description": "Organismes supervisant les marchés financiers et les institutions pour assurer leur stabilité et leur conformité.",
          "FonctionPrincipale": "Surveillance des marchés financiers, protection des investisseurs."
        },
        {
          "Nom": "Régulateurs des Communications",
          "Description": "Organismes chargés de réguler les services de télécommunications et de médias.",
          "FonctionPrincipale": "Régulation des communications, protection des consommateurs."
        }
      ]
    },
    {
      "Nom": "Ombudsman",
      "Éléments": [
        {
          "Nom": "Médiateurs",
          "Description": "Fonctionnaires ou organisations chargés de résoudre les plaintes contre les institutions publiques.",
          "FonctionPrincipale": "Résolution des plaintes, promotion de la justice."
        },
        {
          "Nom": "Enquêteurs",
          "Description": "Agents chargés d'enquêter sur les plaintes et de recommander des actions correctives.",
          "FonctionPrincipale": "Investigation des plaintes, recommandation d'améliorations."
        }
      ]
    },
    {
      "Nom": "Conseil de l'Europe",
      "Éléments": [
        {
          "Nom": "Comité des Ministres",
          "Description": "Organe décisionnel du Conseil de l'Europe, composé des ministres des affaires étrangères des États membres.",
          "FonctionPrincipale": "Adoption de politiques, supervision des activités du Conseil."
        },
        {
          "Nom": "Cour Européenne des Droits de l'Homme",
          "Description": "Tribunal international qui juge les violations des droits de l'homme par les États membres.",
          "FonctionPrincipale": "Protection des droits de l'homme, résolution des plaintes."
        }
      ]
    },
    {
      "Nom": "Assemblée Constituante",
      "Éléments": [
        {
          "Nom": "Élaboration de la Constitution",
          "Description": "Processus de création ou de révision d'une constitution, impliquant souvent une assemblée élue ou désignée.",
          "FonctionPrincipale": "Développement des normes constitutionnelles."
        },
        {
          "Nom": "Consultations Publiques",
          "Description": "Méthodes utilisées pour recueillir les avis et les contributions du public avant l'adoption de la constitution.",
          "FonctionPrincipale": "Participation citoyenne, élaboration démocratique."
        }
      ]
    },
    {
      "Nom": "Cour Pénale Internationale",
      "Éléments": [
        {
          "Nom": "Chambres de Jugement",
          "Description": "Sections du tribunal responsables du jugement des affaires criminelles internationales.",
          "FonctionPrincipale": "Jugement des crimes internationaux, assurance de la justice pénale."
        },
        {
          "Nom": "Bureau du Procureur",
          "Description": "Département responsable de la conduite des enquêtes et des poursuites devant la Cour Pénale Internationale.",
          "FonctionPrincipale": "Conduite des enquêtes criminelles internationales."
        }
      ]
    }
  ]
}

export default institutionsData;