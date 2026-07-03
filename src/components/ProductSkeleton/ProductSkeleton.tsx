import React from 'react';

import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard} data-testid="product-skeleton">
      <div className={styles.shimmer} />
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.priceContainer}>
        <div className={styles.price} />
        <div className={styles.price} style={{ width: '45px' }} />
      </div>
      <div className={styles.specs}>
        <div className={styles.specRow}>
          <div className={styles.specLabel} />
          <div className={styles.specVal} />
        </div>
        <div className={styles.specRow}>
          <div className={styles.specLabel} style={{ width: '30px' }} />
          <div className={styles.specVal} style={{ width: '50px' }} />
        </div>
        <div className={styles.specRow}>
          <div className={styles.specLabel} style={{ width: '35px' }} />
          <div className={styles.specVal} style={{ width: '40px' }} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.btnMain} />
        <div className={styles.btnSquare} />
      </div>
    </div>
  );
};
