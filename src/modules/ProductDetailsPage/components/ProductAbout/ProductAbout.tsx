import React from 'react';

import styles from './ProductAbout.module.scss';

import { Product } from '../../../../shared/types/Product/Product';

type Props = {
  productInfo: Product;
};

export const ProductAbout: React.FC<Props> = ({ productInfo }) => {
  return (
    <div className={styles.productInfo__about}>
      <h3 className={styles.productInfo__title}>About</h3>
      <hr className={styles.productInfo__line} />
      {productInfo.description.map(productDesc => (
        <article
          className={styles.productInfo__article}
          key={productDesc.title}
        >
          <h4 className={styles.productInfo__articleTitle}>
            {productDesc.title}
          </h4>
          <p className={styles.productInfo__description}>{productDesc.text}</p>
        </article>
      ))}
    </div>
  );
};
