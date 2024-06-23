"use server"
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Vino, User } from './definitions';
import NodeCache from 'node-cache';



export async function fetchVinos(): Promise<Vino[]> {
  const data = await sql<Vino[]>`
    SELECT id, winery, wine, average_rating, reviews, location, image, wine_category, price
    FROM vinos
  `;

  const vinos: Vino[] = data.rows.map((vino: any) => ({
    id: vino.id,
    winery: vino.winery,
    wine: vino.wine,
    average_rating: vino.rating_average, 
    reviews: vino.rating_reviews, 
    location: vino.location,
    image: vino.image,
    wine_category: vino.wine_category,
    price: vino.price
  }));

  return vinos;
}

const myCache = new NodeCache({ stdTTL: 3600 }); // TTL de 1 hora



export async function fetchVinosHome(): Promise<Vino[]> {
  const cachedVinos = myCache.get('vinos') as Vino[];

  if (cachedVinos) {
    return cachedVinos;
  }

  const data = await sql<Vino[]>`
    SELECT id, winery, wine, average_rating, reviews, location, image, wine_category, price
    FROM vinos
    ORDER BY reviews DESC
    LIMIT 3
  `;

  const vinos: Vino[] = data.rows.map((vino: any) => ({
    id: vino.id,
    winery: vino.winery,
    wine: vino.wine,
    average_rating: vino.average_rating,
    reviews: vino.reviews,
    location: vino.location,
    image: vino.image,
    wine_category: vino.wine_category,
    price: vino.price
  }));

  myCache.set('vinos', vinos);

  return vinos;
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

export async function getCompras(){
  try {
    const compras = await sql`SELECT * FROM ORDERS`;
    return compras.rows;
  } catch (error) {
    console.error('Failed to fetch compras:', error);
    throw new Error('Failed to fetch compras.');
  }

}

export async function getVino(id: number) {
  try {
    noStore();
    const vino = await sql`SELECT * FROM vinos WHERE id=${id}`;
    return vino.rows[0] as Vino;
  } catch (error) {
    console.error('Failed to fetch vino:', error);
    throw new Error('Failed to fetch vino.');
  }

}
