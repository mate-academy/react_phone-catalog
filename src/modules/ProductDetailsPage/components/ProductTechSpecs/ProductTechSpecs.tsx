import React from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import styles from './ProductTechSpecs.module.scss';

type Props = {
  product: ProductDetails;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  const specs = [
    { name: 'Screen', value: product.screen },
    { name: 'Resolution', value: product.resolution },
    { name: 'Processor', value: product.processor },
    { name: 'RAM', value: product.ram },
    { name: 'Built in memory', value: product.capacity },
    { name: 'Camera', value: product.camera },
    { name: 'Zoom', value: product.zoom },
    { name: 'Cell', value: product.cell.join(', ') },
  ].filter(spec => spec.value);

  return (
    <div className={styles.productTechSpecs}>
      <h2 className={styles.productTechSpecsTitle}>Tech specs</h2>
      <ul className={styles.productTechSpecsList}>
        {specs.map(spec => {
          return (
            <li key={spec.name} className={styles.productTechSpecsItem}>
              <span className={styles.productTechSpecsName}>{spec.name}</span>
              <span className={styles.productTechSpecsValue}>{spec.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
