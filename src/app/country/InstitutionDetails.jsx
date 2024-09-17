import React from 'react';

export const InstitutionDetails = ({ institution, onBack }) => {
  return (
    <div className="institution-details">
      <button onClick={onBack}>Retour</button>
      <h2>{institution.Nom}</h2>
      <p>Pays: {institution.Pays}</p>
      <p>Description: {institution.Description}</p>
      {/* Ajoutez ici d'autres détails de l'institution */}
    </div>
  );
};