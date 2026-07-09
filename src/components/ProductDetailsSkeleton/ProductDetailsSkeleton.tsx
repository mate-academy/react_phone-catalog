import React from 'react';
import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs} />
      <div className={styles.title} />


      <div className={styles.productContent}>

        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.thumb} />
            ))}
          </div>
          <div className={styles.mainImageContainer} />
        </div>


        <div className={styles.actions}>
          <div className={styles.section}>
            <div className={styles.labelSmall} />
            <div className={styles.colors} />
          </div>
          <div className={styles.divider} />
          <div className={styles.section}>
            <div className={styles.labelSmall} />
            <div className={styles.capacities} />
          </div>
          <div className={styles.divider} />
          <div className={styles.priceSection} />
          <div className={styles.buttons} />
          <div className={styles.shortSpecs}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.specRow} />
            ))}
          </div>
        </div>
      </div>

      
      <div className={styles.description}>
        <div className={styles.about}>
          <div className={styles.labelMedium} />
          <div className={styles.textLine} />
          <div className={styles.textLine} />
          <div className={styles.textLine} />
        </div>
        <div className={styles.specs}>
          <div className={styles.labelMedium} />
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className={styles.specRowLarge} />
          ))}
        </div>
      </div>
    </div>
  );
};
