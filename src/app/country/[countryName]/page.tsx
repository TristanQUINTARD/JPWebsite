"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import InstitutionsTable from "./InstitutionsTable";
import institutionsData from '../../../lib/models/institutionsData';
import './page.css';
import ParliamentChart from './ParliamentChart';
import { motion, AnimatePresence } from 'framer-motion';
import ConstitutionDisplay from './ConstitutionDisplay';

interface Party {
  seats: number;
  color: string;
}

interface Institution {
  Nom: string;
  Description: string;
  FonctionPrincipale: string;
  Details?: Record<string, string | string[]>;
}

const InstitutionDetailsComponent: React.FC<{ institution: Institution }> = ({ institution }) => (
  <div>
    <h2>{institution.Nom}</h2>
    <p><strong>Description:</strong> {institution.Description}</p>
    <p><strong>Fonction Principale:</strong> {institution.FonctionPrincipale}</p>
    
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

interface Article {
  id: number;
  chapter_id: number;
  number: string;
  content: string;
}

interface CountrySpecificData {
  Institutions: Institution[];
  Constitution: Article[];
  ParliamentData?: {
    parties: Record<string, Party>;
  };
}

const CountryPage: React.FC = () => {
  const { countryName } = useParams();
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [countrySpecificData, setCountrySpecificData] = useState<CountrySpecificData | null>(null);

  useEffect(() => {
    const loadCountrySpecificData = async () => {
      try {
        console.log(`Tentative de chargement des données pour ${countryName}`);
        const response = await fetch(`/data/${countryName}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Données chargées complètes:', data);
        console.log('Données ParliamentData chargées:', data.ParliamentData);
        setCountrySpecificData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données spécifiques au pays :", error);
        setCountrySpecificData(null);
      }
    };
    
    loadCountrySpecificData();
  }, [countryName]);

  const handleItemClick = (institution: Institution) => {
    console.log('Institution sélectionnée:', institution);
    const additionalDetails = countrySpecificData?.Institutions.find(
      (inst) => inst.Nom === institution.Nom
    );

    if (additionalDetails) {
      console.log('Détails supplémentaires trouvés:', additionalDetails);
      setSelectedInstitution({ ...institution, Details: additionalDetails.Details });
    } else {
      console.log('Aucun détail supplémentaire trouvé');
      setSelectedInstitution(institution);
    }
  };

  const handleUpdateArticle = (updatedArticle: Article) => {
    if (countrySpecificData) {
      const updatedConstitution = countrySpecificData.Constitution.map(article =>
        article.id === updatedArticle.id ? updatedArticle : article
      );
      setCountrySpecificData({
        ...countrySpecificData,
        Constitution: updatedConstitution
      });
    }
  };

  const shouldShowParliament = selectedInstitution && 
    (selectedInstitution.Nom === "Chambre Basse" || selectedInstitution.Nom === "Chambre Haute") && 
    countrySpecificData?.ParliamentData?.parties &&
    Object.keys(countrySpecificData.ParliamentData.parties).length > 0;

  console.log('shouldShowParliament:', shouldShowParliament);
  console.log('selectedInstitution:', selectedInstitution);
  console.log('countrySpecificData?.ParliamentData:', countrySpecificData?.ParliamentData);

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
                {selectedInstitution.Nom === "Constitution" && countrySpecificData ? (
                  <ConstitutionDisplay 
                    constitution={countrySpecificData.Constitution} 
                    onUpdateArticle={handleUpdateArticle}
                  />
                ) : (
                  <>
                    <InstitutionDetailsComponent institution={selectedInstitution} />
                    {shouldShowParliament && countrySpecificData?.ParliamentData && (
                      <div className="parliament-section">
                        <h3>Composition du Parlement</h3>
                        <div className="parliament-chart-container">
                          <ParliamentChart 
                            width={900} 
                            height={500}
                            parties={countrySpecificData.ParliamentData.parties} 
                          />
                        </div>
                        <div className="parliament-legend">
                          {Object.entries(countrySpecificData.ParliamentData.parties).map(([name, party]) => (
                            <div key={name} className="legend-item">
                              <span className="color-dot" style={{ backgroundColor: party.color }}></span>
                              <span>{name}: {party.seats} sièges</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {!shouldShowParliament && (selectedInstitution.Nom === "Chambre Basse" || selectedInstitution.Nom === "Chambre Haute") && (
                      <p>Le ParliamentChart ne peut pas être affiché. Données manquantes ou invalides.</p>
                    )}
                  </>
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