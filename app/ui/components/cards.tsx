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
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
      {visibleVinos.map((vino, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log(vino.wine)}>
          <CardBody className="overflow-visible p-0">
            <Image shadow="sm" radius="lg" width="100%" alt={vino.wine} className="w-[100px] object-cover h-[50]" src={vino.image} />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{vino.wine}</b>
            <b>${vino.price}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VinoCardList;
