import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../../../../types/types';
import { ProductCard } from '../../../shared/components/product-card';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
