import React from 'react';
import styles from './ProductSpecs.module.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  view?: 'card' | 'details';
};

export const ProductSpecs: React.FC<Props> = ({ product, view = 'card' }) => {
  const shortSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Capacity', value: product.capacity },
    { label: 'RAM', value: product.ram },
  ];

  const detailedSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built-in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell?.join(', ') },
  ];

  const specsToShow = view === 'card' ? shortSpecs : detailedSpecs;
  const visibleSpecs = specsToShow.filter(spec => spec.value);

  return (
    <div className={styles.specs}>
      <ul className={styles.list}>
        {visibleSpecs.map((spec, index) => (
          <li key={index} className={styles.row}>
            <span className={styles.name}>{spec.label}</span>
            <span className={styles.value}>{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
