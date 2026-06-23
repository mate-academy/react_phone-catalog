import React from 'react';

import { CartItem } from '../../../../types/Cart';

import styles from './CartList.module.scss';
import { CartListItem } from '../CartItem';

type Props = {
  cart: CartItem[];
};

export const CartList: React.FC<Props> = ({ cart }) => {
  return (
    <ul className={styles.list}>
      {cart.map(item => (
        <li key={item.id} className={styles.item}>
          <CartListItem cartItem={item} />
        </li>
      ))}
    </ul>
  );
};
