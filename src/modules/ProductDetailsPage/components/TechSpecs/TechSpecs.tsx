import React from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import styles from './TechSpecs.module.scss';

interface Props {
  product: ProductDetails;
}

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.techSpecs}>
      <h3 className={styles.techSpecs__title}>Tech specs</h3>
      <hr className={styles.techSpecs__divider} />

      <div className={styles.techSpecs__list}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.techSpecs__row}>
            <span className={styles.techSpecs__label}>{label}</span>
            <span className={styles.techSpecs__value}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
