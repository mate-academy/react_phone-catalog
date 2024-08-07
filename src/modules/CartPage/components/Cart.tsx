import React from 'react';
import styles from './Cart.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CartList } from '../CartList/CartList';
import { setIsCheckoutModal } from '../../../features/booleanSlice';
import { CheckoutModal } from '../CheckoutModal/CheckoutModal';
import { amount } from './../services/findAmount';
import { ButtonBack } from '../../shared/ButtonBack/ButtonBack';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const itemsInCart = useAppSelector(state => state.chosenItems.cart);
  const cart = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );

  const handleCheckout = () => {
    dispatch(setIsCheckoutModal(true));
  };

  return (
    <>
      <CheckoutModal />

      <div className={styles.gridContainer}>
        <div className={styles.cart}>
          <ButtonBack />

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
