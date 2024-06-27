"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";
import { SelectorCantidadCarrito } from "../ui/components/selectorCantidadCarrito";
import NavBar from "../ui/components/navBar";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { crearPreferencia } from "../lib/actions";
import { Vino } from "../lib/definitions";

export default function Carrito() {
  const [productos, setProductos] = useState([]);
  const [productosMapeados, setProductosMapeados] = useState([]);
  const storeData = useContext(Store);

  useEffect(() => {
    if (storeData && storeData.state) {
      setProductos(storeData.state.carrito.productos);
      setProductosMapeados(mapearAMercadoPago(storeData.state.carrito.productos));
    }
  }, [storeData]);

  useEffect(() => {
    const eventSource = new EventSource('/api/payments');
    eventSource.onmessage = (event) => {
      const { status } = JSON.parse(event.data);

      if (status === 'approved') {
        storeData?.dispatch({ type: 'CLEAR' });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [storeData]);

  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "es-AR" });

  const mapearAMercadoPago = (productos: any) => {
    return productos.map((producto: Vino) => ({
      id: String(producto.id),
      title: producto.wine,
      description: producto.winery,
      picture_url: producto.image,
      category_id: producto.wine_category,
      quantity: producto.cantidad,
      unit_price: Number(producto.price),
    }));
  };

  const handleBuy = async () => {
    const checkoutUrl = await crearPreferencia(productosMapeados);
    if (checkoutUrl) {
      window.location.replace(checkoutUrl);
    } else {
      alert("No se pudo generar el enlace de pago");
    }
  };

  const removeCartHandler = (producto: any) => {
    storeData?.dispatch({ type: "REMOVE_PRODUCT", payload: producto });
  };

  const vaciarCarritoHandler = () => {
    storeData?.dispatch({ type: "CLEAR" });
  };

  const totalItems = productos.reduce((a: number, c: any) => a + c.cantidad, 0);
  const totalPrice = productos.reduce((a: number, c: any) => a + c.price * c.cantidad, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3B0613] to-[#1A0208] text-white">
      <NavBar
        text="text-white"
        logo="/logo.png"
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-transparent"
        bgColorScrolled="bg-[#3B0613]"
      />
      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl font-bold mb-8">Tu Carrito</h1>
        <Link href="/compras" className="text-lg hover:underline mb-10 inline-block">
          ← Continuar comprando
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {productos.length === 0 ? (
              <div className="text-center py-10 bg-white/10 rounded-lg">
                <p className="text-xl">Tu carrito está vacío</p>
              </div>
            ) : (
              productos.map((producto: any) => (
                <div key={producto.id} className="flex flex-col lg:flex-row items-center mb-6 bg-white/10 p-4 rounded-lg transition-all hover:bg-white/20">
                  <Image
                    src={producto.image}
                    alt={producto.wine}
                    width={100}
                    height={100}
                    className="rounded-md object-cover mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{producto.wine}</h3>
                    <p className="text-gray-300">{producto.winery}</p>
                    <p className="text-xl font-bold mt-2">${producto.price}</p>
                    <div className="flex flex-col lg:flex-row items-center justify-between mt-4 w-full">
                      <SelectorCantidadCarrito
                        producto={producto}
                        cantidad={producto.cantidad}
                        className="bg-white/20 rounded-md mb-4 lg:mb-0"
                      />
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors lg:ml-4"
                        onClick={() => removeCartHandler(producto)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white/10 rounded-lg p-6 sticky top-32">
              <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
              <div className="flex justify-between mb-2">
                <span>Cantidad de artículos</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold mt-4 pt-4 border-t border-white/20">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-6 transition-colors"
                onClick={handleBuy}
                disabled={productos.length === 0}
              >
                Pagar con MercadoPago
              </button>
              {productos.length > 0 && (
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-colors"
                  onClick={vaciarCarritoHandler}
                >
                  Vaciar Carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
