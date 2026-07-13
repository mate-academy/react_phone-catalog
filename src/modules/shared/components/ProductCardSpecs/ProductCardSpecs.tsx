import React from 'react';
import styles from './ProductCardSpecs.module.scss';

type SpecsProps = {
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCardSpecs: React.FC<SpecsProps> = ({
  screen,
  capacity,
  ram,
}) => {
  const productSpecs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  return (
    <div className={styles['product-card-specs']}>
      {productSpecs.map(spec => (
        <div key={spec.label} className={styles['product-card-specs__item']}>
          <span className={styles['product-card-specs__label']}>
            {spec.label}
          </span>
          <span className={styles['product-card-specs__value']}>
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
};
