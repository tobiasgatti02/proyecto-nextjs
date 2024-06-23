import { MercadoPagoConfig, Payment } from "mercadopago";
import type { NextRequest } from "next/server";
import { findOrderByMpId, insertDetailOrder, insertOrder } from "@/app/lib/actions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN!,
  });

  const payment = await new Payment(client);
  const pago = await payment.get({ id: body.data.id });

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
  return Response.json({ success: true });
}
