import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from './components/CartItem';
import { CartTotal } from './components/CartTotal';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <h1 className={styles.cartPage__title}>Your cart</h1>
        <div className={styles.cartPage__empty}>
          <img
            src="img/cart-is-empty.png"
            alt="Empty cart"
            className={styles.cartPage__emptyImage}
          />
          <p className={styles.cartPage__emptyText}>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartPage__title}>Cart</h1>

      <div className={styles.cartPage__content}>
        <div className={styles.cartPage__items}>
          {state.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles.cartPage__summary}>
          <CartTotal />
        </div>
      </div>
    </div>
  );
};
