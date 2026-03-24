import React from 'react';
import styles from './Checkout.module.scss';
import { useCart } from '../../context/CartContext';
type Props = {
  total: number;
};
export const Checkout: React.FC<Props> = ({ total }) => {
  const { cart } = useCart();

  return (
    <div className={styles.checOut}>
      <div>
        <h2 className={styles.checOut__title}>{total}</h2>
        <span className={styles.checOut__totalItems}>
          Total for {cart.length} items
        </span>
      </div>
      <div className={styles.checOut__divider} />
      <button className={styles.checOut__btnBy}>Checkout</button>
    </div>
  );
};
