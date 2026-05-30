import React from 'react';
import { ProductDetails } from '../../../types/ProductDetails';
import styles from './Techspecs.module.scss';
type Props = {
  product: ProductDetails;
};

export const Techspecs: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell },
  ];

  return (
    <div className={styles.techSpecs}>
      <div className={styles.techSpecs__top}>
        <span className={styles.techSpecs__top__title}>Tech specs</span>
      </div>
      <div className={styles.techSpecs__divider} />
      <div className={styles.techSpecs__specs}>
        {specs.map(({ label, value }) =>
          value ? (
            <div key={label} className={styles.techSpecs__specRow}>
              <span className={styles.techSpecs__specLabel}>{label}</span>
              <span className={styles.techSpecs__specValue}>{value}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
