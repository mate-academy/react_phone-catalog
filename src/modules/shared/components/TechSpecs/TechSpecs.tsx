import React from 'react';
import classNames from 'classnames';
import styles from './TechSpecs.module.scss';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';
import { useTechSpecs, SpecVariant } from './useTechSpecs';

interface Props {
  product: Product | ProductDetails;
  variant?: SpecVariant;
}

export const TechSpecs: React.FC<Props> = ({ product, variant = 'card' }) => {
  const validSpecs = useTechSpecs(product, variant);

  return (
    <ul className={classNames(styles.list, styles[variant])}>
      {validSpecs.map(spec => (
        <li key={spec.label} className={styles.item}>
          <span className={styles.label}>{spec.label}</span>
          <span className={styles.value}>{spec.value}</span>
        </li>
      ))}
    </ul>
  );
};
