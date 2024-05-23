"use client";
import './styles.css';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import Link from 'next/link';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const windowWidth = window.innerWidth;

    if (windowWidth <= 640) return; // No aplicar scroll behavior en dispositivos móviles

    if (currentScrollY === 0) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
      if (currentScrollY > navHeight && prevScrollY.current > currentScrollY + 10) {
        setIsScrolledUp(true);
      } else if (currentScrollY > navHeight && prevScrollY.current < currentScrollY - 10) {
        setIsScrolledUp(false);
      }
    }
    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        menuRef.current.style.maxHeight = `${menuRef.current.scrollHeight}px`;
      } else {
        menuRef.current.style.maxHeight = '0px';
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navHeight]);

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ${isAtTop ? 'bg-transparent' : (isScrolledUp ? 'bg-[#3B0613] translate-y-0' : 'bg-transparent -translate-y-full')} sm:p-3`}>
        <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap sm:mx-7">
          
          
          <div className={`hidden w-screen flex-grow sm:flex lg:items-center lg:w-auto text-lg md:text-xl lg:flex-grow justify-between place-content-center sm:block transition-all duration-500 ease-in-out ${isAtTop ? 'text-white' : 'text-white'}`}>
            <Link href="/compras" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Compras
            </Link>
            <Link href="/nosotros" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Nosotros
            </Link>
            <div className="hidden sm:block">
              <Image
                src={logo}
                alt="Logo"
                className="sm:w-40 sm:h-15 lg:w-60 lg:h-20 transition-all duration-500 ease-in-out transform hover:scale-110"
              />
            </div>
            <Link href="/suscripciones" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Suscripciones
            </Link>
            <Link href="/login" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Log In
            </Link>
          </div>



        
           
            <div className="z-50 bg-[#3B0613] flex sm:hidden w-screen justify-between">
              <Image
                src={logo}
                alt="Logo"
                className="w-auto h-auto mx-3"
              />
              <div className="pt-1 ">
                <button onClick={toggleMenu} aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
                  <svg className={`w-10 h-12 mx-3 transition-transform duration-500 ${isMenuOpen ? 'rotate-45' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            </div>
            <div ref={menuRef} className="sm:hidden fixed bg-[#3B0613] w-screen overflow-hidden transition-max-height duration-500 ease-in-out ">
        <div className="mt-16 pb-2 z-50">
          <Link href="/compras" className="block py-2 text-center text-white mx-40">Compras</Link>
          <Link href="/nosotros" className="block py-2 text-center text-white mx-40">Nosotros</Link>
          <Link href="/suscripciones" className="block py-2 text-center text-white mx-40">Suscripciones</Link>
          <Link href="/login" className="block py-2 text-center text-white mx-40">Log In</Link>
        </div>
      </div>
        
        </div>
      </nav>
      
   
      
      
    </>
  );
}

export default NavBar;