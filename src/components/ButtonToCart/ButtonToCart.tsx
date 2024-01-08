/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { storage } from '../../support/utility';
import { counter } from '../../store/store';

type Props = {
  itemID: string;
};

export const ButtonToCart: React.FC<Props> = ({ itemID }) => {
  const [selected, setSelected] = useState(false);
  const { cart, setCount } = counter();

  useEffect(() => {
    if (storage.isExist('cart', itemID)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [cart]);

  return (
    <button
      type="button"
      onClick={() => {
        storage.toggle('cart', itemID);
        setSelected(!selected);
        setCount('cart');
      }}
      className={
        selected
          ? 'w-[176px] h-10 flex items-center justify-center  text-altGreen border border-elements shadow'
          : 'bg-primary w-[176px] h-10 flex items-center justify-center shadow text-white border border-primary'
      }
    >
      {selected ? 'Selected' : 'Add to cart'}
    </button>
  );
};
