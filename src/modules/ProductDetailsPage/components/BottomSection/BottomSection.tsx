import React from 'react';
import styles from './BottomSection.module.scss';
import { ProductDetails } from '../../../../shared/types/ProductDetails';

interface Props {
  product: ProductDetails;
}

export const BottomSection = ({ product }: Props) => {
  return (
    <div className={styles.bottomSection}>
      <div className={styles.aboutColumn}>
        <h2 className={styles.aboutTitle}>About</h2>

        <div className={styles.divider} />

        <div className={styles.descriptionWrapper}>
          {product.description.map(block => (
            <article className={styles.descriptionBlock} key={block.title}>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <div className={styles.paragraphsGroup}>
                {block.text.map((paragraph, index) => (
                  <p className={styles.paragraph} key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.techSpecsColumn}>
        <h2 className={styles.techSpecsTitle}>Tech specs</h2>
        <div className={styles.divider} />

        <div className={styles.specsList}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Screen</span>
            <span className={styles.secondSpecValue}>{product.screen}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Resolution</span>
            <span className={styles.specValue}>{product.resolution}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Processor</span>
            <span className={styles.specValue}>{product.processor}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>RAM</span>
            <span className={styles.specValue}>
              {product.ram.replace('GB', ' GB')}
            </span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>
              {product.category === 'accessories' ? 'Size' : 'Built in memory'}
            </span>
            <span className={styles.specValue}>
              {product.capacity
                .replace('GB', ' GB')
                .replace('TB', ' TB')
                .replace('mm', ' mm')}
            </span>
          </div>

          {product.camera && (
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Camera</span>
              <span className={styles.specValue}>{product.camera}</span>
            </div>
          )}

          {product.zoom && (
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Zoom</span>
              <span className={styles.specValue}>{product.zoom}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
