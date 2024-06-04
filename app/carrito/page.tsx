"use client";
import Link from "next/link";
import Titulo from "../ui/components/titulo";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";
import { SelectorCantidadCarrito } from "../ui/components/selectorCantidadCarrito";
import NavBar from "../ui/components/navBar";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { crearPreferencia } from "../lib/actions";
import { Vino } from "../lib/definitions";

export default function Carrito() {
  const [productos, setProductos] = useState([]);
  const [productosMapeados, setProductosMapeados] = useState([]);

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
    console.log("productosMapeados: ", productosMapeados);
    const checkoutUrl = await crearPreferencia(productosMapeados);

    if (checkoutUrl) {
      window.location.replace(checkoutUrl);
    } else {
      alert("no lo pude generar man");
    }
  };

  const storeData = useContext(Store);

  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "es-AR" });

  useEffect(() => {
    if (storeData && storeData.state) {
      setProductos(storeData.state.carrito.productos);
      setProductosMapeados(
        mapearAMercadoPago(storeData.state.carrito.productos)
      );
    }
    console.log("state: ", storeData?.state);
  }, [storeData]);

  const removeCartHandler = (producto: any) => {
    if (storeData && storeData.dispatch) {
      storeData.dispatch({ type: "REMOVE_PRODUCT", payload: producto });
    }
  };

  const vaciarCarritoHandler = () => {
    if (storeData && storeData.dispatch) {
      storeData.dispatch({ type: "CLEAR" });
    }
  };
  const logo = "/logo.png";
  return (
    <div className="text-white flex justify-center min-h-screen pt-32">
      <NavBar
        text="text-white"
        logo={logo}
        logoWidth={200}
        logoHeight={50}
        bgColorTop="bg-transparent"
        bgColorScrolled="bg-[#3B0613]"
      />
      <div className="flex flex-col w-[1000px] mb-0">
        <Titulo titulo="carrito" className="text-2xl mb-0" />
        <Link href="/compras" className="underline mb-10 max-w-[300px]">
          continúa comprando
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-0">
          {/* Carrito */}
          <div className="flex flex-col mb-0">
            {/* Items en carrito */}
            {productos.length === 0 ? (
              <div>El carrito no contiene productos</div>
            ) : (
              productos.map((producto: any) => (
                <div
                  key={producto.id}
                  className="flex mb-5 shadow-2xl border rounded-lg border-black"
                >
                  <Image
                    src={producto.image}
                    alt={producto.wine}
                    width={100}
                    height={100}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{producto.wine}</p>
                    <p>${producto.price}</p>
                    <SelectorCantidadCarrito
                      producto={producto}
                      cantidad={producto.cantidad}
                      className="mt-3"
                    />
                    <button
                      className="underline mt-3"
                      onClick={() => removeCartHandler(producto)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {productos.length === 0 ? (
            <div></div>
          ) : (
            <div>
              <div className="text-black bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2"> Resumen de la Compra</h2>
                <div className="grid grid-cols-2">
                  <span>cantidad de artículos</span>
                  {/* renderizar la cantidad de articulos totales sumando cada uno de los productos por su cantidad particular */}
                  <span className="text-right">
                    {productos.reduce((a: any, c: any) => a + c.cantidad, 0)}
                  </span>

                  <span className="mt-5 text-2xl">Total</span>
                  <span className="text-right text-2xl mt-5">
                    $
                    {productos
                      .reduce((a: any, c: any) => a + c.price * c.cantidad, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="mt-5 w-full mb-2">
                  <button
                    className="bg-blue-400 text-center w-full p-2 rounded-xl"
                    onClick={handleBuy}
                  >
                    Pagar con MercadoPago
                  </button>
                </div>
              </div>
              <button className="mt-10" onClick={vaciarCarritoHandler}>
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
