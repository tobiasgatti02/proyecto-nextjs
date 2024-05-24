"use client"

import React from 'react';
import NavBar from "../ui/components/navBar";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import silver from '../../public/bodine/silver.jpg';
import gold from '../../public/bodine/gold2.jpg';
import platinum from '../../public/bodine/platinum.jpg';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const subs = [
  {image: silver}, 
  {image: gold },
  {image: platinum }
];

const suscripciones = () => {
  return (
    <div>
      <NavBar />
      <div className='pt-36 overflow-hidden'>
      <Slider {...settings}>
        {subs.map(sub => (
          <div key={sub.image.src} className="text-center">
            <div className="flex justify-center items-center h-full">
              <img src={sub.image.src} alt={sub.image.src} className="mx-auto" />
            </div>
          </div>
        ))}
      </Slider>
      </div>
      
    </div>
  );
}

export default suscripciones;
