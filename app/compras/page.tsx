import React from 'react';
import { maven_Pro } from '../fonts';
import NavBar from '../ui/components/navBar';
import { SimpleBottomNavigation } from '../ui/components/opcionesVinos';



const Compras = () => {
  return (
      <div>
        <div>
          <NavBar/>
        </div>
        <div className=' flex pt-80 sm:px-0 px-6'>
            <SimpleBottomNavigation/>          
        </div>
      </div>
  );
}

export default Compras;