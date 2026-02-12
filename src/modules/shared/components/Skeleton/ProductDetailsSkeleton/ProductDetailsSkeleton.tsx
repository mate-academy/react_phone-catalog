import React from 'react';
import styles from './ProductDetailsSkeleton.module.scss';
import { Skeleton } from '../../../../shared/components/Skeleton';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.titleRow}>
        <Skeleton className={styles.title} />
      </div>

      <div className={styles.main}>
        <div className={styles.imagesBlock}>
          <div className={styles.thumbs}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className={styles.thumb} />
            ))}
          </div>

          <Skeleton className={styles.mainImage} />
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.optionsHeader}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.id} />
          </div>

          <Skeleton className={styles.colorsRow} />
          <Skeleton className={styles.capRow} />

          <div className={styles.priceBlock}>
            <Skeleton className={styles.price} />
            <Skeleton className={styles.actions} />
          </div>

          <div className={styles.specs}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.specRow}>
                <Skeleton className={styles.specLeft} />
                <Skeleton className={styles.specRight} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
