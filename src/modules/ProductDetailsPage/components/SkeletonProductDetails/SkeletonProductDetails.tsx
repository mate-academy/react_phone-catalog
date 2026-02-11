import React from 'react';
import styles from './SkeletonProductDetails.module.scss';

export const SkeletonProductDetails: React.FC = () => {
  return (
    <section className={styles.productDetails}>
      <div className={styles.productDetails__pathSkeleton} />

      <div className={styles.productDetails__titleSkeleton} />

      <div className={styles.productDetails__mainGrid}>
        <div className={styles.productDetails__gallerySkeleton}>
          <div className={styles.productDetails__thumbs}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.productDetails__thumb} />
            ))}
          </div>
          <div className={styles.productDetails__bigImg} />
        </div>

        <div className={styles.productDetails__infoBlock}>
          <div className={styles.productDetails__options}>
            <div className={styles.productDetails__labelSkeleton} />
            <div className={styles.productDetails__colorsSkeleton}>
              <div /> <div /> <div />
            </div>

            <div className={styles.productDetails__line} />

            <div className={styles.productDetails__labelSkeleton} />
            <div className={styles.productDetails__capacitiesSkeleton}>
              <div /> <div /> <div />
            </div>

            <div className={styles.productDetails__line} />

            <div className={styles.productDetails__priceSkeleton} />

            <div className={styles.productDetails__buttons}>
              <div className={styles.productDetails__cartBtnSkeleton} />
              <div className={styles.productDetails__favBtnSkeleton} />
            </div>

            <div className={styles.productDetails__specs}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.productDetails__specRow} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
