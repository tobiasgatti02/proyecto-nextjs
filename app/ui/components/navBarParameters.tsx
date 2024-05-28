'use client';

import { usePathname } from 'next/navigation';
import NavBar from './navBar'

const NavBarCliente = ({ logo }: { logo: string }) => {
  const pathname = usePathname();
  const isSuscripcionesPage = pathname === '/suscripciones';
  const logoNegro = '/logoNegro.png'

  if (isSuscripcionesPage) {
    return (<div className="z-50 absolute top-0 left-0 w-full">
    <NavBar
      text="text-black"
      logo={logoNegro}
      logoWidth={200}
      logoHeight={50}
      bgColorTop="bg-transparent"
      bgColorScrolled="bg-transparent"
    />
  </div>); 
  }
  
  return (
    
    <div className="z-50 absolute top-0 left-0 w-full">
      <NavBar
        text="text-white"
        logo={logo}
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-transparent"
        bgColorScrolled="bg-[#3B0613]"
      />
    </div>
  );
};

export default NavBarCliente;
