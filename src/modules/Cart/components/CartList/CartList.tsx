import React from 'react';

import styles from './CartList.module.scss';

import { useCart } from '../../../../hooks/useCart';
import { CartItem } from '../../../../components/CartItem';

export const CartList: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className={styles.cartList}>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};
