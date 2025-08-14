import React from 'react';
import '@/styles/icon.scss';
import '@/styles/button.scss';
import '@/styles/typography.scss';
import styles from './CartItem.module.scss';
import classNames from 'classnames';

export const CartItem: React.FC = () => {
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item__desc}>
        <div className={styles.cart_item__remove}>
          <i className="icon icon--close"></i>
        </div>
        <div className={styles.cart_item__image}>
          <img
            src="/img/phones/apple-iphone-11-pro-max/gold/00.webp"
            alt="Apple iPhone 11 Pro Max"
            className={styles['cart_item__image--img']}
          />
        </div>
        <p className={classNames(styles.cart_item__title, 'text__body')}>
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </p>
      </div>
      <div className={styles.cart_item__controls}>
        <div className={styles.cart_item__qty}>
          <button className="button__circle button__circle--regular">-</button>
          <p
            className={classNames(styles['cart_item__qty--text'], 'text__body')}
          >
            1
          </p>
          <button className="button__circle button__circle--regular">+</button>
        </div>
        <h3>$1099</h3>
      </div>
    </div>
  );
};
