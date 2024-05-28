'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getVino } from '@/app/lib/data'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Vino } from '@/app/lib/definitions'
import { SelectorCantidad } from '@/app/ui/components/selectorCantidad'


const VinoScreen = () => {
  const pathname = usePathname()
  const params = useParams()
  const id = params.id
  const [vino, setVino] = useState<Vino | null>(null)

  useEffect(() => {
    const fetchVino = async () => {
      const data = await getVino(Number(id))
      setVino(data)
    }

    fetchVino()
   
  }, [id])
 let image = vino?.image
  if (!vino) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h2 className='text-center my-5 font-bold'>{vino.wine}</h2>
      <div className=' text-center'>
        <Card className='flex mx-36 my-10 items-center'>
          <CardBody className='items-center'>
            <div className='col-md-4'>
              <Image 
              src={vino.image}
              alt='Imagen del producto'
              width={100}
              height={100}
              />
            </div>
            </CardBody>
            <CardFooter className='block'>
              <div className='flex text-left'>
                <div>
                  <h3>Tipo:</h3>
                  <h3>Bodega:</h3>
                  <h3>Origen:</h3>
                  <h3>Valoración Promedio:</h3>
                  <h3>Precio:</h3>
                </div>
                <div className='mx-36 font-semibold'>
                  <h3>{vino.type}</h3>
                  <h3>{vino.winery}</h3>
                  <h3>{vino.location}</h3>
                  <h3>{vino.average_rating} en {vino.reviews}</h3>
                  <h3>${vino.price}</h3>
                </div>
              </div>  
              <div className='flex text-left mt-12'>
                <h2>Seccion Maridaje:</h2>
                <p className='mx-36'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A voluptates ex eius fugit est eveniet! Illum, esse, placeat nihil debitis maiores quis nobis nemo in ratione, vitae architecto quidem ut.</p> 
              </div>
              <div className='flex mt-12'>
                <SelectorCantidad cantidad={1} className='mx-auto justify-center'/>
              </div>
            </CardFooter>
          </Card>
          <Link href={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded'>
          Seguir comprando
        </Link>
      </div>
    </div>
  )
}

export default VinoScreen