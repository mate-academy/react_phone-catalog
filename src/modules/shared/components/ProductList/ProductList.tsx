import React from 'react';
import { Product } from '@/types/Product';
import { SliderItem } from '../SliderItem/SliderItem';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <SliderItem key={product.id} item={product} showDiscount={true} />
      ))}
    </>
  );
};
