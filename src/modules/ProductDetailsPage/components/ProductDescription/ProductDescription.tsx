/* eslint-disable max-len */
import React from 'react';
import { ProductDescriptionType } from '../../../../types/Product/ProductDescriptionType';

import styles from './ProductDescription.module.scss';

type Props = {
  description: ProductDescriptionType[];
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    memory: string;
    camera?: string;
    zoom?: string;
    cell?: string[];
  };
};

export const ProductDescription: React.FC<Props> = ({ description, specs }) => {
  return (
    <div className={styles.productDescription}>
      <div className={styles.productDescription__aboutSection}>
        <h2>About</h2>

        <div className={styles.productDescription__divider} />

        {description.map((section, index) => (
          <div key={index} className={styles.productDescription__section}>
            <h3>{section.title}</h3>
            {section.text.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className={styles.productDescription__sectionText}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.productDescription__techSpecs}>
        <h2>Tech Specs</h2>

        <div className={styles.productDescription__divider} />

        <div className={styles.productDescription__specs}>
          <div className={styles.productDescription__specRow}>
            <span className={styles.productDescription__specLabel}>Screen</span>
            <span className={styles.productDescription__specValue}>
              {specs.screen}
            </span>
          </div>

          <div className={styles.productDescription__specRow}>
            <span className={styles.productDescription__specLabel}>
              Resolution
            </span>
            <span className={styles.productDescription__specValue}>
              {specs.resolution}
            </span>
          </div>

          <div className={styles.productDescription__specRow}>
            <span className={styles.productDescription__specLabel}>
              Processor
            </span>
            <span className={styles.productDescription__specValue}>
              {specs.processor}
            </span>
          </div>

          <div className={styles.productDescription__specRow}>
            <span className={styles.productDescription__specLabel}>RAM</span>
            <span className={styles.productDescription__specValue}>
              {specs.ram}
            </span>
          </div>

          <div className={styles.productDescription__specRow}>
            <span className={styles.productDescription__specLabel}>Memory</span>
            <span className={styles.productDescription__specValue}>
              {specs.memory}
            </span>
          </div>

          {specs.camera && (
            <div className={styles.productDescription__specRow}>
              <span className={styles.productDescription__specLabel}>
                Camera
              </span>
              <span className={styles.productDescription__specValue}>
                {specs.camera}
              </span>
            </div>
          )}

          {specs.zoom && (
            <div className={styles.productDescription__specRow}>
              <span className={styles.productDescription__specLabel}>Zoom</span>
              <span className={styles.productDescription__specValue}>
                {specs.zoom}
              </span>
            </div>
          )}

          {specs.cell && (
            <div className={styles.productDescription__specRow}>
              <span className={styles.productDescription__specLabel}>Cell</span>
              <span className={styles.productDescription__specValue}>
                {Array.isArray(specs.cell) ? specs.cell.join(', ') : specs.cell}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
