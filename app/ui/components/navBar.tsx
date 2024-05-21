"use client";
import './styles.css';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import Link from 'next/link';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      menuRef.current.style.maxHeight = `${menuRef.current.scrollHeight}px`;
    } else {
      menuRef.current.style.maxHeight = '0px';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="flex flex-col sm:flex-row items-center justify-between flex-wrap bg-transparent z-50 p-3 mx-7">
        <div className="absolute left-4 top-3 sm:hidden w-full flex justify-start items-center">
          <Image
            src={logo}
            alt="Logo"
            className="w-40 h-15 rounded transform transition-transform hover:scale-110"
          />
        </div>
        <div className={`hidden w-full flex-grow sm:flex lg:items-center lg:w-auto text-lg md:text-xl lg:flex-grow justify-between place-content-center transition-all duration-500 ease-in-out`}>
          <Link href="/compras" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500 text-white">
            Compras
          </Link>
          
          <Link href="/nosotros" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Nosotros
          </Link>
          <div className="hidden sm:block">
            <Image
              src={logo}
              alt="Logo"
              className="sm:w-40 sm:h-15 lg:w-60 lg:h-20 transition-all duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
          <Link href="/suscripciones" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Suscripciones
          </Link>
          <Link href="/login" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Log In
          </Link>
        </div>
        <div className="absolute right-0 top-3 h-16 w-16 sm:hidden pr-0 pt-0 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2">
          <button onClick={toggleMenu} aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
            <svg className={`w-10 h-10 transition-transform duration-500 ${isMenuOpen ? 'rotate-45' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 6L18 18M6 18L18 6" : "M4 6h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>
      <div ref={menuRef} className="sm:hidden w-full overflow-hidden transition-max-height duration-500 ease-in-out max-h-0">
        <div className="py-10">
          <Link href="/compras" className="block py-2 text-center text-white">Compras</Link>
          <Link href="/nosotros" className="block py-2 text-center text-white">Nosotros</Link>
          <Link href="/suscripciones" className="block py-2 text-center text-white">Suscripciones</Link>
          <Link href="/login" className="block py-2 text-center text-white">Log In</Link>
        </div>
      </div>
    </>
  );
}

export default NavBar;
