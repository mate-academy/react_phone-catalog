import React from 'react';
import classNames from 'classnames';
import styles from './CartCheckout.module.scss';

interface CartCheckoutProps {
  totalPrice: number;
  itemsCount: number;
  onCheckout: () => void;
  isHidden: boolean;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({
  totalPrice,
  itemsCount,
  onCheckout,
  isHidden,
}) => {
  return (
    <div
      className={classNames(styles['checkout-summary'], {
        [styles['checkout-summary--hidden']]: isHidden,
      })}
    >
      <h4 className={styles['checkout-summary__price']}>${totalPrice}</h4>
      <p className={styles['checkout-summary__info']}>
        Total for {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
      </p>
      <div className={styles['checkout-summary__divider']}></div>
      <button
        type="button"
        className={styles['checkout-summary__button']}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
