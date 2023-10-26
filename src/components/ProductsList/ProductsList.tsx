import React from 'react';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <ul className="productList" data-cy="productList">
    {products.map(product => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
