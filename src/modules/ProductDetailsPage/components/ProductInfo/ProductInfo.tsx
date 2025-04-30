import React from 'react';

import styles from './ProductInfo.module.scss';

import { Product } from '../../../../shared/types/Product/Product';
import { ProductAbout } from './components/ProductAbout/ProductAbout';
import { ProductTech } from './components/ProductTech/ProductTech';

type Props = {
  productInfo: Product;
};

export const ProductInfo: React.FC<Props> = ({ productInfo }) => {
  return (
    <section className={styles.productInfo}>
      <ProductAbout productInfo={productInfo} />
      <ProductTech productInfo={productInfo} />
    </section>
  );
};
