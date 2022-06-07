/* eslint-disable import/no-cycle */
import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './List.scss';

type Props = {
  products: Product[]
};

export const List: React.FC<Props> = ({ products }) => (
  <ul className="list">
    {products.map((product) => (
      <li
        key={product.id}
        className="list__item"
      >
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
