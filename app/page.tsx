import Image from 'next/image';
import bgImage from '../public/background.jpg';
import NavBar from '../app/ui/components/navBar';
import { maven_Pro } from '../app/fonts';

const Bodine = () => {
  return (
    <>
      <div className="relative w-full min-h-96 h-screen max-h-max" style={{ maxHeight: '800px' }}>
        <Image src={bgImage} alt="Imagen de fondo" layout="fill" objectFit="cover" objectPosition='30% center' quality={100} />
        <div className="absolute inset-0 bg-black bg-opacity-35" />
        
        <div className={`${maven_Pro.className} absolute inset-1 mt-20 flex items-center justify-center`}>
          <h1 className="text-white text-center sm:text-2xl lg:text-3xl text-lg">A UN PASO DE DESCUBRIR LOS <strong>MEJORES VINOS</strong></h1>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full">
        <NavBar />
      </div>
      <div className="border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div>
        <h2 className={`${maven_Pro.className} font-semibold text-4xl text-center my-5`}>Vinos Destacados</h2>
      </div>
      <div className="border-b border-black sm:min-w-[300px] sm:max-w-[600px] sm:mx-auto"></div>
      <div className='h-40 text-center py-20'>Componente slider</div>
    </>
  );
};

export default Bodine;
