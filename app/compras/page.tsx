"use client";
import React, { Suspense, useState, useEffect } from 'react';
import NavBar from '../ui/components/navBar';
import GrupoBotones from '../ui/components/botones';
import { fetchVinos } from '../lib/data';
import { Vino } from '../lib/definitions';
import Search from '../ui/components/busqueda';
import { CardSkeleton } from '../ui/components/skeletons';
import PaginationSlider from '../ui/components/PaginationSlider';
import { useSearchParams, useRouter } from 'next/navigation';

const VinoCardList = React.lazy(() => import('../ui/components/cards'));

const Compras = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [vinos, setVinos] = useState<Vino[]>([]);
  const [filteredVinos, setFilteredVinos] = useState<Vino[]>([]);
  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

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
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(9);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
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
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1); // Reinicia la página a la primera cuando se actualiza la búsqueda

    // Actualiza la URL con los parámetros de búsqueda y filtro
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set('searchTerm', searchTerm);
    if (filter) queryParams.set('filter', filter);
    queryParams.set('page', '1');

    router.push(`/compras?${queryParams.toString()}`, undefined);
  }, [filter, vinos, searchTerm, itemsPerPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set('searchTerm', searchTerm);
    if (filter) queryParams.set('filter', filter);
    queryParams.set('page', page.toString());

    router.push(`/compras?${queryParams.toString()}`, undefined);
  };

  const logo = '/logo.png';
  return (
    <>
    
    <NavBar
        text="text-white"
        logo={logo}
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-transparent"
        bgColorScrolled="bg-[#3B0613]"
      />
  
      <div className='z-0 pt-32'>
        <div className='mx-20'>
          <Search placeholder="Search wines..." handleSearch={handleSearch} />
        </div>
        <div className="flex justify-center mt-10">
          <GrupoBotones filter={filter} setFilter={handleFilterChange} />
        </div>
        {loading ? (
          <div className="mt-12 gap-2 grid grid-cols-2 sm:grid-cols-4">
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
            <VinoCardList vinos={filteredVinos} currentPage={currentPage} itemsPerPage={itemsPerPage} />
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