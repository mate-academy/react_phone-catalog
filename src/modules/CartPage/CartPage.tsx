import React, { useState } from 'react';

import styles from './CartPage.module.scss';
import { MainLayout } from '../../layout/MainLayout';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { CartItem } from './components/cartItem';
import { ModalCheckout } from './components/modalCheckout';
import { ArrowLeftSvg } from '../shared/svg/ArrowLeftSvg';

export const CartPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { state } = useLocation();

  const products = useAppSelector(s => s.cart);
  const totalItems = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );
  const totalPrice = products.reduce(
    (acc, product) => product.product.price * product.quantity + acc,
    0,
  );

  if (products.length === 0) {
    return (
      <MainLayout>
        <h1>Your cart is empty</h1>
        <div className={styles.empty} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {modalIsOpen && (
        <ModalCheckout closeModal={() => setModalIsOpen(false)} />
      )}

      <div className={styles.mainContent}>
        <section className={styles.topSection}>
          <Link to={state || '/'} className={styles.back}>
            <ArrowLeftSvg color="var(--active-arrow-svg)" />
            <span>Back</span>
          </Link>

          <h1 className={styles.title}>Cart</h1>
        </section>

        <section className={styles.productSection}>
          {products.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </section>

        <section className={styles.totalSection}>
          <div className={styles.totalInfo}>
            <span className={styles.totalPrice}>${totalPrice}</span>
            <span className={styles.totalItems}>
              Total for {totalItems} items
            </span>
          </div>

          <div className={styles.line} />

          <button
            className={styles.button}
            onClick={() => setModalIsOpen(true)}
          >
            Checkout
          </button>
        </section>
      </div>
    </MainLayout>
  );
};
