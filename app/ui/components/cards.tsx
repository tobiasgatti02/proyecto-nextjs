// VinoCardList.tsx
import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Vino } from '../../lib/definitions';

const VinoCardList = ({ vinos, currentPage }: { vinos: Vino[], currentPage: number }) => {
  const ITEMS_PER_PAGE = 20;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
      {vinos.slice(startIndex, endIndex).map((vino, index) => (
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
