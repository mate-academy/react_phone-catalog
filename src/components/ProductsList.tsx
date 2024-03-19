import React from 'react';
import '../styles/ProductsList.scss';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => (
  <ul className="products-list">
    {products.map(product => (
      <li key={product.itemId}>
        <ProductCard product={product} data-cy="cardsContainer" />
      </li>
    ))}
  </ul>
);
