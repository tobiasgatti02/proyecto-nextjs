import Image from 'next/image';
import bgImage from '../public/background.jpg';
import logo from '../public/logo.png';

const Bodine = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={bgImage}
        alt="Imagen de fondo"
        layout="fill"
        objectFit="cover"
        objectPosition='30% center'
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-35" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-0 lg:center lg:mt-12">
        <Image
          src={logo}
          alt="Logo"
          className="sm:w-60 sm:h-20 md:w-96 md:h-36 lg:w-60 lg:h-20" 
        />
      </div>
    </div>
  );
};

export default Bodine;
