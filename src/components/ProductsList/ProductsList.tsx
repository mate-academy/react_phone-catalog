import React from 'react';
import { ProductType } from '../../helpers/types/ProductType';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: ProductType[]
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div data-cy="productsList" className="productsList">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
