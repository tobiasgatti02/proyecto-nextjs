'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getVino } from '@/app/lib/data'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Vino } from '@/app/lib/definitions'


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
            <CardFooter className='flex'>
              <div>
                <h3>
                Valoración Promedio:
                </h3>
              </div>
              <div className='mx-5'>
              <h3><strong>{vino.average_rating} en {vino.reviews}</strong></h3>
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