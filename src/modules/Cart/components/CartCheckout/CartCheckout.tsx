import React from 'react';
import styles from './CartCheckout.module.scss';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../../../types/ContextProps';

interface Props {
  totalPrice: number;
  totalQuantity: number;
}

export const CartCheckout: React.FC<Props> = ({
  totalPrice,
  totalQuantity,
}) => {
  const { clearCart } = useOutletContext<ContextProps>();
  const handleCheckoutClick = () => {
    alert('Money first! 💸');
    clearCart();
  };

  return (
    <div className={styles.cartCheckout}>
      <div className={styles.info}>
        <span className={styles.price}>${totalPrice}</span>
        <span className={styles.text}>Total for {totalQuantity} items</span>
      </div>

      <div className={styles.divider} />

      <button className={styles.button} onClick={handleCheckoutClick}>
        Checkout
      </button>
    </div>
  );
};
