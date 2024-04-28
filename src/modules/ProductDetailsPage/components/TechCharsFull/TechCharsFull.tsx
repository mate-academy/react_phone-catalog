import React from 'react';
import styles from './TechCharsFull.module.scss';
import { ProductInfo } from '../../../../types/ProductInfo';

type Props = {
  product: ProductInfo;
};

export const TechCharsFull: React.FC<Props> = ({ product }) => {
  const productCharsFull = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(' ,') },
  ];

  return (
    <div className={styles.productChars}>
      {productCharsFull.map((char, index) => (
        <div key={index} className={styles.productTechWrap}>
          <p className={styles.productTechChar}>{char.label}</p>
          <p className={styles.productTechCValue}>{char.value}</p>
        </div>
      ))}
    </div>
  );
};
