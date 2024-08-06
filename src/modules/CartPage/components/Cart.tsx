import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CartList } from '../CartList/CartList';
import { setIsCheckoutModal } from '../../../features/booleanSlice';
import { CheckoutModal } from '../CheckoutModal/CheckoutModal';
import { amount } from './../services/findAmount';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isBackDisabled, setIsBackDisabled] = useState(false);

  const itemsInCart = useAppSelector(state => state.chosenItems.cart);
  const cart = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );
  // const isModule = useAppSelector(state => state.boolean.isCheckoutModal);

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

  const handleCheckout = () => {
    dispatch(setIsCheckoutModal(true));
  };

  return (
    <>
      <CheckoutModal />

      <div className={styles.gridContainer}>
        <div className={styles.cart}>
          <div
            onClick={handleGoBack}
            className={`${styles.cart__buttonBack} ${isBackDisabled && styles.buttonDisabled}`}
          >
            <img src="./icons/arrow-left-ico.svg" alt="arrow-back" />
            <p className={styles.buttonBackText}>Back</p>
          </div>

          <h1 className={styles.cart__title}>Cart</h1>

          {itemsInCart.length > 0 ? (
            <div className={styles.cart__content}>
              <CartList gadgets={itemsInCart} />

              <div className={styles.checkout}>
                <div className={styles.checkout__sum}>
                  {`$${amount(itemsQuantity, cart, 'money')}`}
                </div>

                <div className={styles.checkout__totalItems}>
                  Total for {amount(itemsQuantity, cart, 'items')} items
                </div>

                <div className={styles.checkout__horizontal}></div>

                <button
                  onClick={handleCheckout}
                  className={`${styles.checkout__button} ${styles.blackButtonBase} `}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <h3 className={styles.cart__empty}>Your cart is empty.</h3>
          )}
        </div>
      </div>
    </>
  );
};
