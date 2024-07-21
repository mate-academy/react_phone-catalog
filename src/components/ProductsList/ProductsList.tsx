import React from 'react';
import { UpgradedProduct } from '../../types/UpgradedProducts';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: UpgradedProduct[];
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
