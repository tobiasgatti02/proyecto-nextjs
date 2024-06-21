import { NextResponse } from "next/server";
import { fetchVinos } from "@/app/lib/data"; // Asegúrate de que la ruta de importación sea correcta

export async function GET() {
    try {
        // Obtiene los vinos usando la función fetchVinos
        const vinos = await fetchVinos();

        // Retorna los vinos como respuesta JSON
        return NextResponse.json(vinos);
    } catch (error) {
        console.error('Error al obtener los vinos:', error);
        return NextResponse.json(
            { error: 'Hubo un error al obtener los vinos' },
            { status: 500 }
        );
    }
}