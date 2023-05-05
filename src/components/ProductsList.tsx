import React from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="products-list" data-cy="productList">
      {
        products.map(product => (
          <li className="products-list__item" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))
      }
    </ul>
  );
};
