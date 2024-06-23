import { NextResponse } from "next/server";
import { fetchVinos } from "@/app/lib/data"; 

export async function GET() {
    try {
        const vinos = await fetchVinos();

        return NextResponse.json(vinos);
    } catch (error) {
        console.error('Error al obtener los vinos:', error);
        return NextResponse.json(
            { error: 'Hubo un error al obtener los vinos' },
            { status: 500 }
        );
    }
}