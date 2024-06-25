import React from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Vino } from '../../lib/definitions';
import { SelectorCantidad } from './selectorCantidad';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { getVino } from '@/app/lib/data'
import { Store } from '@/app/utils/store'


interface VinoCardListProps {
  vinos: Vino[];
  currentPage: number;
  itemsPerPage: number;
}

const VinoCardList: React.FC<VinoCardListProps> = ({ vinos, currentPage, itemsPerPage }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const storeData = useContext(Store)
  const { state, dispatch } = storeData || {}


  const handleQuantityChange = (id: number, cantidad: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: cantidad,
    }));
  };
  const addToCartHandler = (vino: Vino) => {
    console.log('pressed')
    const cantidad = quantities[vino.id] || 1;
    console.log(cantidad)
    console.log(vino)
    if (state && dispatch) {
      dispatch({ type: 'ADD_PRODUCT', payload: { ...vino, cantidad } });
      console.log('added to cart')
      //esperar un segunto y mostrar el estado del carrito
      setTimeout(() => {
        console.log(state)
      }
        , 1000);

    } else {
      console.error('No se pudo agregar al carrito: vino es undefined');
    }
  };


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const visibleVinos = vinos.slice(startIndex, endIndex);

  return (
    <div className="mt-12 text-center gap-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 p-4 rounded-lg bg-gray-400">
      {visibleVinos.map((vino, index) => (
        <Card
          key={index}
         
         
          style={{ backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid #000' }}
        >
          <CardBody className="justify-center items-center bg-gray-300" >
            <Link href={`/vino/${vino.id}`}>
            <Image
              alt={vino.wine}
              className="w-full h-full rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              src={vino.image}
            />
            </Link>
          </CardBody>
          <CardFooter className="text-small block bg-gray-300 border-t-2 border-black xs:min-h-[222px] min-h-[240px]">
            <b className='block'>{vino.wine}</b>
            <b className='block'>${vino.price}</b>
            <div className='block pt-3 mb-3'>
              <SelectorCantidad
                cantidad={quantities[vino.id] || 1}
                onChange={(cantidad) => handleQuantityChange(vino.id, cantidad)}
                className='mx-auto justify-center' />
              <button
                onClick={() => addToCartHandler(vino)}
                className='mt-3 transition duration-700 hover:bg-gray-400 rounded text-medium hover:font-medium'>
                Add to cart                     <svg xmlns="http://www.w3.org/2000/svg" height="24px"className='mx-auto' viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>

              </button>
            </div>
            <div className='inline-block transition duration-700 hover:bg-gray-400 hover:font-medium rounded text-medium'>
              <Link href={`/vino/${vino.id}`}>
                Wine details
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VinoCardList;