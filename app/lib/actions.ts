'use server'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from '@vercel/postgres';




export async function insertVino(wineData: any) {
  try {
    // Inserta los datos del vino en la tabla de vinos
    const query = `
      INSERT INTO vinos (wine, type, price, image, winery, average_rating, reviews, location)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      wineData.wine,
      wineData.type,
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



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}