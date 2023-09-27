import React from 'react';
import './productslist.scss';
import { Phone } from '../../types/phone';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Phone[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onlyFullPrice={false}
        />
      ))}
    </div>
  );
};
