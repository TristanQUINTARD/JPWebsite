"use client";
import React, { useState } from 'react';
import { toHtml as toSvg } from 'hast-util-to-html';
import parliamentSVG from 'parliament-svg';
import InstitutionsTable from "./InstitutionsTable";
import { motion, AnimatePresence } from 'framer-motion';
import "../globals.css";
import './page.css';

// Définir les données des partis
const parties = {
    "linke": {
        "seats": 64,
        "colour": "#a08"
    },
    "spd": {
        "seats": 193,
        "colour": "#e02"
    },
    "gruene": {
        "seats": 63,
        "colour": "#0b2"
    },
    "union": {
        "seats": 311,
        "colour": "#333"
    }
};

// Assurez-vous que `seatCount` est défini ou passé comme prop
const seatCount = Object.values(parties).reduce((total, party) => total + party.seats, 0);

// Générez le SVG virtuel en utilisant les données des partis et le nombre total de sièges
const virtualSvg = parliamentSVG(parties, seatCount);

// Convertissez le SVG virtuel en HTML
const svg = toSvg(virtualSvg);

const ParliamentChart = ({ width }) => (
    <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width }} />
);

// Composant pour afficher les détails de l'institution
const InstitutionDetailsComponent = ({ institution }) => (
    <div>
        <h2>{institution.Nom}</h2>
        <p><strong>Description:</strong> {institution.Description}</p>
        <p><strong>Pays:</strong> {institution.Pays}</p>
        <p><strong>Fonction Principale:</strong> {institution.FonctionPrincipale}</p>
    </div>
);

const App = () => {
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    const handleItemClick = (institution) => {
        setSelectedInstitution(institution);
    };

    const shouldShowParliament = selectedInstitution && 
        (selectedInstitution.Nom === "Chambre Basse" || selectedInstitution.Nom === "Chambre Haute");

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="navbar-brand">Mon Application</div>
            </nav>
            <main className="main-content">
                <aside className="sidebar">
                    <InstitutionsTable onItemClick={handleItemClick} />
                </aside>
                <div className="content">
                    {selectedInstitution ? (
                        <>
                            <InstitutionDetailsComponent institution={selectedInstitution} />
                            {shouldShowParliament && <ParliamentChart width={500} />}
                        </>
                    ) : (
                        <p>Veuillez sélectionner une institution pour voir les détails.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;