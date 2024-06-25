"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Wine, Search } from 'lucide-react';
import TypewriterEffect from './typeEffect';
import { fetchVinos } from '../../lib/data';
import { Vino } from '../../lib/definitions';

const MaridajeComponent = () => {
  const [inputVino, setInputVino] = useState('');
  const [allVinos, setAllVinos] = useState<Vino[]>([]);
  const [maridaje, setMaridaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadVinos = async () => {
      try {
        const vinos = await fetchVinos();
        setAllVinos(vinos);
      } catch (error) {
        console.error('Error fetching vinos:', error);
        setError('No se pudieron cargar los vinos.');
      }
    };
    loadVinos();
  }, []);

  const filteredVinos = useMemo(() => {
    if (inputVino.length < 2) return [];
    const lowerCaseInput = inputVino.toLowerCase();
    return allVinos.filter(vino => 
      vino.wine.toLowerCase().includes(lowerCaseInput) ||
      vino.winery.toLowerCase().includes(lowerCaseInput)
    ).slice(0, 5); // Limit to 5 suggestions
  }, [inputVino, allVinos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVino(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (vino: Vino) => {
    setInputVino(vino.wine);
    setShowSuggestions(false);
  };

  const getMaridaje = async () => {
    if (!inputVino.trim()) return;
    setLoading(true);
    setError('');
    try {
      // Here you would typically make an API call to get the pairing
      // For this example, we'll just use a eholder response
      const placeholderMaridaje = `Maridaje para ${inputVino}:\n\n**Platos principales:**\n• Carnes rojas a la parrilla\n• Estofados de carne\n\n**Quesos:**\n• Queso cheddar añejo\n• Queso gouda\n\n**Postres:**\n• Chocolate negro`;
      setMaridaje(parseMaridaje(placeholderMaridaje));
    } catch (error) {
      console.error('Error getting maridaje:', error);
      setError('No se pudo generar recomendaciones para este vino.');
    }
    setLoading(false);
  };

  const parseMaridaje = (text: string) => {
    return text
      .split('\n')
      .map(line => {
        if (line.startsWith('* ')) {
          line = '•' + line.slice(1);
        }
        return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      })
      .join('<br/>');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 lg:p-20 pb-20 sm:pb-32 md:pb-40 lg:pb-56 bg-white rounded-lg shadow-xl">
      <div className="flex items-center mb-6 sm:mb-8">
        <Wine className="text-red-600 w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4" />
        <h2 className="text-2xl sm:text-3xl font-serif text-gray-800">Food Pairing</h2>
      </div>
      <div className="mb-6 relative">
        <label htmlFor="vinoInput" className="block text-sm font-medium text-gray-700 mb-2">
          Wine name
        </label>
        <div className="relative">
          <input
            type="text"
            id="vinoInput"
            value={inputVino}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="E.g: Cabernet Sauvignon"
          />
          <button
            onClick={getMaridaje}
            disabled={loading || !inputVino.trim()}
            className="absolute right-2 top-2 bg-red-600 text-white p-1 sm:p-2 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-gray-300"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        {showSuggestions && filteredVinos.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 sm:max-h-60 overflow-auto">
            {filteredVinos.map((vino) => (
              <li
                key={vino.id}
                className="p-2 text-sm sm:text-base hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(vino)}
              >
                {vino.wine} - {vino.winery}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}
      {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
      {maridaje && (
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg sm:text-xl font-serif mb-3 sm:mb-4 text-gray-800">Food Pairing Recomendations</h3>
          <div className="text-sm sm:text-base text-gray-700 whitespace-pre-line">
            <TypewriterEffect text={maridaje} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaridajeComponent;