"use client"
import React from 'react';
import NavBar from "../ui/components/navBar";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import copa from '../../public/bodine/copa_elegante.jpg';
import uvas from '../../public/bodine/uvas.jpg';
import viñedo from '../../public/bodine/viñedo.jpg';
import FancyButton from './boton';
import logo from '../../public/logo.png';
import './style.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  draggable: true
};

const subs = [
  { image: copa, color: '#C0C0C0', name: 'Silver' }, 
  { image: uvas, color: '#FFD700', name: 'Gold' }, 
  { image: viñedo, color: '#E5E4E2', name: 'Platinum'}
];

const Suscripciones = () => {
  const logo = '/logoNegro.png';
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="flex-grow relative overflow-hidden">
        <Slider {...settings} className="w-full">
          {subs.map((sub, index) => {
            const maskId = `mask_${index}`; 
            return (
              <div key={index} className="relative">
                <img src={sub.image.src} alt={sub.image.src} className="w-full h-screen object-cover" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FancyButton color={sub.color} buttonText={sub.name} maskId={maskId} /> {/* Pasa el maskId como prop */}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Suscripciones;
