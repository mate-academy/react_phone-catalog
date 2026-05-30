import React from 'react';
import styles from './AboutProduct.module.scss';

import { ProductDetails } from '../../types/ProductDetails';
type Props = {
  product: ProductDetails;
};

export const AboutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.AboutProduct}>
      <div className={styles.AboutProduct__top}>
        <h3 className={styles.AboutProduct__top__title}>About</h3>
      </div>
      <div className={styles.AboutProduct__divider} />
      {product.description?.map(desc => (
        <div key={desc.title} className={styles.AboutProduct__main}>
          <h4 className={styles.AboutProduct__titelSection}>{desc.title}</h4>
          <span className={styles.AboutProduct__text}>{desc.text}</span>
        </div>
      ))}
    </div>
  );
};
