import { MercadoPagoConfig, Payment } from "mercadopago";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json().then(data => data as { data: { id: string } })

    const client = new MercadoPagoConfig({ accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN! })
    const payment = await new Payment(client).get({id: body.data.id})

    console.log('body: ', body);
    console.log('payment: ', payment);
    //TODO ver que datos devuelve la compra y si es posible con los mismos guardarlos en la base de datos,
    //ya que seria la manera mas segura de mantener la consistencia mas alla de si se cae o no nuestra app.
    return Response.json({success: true})
}