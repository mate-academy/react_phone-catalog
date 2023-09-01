import { useMemo } from 'react';
import { useAppSelector } from '@/app/hooks';
import './IconWithCounter.scss';
import { Counter } from "@/components/Counter";
import FavouriteSvg from '@/images/icons/Favourites.svg';
import CartSvg from '@/images/icons/Cart.svg';

type Props = {
  type: 'favourites' | 'cart',
};

export const IconWithCounter: React.FC<Props> = ({ type }) => {
  const items = useAppSelector(state => state[type]);

  const itemsCount = useMemo(() => {
    return items.length;
  }, [items]);

  const images = {
    favourites: FavouriteSvg,
    cart: CartSvg,
  };

  return (
    <div className="IconWithCounter">
      <img
        src={images[type]}
        alt={type}
        className='IconWithCounter__image'
      />
      <Counter count={itemsCount} />
    </div>
  );
};
