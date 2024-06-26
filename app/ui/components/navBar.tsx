'use client';
import './styles.css';
import { signOut, useSession } from 'next-auth/react';
import { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import logo1 from '../../../public/logo.png';
import Link from 'next/link';
import carro from '../../../public/carro.png';
import { useRouter } from 'next/navigation';
import { Store } from '@/app/utils/store';

function NavBar({ bgColorTop, bgColorScrolled, text, logo, logoWidth, logoHeight }: { logoHeight: number, logo: string, logoWidth: number, text: string, bgColorTop: string, bgColorScrolled: string }) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [navHeight, setNavHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const prevScrollY = useRef(0);
  const router = useRouter();
  const store = useContext(Store);
  const { state } = store || {};
  const itemCount = state?.carrito?.cantidad ?? 0;


  const [mountedItemCount, setMountedItemCount] = useState(0);

  useEffect(() => {
    setMountedItemCount(itemCount);
  }, [itemCount]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const windowWidth = window.innerWidth;

    if (windowWidth <= 640) return;

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
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ${isAtTop ? `${bgColorTop}` : (isScrolledUp ? `${bgColorScrolled} translate-y-0` : 'bg-transparent -translate-y-full')
          } sm:p-3`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap sm:mx-7">
          <div className={`hidden w-screen flex-grow sm:flex lg:items-center lg:w-auto text-lg md:text-xl lg:flex-grow justify-between place-content-center sm:block transition-all duration-500 ease-in-out ${isAtTop ? `${text}` : `${text}`}`}>
            <div className="hidden sm:block">
              <Link href="/">
                <Image
                  src={logo}
                  width={logoWidth}
                  height={logoHeight}
                  alt="Logo"
                  className="sm:w-40 sm:h-15 lg:w-60 lg:h-20 transition-all duration-500 ease-in-out transform hover:scale-110"
                />
              </Link>
            </div>
            <Link href="/compras" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Compras
            </Link>
            <Link href="/maridaje" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Maridaje
            </Link>
            <Link href="/suscripciones" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
              Suscripciones (Próximamente)
            </Link>
            {session ? (
              <button onClick={handleSignOut} className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
                Log Out
              </button>
            ) : (
              <Link href="/auth/login" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500">
                Log In
              </Link>
            )}
            <Link href="/carrito" className="block lg:inline-block lg:mt-0">
              <div className="relative inline-block">
                <Image
                  src={carro}
                  alt="carrito"
                  className="w-12 h-12 transition-all duration-500 ease-in-out transform hover:scale-110"
                />
                {mountedItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {mountedItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <div className="bg-[#3B0613] flex sm:hidden w-screen justify-between">
            <Link href="/" className='z-50'>
              <Image
                src={logo1}
                alt="Logo"
                className="z-50 w-auto h-auto mx-3"
              />
            </Link>
            <div className="pt-1 z-50 relative">
              <button onClick={toggleMenu} aria-controls="navbar-cta" aria-label='desplegar la barra de navegación' aria-expanded={isMenuOpen}>
                <svg className={`w-10 h-12 mx-3 transition-transform duration-500 ${isMenuOpen ? 'rotate-45' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? "M6 6L18 18M6 18L18 6" : "M4 6h16M4 18h16"}
                  />
                </svg>
                {mountedItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {mountedItemCount}
                  </span>
                )}
              </button>
            </div>
            <div ref={menuRef} className="sm:hidden z-40 fixed bg-[#3B0613] w-screen overflow-hidden transition-max-height duration-500 ease-in-out ">
              <div className="mt-16 pb-2 z-40">
                <Link href="/compras" className="block py-2 text-center text-white ">Compras</Link>
                <Link href="/maridaje" className="block py-2 text-center text-white ">Maridaje</Link>
                <Link href="/suscripciones" className="block py-2 text-center text-white ">Suscripciones</Link>
                {session ? (
                  <button onClick={() => signOut()} className="block py-2 text-center text-white w-full">
                    Log Out
                  </button>
                ) : (
                  <Link href="/auth/login" className="block py-2 text-center text-white ">Log In</Link>
                )}
                <Link href="/carrito" className="block py-2 lg:mt-0" aria-label='ir al carrito'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" className='mx-auto' viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                  {mountedItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {mountedItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;  