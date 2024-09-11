"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import InstitutionsTable from "./InstitutionsTable.jsx";
import institutionsData from '../../../lib/models/institutionsData';
import './page.css';
import { toHtml as toSvg } from 'hast-util-to-html';
import parliamentSVG from 'parliament-svg';
import { motion, AnimatePresence } from 'framer-motion';

const ParliamentChart = ({ width, parties }) => {
  const seatCount = Object.values(parties).reduce((total, party) => total + party.seats, 0);
  const virtualSvg = parliamentSVG(parties, seatCount);
  const svg = toSvg(virtualSvg);

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width }} />
  );
};

// Composant pour afficher les détails d'une institution sélectionnée
const InstitutionDetailsComponent = ({ institution }) => (
  <div>
    <h2>{institution.Nom}</h2>
    <p><strong>Description:</strong> {institution.Description}</p>
    <p><strong>Fonction Principale:</strong> {institution.FonctionPrincipale}</p>
    
    {/* Vérification et affichage des détails supplémentaires */}
    {institution.Details && (
      <div>
        <h3>Détails Supplémentaires :</h3>
        <ul>
          {Object.entries(institution.Details).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const CountryPage = () => {
  const { countryName } = useParams();
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [countrySpecificData, setCountrySpecificData] = useState(null);

  console.log("CountryPage rendered. countryName:", countryName);

  // Charger les données spécifiques au pays au chargement de la page
  useEffect(() => {
    const loadCountrySpecificData = async () => {
      console.log(`Attempting to load data for country: ${countryName}`);
      try {
        const response = await fetch(`/data/${countryName}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data loaded successfully:", data);
        setCountrySpecificData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données spécifiques au pays :", error);
        setCountrySpecificData(null); // Réinitialise les données en cas d'erreur
      }
    };
    
    loadCountrySpecificData();
  }, [countryName]);

  useEffect(() => {
    console.log("countrySpecificData updated:", countrySpecificData);
  }, [countrySpecificData]);

  // Gestion du clic sur une institution
  const handleItemClick = (institution) => {
    console.log("Institution clicked:", institution);

    // Rechercher des détails spécifiques au pays pour l'institution sélectionnée
    const additionalDetails = countrySpecificData?.Institutions?.find(
      (inst) => inst.Nom === institution.Nom
    );

    console.log("Additional details found:", additionalDetails);

    if (additionalDetails) {
      // Fusionner les détails de l'institution avec les détails spécifiques au pays
      setSelectedInstitution({ ...institution, Details: additionalDetails.Details });
    } else {
      // Si aucun détail supplémentaire n'est trouvé, sélectionner simplement l'institution de base
      setSelectedInstitution(institution);
    }
  };

  // Afficher le graphique du parlement si l'institution sélectionnée est un parlement et que les données sont disponibles
  const shouldShowParliament = selectedInstitution && countrySpecificData?.ParliamentData?.parties;

  console.log("shouldShowParliament:", shouldShowParliament);
  console.log("selectedInstitution:", selectedInstitution);
  console.log("countrySpecificData?.ParliamentData:", countrySpecificData?.ParliamentData);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">Mon Application</div>
      </nav>
      <main className="main-content">
        <aside className="sidebar">
          {institutionsData && (
            <InstitutionsTable
              onItemClick={handleItemClick}
              countryData={institutionsData}
            />
          )}
        </aside>
        <div className="content">
          <AnimatePresence>
            {selectedInstitution ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InstitutionDetailsComponent institution={selectedInstitution} />
                {shouldShowParliament && (
                  <ParliamentChart width={500} parties={countrySpecificData.ParliamentData.parties} />
                )}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {countryName
                  ? `Veuillez sélectionner une institution de ${countryName} pour voir les détails.`
                  : "Veuillez sélectionner une institution pour voir les détails."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CountryPage;
