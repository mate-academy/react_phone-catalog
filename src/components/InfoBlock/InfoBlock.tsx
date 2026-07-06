import React from 'react';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './InfoBlock.module.scss';

type Props = {
  product: Product | ProductDetails;
};

export const InfoBlock: React.FC<Props> = ({ product }) => (
  <div className={styles.infoBlock}>
    <div className={styles.infoRow}>
      <span className={styles.info}>Screen</span>

      <span className={`${styles.info} ${styles.infoValue}`}>
        {product.screen}
      </span>
    </div>

    <div className={styles.infoRow}>
      <span className={styles.info}>Capacity</span>

      <span className={`${styles.info} ${styles.infoValue}`}>
        {product.capacity}
      </span>
    </div>

    <div className={styles.infoRow}>
      <span className={styles.info}>RAM</span>

      <span className={`${styles.info} ${styles.infoValue}`}>
        {product.ram}
      </span>
    </div>
  </div>
);
