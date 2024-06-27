import { MercadoPagoConfig, Payment } from "mercadopago";
import type { NextRequest } from "next/server";
import { findOrderByMpId, insertDetailOrder, insertOrder } from "@/app/lib/actions";
import { useContext } from "react";
import { Store } from "@/app/utils/store";

let clients = [];

export async function POST(req: NextRequest) {
  const storeData = useContext(Store)
  const body = await req.json();
  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN!,
  });

  const payment = await new Payment(client);
  const pago = await payment.get({ id: body.data.id });
  console.log('pago', pago);

  if (pago && pago.status === 'approved') {
    await insertOrder({ date: pago.date_approved ?? '', value: pago.transaction_amount ?? 0, state: pago.status ?? 'failed', mp_id: pago.id });
    const compra = await findOrderByMpId(pago.id);

    if (!pago.additional_info?.items) {
      return Response.json({ success: false });
    }
    for (const item of pago.additional_info?.items) {
      insertDetailOrder({ order_id: compra.order_id, wine_id: Number(item.id), quantity: item.quantity, price: item.unit_price });
    }
  }

  clients.forEach(client => client.res.write(`data: ${JSON.stringify({ paymentId: pago.id, status: pago.status })}\n\n`));

  return Response.json({ success: true });
}

export function GET(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push({ req, res });

  req.on('close', () => {
    clients = clients.filter(client => client.res !== res);
  });
}
