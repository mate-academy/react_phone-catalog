import React, { useContext } from 'react';
import styles from './CartPageTotal.module.scss';
import { CartContext } from '../../../../context/CartContext';

type Props = {
  onShowCheckout: (value: boolean) => void;
};

export const CartPageTotal: React.FC<Props> = ({ onShowCheckout }) => {
  const { totalPrice, totalQuantity } = useContext(CartContext);

  return (
    <div className={styles.total}>
      <div className={styles.total__container}>
        <div className={styles.total__info}>
          <h2>{`$${totalPrice}`}</h2>
          <span className={`${styles.total__items} body-text`}>
            Total for {totalQuantity} items
          </span>
        </div>
        <div className={styles.total__line}></div>
        <button
          className={styles.total__button}
          onClick={() => onShowCheckout(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
