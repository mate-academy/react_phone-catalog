import React from 'react';
import './ProductsList.scss';
import { Product } from '../../types/Product';

import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
};
