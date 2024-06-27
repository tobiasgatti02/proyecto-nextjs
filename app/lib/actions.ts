"use server";
import { db } from "@vercel/postgres";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { promise } from "zod";

export async function insertUser(userData: { name: string, email: string, password: string, role: string }) {
  try {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [
      userData.name,
      userData.email,
      userData.password,
      userData.role,
    ];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error('Error inserting user: ' + error.message);
  }
}

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN!,
});


export async function fetchVinoByID(wineId: number) {
  try {
    const query = `
      SELECT * FROM vinos
      WHERE id = $1
    `;
    const values = [wineId];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    throw new Error("Error fetching wine by ID: " + error.message);
  }
}


export async function deleteVino(wineId: number) {
  try {
    const query = `
      DELETE FROM vinos
      WHERE id = $1
    `;
    const values = [wineId];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error("Error deleting wine: " + error.message);
  }
}

export async function insertOrder(userData: { date: string, value: number, state: string, mp_id: number | undefined }) {
  try {
    const query = `
      INSERT INTO orders (ORDER_DATE_TIME, VALUE, STATE, MP_ID)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [
      userData.date,
      userData.value,
      userData.state,
      userData.mp_id
    ];
    await db.query(query, values);
    console.log('Orden insertada correctamente');
  } catch (error: any) {
    throw new Error("Error inserting order: " + error.message);
  }
}

export async function findOrderByMpId(mpId: number | undefined) {
  if (!mpId) {
    throw new Error("MP ID is required");
  }
  try {
    const query = `
      SELECT * FROM orders
      WHERE MP_ID = $1
    `;
    const values = [mpId];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    throw new Error("Error finding order by MP ID: " + error.message);
  }
}

export async function insertDetailOrder(userData: { order_id: number, wine_id: number, quantity: number, price: number }) {

  try {
    const query = `
      INSERT INTO order_details (ORDER_ID, ID_WINE, QUANTITY, PRICE)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [
      userData.order_id,
      userData.wine_id,
      userData.quantity,
      userData.price,
    ];
    await db.query(query, values);
    console.log('Detalle de orden insertado correctamente');
  } catch (error: any) {
    throw new Error("Error inserting order detail: " + error.message);
  }
}


export async function crearPreferencia(
  items: any
): Promise<string | undefined> {
  "use server";

  const preference = await new Preference(client).create({
    body: {
      back_urls: {
        failure: "https://bodine.vercel.app/",
        pending: "https://bodine.vercel.app/",
        success: "https://bodine.vercel.app/carrito/succeed",
      },
      redirect_urls: {
        failure: "https://bodine.vercel.app/",
        pending: "https://bodine.vercel.app/",
        success: "https://bodine.vercel.app/carrito/succeed",
      },
      auto_return: "approved",
      items,
    },
  });
  return preference.init_point;
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
    throw new Error("Error inserting wine: " + error.message);
  }
}

export async function updateVino(wineId: number, wineData: any) {
  try {
    const query = `
      UPDATE vinos
      SET wine = $1, wine_category = $2, price = $3, image = $4, winery = $5, average_rating = $6, reviews = $7, location = $8, available = $10
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
      wineData.available
    ];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error("Error updating wine: " + error.message);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}