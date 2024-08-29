"use client";
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import institutionsData from '../../../lib/models/institutionsData';
import './InstitutionsTable.css';
import { InstitutionDetails } from './InstitutionDetails';

const Popup = ({ content, style }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    style={style}
    className="popup"
  >
    <h3>{content.Nom}</h3>
    <p><strong>Description :</strong> {content.Description}</p>
    <p><strong>Fonction Principale :</strong> {content.FonctionPrincipale}</p>
  </motion.div>
);

export const InstitutionsTable = ({ onItemClick }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [popupStyle, setPopupStyle] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [expandedInstitutions, setExpandedInstitutions] = useState({});
  const cellRefs = useRef(new Map());

  const handleMouseEnter = useCallback((event, element) => {
    const cell = cellRefs.current.get(element.Nom);
    if (cell) {
      const rect = cell.getBoundingClientRect();
      const popupWidth = 300;
      const leftPosition = rect.left + window.scrollX;
      const topPosition = rect.bottom + window.scrollY + 10;
      setPopupStyle({
        position: 'absolute',
        top: `${topPosition}px`,
        left: `${Math.min(leftPosition, window.innerWidth - popupWidth - 20)}px`,
        width: `${popupWidth}px`,
      });
      setHoveredItem(element);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const toggleInstitution = (institutionName) => {
    setExpandedInstitutions(prev => ({
      ...prev,
      [institutionName]: !prev[institutionName]
    }));
  };

  const filteredInstitutions = institutionsData.Institutions.filter(institution =>
    institution.Éléments.some(element =>
      element.Nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCountry === '' || element.Pays === filterCountry)
    )
  );

  return (
    <div className="institutions-table">
      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        >
          <option value="">Tous les pays</option>
          {/* Ajoutez les options de pays ici */}
        </select>
      </div>
      <div className="accordion">
        {filteredInstitutions.map((institution) => (
          <div key={institution.Nom} className="institution-item">
            <button
              className="institution-header"
              onClick={() => toggleInstitution(institution.Nom)}
            >
              {institution.Nom}
            </button>
            <AnimatePresence>
              {expandedInstitutions[institution.Nom] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="institution-elements"
                >
                  {institution.Éléments.map((element, index) => (
                    <div
                      key={index}
                      ref={el => cellRefs.current.set(element.Nom, el)}
                      onMouseEnter={(event) => handleMouseEnter(event, element)}
                      onMouseLeave={handleMouseLeave}
                      className="element-item"
                      onClick={() => onItemClick(element)}  // Appel de la fonction lors du clic
                    >
                      <span>{element.Nom}</span>
                      <span>{element.Pays}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {hoveredItem && <Popup content={hoveredItem} style={popupStyle} />}
      </AnimatePresence>
    </div>
  );
};

export default InstitutionsTable;
