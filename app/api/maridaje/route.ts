import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sql } from '@vercel/postgres';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  const { nombreVino } = await request.json();

  try {
    const searchResult = await sql`
      SELECT * FROM vinos
      WHERE wine ILIKE ${`%${nombreVino}%`}
      LIMIT 1
    `;



    if (searchResult.rows.length === 0) {
      return NextResponse.json({ error: 'Vino no encontrado' }, { status: 404 });
    }

    const vino = searchResult.rows[0];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `Sugiere maridajes para el siguiente vino:
    Nombre: ${vino.wine}
    Bodega: ${vino.winery}
    Tipo: ${vino.wine_category}
    Región: ${vino.location}

    Por favor, proporciona 3 sugerencias de platos o alimentos que combinen bien con este vino, explicando brevemente por qué son buenas combinaciones. Presenta las sugerencias en el siguiente formato:
    titulo en negrita descripción del maridaje y una bulled list de ingredientes o platillos que se maridan bien con el vino
    no utilices # (hashtags) en el texto
    `;

    const generationResult = await model.generateContent(prompt);
    const response = await generationResult.response;
    const maridaje = response.text();

    return NextResponse.json({ maridaje });
  } catch (error) {
    console.error('Error al generar maridaje:', error);
    return NextResponse.json({ error: 'Error al generar recomendaciones de maridaje' }, { status: 500 });
  }
}
