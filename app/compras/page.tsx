"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NavBar from '../ui/components/navBar';
import { fetchVinos } from '../lib/data';
import { Vino } from '../lib/definitions';
import GrupoBotones from '../ui/components/botones';

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
    <div className=''>
      <div className=''>
      <NavBar />
      </div>
      
      <div className='pt-60'>
        <div className="flex justify-center ">
          <GrupoBotones filter={filter} setFilter={setFilter} />
        </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
          {filteredVinos.map((vino, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log(vino.wine)}>
              <CardBody className="overflow-visible p-0">
                <Image shadow="sm" radius="lg" width="100%" alt={vino.wine} className="w-full object-cover h-[140px]" src={vino.image} />
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
