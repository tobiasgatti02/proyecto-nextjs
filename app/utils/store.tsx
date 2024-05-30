'use client'
import { useReducer, createContext, useEffect, Dispatch } from "react";

const initialState = {
    carrito: {
        productos: [],
        cantidad: 0,
    },
};

export const Store = createContext<{ state: any; dispatch: Dispatch<any>; } | null>(null);

export function StoreProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        if (typeof window !== "undefined") {
            const storedState = localStorage.getItem('storeState');
            return storedState ? JSON.parse(storedState) : initial;
        }
        return initial;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('storeState', JSON.stringify(state));
        }
    }, [state]);

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const nuevoProducto = action.payload;
            const cantidad = action.payload.cantidad || 1
            const existItem = state.carrito.productos.find((x: any) => x.id === nuevoProducto.id);

            if (!existItem) {
                return {
                    ...state,
                    carrito: {
                        productos: [...state.carrito.productos, { ...nuevoProducto, cantidad }],
                        cantidad: state.carrito.cantidad + cantidad,
                    }
                };
            }

            return {
                ...state,
                carrito: {
                    productos: state.carrito.productos.map((producto: any) =>
                        producto.id === existItem.id ? { ...producto, cantidad: producto.cantidad + cantidad } : producto
                    ),
                    cantidad: state.carrito.cantidad + cantidad,
                }
            };
        case 'REMOVE_PRODUCT_UNIT':
            const productoARemover = action.payload;
            if (productoARemover.cantidad === 1) {
                return {
                    ...state,
                    carrito: {
                        productos: state.carrito.productos.filter((producto: any) => producto.id !== productoARemover.id),
                        cantidad: state.carrito.cantidad - 1,
                    }
                };
            }
            return {
                ...state,
                carrito: {
                    productos: state.carrito.productos.map((producto: any) =>
                        producto.id === productoARemover.id ? { ...productoARemover, cantidad: productoARemover.cantidad - 1 } : producto
                    ),
                    cantidad: state.carrito.cantidad - 1,
                }
            };
        case 'REMOVE_PRODUCT':
            const productoId = action.payload.id;
            const item = state.carrito.productos.find((x:any) => x.id === productoId);

            if (item) {
                return {
                    ...state,
                    carrito: {
                        productos: state.carrito.productos.filter((producto:any) => producto.id !== productoId),
                        cantidad: state.carrito.cantidad - item.cantidad
                    }
                };
            }

            return state;

        case 'CLEAR':
            return {
                ...state,
                carrito: {
                    productos: [],
                    cantidad: 0,
                }
            };

        default:
            return state;
    }
}
