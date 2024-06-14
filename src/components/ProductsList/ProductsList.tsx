import React from 'react';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const discount = true;

  return (
    <div className="products-box">
      {products.map(product => (
        <div className="products-box__item" key={product.id}>
          <ProductCard product={product} discount={discount} />
        </div>
      ))}
    </div>
  );
};
