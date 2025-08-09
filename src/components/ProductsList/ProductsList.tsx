import React from 'react';
import './ProductsList.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
