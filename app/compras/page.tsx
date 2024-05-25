"use client"
import React, { Suspense, useState, useEffect } from 'react';
import NavBar from '../ui/components/navBar';
import GrupoBotones from '../ui/components/botones';
import { fetchVinos } from '../lib/data';
import { Vino } from '../lib/definitions';
import Search from '../ui/components/busqueda';
import { CardSkeleton } from '../ui/components/skeletons';
import PaginationSlider from '../ui/components/PaginationSlider';
const VinoCardList = React.lazy(() => import('../ui/components/cards'));

const Compras = () => {
  const [vinos, setVinos] = useState<Vino[]>([]);
  const [filteredVinos, setFilteredVinos] = useState<Vino[]>([]);
  const [filter, setFilter] = useState<string>('todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const getVinos = async () => {
      try {
        const fetchedVinos = await fetchVinos();
        setVinos(fetchedVinos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vinos:', error);
      }
    };
    getVinos();
  }, []);

  useEffect(() => {
    let filteredData = vinos;
    if (filter !== 'todos') {
      filteredData = vinos.filter(vino => vino.type === filter);
    }
    if (searchTerm) {
      filteredData = filteredData.filter(vino => vino.wine.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredVinos(filteredData);
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Reinicia la página a la primera cuando se actualiza la búsqueda
  }, [filter, vinos, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ITEMS_PER_PAGE = 20;
  const logo = '/logo.png';
  return (
    <>
      <div className='z-50'>
      <NavBar logo={logo} logoWidth={200} logoHeight={50} bgColorTop='bg-transparent' text='text-white' bgColorScrolled='bg-transparent' />
      </div>

      <div className='z-0 pt-32'>
        <div className='mx-20'>
          <Search placeholder="Buscar vinos..." handleSearch={handleSearch} />
        </div>
        <div className="flex justify-center mt-10">
          <GrupoBotones filter={filter} setFilter={setFilter} />
        </div>
        {loading ? (
          <div className="mt-12 gap-2 grid grid-cols-2 sm:grid-cols-4 ">
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" /> 
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" />
            <CardSkeleton cardWidth="full" /> 
              </div>
            ) : (
                <Suspense fallback={null}>
                <VinoCardList vinos={filteredVinos} currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} />
                <PaginationSlider
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Suspense>
            )}
          </div>
   
      </>
    );
};

export default Compras;