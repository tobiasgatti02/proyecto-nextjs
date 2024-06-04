// /auth/register.tsx
'use client'
import React, { useState } from 'react';
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts';
import Link from 'next/link';
import { insertUser } from '../../lib/actions';

const CreateAccountPage = () => {
  const logo = '/logo.png';

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Asumiendo un rol por defecto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await insertUser(userData);
      console.log('User added successfully!');
      setUserData({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });
    } catch (error) {
      console.error('Error adding user:', error);
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
        <h1 className="text-3xl font-bold mb-6 text-center">Crea Tu Nueva Cuenta</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input
              id="name"
              name="name"
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text"
              placeholder="John Doe"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="email"
              placeholder="john@example.com"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              id="password"
              name="password"
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="password"
              placeholder="••••••••"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <p className="text-gray-400 text-xs mt-1">Mínimo 8 caracteres, incluya mayúsculas, minúsculas y números.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5C0A21] text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-[#7B0E2F] focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/login" className="text-[#FF6B6B] hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

CreateAccountPage.displayName = 'CreateAccountPage';
export default CreateAccountPage;
