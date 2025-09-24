/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './CartPage.module.scss';
import { StoreContext } from '../../StoreProvider';
import { BackButton } from '../ProductDetailsPage/BackButton';
import { CartList } from './CartList';

export const CartPage = () => {
  const { cartItems } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.back}>
          <BackButton />
        </div>
        <h1 className={styles.title}>Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <h2 className={styles.message}>Your cart is empty...</h2>
      ) : (
        <div className={styles.cartlist}>
          <CartList />
        </div>
      )}
    </div>
  );
};
