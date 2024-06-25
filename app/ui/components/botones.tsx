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
        { label: 'All', value: 'todos' },
        { label: 'Red', value: 'red' },
        { label: 'White', value: 'white' },
        { label: 'Rose', value: 'rose' }
      ].map((button) => {
        const isActive = activeButton === button.value;
        return (
        
          <button
            id='botonFiltro'
            key={button.value}
            onClick={() => handleClick(button.value)}
            className={`mx-3 py-2 sm:mx-10 text-white ${isActive ? 'underlineBoton' : ''}`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default GrupoBotones;
