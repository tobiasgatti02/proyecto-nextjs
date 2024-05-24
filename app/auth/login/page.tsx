import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts'
import Link from 'next/link';

export default function () {
    return (
        <div className={` ${maven_Pro.className} text-white flex flex-col min-h-screen pt-32 max-w-[400px] mx-auto`}>
            <div className='bg-black'>
            <NavBar/>
            </div>
            <h1 className="text-4xl mb-5 text-center">Ingresar</h1>

            <div className="flex flex-col pt-10">

                <label htmlFor="email">Correo electrónico</label>
                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5"
                    type="email" />


                <label htmlFor="email">Contraseña</label>
                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5"
                    type="email" />

                <button
                    className="bg-blue-600 rounded text-black">
                    Ingresar
                </button>


                {/* divisor l ine */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                    href="/auth/register"
                    className="btn-secondary text-center bg-gray-200 rounded text-black">
                    Crear una nueva cuenta
                </Link>

            </div>
        </div>
    );
}