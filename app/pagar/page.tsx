import React from 'react';
import NavBar from '../ui/components/navBar';

interface Props {
    
}
const logo = '/logo.png';
export default function Pagar({}: Props) {
    return (
        <div>
             <NavBar
            text="text-white"
            logo={logo}
            logoWidth={200}
            logoHeight={50}
            bgColorTop="bg-transparent"
            bgColorScrolled="bg-[#3B0613]"
            />
            Pantalla del pago con mercadoPago
        </div>
    )
}
