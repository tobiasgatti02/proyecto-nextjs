import Image from 'next/image';
import logo from '../../../public/logo.png';
import Link from 'next/link';

function NavBar() {
  return (
    <>
      <nav className="flex items-center justify-end flex-wrap bg-transparent z-50 p-6">
        <div className="hidden w-full flex-grow sm:flex lg:items-center lg:w-auto text-lg md:text-xl lg:flex-grow justify-between place-content-center">
          <Link href="/compras" className="block lg:inline-block lg:mt-0 hover:text-2xl transform duration-500 text-white">
            Compras
          </Link>
          
          <Link href="/nosotros" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Nosotros
          </Link>
          <Image
            src={logo}
            alt="Logo"
            className="sm:w-40 sm:h-15 lg:w-60 lg:h-20 transition-all duration-500 ease-in-out transform hover:scale-110"
          />
          <Link href="/suscripciones" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Suscripciones
          </Link>
          <Link href="/login" className="block lg:inline-block lg:mt-0 text-white hover:text-2xl transform duration-500">
            Log In
          </Link>
        </div>
        <div className='sm:hidden w-10 h-10 pr-0 pt-0 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
          <button data-collapse-toggle="navbar-cta" type="button" aria-controls="navbar-cta" aria-expanded="false">
            <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;