import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { UpgradedProduct } from '../../types/UpgradedProduct';

type Props = {
  products: UpgradedProduct[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {
        products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))
      }
    </>
  );
};
