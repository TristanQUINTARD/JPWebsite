// InstitutionsTable.jsx
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InstitutionsTable.css';

// Popup component to show institution details on hover
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

export const InstitutionsTable = ({ onItemClick, countryData }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [popupStyle, setPopupStyle] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedInstitutions, setExpandedInstitutions] = useState({});
  const [selectedInstitution, setSelectedInstitution] = useState(null);
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
    setExpandedInstitutions((prev) => ({
      ...prev,
      [institutionName]: !prev[institutionName],
    }));
  };

  const handleInstitutionSelect = (institution) => {
    setSelectedInstitution(institution);
    setExpandedInstitutions({
      [institution.Nom]: true,
    });
  };

  const filteredInstitutions = countryData?.Institutions.filter((institution) =>
    institution.Éléments.some((element) =>
      element.Nom.toLowerCase().includes(searchTerm.toLowerCase())
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
          value={selectedInstitution ? selectedInstitution.Nom : ''}
          onChange={(e) =>
            handleInstitutionSelect(
              countryData.Institutions.find((i) => i.Nom === e.target.value)
            )
          }
        >
          <option value="">Sélectionnez une institution</option>
          {countryData?.Institutions.map((institution) => (
            <option key={institution.Nom} value={institution.Nom}>
              {institution.Nom}
            </option>
          ))}
        </select>
      </div>
      <div className="accordion">
        {filteredInstitutions?.map((institution) => (
          <div key={institution.Nom} className="institution-item">
            <button
              className="institution-header"
              onClick={() => {
                toggleInstitution(institution.Nom);
                onItemClick(institution); // Appel de onItemClick avec l'institution
              }}
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
                      ref={(el) => cellRefs.current.set(element.Nom, el)}
                      onMouseEnter={(event) => handleMouseEnter(event, element)}
                      onMouseLeave={handleMouseLeave}
                      className="element-item"
                      onClick={() => onItemClick(element)}
                    >
                      <span>{element.Nom}</span>
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
