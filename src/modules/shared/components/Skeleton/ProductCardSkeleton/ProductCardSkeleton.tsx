import React from 'react';
import styles from './ProductCardSkeleton.module.scss';
import { Skeleton } from '../Skeleton';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.imageWrapper}>
        <Skeleton className={styles.image} />
      </div>

      <Skeleton className={styles.name} />
      <Skeleton className={styles.name2} />

      <div className={styles.prices}>
        <Skeleton className={styles.price} />
        <Skeleton className={styles.fullPrice} />
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <Skeleton className={styles.specLeft} />
          <Skeleton className={styles.specRight} />
        </div>
        <div className={styles.specRow}>
          <Skeleton className={styles.specLeft} />
          <Skeleton className={styles.specRight} />
        </div>
        <div className={styles.specRow}>
          <Skeleton className={styles.specLeft} />
          <Skeleton className={styles.specRight} />
        </div>
      </div>

      <div className={styles.buttons}>
        <Skeleton className={styles.cartBtn} />
        <Skeleton className={styles.favBtn} />
      </div>
    </article>
  );
};
