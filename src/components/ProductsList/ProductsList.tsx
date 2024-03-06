import React from 'react';

import './index.scss';
import { ProductExtended } from '../../types/ProductExtended';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: ProductExtended[];
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
