'use server'
import { db } from '@vercel/postgres';
import MercadoPagoConfig, { Preference } from 'mercadopago'


export async function crearPreferencia(items: any): Promise<string | undefined>{
  'use server'
  const client = new MercadoPagoConfig({ accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN! })
  const preference = new Preference(client).create({
    body: {
        items
    }
  })
  return (await preference).id
}


export async function insertVino(wineData: any) {
  try {
    const query = `
      INSERT INTO vinos (wine, wine_category, price, image, winery, average_rating, reviews, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      wineData.wine,
      wineData.wine_category,
      wineData.price,
      wineData.image,
      wineData.winery,
      wineData.average_rating,
      wineData.reviews,
      wineData.location,
    ];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error('Error inserting wine: ' + error.message);
  }
}

export async function updateVino(wineId: number, wineData: any) {
  try {
    const query = `
      UPDATE vinos
      SET wine = $1, wine_category = $2, price = $3, image = $4, winery = $5, average_rating = $6, reviews = $7, location = $8
      WHERE id = $9
    `;
    const values = [
      wineData.wine,
      wineData.wine_category,
      wineData.price,
      wineData.image,
      wineData.winery,
      wineData.average_rating,
      wineData.reviews,
      wineData.location,
      wineId,
    ];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error('Error updating wine: ' + error.message);
  }
}
