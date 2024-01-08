import { useEffect } from 'react';
import { counter } from '../../store/store';

/* eslint-disable max-len */
type Props = {
  type: string;
};
export const Badge:React.FC<Props> = ({ type }) => {
  const { fav, cart, setCount } = counter();
  const total = () => {
    if (type === 'cart') {
      return cart;
    }

    return fav;
  };

  useEffect(() => {
    setCount(type);
  }, []);

  return (
    +total() > 0
      ? <span className="w-4 h-4 absolute flex items-center justify-center top-4 right-4 bg-altRed rounded-full text-[8px] text-white">{total()}</span>
      : <></>
  );
};
