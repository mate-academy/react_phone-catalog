import React from 'react';
import cn from 'classnames';
import styles from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={cn(styles['product-list'])}>
      {products
        .filter(product => product !== null && product !== undefined)
        .map(product => (
          <ProductCard key={product.id || product.itemId} product={product} />
        ))}
    </div>
  );
};
