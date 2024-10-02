"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "@/src/app/Components/auth/Navbar";
import axios from 'axios';

const Sondage: React.FC = () => {
  const [googleFormLink, setGoogleFormLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPollLink = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/polls');
        setGoogleFormLink(response.data.googleFormLink);
        setError(null);
      } catch (error: any) {
        console.error('Erreur lors de la récupération du sondage:', error);
        setError('Impossible de charger le sondage. Veuillez réessayer plus tard.');
        setGoogleFormLink(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPollLink();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-page-wrapper">
        <div className="blog-page-layout">
          <div className="blog-container">
            <div className="blog-paper">
              <h2 className="blog-title">Sondage</h2>
              <div className="blog-content-box">
                {isLoading ? (
                  <p>Chargement du sondage...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : googleFormLink ? (
                  <iframe 
                    src={googleFormLink}
                    width="100%" 
                    height="800" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                  >
                    Chargement du formulaire...
                  </iframe>
                ) : (
                  <p>Aucun sondage n'est actuellement disponible.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sondage;