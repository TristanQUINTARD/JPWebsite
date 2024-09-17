import React from 'react';
import { useParams } from 'react-router-dom';
import InstitutionsTable from './[countryName]/InstitutionsTable';

const CountryInstitutions: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();

  return (
    <div className="country-institutions">
      <h1>{countryName} Institutions</h1>
      <InstitutionsTable countryFilter={countryName} />
    </div>
  );
};

export default CountryInstitutions;