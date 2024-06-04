'use client'
import React, { useState } from 'react';
import { insertVino, deleteVino, updateVino } from '../lib/actions';
import NavBar from '@/app/ui/components/navBar';
import { maven_Pro } from '../../fonts';

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
              value={wine
