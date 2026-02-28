import React from 'react';

import styles from './CartPage.module.scss';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';
import { useCart } from '../../context/CartContext';

export const CartPage: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <h2 className={styles.cart__empty}>Your cart is empty</h2>
      ) : (
        <>
          <div className={styles.cart__list}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.cart__summary}>
            <CartTotal />
          </div>
        </>
      )}
    </div>
  );
};
