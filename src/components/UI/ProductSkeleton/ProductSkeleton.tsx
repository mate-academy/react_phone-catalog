import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#0F1121" highlightColor="#232336">
      <div className={styles.productCard}>
        <Skeleton className={styles.productImage} />
        <Skeleton className={styles.productName} />
        <div className={styles.productPrices}>
          <Skeleton className={styles.productPrice} />
          <Skeleton className={styles.productFullPrice} />
        </div>
        <div className={styles.productCharacteristics}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.productCharacteristicsItem}>
              <Skeleton className={styles.productCharacteristicsName} />
              <Skeleton className={styles.productCharacteristicsValue} />
            </div>
          ))}
        </div>
        <div className={styles.productButtons}>
          <Skeleton className={styles.productCartBtn} />
          <Skeleton className={styles.productFavoriteBtn} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
