import React, { useState } from 'react';
import cl from 'classnames';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import { ArrowLeftIcon } from '../../components/Icons/ArrowLeftIcon';
import { CartList } from './components/CartList';
import { CartModuleWindow } from './components/CartModuleWindow';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const [isShowing, setIsShowing] = useState(false);

  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (totalItems === 0) {
    return (
      <section className={cl('container', [styles.section])}>
        <div className={styles.content}>
          <h2 className={styles.empty}>Your cart is empty</h2>

          <img
            src={`${import.meta.env.BASE_URL}/img/cart-is-empty.png`}
            alt="Empty cart photo"
            className={styles.img}
          />
        </div>
      </section>
    );
  }

  return (
    <section className={cl('container', [styles.section])}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.breadCrumps}>
          <span className={styles.icon}>
            <ArrowLeftIcon />
          </span>

          <p className={styles.text}>Back</p>
        </Link>

        <h1>Cart</h1>
      </div>

      <div className={styles.cartWrapper}>
        <CartList cart={cartItems} />

        <div className={styles.checkout}>
          <div className={styles.priceBlock}>
            <h2 className={styles.price}>{`$${totalPrice}`}</h2>
            <p className={styles.countOfItems}>
              {totalItems === 1
                ? `Total for ${totalItems} item`
                : `Total for ${totalItems} items`}
            </p>
          </div>

          <hr className={styles.line} />

          <button className={styles.button} onClick={() => setIsShowing(true)}>
            Checkout
          </button>
        </div>
      </div>

      <CartModuleWindow isShowing={isShowing} changeShowing={setIsShowing} />
    </section>
  );
};
