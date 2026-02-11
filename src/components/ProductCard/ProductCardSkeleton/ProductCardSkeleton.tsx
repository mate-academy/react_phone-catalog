import React from 'react';
import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.productCardSkeleton__image} />
      <div className={styles.productCardSkeleton__title} />
      <div className={styles.productCardSkeleton__prices}>
        <div className={styles.productCardSkeleton__price} />
        <div className={styles.productCardSkeleton__oldPrice} />
      </div>
      <div className={styles.productCardSkeleton__line} />
      <div className={styles.productCardSkeleton__specs}>
        {[1, 2, 3].map(i => (
          <div key={i} className={styles.productCardSkeleton__specRow} />
        ))}
      </div>
      <div className={styles.productCardSkeleton__actions}>
        <div className={styles.productCardSkeleton__btnMain} />
        <div className={styles.productCardSkeleton__btnFav} />
      </div>
    </div>
  );
};
