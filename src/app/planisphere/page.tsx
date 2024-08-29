"use client";
import React from 'react';
import WorldMap from './WorldMap';
import { GlobalStyles } from './styles';

const WorldMapPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Carte du Monde Interactive</h1>
      <WorldMap />
      <GlobalStyles />
    </div>
  );
}

export default WorldMapPage;