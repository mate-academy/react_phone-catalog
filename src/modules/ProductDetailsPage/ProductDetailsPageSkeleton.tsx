import { FC } from 'react';
import styles from './ProductDetailsPageSkeleton.module.scss';
import { ProductCardSkeleton } from '../shared/ProductCard/ProductCardSkeleton';

export const ProductDetailsPageSkeleton: FC = () => {
  return (
    <div className={styles.pageBody}>
      <div className={styles.breadcrumbs} />
      <div className={styles.backButton} />
      <div className={styles.titleSkeleton} />

      <div className={styles.mainContent}>
        {/* Big placeholder for image slider */}
        <div className={styles.imagesSliderSkeleton} />

        <div className={styles.mainControls}>
          <div className={styles.optionsWrapper}>
            {/* Two distinct option blocks */}
            <div className={styles.optionsBlock}>
              <div className={styles.labelSkeleton} />
              <div className={styles.optionsListSkeleton} />
            </div>

            <div className={styles.optionsBlock}>
              <div className={styles.labelSkeleton} />
              <div className={styles.optionsListSkeleton} />
            </div>
          </div>

          <div className={styles.priceSkeleton} />

          <div className={styles.buttonsSkeleton}>
            <div className={styles.buttonSkeleton} />
            <div className={styles.buttonSkeleton} />
          </div>

          <div className={styles.specs}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.specsItemSkeleton} />
            ))}
          </div>
        </div>
      </div>

      <section className={styles.about}>
        <div className={styles.aboutTitle} />
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.aboutItem}>
            <div className={styles.aboutItemTitle} />
            <div className={styles.aboutItemText} />
          </div>
        ))}
      </section>

      <section className={styles.techSpecs}>
        <div className={styles.specsTitle} />
        <div className={styles.specsGrid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.specsItemSkeleton} />
          ))}
        </div>
      </section>

      <div className={styles.suggestedProducts}>
        <div className={styles.sliderTitle} />
        <div className={styles.slider}>
          {[...Array(4)].map(i => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
