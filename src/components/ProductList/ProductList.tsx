import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(item => (
        <ProductCard
          key={item.id}
          product={item}
          className="products-list__item"
        />
      ))}
    </div>
  );
};
