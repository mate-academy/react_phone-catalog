import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IconWithCounter } from '../IconWithCounter';

export const CartIcon = () => {
  const count = useSelector((state: RootState) => state.cart.items.length);

  return (
    <IconWithCounter
      iconSrc="icons/shopping_bag.svg"
      alt="cart"
      count={count}
    />
  );
};
