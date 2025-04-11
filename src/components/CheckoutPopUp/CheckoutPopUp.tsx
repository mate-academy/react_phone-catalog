import React from 'react';
import styles from './CheckoutPopUp.module.scss';

type Props = {
  onClose: () => void;
  totalPrice: number;
  onBuy: () => void;
};

export const CheckoutPopUp: React.FC<Props> = ({
  onClose,
  totalPrice,
  onBuy,
}) => {
  return (
    <>
      <section className={`${styles.checkout_container}`}>
        <div className={`${styles.checkout_inner_container}`}>
          <h2 className={`${styles.checkout_title}`}>
            Are you sure you wanna buy ?
          </h2>
          <p
            className={`${styles.checkout_total_price}`}
          >{`Total Price: $${totalPrice}`}</p>
          <div className={`${styles.checkout_button_container}`}>
            <button className={`${styles.checkout_button}`} onClick={onClose}>
              Cansel
            </button>
            <button className={`${styles.checkout_button}`} onClick={onBuy}>
              Buy
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
