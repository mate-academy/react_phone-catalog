import React from 'react';
import styles from './CartCheckout.module.scss';

interface Props {
  totalPrice: number;
  totalQuantity: number;
}

export const CartCheckout: React.FC<Props> = ({
  totalPrice,
  totalQuantity,
}) => {
  return (
    <div className={styles.cartCheckout}>
      <div className={styles.info}>
        <span className={styles.price}>${totalPrice}</span>
        <span className={styles.text}>Total for {totalQuantity} items</span>
      </div>

      <div className={styles.divider} />

      <button className={styles.button} onClick={() => alert('Money first!')}>
        Checkout
      </button>
    </div>
  );
};
