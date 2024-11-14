import styles from './Checkout.module.scss';
import React from 'react';
import classNames from 'classnames';

interface Props {
  totalPrice: number;
  numOfProducts: number;
  handleModal: (open: boolean) => void;
}

export const Checkout: React.FC<Props> = ({
  totalPrice,
  numOfProducts,
  handleModal,
}) => {
  const checkoutText = `Total for ${numOfProducts > 1 ? numOfProducts + ' items' : numOfProducts + ' item'}`;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.totalContainer}>
        <span className={styles.totalPrice}>{'$' + totalPrice}</span>
        <p className={styles.totalText}>{checkoutText}</p>
      </div>
      <button
        className={classNames(styles.btnCheckout, 'btnCart')}
        onClick={() => handleModal(true)}
      >
        Checkout
      </button>
    </div>
  );
};
