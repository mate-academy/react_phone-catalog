import React from 'react';
import { ProductDetails } from '../../../../types/Product';
import styles from './ProductTechSpecs.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductTechSpecs: React.FC<Props> = ({ productDetails }) => {
  const specs = [
    { label: 'Screen', value: productDetails.screen },
    { label: 'Resolution', value: productDetails.resolution },
    { label: 'Processor', value: productDetails.processor },
    { label: 'RAM', value: productDetails.ram },
    { label: 'Built in memory', value: productDetails.capacity },
    { label: 'Camera', value: productDetails.camera },
    { label: 'Zoom', value: productDetails.zoom },
    { label: 'Cell', value: productDetails.cell.join(', ') },
  ];

  return (
    <div className={styles.techSpecs}>
      <h2 className={styles.title}>Tech specs</h2>

      <div className={styles.list}>
        {specs.map(spec => (
          <div key={spec.label} className={styles.row}>
            <span className={styles.label}>{spec.label}</span>
            <span className={styles.value}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
