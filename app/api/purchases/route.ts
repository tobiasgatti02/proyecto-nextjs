import { getCompras } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log('GET request received for compras');
        const compras = await getCompras();
        console.log(`Returning ${compras.length} compras`);
        return NextResponse.json(compras);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        return NextResponse.json(
            { error: 'Hubo un error al obtener las compras' },
            { status: 500 }
        );
    }
}