import React from 'react';
import styles from './TechSpecs.module.scss';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';

type SpecVariant = 'card' | 'short' | 'full';

interface Props {
  product: Product | ProductDetails;
  variant?: SpecVariant;
}

export const TechSpecs: React.FC<Props> = ({ product, variant = 'card' }) => {
  let rawSpecs: { label: string; value: string | number | undefined }[] = [];

  const isDetails = 'resolution' in product;

  if (variant === 'card') {
    rawSpecs = [
      { label: 'Screen', value: product.screen },
      { label: 'Capacity', value: product.capacity },
      { label: 'RAM', value: product.ram },
    ];
  } else if (variant === 'short' && isDetails) {
    rawSpecs = [
      { label: 'Screen', value: product.screen },
      { label: 'Resolution', value: product.resolution },
      { label: 'Processor', value: product.processor },
      { label: 'RAM', value: product.ram },
    ];
  } else if (variant === 'full' && isDetails) {
    rawSpecs = [
      { label: 'Screen', value: product.screen },
      { label: 'Resolution', value: product.resolution },
      { label: 'Processor', value: product.processor },
      { label: 'RAM', value: product.ram },
      { label: 'Built in memory', value: product.capacity },
      { label: 'Camera', value: product.camera },
      { label: 'Zoom', value: product.zoom },
      { label: 'Cell', value: product.cell.join(', ') },
    ];
  }

  const validSpecs = rawSpecs.filter(
    spec => spec.value !== undefined && spec.value !== '',
  );

  return (
    <ul className={`${styles.list} ${styles[variant]}`}>
      {validSpecs.map((spec, index) => (
        <li key={index} className={styles.item}>
          <span className={styles.label}>{spec.label}</span>
          <span className={styles.value}>{spec.value}</span>
        </li>
      ))}
    </ul>
  );
};
