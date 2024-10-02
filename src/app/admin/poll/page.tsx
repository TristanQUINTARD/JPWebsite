"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPoll = () => {
  const [googleFormLink, setGoogleFormLink] = useState('');

  useEffect(() => {
    // Récupérer le lien existant si disponible
    const fetchPoll = async () => {
      try {
        const response = await axios.get('/api/polls');
        if (response.data.googleFormLink) {
          setGoogleFormLink(response.data.googleFormLink);
        }
      } catch (error: any) {
        if (error.response && error.response.status !== 404) {
          toast.error(error.response?.data?.error || 'Erreur lors de la récupération du sondage.');
        }
      }
    };

    fetchPoll();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!googleFormLink.trim()) {
      toast.error('Le lien du formulaire Google ne peut pas être vide.');
      return;
    }

    try {
      const response = await axios.post('/api/polls', { googleFormLink });
      if (response.data.success) {
        toast.success('Lien du sondage mis à jour avec succès!');
      } else {
        toast.error('Erreur lors de la mise à jour du sondage.');
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.error || 'Erreur serveur.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gérer le Sondage</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="googleFormLink" className="block text-lg font-medium mb-2">
            Lien du Formulaire Google
          </label>
          <input
            type="url"
            id="googleFormLink"
            value={googleFormLink}
            onChange={(e) => setGoogleFormLink(e.target.value)}
            placeholder="https://forms.google.com/..."
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Enregistrer le Sondage
        </button>
      </form>
    </div>
  );
};

export default AdminPoll;