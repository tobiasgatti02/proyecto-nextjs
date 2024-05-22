import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  User,
  Vino
} from './definitions';



export async function fetchVinos() {
  try {
    noStore();
    const vinos = await sql<Vino>`SELECT wine FROM vinos`;
    return vinos.rows;
  } catch (error) {
    console.error('Database Error:', error);
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
