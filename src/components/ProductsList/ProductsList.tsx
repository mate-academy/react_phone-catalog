import React from 'react';
import { Product } from '../../types/ProductType';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({
  products,
}) => (
  <div className="container">
    <div className="catalog">
      {products.map(item => (
        <div data-cy="item" key={item.id}>
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  </div>
);
