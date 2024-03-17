import React from 'react';
import './ProductsList.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      <ul className="products-list__list grid">
        {products.map((product) => {
          return (
            <li
              className="products-list__card grid__item"
              key={product.id}
            >
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
