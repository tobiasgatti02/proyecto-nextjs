'use client'
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from 'react';
import { Store } from "../../utils/store";

interface Props {
    producto: any;
    cantidad: number;
    className?: string;
}

export const SelectorCantidadCarrito = ({producto, cantidad, className}: Props) => {

    const storeData = useContext(Store);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (storeData && storeData.state) {
            setProductos(storeData.state.carrito.productos);
        }
    }, [storeData]);

    const removeOneHandler = (producto: any) => {
        if (storeData && storeData.dispatch) {
            storeData.dispatch({ type: 'REMOVE_PRODUCT_UNIT', payload: producto });
        }
    }

    const addCarritoHandler = (producto: any) => {
        if (storeData && storeData.dispatch) {
            storeData.dispatch({ type: 'ADD_PRODUCT', payload: {...producto, cantidad: 1}});
        }
    };

    const [count, setCount] = useState(cantidad);
    const onCantidadChange = (value: number) => {
        if (count + value < 1 ) return;
        setCount(count + value);
    }

    const handleRemoveClick = () => {
        removeOneHandler(producto);
        onCantidadChange(-1);
    };

    const handleAddClick = () => {
        addCarritoHandler(producto);
        onCantidadChange(1);
    }
    return(
        <div className={`${className} flex mx-auto`}>
            <button onClick={ () => handleRemoveClick() }>
                <IoRemoveCircleOutline size={ 30 }/>
            </button>
            <span className='w-auto mx-3 px-5 h-8 bg-gray-100 text-center text-black rounded pt-1'>
                {count}
            </span>
            <button onClick={ () => handleAddClick() }>
                <IoAddCircleOutline size={ 30 }/>
            </button>
        </div>
    )
}