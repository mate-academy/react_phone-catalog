import React from 'react';
import './ProductsList.scss';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: UpgratedProduct[];
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
