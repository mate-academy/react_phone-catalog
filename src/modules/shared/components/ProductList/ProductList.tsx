import React from 'react';
import { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} item={product} showDiscount={true} />
      ))}
    </>
  );
};
