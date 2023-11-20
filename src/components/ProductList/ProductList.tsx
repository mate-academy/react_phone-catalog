import React from 'react';
import { Phone } from '../../type/Phone';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Phone[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div
      className="productsList"
      data-cy="productList"
    >
      {products.map(phone => (
        <ProductCard phone={phone} key={phone.id} />
      ))}
    </div>
  );
};
