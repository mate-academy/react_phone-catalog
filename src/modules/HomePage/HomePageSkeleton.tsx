import styles from './HomePageSkeleton.module.scss';
import { ProductCardSkeleton } from '../shared/ProductCard/ProductCardSkeleton';

export const HomePageSkeleton = () => {
  return (
    <div className={styles.homeContent}>
      <div className={styles.titleSkeleton} />

      <div className={styles.homeBody}>
        <div className={styles.sliderSkeleton} />

        <div className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.productsSlider}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.productCard}>
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.categoriesGrid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.categorySkeleton} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle} />
          <div className={styles.productsSlider}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.productCard}>
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
