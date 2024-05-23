import React, { useState } from 'react';
import './stylesBotones.css';

const GrupoBotones = ({ filter, setFilter }) => {
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (filterValue) => {
    if (filterValue !== activeButton) {
      setActiveButton(filterValue);
      setFilter(filterValue);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      {[
        { label: 'Todos', value: 'todos' },
        { label: 'Tintos', value: 'red' },
        { label: 'Blancos', value: 'white' },
        { label: 'Rosados', value: 'rose' }
      ].map((button) => {
        const isActive = activeButton === button.value;
        return (
        
          <button
            id='botonFiltro'
            key={button.value}
            onClick={() => handleClick(button.value)}
            className={`mx-2 px-4 py-2 text-white ${isActive ? 'underlineBoton' : ''}`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default GrupoBotones;
