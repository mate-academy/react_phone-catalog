import './ProductsList.scss';
import React, { memo } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = memo(({ products }) => {
  return (
    <ul
      className="products-list"
      data-cy="productList"
    >
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </ul>
  );
});
