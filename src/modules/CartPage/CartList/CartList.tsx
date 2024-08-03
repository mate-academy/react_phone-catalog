import { Product } from '../../../types/Product';
import { CartItem } from '../CartItem/CartItem';
import styles from './CartList.module.scss';
import React from 'react';

interface CartListType {
  gadgets: Product[];
}

export const CartList: React.FC<CartListType> = ({ gadgets }) => {
  return (
    <ul className={styles.list}>
      {gadgets?.map(gadget => (
        <li className={styles.elemet} key={gadget.id}>
          <CartItem gadget={gadget} />
        </li>
      ))}
    </ul>
  );
};
