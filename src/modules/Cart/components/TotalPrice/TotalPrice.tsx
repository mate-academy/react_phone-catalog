import React from 'react';
import styles from './TotalPrice.module.scss';

interface TotalPriceProps {
  commonPrice: number;
  totalItems: number;
}

export const TotalPrice: React.FC<TotalPriceProps> = ({
  commonPrice,
  totalItems,
}) => {
  return (
    <div className={styles.gridPrice}>
      <div className={styles.containerPrice}>
        <div className={styles.containerTotalPrice}>
          <div className={styles.totalPrice}>${commonPrice}</div>
          <div className={styles.countItems}>Total for {totalItems} items</div>
        </div>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
};
