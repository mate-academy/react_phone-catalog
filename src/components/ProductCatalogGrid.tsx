import React from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

export const ProductCatalogGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="catalog-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
