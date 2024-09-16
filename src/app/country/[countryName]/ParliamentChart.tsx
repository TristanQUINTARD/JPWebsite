import React from 'react';
import parliamentSVG from 'parliament-svg';

interface ParliamentChartProps {
  width: number;
  parties: Record<string, { seats: number; color: string }>;
}

const ParliamentChart: React.FC<ParliamentChartProps> = ({ width, parties }) => {
  console.log('ParliamentChart props:', { width, parties });
  
  if (!parties || Object.keys(parties).length === 0) {
    return <div>Aucune donnée de parti disponible pour afficher le graphique.</div>;
  }

  const seatCount = Object.values(parties).reduce((total, party) => total + party.seats, 0);
  const { svg } = parliamentSVG(parties, seatCount);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width }} />
      <ul>
        {Object.entries(parties).map(([name, party]) => (
          <li key={name} style={{ color: party.color }}>
            {name}: {party.seats} sièges
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParliamentChart;