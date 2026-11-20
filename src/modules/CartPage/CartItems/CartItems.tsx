import React from 'react';

import { Cart } from '../Cart';

import { CartItem } from '../../../types/CartItem';

import styles from './CartItems.module.scss';

type Props = {
  carts: CartItem[];
};

export const CartItems: React.FC<Props> = ({ carts }) => {
  return (
    <ul className={styles['cart-items']}>
      {carts.map(cart => (
        <li key={cart.id}>
          <Cart product={cart} />
        </li>
      ))}
    </ul>
  );
};
