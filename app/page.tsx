"use client";
import Image from 'next/image';
import bgImage from '../public/background.jpg';
import NavBar from '../app/ui/components/navBar';
import { maven_Pro } from '../app/fonts';
import React from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import fotoVino from '../public/vino.png';

const vinos = [
  { id: 1, name: 'Sweet Grapes', image: fotoVino },
  { id: 2, name: 'Canadian Beauty', image: fotoVino },
  { id: 3, name: 'Alpine Tastes', image: fotoVino }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Bodine = () => {
  return (
    <>
      <div className="relative w-full min-h-96 h-screen max-h-max overflow-hidden" style={{ maxHeight: '800px' }}>
        <Image src={bgImage} alt="Imagen de fondo" layout="fill" objectFit="cover" objectPosition='30% center' quality={100} />
        <div className="absolute inset-0 bg-black bg-opacity-35" />
        
        <div className={`${maven_Pro.className} absolute inset-1 mt-20 flex items-center justify-center`}>
          <h1 className="text-white text-center sm:text-2xl lg:text-3xl text-lg">A UN PASO DE DESCUBRIR LOS <strong>MEJORES VINOS</strong></h1>
        </div>
      </div>
      
        <NavBar />
      
      <div className="py-10 border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div>
        <h2 className={`${maven_Pro.className} font-semibold text-4xl text-center my-5`}>Vinos Destacados</h2>
      </div>
      <div className="border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div className="py-10 overflow-hidden">
        <Slider {...settings}>
          {vinos.map(vino => (
            <div key={vino.id} className="text-center">
              <Image src={vino.image} alt={vino.name} width={60} height={120} className="mx-auto" />
              <h3 className={`${maven_Pro.className} text-2xl mt-2`}>{vino.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Bodine;
