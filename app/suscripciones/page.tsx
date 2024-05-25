"use client";
import React from 'react';
import NavBar from "../ui/components/navBar";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import copa from '../../public/bodine/copa_elegante.jpg';
import uvas from '../../public/bodine/uvas.jpg';
import viñedo from '../../public/bodine/viñedo.jpg';
import logo from '../../public/logo.png'; // Importa el logo aquí

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
};

const subs = [
  { image: copa }, 
  { image: uvas }, 
  { image: viñedo }
];

const Suscripciones = () => {
  const logo = '/logoNegro.png'; // Define el logo aquí
  return (
    <div className="flex flex-col min-h-screen h-screen">
  
      <NavBar logo={logo} logoWidth={200} logoHeight={50} bgColorTop='bg-transparent' text='black ' bgColorScrolled='bg-transparent' />
      <div className="flex-grow relative overflow-hidden">
        <Slider {...settings} className="absolute top-0 left-0 w-full h-full">
          {subs.map(sub => (
            <div key={sub.image.src} className="w-full h-screen">
              <img src={sub.image.src} alt={sub.image.src} className="w-full h-full object-cover overflow-hidden" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Suscripciones;
