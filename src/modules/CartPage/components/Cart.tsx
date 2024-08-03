import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useAppSelector } from '../../../app/hooks';
import { CartList } from '../CartList/CartList';

export const Cart: React.FC = () => {
  const [isBackDisabled, setIsBackDisabled] = useState(false);

  const itemsInCart = useAppSelector(state => state.chosenItems.cart);

  useEffect(() => {
    if (window.history.length < 1) {
      setIsBackDisabled(true);
    }
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      return;
    }
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.cart}>
        <div
          onClick={handleGoBack}
          className={`${styles.cart__buttonBack} ${isBackDisabled && styles.buttonDisabled}`}
        >
          <img src="/icons/arrow-left-ico.svg" alt="arrow-back" />
          <p className={styles.buttonBackText}>Back</p>
        </div>

        <h1 className={styles.cart__title}>Cart</h1>

        {itemsInCart.length > 0 ? (
          <div className={styles.cart__content}>
            <CartList gadgets={itemsInCart} />

            <div className={styles.checkout}>
              <div className={styles.checkout__sum}>$2657</div>

              <div className={styles.checkout__totalItems}>
                Total for {itemsInCart.length} items
              </div>

              <div className={styles.checkout__horizontal}></div>

              <button className={styles.checkout__button}>Checkout</button>
            </div>
          </div>
        ) : (
          <h3 className={styles.cart__empty}>Your cart is empty.</h3>
        )}
      </div>
    </div>
  );
};
