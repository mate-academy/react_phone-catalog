import React from 'react';
import styles from './Empty.module.scss';
import { Link } from 'react-router-dom'; // якщо використовуєш React Router

export const EmptyCart = () => {
  return (
    <div className={styles.EmptyCart}>
      <img
        src="./img/cart-is-empty.png" // або будь-яка іконка/ілюстрація
        alt="Empty cart"
        className={styles.EmptyCart__image}
      />
      <h2 className={styles.EmptyCart__title}>Your cart is empty</h2>
      <p className={styles.EmptyCart__text}>
        Looks like you haven’t added anything yet.
      </p>
      <Link to="/" className={styles.EmptyCart__button}>
        Start shopping
      </Link>
    </div>
  );
};
