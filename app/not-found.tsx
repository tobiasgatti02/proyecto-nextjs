import Link from 'next/link'
import Image from 'next/image';
import logoBodine from '@/public/logoNegro.png';
import { maven_Pro } from './fonts';

export default function NotFound() {

    return (
        <div className="flex flex-col gap-5 items-center justify-center text-darkblue ">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold ">404</h1>
                <h2 className="text-2xl font-semibold mt-5">Página no encontrada</h2>
                
            </div>
            <div className="flex items-center mt-32 justify-center relative ">
                <Image src={logoBodine} alt="ByteBurgers Logo" height={200} width={200} />
            </div>
            <Link href="/" className={`${maven_Pro.className}'mt-10 text-2xl font-semibold text-black hover:text-darkblue`}>
                    Volver al Inicio
            </Link>
        </div>
    );
}