import React from 'react';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard';
import { Accessory, Phone, Tablet } from '../../types';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="products-list gap-x-4 gap-y-10 mt-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
