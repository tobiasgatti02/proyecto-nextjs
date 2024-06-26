'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getVino } from '@/app/lib/data'
import Link from 'next/link'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Vino } from '@/app/lib/definitions'
import { SelectorCantidad } from '@/app/ui/components/selectorCantidad'
import { Store } from '@/app/utils/store'
import NavBar from '@/app/ui/components/navBar'
import { CardSkeleton } from '@/app/ui/components/skeletons'

const VinoScreen = () => {
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const [vino, setVino] = useState<Vino | null>(null)
  const [cantidad, setCantidad] = useState<number>(1);
  const storeData = useContext(Store)
  const { state, dispatch } = storeData || {}

  const addToCartHandler = () => {
    if (state && dispatch && vino) {
      dispatch({ type: 'ADD_PRODUCT', payload: { ...vino, cantidad } });
    } else {
      console.error('No se pudo agregar al carrito: vino es undefined');
    }
  };

  useEffect(() => {
    const fetchVino = async () => {
      if (isNaN(Number(id))) {
        router.push('/wineNotFound')
        return
      }

      const data = await getVino(Number(id))

      if (!data || data.available === false) {
        router.push('/wineNotFound')
      } else {
        setVino(data)
      }
    }
    fetchVino()
  }, [id, router])

  if (!vino) {
    return <div className='mt-36'><CardSkeleton cardWidth={'w-full'} /></div>
  }

  return (
    <div className="p-4 bg-gray-200">
      <NavBar
        text="text-black"
        logo="/logoNegro.png"
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-transparent"
        bgColorScrolled="bg-transparent"
      />
      <div className="text-center pt-36">
        <Link href={'/compras'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 md:px-5 rounded mt-4">
          Seguir comprando
        </Link>
        <Card className="flex flex-col mx-auto my-10 items-center w-full max-w-lg">
          <h2 className="text-center my-5 font-bold text-lg md:text-xl">{vino.wine}</h2>
          <CardBody className="items-center">
            <div className="w-full flex justify-center">
              <Image
                src={vino.image}
                alt="Imagen del producto"
                width={100}
                height={100}
                className="max-w-full"
              />
            </div>
          </CardBody>
          <CardFooter className="block w-full">
            <div className="flex text-left">
              <div className=' space-y-10'>
                <h3>Tipo:</h3>
                <h3>Bodega:</h3>
                <h3>Origen:</h3>
                <h3>Valoración:</h3>
                <h3>Precio:</h3>
              </div>
              <div className='mx-8 font-semibold space-y-10'>
                <h3>{vino.wine_category}</h3>
                <h3>{vino.winery}</h3>
                <h3>{vino.location}</h3>
                <h3>{vino.average_rating} en {vino.reviews}</h3>
                <h3>${vino.price}</h3>
              </div>
            </div>
            <div className="flex mt-16 md:mt-20 justify-end">
              <SelectorCantidad cantidad={cantidad} onChange={setCantidad} className="mr-2 md:mr-0" />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 md:px-5 rounded ml-2 md:ml-5"
                onClick={addToCartHandler}
              >
                Agregar al carrito
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default VinoScreen
