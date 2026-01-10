/* eslint-disable max-len */

import { ProductsSliderSkeleton } from '../../../shared/components/ProductsSlider';
import { Skeleton } from '../../../shared/components/Skeleton';
import styles from './HomePageSkeleton.module.scss';

export const HomePageSkeleton = () => (
  <div className={styles.wrapper}>
    <ProductsSliderSkeleton />

    <section className={styles.block}>
      <div className={styles.sectionHeader}>
        <Skeleton className={styles.heading} />
        <Skeleton className={styles.caption} />
      </div>
      <div className={styles.categories}>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={`category-${index}`} className={styles.category}>
            <Skeleton className={styles.categoryImage} />
            <Skeleton className={styles.categoryTitle} />
            <Skeleton className={styles.categoryDesc} />
          </div>
        ))}
      </div>
    </section>

    <ProductsSliderSkeleton />
  </div>
);
