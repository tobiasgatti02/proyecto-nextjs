import React, { useState } from 'react';
import './stylesBotones.css';

const GrupoBotones = ({ filter, setFilter }: { filter: string, setFilter: (value: string) => void }) => {
  const [activeButton, setActiveButton] = useState('');
  const handleClick = (filterValue: string) => {
    if (filterValue !== activeButton) {
      setActiveButton(filterValue);
      setFilter(filterValue);
    }
  };

  return (
    <div className="">
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
            className={`mx-10 py-1 text-white ${isActive ? 'underlineBoton' : ''}`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default GrupoBotones;
