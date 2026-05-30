import React from 'react';
import styles from './ProductOptions.module.scss';

type Props = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
};

const ProductInfo: React.FC<Props> = ({
  screen,
  resolution,
  processor,
  ram,
}) => {
  return (
    <div className={styles.product__info}>
      <div className={styles.product__infoRow}>
        <span className={styles.product__infoTitle}>Screen</span>
        <span className={styles.product__infoValue}>{screen}</span>
      </div>
      <div className={styles.product__infoRow}>
        <span className={styles.product__infoTitle}>Resolution</span>
        <span className={styles.product__infoValue}>{resolution}</span>
      </div>
      <div className={styles.product__infoRow}>
        <span className={styles.product__infoTitle}>Processor</span>
        <span className={styles.product__infoValue}>{processor}</span>
      </div>
      <div className={styles.product__infoRow}>
        <span className={styles.product__infoTitle}>RAM</span>
        <span className={styles.product__infoValue}>{ram}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
