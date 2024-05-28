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

// Creamos la función reductora
function reducer(state: any, action: any) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const nuevoProducto = action.producto;
            const existItem = state.carrito.productos.find((x: any) => x.id === nuevoProducto.id);

            const productos = existItem ? state.carrito.productos.map((x: any) => x.id === nuevoProducto.id ? nuevoProducto : x)
                : [...state.carrito.productos, nuevoProducto];

            return {
                ...state,
                carrito: {
                    productos,
                    cantidad: state.carrito.cantidad + 1,
                }
            };
        
        case 'REMOVE_PRODUCT_UNIT':
            return {
                ...state,
                carrito: {
                    productos: state.carrito.productos.map((producto: any) => {
                        if (producto.id === action.id && producto.cantidad > 1) {
                            return {
                                ...producto,
                                cantidad: producto.cantidad - 1,
                            }
                        }
                        return producto;
                    }),
                    cantidad: state.carrito.cantidad - 1,
                }
            };

        case 'REMOVE_PRODUCT':
            const productToRemove = action.payload;
            const cantidadToRemove = productToRemove.cantidad;
            return {
                ...state,
                carrito: {
                    productos: state.carrito.productos.filter((producto: any) => producto.id !== productToRemove.id),
                    cantidad: state.carrito.cantidad - cantidadToRemove,
                }
            };

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
