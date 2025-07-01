import React from 'react';
import styles from './ProductInfoAbout.module.scss';

import { ProductDetails } from '@/types/productDetails';

type Props = {
  product: ProductDetails;
};

export const ProductInfoAbout: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.descriptionContainer}>
      {product.description.map((el, index) => (
        <div className={styles.descriptionSection} key={index}>
          <h4 className={styles.descriptionTitle}>{el.title}</h4>
          <p className={styles.descriptionText}>{el.text}</p>
        </div>
      ))}
    </div>
  );
};
