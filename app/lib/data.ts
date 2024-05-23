"use server"
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Vino, User } from './definitions';

const API_ENDPOINTS = {
  reds: 'https://api.sampleapis.com/wines/reds',
  whites: 'https://api.sampleapis.com/wines/whites',
  rose: 'https://api.sampleapis.com/wines/rose'
};

const getRandomPrice = () => (Math.random() * (50 - 10) + 10).toFixed(2);

async function fetchData(endpoint: string): Promise<Vino[]> {
  const response = await fetch(endpoint);
  const data = await response.json();
  
  let type: string;
  if (endpoint === API_ENDPOINTS.reds) {
    type = 'red';
  } else if (endpoint === API_ENDPOINTS.whites) {
    type = 'white';
  } else if (endpoint === API_ENDPOINTS.rose) {
    type = 'rose';
  }

  return data
    .filter((wine: any) => !wine.image.endsWith('.jpg')&& !wine.image.endsWith('.svg'))
    .map((wine: any) => ({
      id: wine.id,
      winery: wine.winery,
      wine: wine.wine,
      rating_average: parseFloat(wine.rating.average),
      rating_reviews: wine.rating.reviews,
      location: wine.location,
      image: wine.image,
      price: getRandomPrice(),
      type: type
    }));
}

export async function fetchVinos() {
  try {
    noStore();
    const [reds, whites, rose] = await Promise.all([
      fetchData(API_ENDPOINTS.reds),
      fetchData(API_ENDPOINTS.whites),
      fetchData(API_ENDPOINTS.rose)
    ]);
    return [...reds, ...whites, ...rose];
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw new Error('Failed to fetch vinos.');
  }
}

export async function getUser(email: string) {
  try {
    noStore();
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
