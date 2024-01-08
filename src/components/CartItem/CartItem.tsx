/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Gadget } from '../../support/types';
import { storage } from '../../support/utility';
import { counter } from '../../store/store';

type Props = {
  item: Gadget;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setNumbers: React.Dispatch<React.SetStateAction<number>>;
};
export const CartItem:React.FC<Props> = ({ item, setPrice, setNumbers }) => {
  const { setCount } = counter();
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const itemsPrice = number * +item.price;

    setPrice(prev => prev + itemsPrice);
    setNumbers(prev => prev + number);

    return () => {
      setPrice(prev => prev - itemsPrice);
      setNumbers(prev => prev - number);
    };
  }, []);

  const numberDecreaseHandler = () => {
    if (number > 1) {
      setNumber(number - 1);
      setPrice(prev => prev - item.price);
      setNumbers(prev => prev - 1);
    }
  };

  const removeItemHandler = () => {
    storage.toggle('cart', item.id);
    setCount('cart');
  };

  return (
    <div className="flex h-32 items-center pl-6 pr-10 gap-6 border border-elements">
      <button type="button" onClick={removeItemHandler}>
        <img src="./img/svg/close.svg" alt="close" />
      </button>
      <div className="flex justify-center items-center h-20 w-20">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <p>{item.name}</p>

      <div className="flex ml-auto">
        <button
          type="button"
          className={`flex items-center justify-center h-8 w-8 border border-elements select-none hover:border-primary ${number === 1 ? 'inactive-cartbutton' : ''}`}
          onClick={numberDecreaseHandler}
        >
          -
        </button>

        <p className="h-8 w-8 flex justify-center items-center select-none">{number}</p>

        <button
          type="button"
          className="flex items-center justify-center h-8 w-8 border border-elements select-none hover:border-primary"
          onClick={() => {
            setNumber(number + 1);
            setNumbers(prev => prev + 1);
            setPrice(prev => prev + item.price);
          }}
        >
          +
        </button>
      </div>
      <span className="h2 font-bold inline-block text-primary relative">{`$${item.price}`}</span>

    </div>
  );
};
