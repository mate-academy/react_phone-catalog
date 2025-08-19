import React from 'react';

import styles from './ProductDetailsSkeleton.module.scss';

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.ProductDetailsSkeleton}>
      <div className={styles.breadcrumbsSkeleton}>
        <span className={styles.skeletonBox} style={{ width: '80px' }}></span>
        <span style={{ margin: '0 8px' }}>/</span>
        <span className={styles.skeletonBox} style={{ width: '120px' }}></span>
      </div>

      <div className={styles.backButtonSkeleton}>
        <span
          className={styles.skeletonBox}
          style={{ width: '60px', height: '20px' }}
        ></span>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageSkeleton}>
            <span
              className={styles.skeletonBox}
              style={{ width: '100%', height: '400px' }}
            ></span>
          </div>
          <div className={styles.thumbnailsSkeleton}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={styles.skeletonBox}
                style={{ width: '60px', height: '60px' }}
              ></span>
            ))}
          </div>
        </div>

        <div className={styles.specsSection}>
          <div className={styles.productTitle}>
            <span
              className={styles.skeletonBox}
              style={{ width: '85%', height: '32px' }}
            ></span>
          </div>

          <div className={styles.priceSkeleton}>
            <span
              className={styles.skeletonBox}
              style={{ width: '120px', height: '24px' }}
            ></span>
            <span
              className={styles.skeletonBox}
              style={{ width: '80px', height: '20px' }}
            ></span>
          </div>

          <div className={styles.colorsSkeleton}>
            <span
              className={styles.skeletonBox}
              style={{ width: '100px' }}
            ></span>
            <div className={styles.colorOptions}>
              {[...Array(6)].map((_, index) => (
                <span
                  key={index}
                  className={styles.skeletonBox}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                ></span>
              ))}
            </div>
          </div>

          <div className={styles.capacitiesSkeleton}>
            <span
              className={styles.skeletonBox}
              style={{ width: '100px' }}
            ></span>
            <div className={styles.capacityOptions}>
              {[...Array(3)].map((_, index) => (
                <span
                  key={index}
                  className={styles.skeletonBox}
                  style={{ width: '80px', height: '40px' }}
                ></span>
              ))}
            </div>
          </div>

          <div className={styles.specsList}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className={styles.specItem}>
                <span
                  className={styles.skeletonBox}
                  style={{ width: '80px' }}
                ></span>
                <span
                  className={styles.skeletonBox}
                  style={{ width: '120px' }}
                ></span>
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <span
              className={styles.skeletonBox}
              style={{ width: '200px', height: '48px' }}
            ></span>
            <span
              className={styles.skeletonBox}
              style={{ width: '48px', height: '48px' }}
            ></span>
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <div className={styles.descriptionBlock}>
            <span
              className={styles.skeletonBox}
              style={{ width: '40%', height: '24px' }}
            ></span>
            <div className={styles.descriptionText}>
              <span
                className={styles.skeletonBox}
                style={{ width: '95%' }}
              ></span>
              <span
                className={styles.skeletonBox}
                style={{ width: '88%' }}
              ></span>
              <span
                className={styles.skeletonBox}
                style={{ width: '92%' }}
              ></span>
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            <span
              className={styles.skeletonBox}
              style={{ width: '30%', height: '24px' }}
            ></span>
            <div className={styles.descriptionText}>
              <span
                className={styles.skeletonBox}
                style={{ width: '93%' }}
              ></span>
              <span
                className={styles.skeletonBox}
                style={{ width: '89%' }}
              ></span>
            </div>
          </div>

          <div className={styles.techSpecs}>
            <span
              className={styles.skeletonBox}
              style={{ width: '150px', height: '24px' }}
            ></span>
            <div className={styles.techSpecsList}>
              {[...Array(7)].map((_, index) => (
                <div key={index} className={styles.techSpecItem}>
                  <span
                    className={styles.skeletonBox}
                    style={{ width: '100px' }}
                  ></span>
                  <span
                    className={styles.skeletonBox}
                    style={{ width: '150px' }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.suggestionsSection}>
          <span
            className={styles.skeletonBox}
            style={{ width: '200px', height: '24px' }}
          ></span>
          <div className={styles.suggestionCards}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.suggestionCard}>
                <span
                  className={styles.skeletonBox}
                  style={{ width: '100%', height: '200px' }}
                ></span>
                <div className={styles.suggestionCardBody}>
                  <span
                    className={styles.skeletonBox}
                    style={{ width: '90%' }}
                  ></span>
                  <span
                    className={styles.skeletonBox}
                    style={{ width: '70px' }}
                  ></span>
                  <span
                    className={styles.skeletonBox}
                    style={{ width: '60px' }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
