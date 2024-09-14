"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { geoPath, geoMercator, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import countriesInfo from "../api/continents.json"
import continentsData from "../api/dataaa.json" // Assurez-vous que ce fichier existe
import { BASE_MAP_URL, continentColors } from './constants';

// Interfaces and types
interface Geography {
  type: string;
  properties: {
    name: string;
    Continent: string;
    Capitale: string;
    Population: string;
    "Langue officielle principale": string;
    Monnaie: string;
    "Président actuel": string;
    "Forme de l'État": string;
    "Régime politique": string;
    "Système juridique": string;
    "Organisation juridictionnelle": string;
  };
  geometry: any;
}

interface Dimensions {
  width: number;
  height: number;
}

const WorldMap: React.FC = () => {
  const [geographies, setGeographies] = useState<Geography[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Geography | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragTimeout, setDragTimeout] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoBubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        setDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    fetch(BASE_MAP_URL)
      .then(response => response.json())
      .then(worldData => {
        const countries = feature(worldData, worldData.objects.countries);
        const mergedData = countries.features.map((country: any) => ({
          ...country,
          properties: {
            ...country.properties,
            ...continentsData.objects.countries.geometries.find((c: any) => c.id === country.id)?.properties,
            ...countriesInfo.objects.countries.geometries.find((c: any) => c.id === country.id)?.properties
          }
        }));
        setGeographies(mergedData);
      });
  }, []);

  const projection = useMemo(() => {
    return geoMercator()
      .scale(100 * zoom)
      .center(center)
      .translate([dimensions.width / 2, dimensions.height / 2]);
  }, [dimensions, zoom, center]);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const handleCountryClick = useCallback((geography: Geography, event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedCountry && selectedCountry.properties.name === geography.properties.name) {
      closeInfoBubble();
    } else {
      setSelectedCountry(geography);
      const centroid = geoCentroid(geography);
      setCenter(centroid);
      setZoom(4);
    }
  }, [selectedCountry]);

  const handleMapClick = useCallback(() => {
    if (selectedCountry) {
      closeInfoBubble();
    }
  }, [selectedCountry]);

  const getCountryColor = (geography: Geography) => {
    const continent = geography.properties.Continent;
    return continentColors[continent] || "#d3d3d3";
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 10));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 1));
  const handleReset = () => {
    setZoom(1);
    setCenter([0, 20]);
    closeInfoBubble();
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    
    if (dragTimeout) {
      clearTimeout(dragTimeout);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;

      setVelocity(prevVelocity => ({
        x: dx - prevVelocity.x,
        y: dy - prevVelocity.y
      }));

      setCenter(prevCenter => [
        prevCenter[0] - dx / (50 * zoom),
        prevCenter[1] + dy / (50 * zoom)
      ]);

      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const deceleration = () => {
      if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
        setCenter(prevCenter => [
          prevCenter[0] - velocity.x / (50 * zoom),
          prevCenter[1] + velocity.y / (50 * zoom)
        ]);

        setVelocity(prevVelocity => ({
          x: prevVelocity.x * 0.95,
          y: prevVelocity.y * 0.95
        }));

        setDragTimeout(setTimeout(deceleration, 16));
      } else {
        setVelocity({ x: 0, y: 0 });
        if (dragTimeout) {
          clearTimeout(dragTimeout);
        }
      }
    };

    deceleration();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isSwipeDown = distance < -50;
      if (isSwipeDown && selectedCountry) {
        closeInfoBubble();
      }
      setTouchStart(null);
      setTouchEnd(null);
    }
  };

  useEffect(() => {
    if (selectedCountry && infoBubbleRef.current) {
      infoBubbleRef.current.style.transform = 'translateY(0)';
      infoBubbleRef.current.style.opacity = '1';
    }
  }, [selectedCountry]);

  const closeInfoBubble = () => {
    if (infoBubbleRef.current) {
      infoBubbleRef.current.style.transform = 'translateY(100%)';
      infoBubbleRef.current.style.opacity = '0';
      setTimeout(() => setSelectedCountry(null), 300);
    }
  };

  return (
    <div 
      className="world-map" 
      ref={mapRef}
      onClick={handleMapClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <g>
          {geographies.map((geography, i) => (
            <path
              key={i}
              d={pathGenerator(geography) || ""}
              className={`country ${selectedCountry?.properties.name === geography.properties.name ? 'selected' : ''}`}
              onClick={(e) => handleCountryClick(geography, e)}
              fill={getCountryColor(geography)}
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
          ))}
        </g>
      </svg>
      <div className="controls">
        <button onClick={handleZoomIn} className="control-btn"><ZoomIn size={20} /></button>
        <button onClick={handleZoomOut} className="control-btn"><ZoomOut size={20} /></button>
        <button onClick={handleReset} className="control-btn"><RefreshCw size={20} /></button>
      </div>
      {selectedCountry && (
        <div 
          ref={infoBubbleRef}
          className="info-bubble"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="info-bubble-header">
            <h3>
              <Link href={`/country/${selectedCountry.properties.name}`}>
                {selectedCountry.properties.name}
              </Link>
            </h3>
            <button onClick={closeInfoBubble} className="close-btn">&times;</button>
          </div>
          <div className="info-content">
            <p><strong>Continent:</strong> {selectedCountry.properties.Continent}</p>
            <p><strong>Capitale:</strong> {selectedCountry.properties.Capitale}</p>
            <p><strong>Population:</strong> {selectedCountry.properties.Population}</p>
            <p><strong>Langue officielle:</strong> {selectedCountry.properties["Langue officielle principale"]}</p>
            <p><strong>Monnaie:</strong> {selectedCountry.properties.Monnaie}</p>
            <p><strong>Président actuel:</strong> {selectedCountry.properties["Président actuel"]}</p>
            <p><strong>Forme de l'État:</strong> {selectedCountry.properties["Forme de l'État"]}</p>
            <p><strong>Régime Politique:</strong> {selectedCountry.properties["Régime politique"]}</p>
            <p><strong>Système juridique:</strong> {selectedCountry.properties["Système juridique"]}</p>
            <p><strong>Organisation juridictionnelle:</strong> {selectedCountry.properties["Organisation juridictionnelle"]}</p>
          </div>
        </div>
      )}
      <div className="legend">
        {Object.entries(continentColors).map(([continent, color]) => (
          <div key={continent} className="legend-item">
            <span className="color-box" style={{ backgroundColor: color }}></span>
            <span>{continent}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;