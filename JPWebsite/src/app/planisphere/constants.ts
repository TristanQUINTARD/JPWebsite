// URL de base pour récupérer les données cartographiques
export const BASE_MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Couleurs associées à chaque continent pour le rendu visuel de la carte
export const continentColors: { [key: string]: string } = {
  "L'Afrique.": "#FF6B6B",     // Rouge clair pour l'Afrique
  "L'Asie.": "#4ECDC4",        // Turquoise pour l'Asie
  "L'Europe.": "#45B7D1",      // Bleu clair pour l'Europe
  "L'Amérique du Nord.": "#FFA07A", // Saumon clair pour l'Amérique du Nord
  "L'Amérique du Sud.": "#FFD93D", // Jaune pour l'Amérique du Sud
  "L'Océanie.": "#6BCB77",     // Vert clair pour l'Océanie
  "L'Antarctique.": "#F0F0F0", // Gris très clair pour l'Antarctique
};