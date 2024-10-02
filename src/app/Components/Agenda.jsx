import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

const FloatingAgenda = () => {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate fetching events from an API
    const fetchEvents = async () => {
      // This is where you would normally fetch data from an API
      const mockEvents = [
        { id: 1, date: '2024-09-26', title: 'Table Ronde: Philosophie politique' },
        { id: 2, date: '2024-09-28', title: 'Débat: Critique Littéraire' },
        { id: 3, date: '2024-10-01', title: 'Conférence: Histoire contemporaine' },
      ];
      setEvents(mockEvents);
    };

    fetchEvents();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-red-600">Agenda</h3>
        <div className="flex items-center">
          <Calendar className="text-red-600 mr-2" />
          <button 
            onClick={() => setIsVisible(false)} 
            className="text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Fermer l'agenda"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="border-b border-gray-200 pb-2">
            <span className="text-sm font-semibold text-gray-600">{event.date}</span>
            <p className="text-red-800">{event.title}</p>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
        Voir tous les événements
      </button>
    </div>
  );
};

export default FloatingAgenda;