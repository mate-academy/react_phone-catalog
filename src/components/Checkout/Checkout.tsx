import React from 'react';
import styles from './Checkout.module.scss';
import { useCart } from '../../context/CartContext';
type Props = {
  handleCheckout: () => void;
};
export const Checkout: React.FC<Props> = ({ handleCheckout }) => {
  const { totalCount, totalPrice } = useCart();

  return (
    <div className={styles.checOut}>
      <div>
        <h2 className={styles.checOut__title}>{totalPrice}</h2>
        <span className={styles.checOut__totalItems}>
          Total for {totalCount} items
        </span>
      </div>
      <div className={styles.checOut__divider} />
      <button className={styles.checOut__btnBy} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
