import React from 'react';
import '@/styles/main.scss';
import styles from './Checkout.module.scss';
import classNames from 'classnames';

export const Checkout: React.FC = () => {
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__text}>
        <h2 className={styles['checkout__text--sum']}>$2657</h2>
        <p className={classNames(styles['checkout__text--qty'], 'text__small')}>
          Total for 3 items
        </p>
      </div>
      <hr />
      <button className="button button__primary">Checkout</button>
    </div>
  );
};
