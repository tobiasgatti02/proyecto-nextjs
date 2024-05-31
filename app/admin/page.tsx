// AddWineForm.js
'use client'
import React, { useState } from 'react';

//import { insertVino } from '../lib/actions';

const AddWineForm = () => {

  const [wineData, setWineData] = useState({
    wine: '',
    type: '',
    price: 0,
    image: '',
    winery: '',
    average_rating: 0,
    reviews: '',
    location: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWineData({ ...wineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del vino al backend para procesar la inserción
      await insertVino(wineData);
      console.log('Wine added successfully!');
      // Limpia el formulario después de la inserción exitosa
      setWineData({ wine: '', type: '',winery: ''  ,price: 0, image: '', average_rating: 0, reviews: '', location: ''});
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="wine" value={wineData.wine} onChange={handleChange} placeholder="Wine Name" />
      <input type="text" name="type" value={wineData.type} onChange={handleChange} placeholder="Wine Type" />
      <input type="number" name="price" value={wineData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="image" value={wineData.image} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="winery" value={wineData.winery} onChange={handleChange} placeholder="Winery" />
      <input type="number" name="average_rating" value={wineData.average_rating} onChange={handleChange} placeholder="Average Rating" />
      <input type="text" name="reviews" value={wineData.reviews} onChange={handleChange} placeholder="Reviews" />
      <input type="text" name="location" value={wineData.location} onChange={handleChange} placeholder="Location" />
      <br />
      <button type="submit">Add Wine</button>
    </form>
  );
};

export default AddWineForm;
