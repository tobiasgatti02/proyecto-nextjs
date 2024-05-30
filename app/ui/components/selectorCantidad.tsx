'use client'
import { IoRemoveCircleOutline, IoAddCircleOutline } from 'react-icons/io5';

interface Props {
    cantidad: number;
    className?: string;
    onChange?: (cantidad: number) => void;
}

export const SelectorCantidad = ({cantidad, className, onChange}: Props) => {


    const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (onChange){
        onChange(cantidad + 1);
        }
      };
    
      const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (cantidad > 1 && onChange) {
          onChange(cantidad - 1);
        }
      };

    

    return(
        <div className={`${className} flex mx-auto items-center`}>
            <button onClick={ (event) => handleDecrement(event)} >
                <IoRemoveCircleOutline size={ 30 }/>
            </button>
            <span className='w-auto mx-3 px-5 h-8 bg-gray-200 text-center text-black rounded pt-1 font-semibold '>
                {cantidad}
            </span>
            <button onClick={ (event) => handleIncrement(event)}>
                <IoAddCircleOutline size={ 30 }/>
            </button>
        </div>
    )
}