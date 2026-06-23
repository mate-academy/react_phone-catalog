import React from 'react';

import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton: React.FC = () => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.image} />
      </div>

      <div className={styles.title} />

      <div className={styles.prices}>
        <div className={styles.currentPrice} />
        <div className={styles.oldPrice} />
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow} />
        <div className={styles.specRow} />
        <div className={styles.specRow} />
      </div>

      <div className={styles.actions}>
        <div className={styles.cartButton} />
        <div className={styles.favouritesButton} />
      </div>
    </article>
  );
};
