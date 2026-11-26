import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './ProductTechSpecs.module.scss';

interface Props {
  details: ProductDetails;
}

export const ProductTechSpecs: React.FC<Props> = ({ details }) => {
  const techSpecsList = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
    { label: 'Built in memory', value: details.capacity },
    { label: 'Camera', value: details.camera },
    { label: 'Zoom', value: details.zoom },
    { label: 'Cell', value: details.cell?.join(', ') },
  ];

  return (
    <div className={styles.specs}>
      <h2 className={styles.specs__title}>Tech specs</h2>

      <div className={styles.specs__list}>
        {techSpecsList
          .filter(spec => spec.value)
          .map(spec => (
            <div key={spec.label} className={styles.specs__row}>
              <span className={styles.specs__label}>{spec.label}</span>
              <span className={styles.specs__value}>{spec.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
