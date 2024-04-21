import React from 'react';
import './ProductList.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => (
  <ul className="product-list" data-cy="productList">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </ul>
);
