import React from 'react';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
  className: string;
};

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <div className={`products-list ${className}`}>
      {products.map(product => {
        return (
          <ProductCard
            item={product}
            className="products-list__item"
            key={product.id}
            showDiscount
          />
        );
      })}
    </div>
  );
};
