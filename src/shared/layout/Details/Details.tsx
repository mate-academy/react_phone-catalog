import React from 'react';
import styles from './Details.module.scss';
import { Products } from '../../../types/Products';
import { Goods } from '../../../types/Goods';

type ProductItem = Products | Goods;

type Props = {
  product: ProductItem;
  details: string[];
  customStyles?: 'small-font' | 'big-font';
};

export const Details: React.FC<Props> = ({
  product,
  details,
  customStyles,
}) => {
  const checkValue = (key: string) => {
    const keyToLower = key.toLowerCase() as keyof ProductItem;
    const value = product[keyToLower];

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return value;
  };

  return (
    <div className={`${styles.product__details} ${styles.details}`}>
      {details.map((detail, index) => (
        <div key={index} className={styles.details__row}>
          <span
            className={`${styles.details__label} ${customStyles ? styles[customStyles] : ''}`}
          >
            {detail}
          </span>
          <span
            className={`${styles.details__value} ${customStyles ? styles[customStyles] : ''}`}
          >
            {checkValue(detail)}
          </span>
        </div>
      ))}
    </div>
  );
};
