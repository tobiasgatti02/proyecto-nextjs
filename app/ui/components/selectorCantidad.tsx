'use client'
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';
import { useState } from 'react';

interface Props {
    cantidad: number;
    className?: string;
}

export const SelectorCantidad = ({cantidad, className}: Props) => {

    const [count, setCount] = useState(cantidad);
    const onCantidadChange = (value: number) => {
        if (count + value < 1 ) return;
        setCount(count + value);
    }

    return(
        <div className={`${className} flex mx-auto`}>
            <button onClick={ () =>onCantidadChange(-1) }>
                <IoRemoveCircleOutline size={ 30 }/>
            </button>
            <span className='w-auto mx-3 px-5 bg-gray-100 text-center text-black rounded'>
                {count}
            </span>
            <button onClick={ () => onCantidadChange(1) }>
                <IoAddCircleOutline size={ 30 }/>
            </button>
        </div>
    )
}