'use client'
import React, { useState } from 'react';
import { insertVino, deleteVino, updateVino } from '../lib/actions';
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../fonts'

function SubmitButton({ text }: { text: string }) {
  return (
    <button 
      type="submit" 
      className="w-full bg-[#5C0A21] text-white py-3 rounded-lg font-semibold mt-6 transition duration-300 ease-in-out hover:bg-[#7B0E2F] focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {text}
    </button>
  );
}

export default function WineForm() {
  const logo = '/logo.png';
  const [wineData, setWineData] = useState({
    wine: '',
    wine_category: '',
    price: 0,
    image: '',
    winery: '',
    average_rating: 0,
    reviews: '',
    location: ''
  });

  const [wineIdToDelete, setWineIdToDelete] = useState('');
  const [wineIdToEdit, setWineIdToEdit] = useState('');
  const [editWineData, setEditWineData] = useState({
    wine: '',
    wine_category: '',
    price: 0,
    image: '',
    winery: '',
    average_rating: 0,
    reviews: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWineData({ ...wineData, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditWineData({ ...editWineData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await insertVino(wineData);
      console.log('Wine added successfully!');
      setWineData({
        wine: '',
        wine_category: '',
        price: 0,
        image: '',
        winery: '',
        average_rating: 0,
        reviews: '',
        location: ''
      });
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteVino(Number(wineIdToDelete));
      console.log('Wine deleted successfully!');
      setWineIdToDelete('');
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateVino(Number(wineIdToEdit), editWineData);
      console.log('Wine edited successfully!');
      setWineIdToEdit('');
      setEditWineData({
        wine: '',
        wine_category: '',
        price: 0,
        image: '',
        winery: '',
        average_rating: 0,
        reviews: '',
        location: ''
      });
    } catch (error) {
      console.error('Error editing wine:', error);
    }
  };

  return (
    <div className={`${maven_Pro.className} text-white flex flex-col min-h-screen pt-32 max-w-[800px] mx-auto`}>
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
          <h1 className="text-3xl font-bold mb-6 text-center">Add Wine</h1>
          <div className="space-y-4">
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="wine" 
              value={wineData.wine} 
              onChange={handleChange} 
              placeholder="Wine Name" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="wine_category" 
              value={wineData.wine_category} 
              onChange={handleChange} 
              placeholder="Wine Type" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              name="price" 
              value={wineData.price} 
              onChange={handleChange} 
              placeholder="Price" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="image" 
              value={wineData.image} 
              onChange={handleChange} 
              placeholder="Image URL" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="winery" 
              value={wineData.winery} 
              onChange={handleChange} 
              placeholder="Winery" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              name="average_rating" 
              value={wineData.average_rating} 
              onChange={handleChange} 
              placeholder="Average Rating" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="reviews" 
              value={wineData.reviews} 
              onChange={handleChange} 
              placeholder="Reviews" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="location" 
              value={wineData.location} 
              onChange={handleChange} 
              placeholder="Location" 
              required 
            />
          </div>
          <SubmitButton text="Add Wine" />
        </form>
        
        <form onSubmit={handleDelete} className="mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Delete Wine</h1>
          <div className="space-y-4">
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              value={wineIdToDelete} 
              onChange={(e) => setWineIdToDelete(e.target.value)} 
              placeholder="Wine ID" 
              required 
            />
          </div>
          <SubmitButton text="Delete Wine" />
        </form>
        
        <form onSubmit={handleEdit} className="mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Wine</h1>
          <div className="space-y-4">
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              value={wineIdToEdit} 
              onChange={(e) => setWineIdToEdit(e.target.value)} 
              placeholder="Wine ID" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="wine" 
              value={editWineData.wine} 
              onChange={handleEditChange} 
              placeholder="Wine Name" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="wine_category" 
              value={editWineData.wine_category} 
              onChange={handleEditChange} 
              placeholder="Wine Type" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              name="price" 
              value={editWineData.price} 
              onChange={handleEditChange} 
              placeholder="Price" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="image" 
              value={editWineData.image} 
              onChange={handleEditChange} 
              placeholder="Image URL" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="winery" 
              value={editWineData.winery} 
              onChange={handleEditChange} 
              placeholder="Winery" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="number" 
              name="average_rating" 
              value={editWineData.average_rating} 
              onChange={handleEditChange} 
              placeholder="Average Rating" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="reviews" 
              value={editWineData.reviews} 
              onChange={handleEditChange} 
              placeholder="Reviews" 
              required 
            />
            <input 
              className='w-full px-4 py-3 bg-[#4A091A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0A21] focus:ring-opacity-50 placeholder-gray-400'
              type="text" 
              name="location" 
              value={editWineData.location} 
              onChange={handleEditChange} 
              placeholder="Location" 
              required 
            />
          </div>
          <SubmitButton text="Edit Wine" />
        </form>
      </div>
    </div>
  );
}
