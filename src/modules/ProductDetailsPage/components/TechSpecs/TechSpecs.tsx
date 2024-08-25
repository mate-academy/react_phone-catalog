import React from 'react';
import styles from './TechSpecs.module.scss';
import { Product } from '../../../../types/Product';

type TechSpecsProps = {
  productDetails: Product | undefined;
};

export const TechSpecs: React.FC<TechSpecsProps> = ({productDetails}) => {

  if (productDetails !== undefined) {
    return (
      <div className={styles.section}>
        <section className={styles.techSpecsSection}>
          <h3 className={styles.sectionTitle}>Tech specs</h3>
          <div className={styles.divider}></div>

          <ul className={styles.specsList}>
            <li className={styles.specs}>
              <strong className={styles.specsKey}>Screen</strong>
              <span className={styles.specsValue}>{`${productDetails.screen}`}</span>
            </li>

            <li className={styles.specs}>
              <strong className={styles.specsKey}>Resolution</strong>
              <span className={styles.specsValue}>{`${productDetails.resolution}`}</span>
            </li>

            <li className={styles.specs}>
              <strong className={styles.specsKey}>Processor</strong>
              <span className={styles.specsValue}>{`${productDetails.processor}`}</span>
            </li>

            <li className={styles.specs}>
              <strong className={styles.specsKey}>Ram</strong>
              <span className={styles.specsValue}>{`${productDetails.ram}`}</span>
            </li>

            <li className={styles.specs}>
              <strong className={styles.specsKey}>Built in memory</strong>
              <span className={styles.specsValue}>{`${productDetails.capacity}`}</span>
            </li>

            {'camera' in productDetails && (
              <li className={styles.specs}>
                <strong className={styles.specsKey}>Camera</strong>
                <span className={styles.specsValue}>{`${productDetails.camera}`}</span>
              </li>
            )}

            {'zoom' in productDetails && (
              <li className={styles.specs}>
                <strong className={styles.specsKey}>Zoom</strong>
                <span className={styles.specsValue}>{`${productDetails.zoom}`}</span>
              </li>
            )}

            {'ceil' in productDetails && (
              <li className={styles.specs}>
                <strong className={styles.specsKey}>Cell</strong>
                <span className={styles.specsValue}>{`${productDetails.ceil}`}</span>
              </li>
            )}
          </ul>
        </section>
      </div>
    );
  } else {
    return <div />;
  }
};
