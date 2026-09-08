import React from 'react';
import styles from './Product.module.scss';

type InfoItem = {
  title: string;
  value: string | string[] | undefined;
};

type Props = {
  info: InfoItem[];
};

const ProductInfo: React.FC<Props> = ({ info }) => {
  return (
    <div className={styles.product__info}>
      {info.map(({ title, value }) => {
        if (!value) {
          return null;
        }

        const displayValue = Array.isArray(value) ? value.join(', ') : value;

        return (
          <div key={title} className={styles.product__infoRow}>
            <span className={styles.product__infoTitle}>{title}</span>
            <span className={styles.product__infoValue}>{displayValue}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProductInfo;
