import React from 'react';
import styles from './CartPageSkeleton.module.scss';

export const CartPageSkeleton: React.FC = () => {
  return (
    <div className={styles.cartPageSkeleton}>
      <div className={styles.cartPageSkeleton__checkout}>
        <div className={styles.cartPageSkeleton__itemsList}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.cartPageSkeleton__item}>
              <div className={styles.cartPageSkeleton__image} />
              <div className={styles.cartPageSkeleton__name} />
              <div className={styles.cartPageSkeleton__rightBlock}>
                <div className={styles.cartPageSkeleton__qty} />
                <div className={styles.cartPageSkeleton__price} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartPageSkeleton__totalBlock}>
          <div className={styles.cartPageSkeleton__totalAmount}>
            <div className={styles.cartPageSkeleton__totalPrice} />
            <div className={styles.cartPageSkeleton__totalLabel} />
          </div>
          <div className={styles.cartPageSkeleton__line} />
          <div className={styles.cartPageSkeleton__checkoutBtn} />
        </div>
      </div>
    </div>
  );
};
