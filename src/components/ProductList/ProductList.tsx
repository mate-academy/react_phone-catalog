import './ProductList.scss';
import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li className="product-list__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
