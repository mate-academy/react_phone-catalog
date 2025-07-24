import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const PorductsList: React.FC<Props> = React.memo(({ products }) => {
  return (
    <div className="productsList">
      <ul className="productsList__list">
        {products.map(
          product =>
            product && (
              <li className="productsList__list_item" key={product.id}>
                <ProductCard product={product} discount={product.fullPrice} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
});

PorductsList.displayName = 'PorductList';
