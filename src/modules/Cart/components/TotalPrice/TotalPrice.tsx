import React from 'react';
import styles from './TotalPrice.module.scss';
import { useCart } from '../../../../ProductsContext/CartContext';

interface TotalPriceProps {
  commonPrice: number;
  totalItems: number;
}

export const TotalPrice: React.FC<TotalPriceProps> = ({
  commonPrice,
  totalItems,
}) => {
  const { clearCart } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.gridPrice}>
      <div className={styles.containerPrice}>
        <div className={styles.containerTotalPrice}>
          <div className={styles.totalPrice}>${commonPrice}</div>
          <div className={styles.countItems}>Total for {totalItems} items</div>
        </div>
        <button onClick={handleCheckout} className={styles.checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};
