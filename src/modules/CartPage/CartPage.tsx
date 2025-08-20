import React from 'react';
import '@/styles/main.scss';
import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { CartItem } from './components/CartItem/CartItem';
import { Checkout } from './components/Checkout';
import { BackButton } from '../shared/components/BackButton/BackButton';

export const CartPage: React.FC = () => {
  return (
    <main className={classNames(styles.cart_page, 'container')}>
      <BackButton href="#"></BackButton>
      <h1 className={styles.cart_page__heading}>Cart</h1>
      <div className={styles.cart_page__functional}>
        <div className={styles.cart_page__items}>
          <CartItem></CartItem>
          <CartItem></CartItem>
          <CartItem></CartItem>
        </div>
        <Checkout></Checkout>
      </div>
    </main>
  );
};
