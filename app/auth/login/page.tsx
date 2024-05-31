"use client"
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts'
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginPage() {
    const logo = '/logo.png';
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return (
        <div className={` ${maven_Pro.className} text-white flex flex-col min-h-screen pt-32 max-w-[400px] mx-auto`}>
        <NavBar
            text="text-white"
            logo={logo}
            logoWidth={200}
            logoHeight={50}
            bgColorTop="bg-transparent"
            bgColorScrolled="bg-[#3B0613]"
        />
            <form action={dispatch} >
                <h1>Login</h1>
                <input className='text-black' type="text" placeholder="email" name="email" />
                <input className='text-black'type="password" placeholder="password" name="password" />
                <button>Login</button>
    
        </form>
        </div>
    );
}
