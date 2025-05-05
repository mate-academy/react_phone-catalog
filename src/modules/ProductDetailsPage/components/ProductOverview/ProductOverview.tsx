import React from 'react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './ProductOverview.module.scss';

import { Product } from '../../../../shared/types/Product/Product';
import { ProductDetails } from '../ProductDetails';
import { ProductOptions } from '../ProductOptions';

type Props = {
  product: Product;
};

export const ProductOverview: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.productOverview}>
      <ProductDetails product={product} />
      <ProductOptions product={product} />
    </section>
  );
};
