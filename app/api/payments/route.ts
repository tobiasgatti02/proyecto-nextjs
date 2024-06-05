import { MercadoPagoConfig, Payment } from "mercadopago";
import type { NextRequest } from "next/server";
import { insertOrden } from "@/app/lib/actions";
import { RedirectType, redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  //.then((data) => data as { data: { id: string } });

  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN!,
  });

  const payment = await new Payment(client);

  const pago = await payment.get({ id: body.data.id });
  console.log("pago: ", pago);
  console.log("payment: ", payment);
  console.log("body: ", body);
  console.log(JSON.stringify(pago.additional_info?.items));
  //console.log("payment: ", payment);
  //TODO ver que datos devuelve la compra y si es posible con los mismos guardarlos en la base de datos,
  //ya que seria la manera mas segura de mantener la consistencia mas alla de si se cae o no nuestra app.
  console.log("id: ", pago.id, 'date: ', pago.date_approved, 'hour: ', pago.date_approved, 'value: ', pago.transaction_amount, 'state: ', pago.status);
  //insertOrden({ id: pago.id ?? 0, date: pago.date_approved ?? '', hour: pago.date_approved ?? '', value: pago.transaction_amount ?? 0, state: pago.status ?? 'failed' });
  return Response.json({ success: true });
}
