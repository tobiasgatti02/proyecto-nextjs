'use client'
import React, { useState, useEffect, useContext } from 'react';
import { fetchVinoByID, insertVino, updateVino } from '../../lib/actions';
import { fetchVinos } from '../../lib/data';
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts';
import PaginationSlider from '../../ui/components/PaginationSlider';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';
import { Store } from '@/app/utils/store';
import { Vino } from '../../lib/definitions';
import { useRouter } from 'next/navigation';
import GrupoBotones from '@/app/ui/components/botones';
import Search from '@/app/ui/components/busqueda';

export default function AdminWineManager() {
  const logo = '/logo.png';
  const router = useRouter();
  const [vinos, setVinos] = useState<Vino[]>([]);
  const [filteredVinos, setFilteredVinos] = useState<Vino[]>([]);
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 9;
  const [isAdmin, setIsAdmin] = useState(false);



  

  useEffect(() => {
    fetchAllVinos();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    let filteredData = vinos;
    if (filter !== 'todos') {
      filteredData = vinos.filter(vino => vino.wine_category === filter);
    }
    if (searchTerm) {
      filteredData = filteredData.filter(vino => vino.wine.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredVinos(filteredData);
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [filter, vinos, searchTerm]);

  const fetchAllVinos = async () => {
    try {
      const fetchedVinos = await fetchVinos();

      const Nodisponibles = fetchedVinos.filter(vino => !vino.available);
      setVinos(Nodisponibles);
    } catch (error) {
      console.error('Error fetching vinos:', error);
    }
  };

  const checkAdminStatus = () => {
    setIsAdmin(true);
  };



  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdd = async (vino: Vino) => {
    try {
      console.log('vino:', vino);
      vino.available = true;
      await updateVino(vino.id, vino);
      router.refresh();
      fetchAllVinos();
      console.log('Wine added successfully!');
      
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

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
      <div className={`${maven_Pro.className} text-white flex flex-col min-h-screen pt-32 max-w-[1200px] mx-auto`}>
        <div className='bg-[#3B0613] p-8 rounded-xl shadow-lg'>
          <h1 className="text-3xl font-bold mb-6 text-center">Wine Administration</h1>
          <div className='mb-6'>
            <Search placeholder="Buscar vinos..." handleSearch={handleSearch} />
          </div>
          <div className="flex justify-center mb-6">
            <GrupoBotones filter={filter} setFilter={handleFilterChange} />
          </div>
          {isAdmin && (
            <div>
            
             <Link href="/admin">
             <button className="bg-green-400 ml-2 text-black px-4 py-2 rounded">
               View Available Wines
             </button>
           </Link>
           </div>
          )}
          <div className="mt-12 gap-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 p-4 rounded-lg bg-[#4A091A]">
            {filteredVinos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((vino) => (
              <Card
                key={vino.id}
                isPressable
                onPress={() => console.log(vino)}
                style={{ backgroundColor: 'transparent', boxShadow: 'none', border: '1px solid #000' }}
              >
                <CardBody className="justify-center items-center bg-gray-300">
                  <Link href={`/vino/${vino.id}`}>
                    <Image
                      alt={vino.wine}
                      className="w-full h-full rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                      src={vino.image}
                    />
                  </Link>
                </CardBody>
                <CardFooter className="text-small block bg-gray-300 border-t-2 border-black xs:min-h-[222px] min-h-[240px]">
                  <b className='block'>{vino.wine}</b>
                  <b className='block'>${vino.price}</b>
                  <div className='inline-block transition duration-700 hover:bg-gray-400 hover:font-medium rounded text-medium'>
                    <Link href={`/vino/${vino.id}`}>
                      Ver Producto
                    </Link>
                  </div>
                  {isAdmin && (
                    <div className='mt-3'>
                      <button
                        onClick={() => handleAdd(vino)}
                        className='mr-2 bg-blue-500 text-white px-3 py-1 rounded'
                      >
                        Agregar
                      </button>
                      
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          <PaginationSlider
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}