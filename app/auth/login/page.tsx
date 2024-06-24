"use client"
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const logo = '/logo.png';
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${maven_Pro.className} text-white flex flex-col min-h-screen pt-32 max-w-[400px] mx-auto`}>
            <NavBar
                text="text-white"
                logo={logo}
                logoWidth={200}
                logoHeight={50}
                bgColorTop="bg-transparent"
                bgColorScrolled="bg-[#3B0613]"
            />
            <div className='bg-[#3B0613] p-8 rounded-xl shadow-lg'>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}
                    <div className="space-y-4">
                        <div>
                            <input 
                                className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
                                type="text" 
                                placeholder="Email" 
                                name="email" 
                                required
                            />
                        </div>
                        <div>
                            <input 
                                className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#5C0A21] text-white py-3 rounded-lg font-semibold mt-6 transition duration-300 ease-in-out hover:bg-[#7B0E2F] focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-gray-400 text-sm mt-4 text-center">
                        No tienes cuenta?{' '}
                        <Link href="/auth/register" className="text-[#FF6B6B] hover:underline">
                            Registrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}