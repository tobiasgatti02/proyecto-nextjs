'use client'
import React, { useState, useEffect, useContext } from 'react';
import { insertVino, deleteVino, updateVino } from '../lib/actions';
import { fetchVinos } from '../lib/data';
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../fonts';
import Search from '../ui/components/busqueda';
import PaginationSlider from '../ui/components/PaginationSlider';
import GrupoBotones from '../ui/components/botones';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';
import { Store } from '@/app/utils/store';
import { Vino } from '../lib/definitions';
import { fetchVinoByID } from '../lib/actions';
import { useRouter } from 'next/navigation';


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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const storeData = useContext(Store);
  const { state, dispatch } = storeData || {};
  const [currentImage, setCurrentImage] = useState<string | null>(null);


  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWine, setEditingWine] = useState<Vino | null>(null);
  const [newWine, setNewWine] = useState<Vino>({
    id: 0,
    wine: '',
    wine_category: '',
    price: 0,
    image: '',
    winery: '',
    average_rating: 0,
    reviews: '',
    location: '',
    available: true
  });

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
      const disponibles = fetchedVinos.filter(vino => vino.available);
      setVinos(disponibles);
    } catch (error) {
      console.error('Error fetching vinos:', error);
    }
  };

  const checkAdminStatus = () => {
    setIsAdmin(true);
  };



  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewWine(prev => ({ ...prev, [name]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a PNG image.');
      }
    } 
    else if (name === 'reviews') {
      const numericValue = value.replace(/\D/g, '');
      setNewWine(prev => ({ ...prev, [name]: `${numericValue} ratings` }));
    }
    else {
      setNewWine(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingWine) {
      try {
        await updateVino(editingWine.id, editingWine);
        console.log('Wine updated successfully!');
        setShowEditForm(false);
        setEditingWine(null);
        fetchAllVinos();
      } catch (error) {
        console.error('Error updating wine:', error);
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await insertVino(newWine);
      console.log('Wine added successfully!');
      setShowAddForm(false);
      setNewWine({
        id: 0,
        wine: '',
        wine_category: '',
        price: 0,
        image: '',
        winery: '',
        average_rating: 0,
        reviews: '',
        location: ''
      });
      fetchAllVinos();
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      
      handleAvailableWine(id);
      

      console.log('Wine deleted successfully!');
      fetchAllVinos();
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  const handleEdit = async (wine: Vino) => {
    try {
      const fullWineData = await fetchVinoByID(wine.id);
      setEditingWine(fullWineData);
      setCurrentImage(fullWineData.image);
      setShowEditForm(true);
      setShowAddForm(false);
      document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching wine data:', error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditingWine(prev => prev ? { ...prev, [name]: reader.result as string } : null);
          setCurrentImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a PNG image.');
      }
    } 
    else if (name === 'reviews') {
      const numericValue = value.replace(/\D/g, '');
      setEditingWine(prev => prev ? { ...prev, [name]: `${numericValue} ratings` } : null);
    }else {
      setEditingWine(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
    setEditingWine(prev => prev ? { ...prev, image: '' } : null);
  };

   const handleAvailableWine = async (id: number) => {
    try {
      const vino = await fetchVinoByID(id);
      vino.available = false;
      router.refresh();
      console.log('Vino before update:', vino);
      await updateVino(id, vino);
      console.log('Vino after update:', vino);
      console.log('Wine availability updated successfully!');
      fetchAllVinos();
    } catch (error) {
      console.error('Error updating wine availability:', error);
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            <button
              onClick={() => { setShowAddForm(true); setShowEditForm(false); document.getElementById('add-form')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add New Wine
            </button>
             <Link href="/admin/unavailableWines">
             <button className="bg-red-500 ml-2 text-white px-4 py-2 rounded">
               View Unavailable Wines
             </button>
           </Link>
           </div>
          )}
          <div className="mt-12 gap-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 p-4 rounded-lg bg-[#4A091A]">
            {filteredVinos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((vino) => (
              <Card
                key={vino.id}
                isPressable
                onPress={() => console.log(vino.wine)}
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
                        onClick={() => handleEdit(vino)}
                        className='mr-2 bg-blue-500 text-white px-3 py-1 rounded'
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(vino.id)}
                        className='bg-red-500 text-white px-3 py-1 rounded'
                      >
                        Eliminar
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
         {showEditForm && editingWine && (
        <form id="edit-form" onSubmit={handleEditSubmit} className="mt-8 bg-[#4A091A] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Vino</h2>
              <div className="mb-4">
                <label htmlFor="wine" className="block font-bold mb-2">Nombre del Vino *</label>
                <input type="text" id="wine" name="wine" value={editingWine.wine} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="wine_category" className="block font-bold mb-2">Categoría del Vino *</label>
                <select id="wine_category" name="wine_category" value={editingWine.wine_category} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required>
                  <option value="">Seleccionar categoría</option>
                  <option value="White">White</option>
                  <option value="Red">Red</option>
                  <option value="Rose">Rose</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-bold mb-2">Precio *</label>
                <input type="number" id="price" name="price" value={editingWine.price} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required min="0" step="0.01" />
              </div>
              <div className="mb-4">
            <label htmlFor="image" className="block font-bold mb-2">Imagen (PNG) *</label>
            {currentImage && (
              <div className="mb-2">
                <img src={currentImage} alt="Current wine" className="w-32 h-32 object-cover" />
                <button type="button" onClick={handleRemoveImage} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                  Eliminar Imagen
                </button>
              </div>
            )}
            <input 
              type="file" 
              id="image" 
              name="image" 
              onChange={handleEditChange} 
              className="w-full px-3 py-2 text-white rounded" 
              accept=".png"
              {...(!currentImage && { required: true })}
            />
          </div>
              <div className="mb-4">
                <label htmlFor="winery" className="block font-bold mb-2">Bodega *</label>
                <input type="text" id="winery" name="winery" value={editingWine.winery} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="average_rating" className="block font-bold mb-2">Rating Promedio *</label>
                <input type="number" id="average_rating" name="average_rating" value={editingWine.average_rating} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required min="0" max="5" step="0.1" />
              </div>
              <div className="mb-4">
            <label htmlFor="reviews" className="block font-bold mb-2">Cantidad de reseñas *</label>
            <input 
              type="number" 
              id="reviews" 
              name="reviews" 
              value={editingWine.reviews.replace(' ratings', '')} 
              onChange={handleEditChange} 
              className="w-full px-3 py-2 text-black rounded" 
              required 
              min="0"
            />
          </div>
              <div className="mb-4">
                <label htmlFor="location" className="block font-bold mb-2">Ubicación *</label>
                <input type="text" id="location" name="location" value={editingWine.location} onChange={handleEditChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Actualizar Vino</button>
          <button onClick={() => { setShowEditForm(false); setCurrentImage(null); }} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
        </form>
          )}
          {showAddForm && (
            <form id="add-form" onSubmit={handleAddSubmit} className="mt-8 bg-[#4A091A] p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Vino</h2>
              <div className="mb-4">
                <label htmlFor="wine" className="block font-bold mb-2">Nombre del Vino *</label>
                <input type="text" id="wine" name="wine" value={newWine.wine} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
                
              <div className="mb-4">
                <label htmlFor="wine_category" className="block font-bold mb-2">Categoría del Vino *</label>
                <select id="wine_category" name="wine_category" value={newWine.wine_category} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required>
                  <option value="">Seleccionar categoría</option>
                  <option value="White">White</option>
                  <option value="Red">Red</option>
                  <option value="Rose">Rose</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-bold mb-2">Precio *</label>
                <input type="number" id="price" name="price" value={newWine.price} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required min="0" max={1000} step="0.01" />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block font-bold mb-2">Imagen (PNG) *</label>
                <input type="file" id="image" name="image" onChange={handleAddChange} className="w-full px-3 py-2 text-white rounded" accept=".png" required />
              </div>
              <div className="mb-4">
                <label htmlFor="winery" className="block font-bold mb-2">Bodega *</label>
                <input type="text" id="winery" name="winery" value={newWine.winery} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="average_rating" className="block font-bold mb-2">Rating Promedio *</label>
                <input type="number" id="average_rating" name="average_rating" value={newWine.average_rating} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required min="0" max="5" step="0.1" />
              </div>
              <div className="mb-4">
            <label htmlFor="reviews" className="block font-bold mb-2">Cantidad de reseñas *</label>
            <input 
              type="number" 
              id="reviews" 
              name="reviews" 
              value={newWine.reviews.replace(' ratings', '')} 
              onChange={handleAddChange} 
              className="w-full px-3 py-2 text-black rounded" 
              required 
              max={1000}
              min="0"
            />
          </div>
              <div className="mb-4">
                <label htmlFor="location" className="block font-bold mb-2">Ubicación *</label>
                <input type="text" id="location" name="location" value={newWine.location} onChange={handleAddChange} className="w-full px-3 py-2 text-black rounded" required />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Agregar Vino</button>
              <button onClick={() => setShowAddForm(false)} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}