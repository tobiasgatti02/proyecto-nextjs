'use client';
import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import { Store } from '@/app/utils/store';

export default function Succeed() {
  const state = useContext(Store);

  useEffect(() => {
    state?.dispatch({ type: 'CLEAR' });
  }, [state]);

  return (
    <div className='h-screen flex flex-col items-center justify-center text-center p-4'>
      <h1 className='text-4xl font-bold mb-8'>¡Gracias por tu compra! ha sido procesada correctamente</h1>
      <div className='flex space-x-4'>
        <Link href="/compras" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Seguir comprando
        </Link>
        <Link href="/" className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>
          Ir al menú principal
        </Link>
      </div>
    </div>
  )
}


