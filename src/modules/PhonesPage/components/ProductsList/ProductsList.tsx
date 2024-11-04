import React from 'react';
import { ProductCard } from '../../../../components/ProductCard/ProductCard';
import { Product } from '../../../../types/Product';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
