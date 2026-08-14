import React from 'react';
import classNames from 'classnames';
import styles from './ProductPageSkeleton.module.scss';

const bone = (...classes: string[]) =>
  classNames(styles.skeletonBone, ...classes);

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={bone(styles.breadcrumbs)} />

      <div className={bone(styles.productTitle)} />

      <div className={styles.heroGrid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {[1, 2, 3].map(i => (
              <div key={i} className={bone(styles.thumb)} />
            ))}
          </div>
          <div className={bone(styles.bigImage)} />
        </div>

        <div className={styles.info}>
          <div className={bone(styles.selectorLabel)} />
          <div className={styles.circles}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={bone(styles.circle)} />
            ))}
          </div>

          <div className={bone(styles.selectorLabel)} />
          <div className={styles.rects}>
            {[1, 2].map(i => (
              <div key={i} className={bone(styles.capacityRect)} />
            ))}
          </div>

          <div className={bone(styles.price)} />

          <div className={styles.buttons}>
            <div className={bone(styles.cartBtn)} />
            <div className={bone(styles.heartBtn)} />
          </div>

          <div className={styles.summarySpecs}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={bone(styles.specLine)} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mainDivider} />

      <div className={styles.bottomGrid}>
        <div>
          <div className={bone(styles.sectionTitle)} />
          {[1, 2].map(i => (
            <div key={i} className={styles.aboutBlock}>
              <div className={bone(styles.subTitle)} />
              <div className={bone(styles.textLine)} />
              <div className={bone(styles.textLine)} />
              <div className={bone(styles.textLine)} />
            </div>
          ))}
        </div>

        <div>
          <div className={bone(styles.sectionTitle)} />
          <div className={styles.specsList}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={styles.specRow}>
                <div className={bone(styles.specLabel)} />
                <div className={bone(styles.specValue)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
