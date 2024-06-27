import { MercadoPagoConfig, Payment } from "mercadopago";
import type { NextRequest } from "next/server";
import { findOrderByMpId, insertDetailOrder, insertOrder } from "@/app/lib/actions";

let recentApprovedPayments: { id: number, amount: number, date: string }[] = [];

export async function POST(req: NextRequest) {
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
    recentApprovedPayments.push({
      id: pago.id ? pago.id : 0,
      amount: pago.transaction_amount ? pago.transaction_amount : 0,
      date: pago.date_approved ? pago.date_approved : ''
    });
    if (!pago.additional_info?.items) {
      return Response.json({ success: false });
    }
    for (const item of pago.additional_info?.items) {
      insertDetailOrder({ order_id: compra.order_id, wine_id: Number(item.id), quantity: item.quantity, price: item.unit_price });
    }
  }
  if (recentApprovedPayments.length > 1) {
    recentApprovedPayments.shift();
  }

  return Response.json({
    success: true
  });
}
export async function GET(req: NextRequest) {
  return Response.json({ recentPayments: recentApprovedPayments });
}