import React from 'react';

interface Party {
  seats: number;
  color: string;
}

interface ParliamentChartProps {
  width: number;
  height: number;
  parties: Record<string, Party>;
}

const ParliamentChart: React.FC<ParliamentChartProps> = ({ width, height, parties }) => {
  const totalSeats = Object.values(parties).reduce((sum, party) => sum + party.seats, 0);
  const centerX = width / 2;
  const centerY = height * 0.9;
  const radius = Math.min(width, height) * 0.45;
  const innerRadius = radius * 0.4;
  const seatRadius = radius * 0.025; // Taille des sièges

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const calculateSeatPosition = (seatIndex: number, totalSeats: number) => {
    const rows = 8; // Nombre de rangées
    const seatsPerRow = Math.ceil(totalSeats / rows);
    const row = Math.floor(seatIndex / seatsPerRow);
    const seatInRow = seatIndex % seatsPerRow;
    
    const rowRadius = innerRadius + (radius - innerRadius) * (row / (rows - 1));
    const angleStep = 180 / (seatsPerRow + 1);
    const seatAngle = -90 + angleStep * (seatInRow + 1);
    
    return polarToCartesian(centerX, centerY, rowRadius, seatAngle);
  };

  const seatElements: JSX.Element[] = [];
  const labelElements: JSX.Element[] = [];
  let seatCount = 0;

  Object.entries(parties).forEach(([name, party]) => {
    for (let i = 0; i < party.seats; i++) {
      const position = calculateSeatPosition(seatCount, totalSeats);
      seatElements.push(
        <circle
          key={`seat-${seatCount}`}
          cx={position.x}
          cy={position.y}
          r={seatRadius}
          fill={party.color}
          stroke="white"
          strokeWidth="0.5"
        />
      );
      seatCount++;
    }

    // Ajout des étiquettes
    const middleAngle = -90 + (seatCount - party.seats / 2) * (180 / totalSeats);
    const labelRadius = radius * 1.1;
    const labelPosition = polarToCartesian(centerX, centerY, labelRadius, middleAngle);
    labelElements.push(
      <text
        key={`label-${name}`}
        x={labelPosition.x}
        y={labelPosition.y}
        textAnchor={middleAngle < 0 ? "end" : "start"}
        alignmentBaseline="middle"
        fill="black"
        fontSize="12"
        transform={`rotate(${middleAngle < 0 ? middleAngle + 90 : middleAngle - 90}, ${labelPosition.x}, ${labelPosition.y})`}
      >
        {name} ({party.seats})
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <path
        d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
        fill="none"
        stroke="#ccc"
      />
      <path
        d={`M ${centerX - innerRadius} ${centerY} A ${innerRadius} ${innerRadius} 0 0 1 ${centerX + innerRadius} ${centerY}`}
        fill="none"
        stroke="#ccc"
      />
      {seatElements}
      {labelElements}
    </svg>
  );
};

export default ParliamentChart;