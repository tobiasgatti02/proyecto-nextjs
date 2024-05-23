"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NavBar from '../ui/components/navBar';
import { fetchVinos } from '../lib/data'; 
import { Vino } from '../lib/definitions';

const Compras = () => {
  const [vinos, setVinos] = useState<Vino[]>([]);
  const [filteredVinos, setFilteredVinos] = useState<Vino[]>([]);
  const [filter, setFilter] = useState<string>('todos');

  useEffect(() => {
    const getVinos = async () => {
      try {
        const fetchedVinos = await fetchVinos();
        setVinos(fetchedVinos);
        setFilteredVinos(fetchedVinos);
      } catch (error) {
        console.error('Error fetching vinos:', error);
      }
    };

    getVinos();
  }, []);

  useEffect(() => {
    if (filter === 'todos') {
      setFilteredVinos(vinos);
    } else {
      setFilteredVinos(vinos.filter(vino => vino.type === filter));
    }
  }, [filter, vinos]);

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '80px' }}> {/* Ajusta este valor según la altura del NavBar */}
        <div className="flex justify-center mb-4">
          <button onClick={() => setFilter('todos')} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">Todos</button>
          <button onClick={() => setFilter('red')} className="mx-2 px-4 py-2 bg-red-500 text-white rounded">Rojos</button>
          <button onClick={() => setFilter('white')} className="mx-2 px-4 py-2 bg-yellow-500 text-white rounded">Blancos</button>
          <button onClick={() => setFilter('rose')} className="mx-2 px-4 py-2 bg-pink-500 text-white rounded">Rosados</button>
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
          {filteredVinos.map((vino, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log(vino.wine)}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={vino.wine}
                  className="w-full object-cover h-[140px]"
                  src={vino.image}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{vino.wine}</b>
                <p className="text-default-500">{vino.winery}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compras;
