import React from 'react';
import { useCart } from '../shared/contexts/CartContext';
import { CartItem } from './components/CartItem/CartItem';

import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className={styles.cart}>
      <div className={styles.cart__content}>
        <div className={styles['cart__content-container']}>
          {cart.length > 0 ? (
            cart.map(item => <CartItem key={item.id} cartProduct={item} />)
          ) : (
            <p>Ваша корзина пуста</p>
          )}
        </div>
      </div>
    </div>
  );
};
