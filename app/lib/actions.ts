"use server";
import { db } from "@vercel/postgres";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";

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

export async function insertOrden(userData: { id: number, date: string, hour: string, value: number, state: string }) {
  try {
    const query = `
      INSERT INTO ordenes (ORDER_ID, ORDER_DATE, ORDER_HOUR, VALUE, STATE)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [
      userData.id,
      userData.date,
      userData.hour,
      userData.value,
      userData.state,
    ];
    await db.query(query, values);
  } catch (error: any) {
    throw new Error("Error inserting order: " + error.message);
  }
}


export async function crearPreferencia(
  items: any
): Promise<string | undefined> {
  "use server";

  const preference = await new Preference(client).create({
    body: {
      back_urls: {
        //TODO cambiar las redirecciones a las de la pagina en produccion.
        failure: "http://localhost:3000",
        pending: "http://localhost:3000",
        success: "http://localhost:3000",
      },
      auto_return: "approved",
      items,
    },
  });
  return preference.sandbox_init_point;
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

export async function logout() {
  await signOut({ redirectTo: "/" });
}
