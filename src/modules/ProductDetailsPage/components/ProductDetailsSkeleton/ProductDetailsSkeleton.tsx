/* eslint-disable max-len */

import { ProductsSliderSkeleton } from '../../../shared/components/ProductsSlider';
import { Skeleton } from '../../../shared/components/Skeleton';
import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton = () => (
  <div className={styles.page}>
    <Skeleton className={styles.back} />

    <div className={styles.header}>
      <Skeleton className={styles.title} />
    </div>

    <div className={styles.layout}>
      <div className={styles.gallery}>
        <Skeleton className={styles.mainImage} />
        <div className={styles.thumbs}>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={`thumb-${index}`} className={styles.thumb} />
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.section}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.optionRow}>
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={`color-${index}`} className={styles.option} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <Skeleton className={styles.sectionTitle} />
          <div className={styles.optionRow}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={`capacity-${index}`} className={styles.option} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.prices}>
            <Skeleton className={styles.price} />
            <Skeleton className={styles.fullPrice} />
          </div>
          <div className={styles.actions}>
            <Skeleton className={styles.cartButton} />
            <Skeleton className={styles.favButton} />
          </div>
          <div className={styles.specs}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={`spec-${index}`} className={styles.specRow}>
                <Skeleton className={styles.specLabel} />
                <Skeleton className={styles.specValue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className={styles.details}>
      <div className={styles.about}>
        <Skeleton className={styles.sectionHeading} />
        <Skeleton className={styles.line} />
        <Skeleton className={styles.line} />
        <Skeleton className={styles.lineShort} />
      </div>

      <div className={styles.tech}>
        <Skeleton className={styles.sectionHeading} />
        {Array.from({ length: 6 }, (_, index) => (
          <div key={`tech-${index}`} className={styles.specRow}>
            <Skeleton className={styles.specLabel} />
            <Skeleton className={styles.specValue} />
          </div>
        ))}
      </div>
    </div>

    <ProductsSliderSkeleton />
  </div>
);
