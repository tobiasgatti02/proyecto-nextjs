import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Vino } from '../../lib/definitions';

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
    <div className=" mt-16 gap-3 grid grid-cols-2 sm:grid-cols-4 p-4 bg-white  shadow-md">
      {visibleVinos.map((vino, index) => (
        <Card key={index} isPressable onPress={() => console.log(vino.wine)} style={{ backgroundColor: 'transparent' }}>
          <CardBody className="justify-center items-center " >
            <Image 
              alt={vino.wine} 
              className="w-full h-full " 
              src={vino.image} 
               
            />
          </CardBody>
          <CardFooter className="text-small block">
            <b className='block'>{vino.wine}</b>
            <b className='block'>${vino.price}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VinoCardList;
