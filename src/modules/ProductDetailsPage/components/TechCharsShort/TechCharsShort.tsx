import React from 'react';
import styles from './TechCharsShort.module.scss';
import { ProductInfo } from '../../../../types/ProductInfo';

type Props = {
  product: ProductInfo;
};

export const TechCharsShort: React.FC<Props> = ({ product }) => {
  const productChars = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles.productChars}>
      {productChars.map((char, index) => (
        <div key={index} className={styles.productTechWrap}>
          <p className={styles.productTechChar}>{char.label}</p>
          <p className={styles.productTechCValue}>{char.value}</p>
        </div>
      ))}
    </div>
  );
};
