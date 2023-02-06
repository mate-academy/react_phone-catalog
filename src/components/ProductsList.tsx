import React from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';
import '../styles/components/ProductList.scss';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div
      className="products-list"
      data-cy="productList"
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
