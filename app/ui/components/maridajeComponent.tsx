"use client";
import React, { useState } from 'react';
import { Wine, Search } from 'lucide-react';
import TypewriterEffect from './typeEffect'; 

const MaridajeComponent: React.FC = () => {
  const [inputVino, setInputVino] = useState<string>('');
  const [maridaje, setMaridaje] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVino(event.target.value);
  };

  const getMaridaje = async () => {
    if (!inputVino.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/maridaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreVino: inputVino }),
      });
      if (!response.ok) {
        throw new Error('No se pudo obtener el maridaje');
      }
      const data = await response.json();
      setMaridaje(parseMaridaje(data.maridaje));
    } catch (error) {
      console.error('Error getting maridaje:', error);
      setError('No se pudo encontrar el vino o generar recomendaciones.');
    }
    setLoading(false);
  };

  const parseMaridaje = (text: string) => {
    return text
      .split('\n')
      .map(line => {
        // Replace leading asterisks with bullet points
        if (line.startsWith('* ')) {
          line = '•' + line.slice(1);
        }
        // Replace text between ** with bold
        return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      })
      .join('<br/>'); // Join lines with <br/> for proper formatting
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center mb-8">
        <Wine className="text-red-600 w-10 h-10 mr-4" />
        <h2 className="text-3xl font-serif  text-gray-800">Maridaje de Vinos</h2>
      </div>

      <div className="mb-6">
        <label htmlFor="vinoInput" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Vino
        </label>
        <div className="relative">
          <input
            type="text"
            id="vinoInput"
            value={inputVino}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ej: Cabernet Sauvignon"
          />
          <button 
            onClick={getMaridaje} 
            disabled={loading || !inputVino.trim()}
            className="absolute right-2 top-2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-gray-300"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {maridaje && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-serif mb-4 text-gray-800">Recomendaciones de Maridaje:</h3>
          <div className="text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: maridaje }} />
        </div>
      )}
    </div>
  );
};

export default MaridajeComponent;
