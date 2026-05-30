import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductsList.module.scss';

import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  displayType: 'fullprice' | 'discount';
};

export const ProductsList: React.FC<Props> = ({ products, displayType }) => (
  <div className={styles.products}>
    {products.map(product => (
      <div className={styles.products__item} key={product.id}>
        <ProductCard product={product} displayType={displayType} />
      </div>
    ))}
  </div>
);
