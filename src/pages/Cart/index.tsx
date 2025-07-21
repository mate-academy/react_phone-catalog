import { FC } from 'react';

import { useAppSelector } from '../../hooks';

export const CartPage: FC = () => {
  const { cart } = useAppSelector(state => state.cart);

  if (cart.length <= 0) {
    return <h1>No cart</h1>;
  }

  return <h1>Cart Page</h1>;
};
