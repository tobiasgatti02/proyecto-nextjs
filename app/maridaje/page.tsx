import React from 'react';
import MaridajeComponent from '../ui/components/maridajeComponent';
import NavBar from '../ui/components/navBar';

export default function MaridajePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <NavBar
        text="text-white"
        logo="/logo.png"
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-[#3B0613] bg-opacity-90"
        bgColorScrolled="bg-[#3B0613] bg-opacity-90"
      />
      <div className="max-w-3xl mt-32 mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 font-serif">
            Descubre el Maridaje Perfecto
          </h1>
          <MaridajeComponent />
        </div>
      </div>
    </div>
  );
}
