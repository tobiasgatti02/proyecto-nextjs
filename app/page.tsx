"use client";
import Image from 'next/image';
import bgImage from '../public/background.jpg';
import { maven_Pro } from '../app/fonts';
import React, { useEffect, useState } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import fotoVino from '../public/vino.png';
import campo_viñedo from '../public/bodine/campo_viñedo.jpg';
import suscripciones from '../public/suscripciones.jpg';
import { fetchVinosHome } from './lib/data';
import { Vino } from './lib/definitions';


import dynamic from 'next/dynamic'

const NavBar = dynamic(() => import('../app/ui/components/navBar'), { ssr: false })

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const logo = '/logo.png';

const Bodine = () => {

  const [vinos, setVinos] = useState<Vino[]>([]);

 

  return (
    <>
      <div className="relative w-full min-h-96 h-screen max-h-max overflow-hidden" style={{ maxHeight: '800px' }}>
        <Image src={bgImage} alt="Imagen de fondo"
          fill
          priority={true}
          style={{ objectFit: 'cover', objectPosition: '30% center' }}
          quality={100} />
        <div className="absolute inset-0 bg-black bg-opacity-35" />
        <div className={`${maven_Pro.className} absolute inset-1 mt-20 flex items-center justify-center`}>
          <h1 className="text-white text-center sm:text-2xl lg:text-3xl text-lg">One Step Away from Discovering the  <strong>Best Wines</strong></h1>
        </div>
      </div>
      <div className="z-50 absolute top-0 left-0 w-full">
        <NavBar text="text-white" logo={logo} logoWidth={200} logoHeight={50} bgColorTop='bg-transparent' bgColorScrolled='bg-[#3B0613]' />
      </div>
      <div className="py-10 border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div>
        <h2 className={`${maven_Pro.className} font-semibold overflow-hidden text-4xl text-center my-5`}>Featured Wines</h2>
      </div>
      <div className="border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div className="py-10 overflow-hidden mx-2">
       
      </div>

      <div className="relative w-full h-[400px] md:h-[700px] lg:h-[800px] overflow-hidden">


        <Image

          src={campo_viñedo}
          alt="Imagen de fondo"
          fill
          style={{ objectFit: 'cover', objectPosition: '70% center' }}
          quality={100}
        />
      </div>
      <div className="py-10 border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div>
        <h2 className={`${maven_Pro.className} font-semibold text-4xl text-center my-5`}>Bodegas Populares</h2>
      </div>
      <div className="border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div className="py-10 overflow-hidden mx-2">
       
      </div>
      <div className="relative w-full h-[550px] md:h-[700px] lg:h-[1000px] overflow-hidden">
        <Image
          src={suscripciones}
          alt="Imagen de fondo"
          fill
          style={{ objectFit: 'cover', objectPosition: '60% center' }}
          quality={100}
        />
      </div>



    </>
  );
};
export default Bodine;
