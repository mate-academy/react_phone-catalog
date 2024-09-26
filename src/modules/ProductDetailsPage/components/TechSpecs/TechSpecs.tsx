import { FC } from 'react';
import styles from './TechSpecs.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: FC<Props> = ({ product }) => {
  return (
    <div className={styles.techSpecsSection}>
      <h3 className={styles.sectionTitle}>Tech specs</h3>
      <div className={styles.divider}></div>

      <ul className={styles.specsList}>
        <li className={styles.specs}>
          <strong className={styles.specsKey}>Screen</strong>
          <span className={styles.specsValue}>{product.screen}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Resolution</strong>
          <span className={styles.specsValue}>{product.resolution}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Processor</strong>
          <span className={styles.specsValue}>{product.processor}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Ram</strong>
          <span className={styles.specsValue}>{product.ram}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Built in memory</strong>
          <span className={styles.specsValue}>{product.capacity}</span>
        </li>

        {product.camera && (
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Camera</strong>
            <span className={styles.specsValue}>{product.camera}</span>
          </li>
        )}

        {product.zoom && (
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Zoom</strong>
            <span className={styles.specsValue}>{product.zoom}</span>
          </li>
        )}

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Cell</strong>
          <span className={styles.specsValue}>{product.cell.join(', ')}</span>
        </li>
      </ul>
    </div>
  );
};
