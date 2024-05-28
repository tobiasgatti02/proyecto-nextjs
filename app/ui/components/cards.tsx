import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Vino } from '../../lib/definitions';
import { SelectorCantidad } from './selectorCantidad';
import Link from 'next/link';

interface VinoCardListProps {
  vinos: Vino[];
  currentPage: number;
  itemsPerPage: number;
}

const VinoCardList: React.FC<VinoCardListProps> = ({ vinos, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const visibleVinos = vinos.slice(startIndex, endIndex);

  return (
    <div className="mt-12 gap-3 grid grid-cols-2 sm:grid-cols-4 p-4 bg-white rounded-lg">
      {visibleVinos.map((vino, index) => (
        <Card key={index} isPressable onPress={() => console.log(vino.wine)} style={{ backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid #000' }}>
          <CardBody className="justify-center items-center" >
            <Image
              alt={vino.wine}
              className="w-full h-full rounded-lg"
              src={vino.image}
            />
          </CardBody>
          <CardFooter className="text-small block bg-gray-300">
            <b className='block'>{vino.wine}</b>
            <b className='block'>${vino.price}</b>
            <div className='flex pt-3'>
            <Link href={`/vino/${vino.id}`}>
              Ver Producto
            </Link>
            <SelectorCantidad cantidad={1} className='mx-auto justify-center'/>
            <button> agregar al carrito</button>
            
            </div>
            
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VinoCardList;
