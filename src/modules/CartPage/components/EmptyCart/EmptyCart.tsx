import React from 'react';
import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  return (
    <div className={styles.emptyCart}>
      <h2 className={styles.emptyCart__title}>Your cart is empty</h2>
      <div className={styles.emptyCart__img}>
        <img src="/public/img/cart-is-empty.png" alt="cart is empty" />
      </div>
    </div>
  );
};

export default EmptyCart;
