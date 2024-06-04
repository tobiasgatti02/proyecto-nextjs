'use client'
import React, { useState } from 'react';
import { insertVino, deleteVino, updateVino } from '../lib/actions';

const WineForm = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Wine</h3>
        <input type="text" name="wine" value={wineData.wine} onChange={handleChange} placeholder="Wine Name" />
        <input type="text" name="wine_category" value={wineData.wine_category} onChange={handleChange} placeholder="Wine Type" />
        <input type="number" name="price" value={wineData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="image" value={wineData.image} onChange={handleChange} placeholder="Image URL" />
        <input type="text" name="winery" value={wineData.winery} onChange={handleChange} placeholder="Winery" />
        <input type="number" name="average_rating" value={wineData.average_rating} onChange={handleChange} placeholder="Average Rating" />
        <input type="text" name="reviews" value={wineData.reviews} onChange={handleChange} placeholder="Reviews" />
        <input type="text" name="location" value={wineData.location} onChange={handleChange} placeholder="Location" />
        <br />
        <button type="submit">Add Wine</button>
      </form>

      <form onSubmit={handleDelete}>
        <h3>Delete Wine</h3>
        <input type="number" value={wineIdToDelete} onChange={(e) => setWineIdToDelete(e.target.value)} placeholder="Wine ID" />
        <button type="submit">Delete Wine</button>
      </form>

      <form onSubmit={handleEdit}>
        <h3>Edit Wine</h3>
        <input type="number" value={wineIdToEdit} onChange={(e) => setWineIdToEdit(e.target.value)} placeholder="Wine ID" />
        <input type="text" name="wine" value={editWineData.wine} onChange={handleEditChange} placeholder="Wine Name" />
        <input type="text" name="wine_category" value={editWineData.wine_category} onChange={handleEditChange} placeholder="Wine Type" />
        <input type="number" name="price" value={editWineData.price} onChange={handleEditChange} placeholder="Price" />
        <input type="text" name="image" value={editWineData.image} onChange={handleEditChange} placeholder="Image URL" />
        <input type="text" name="winery" value={editWineData.winery} onChange={handleEditChange} placeholder="Winery" />
        <input type="number" name="average_rating" value={editWineData.average_rating} onChange={handleEditChange} placeholder="Average Rating" />
        <input type="text" name="reviews" value={editWineData.reviews} onChange={handleEditChange} placeholder="Reviews" />
        <input type="text" name="location" value={editWineData.location} onChange={handleEditChange} placeholder="Location" />
        <br />
        <button type="submit">Edit Wine</button>
      </form>
    </div>
  );
};

export default WineForm;
