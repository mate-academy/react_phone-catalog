import React from 'react';

import styles from './ProductInfo.module.scss';

import { Product } from '../../../../shared/types/Product/Product';

import { ProductAbout } from '../ProductAbout/ProductAbout';
import { ProductTech } from '../ProductTech/ProductTech';

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
