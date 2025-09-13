import React from 'react';
import productsList from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from 'types/ProductPreview';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={productsList['products-list']}>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
