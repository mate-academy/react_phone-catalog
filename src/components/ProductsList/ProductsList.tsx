import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './productsList.scss';

type Props<T> = {
  products: T[],
};

export const ProductsList: React.FC<Props<Product>> = ({ products }) => (
  <div
    className="productslist"
    data-cy="productList"
  >
    {products.map((product: Product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
