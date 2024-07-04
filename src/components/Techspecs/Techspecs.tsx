import React from 'react';
import styles from './Techspecs.module.scss';
import { ProductDetails } from '../../types/ProductDetail';
import classNames from 'classnames';

interface Props {
  productDetails: ProductDetails;
}

const Techspecs: React.FC<Props> = ({ productDetails }) => {
  return (
    <section className={classNames(styles.techSpecsSection, styles.section)}>
      <h3 className={styles.sectionTitle}>Tech specs</h3>
      <div className={styles.divider}></div>

      <ul className={styles.specsList}>
        <li className={styles.specs}>
          <strong className={styles.specsKey}>Screen</strong>
          <span className={styles.specsValue}>{productDetails.screen}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Resolution</strong>
          <span className={styles.specsValue}>{productDetails.resolution}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Processor</strong>
          <span className={styles.specsValue}>{productDetails.processor}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Ram</strong>
          <span className={styles.specsValue}>{productDetails.ram}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Built in memory</strong>
          <span className={styles.specsValue}>{productDetails.capacity}</span>
        </li>

        {productDetails.camera && (
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Camera</strong>
            <span className={styles.specsValue}>{productDetails.camera}</span>
          </li>
        )}

        {productDetails.zoom && (
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Zoom</strong>
            <span className={styles.specsValue}>{productDetails.zoom}</span>
          </li>
        )}

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Cell</strong>
          <span className={styles.specsValue}>
            {productDetails.cell.join(', ')}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Techspecs;
