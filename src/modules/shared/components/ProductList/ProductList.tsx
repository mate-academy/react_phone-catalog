import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard';
import cn from 'classnames';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={cn(styles.productList__item)}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
