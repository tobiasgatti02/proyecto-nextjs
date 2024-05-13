import Image from 'next/image';
import bgImage from '../public/background.jpg';
import NavBar from './ui/components/navBar';
import { maven_Pro } from './fonts';
import logo from '../public/logo.png';

const Bodine = () => {
  return (
    <>
      <div className="relative w-full min-h-96 h-screen max-h-max" style={{maxHeight: '800px'}}>
        <Image src={bgImage} alt="Imagen de fondo" layout="fill" objectFit="cover" objectPosition='30% center' quality={100} />
        <div className="absolute inset-0 bg-black bg-opacity-35" />
        
        <div className={`${maven_Pro.className} absolute inset-0 flex items-center justify-center`} >
          <h1 className="text-white text-center sm:text-2xl lg:text-3xl text-lg">A UN PASO DE DESCUBRIR LOS <strong>MEJORES VINOS</strong></h1>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full">
          <NavBar />
      </div>
      <div>
      <Image
            src={logo}
            alt="Logo"
            className="sm:w-40 sm:h-15 lg:w-60 lg:h-20 transition-all duration-500 ease-in-out transform hover:scale-110"
          />
      </div>
      <div className="border-b border-black mx-96"></div>
      <div>
        <h2 className={`${maven_Pro.className} font-semibold text-4xl text-center my-5`}>Vinos Destacados</h2>
      </div>
      <div className="border-b border-black mx-96"></div>
      <div className='h-40 text-center py-20'>Componente slider</div>
    </>
  );
};

export default Bodine;
