import React from 'react';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { Product } from '../../../types/Product';

interface AccessoriesListProps {
  products: Product[];
}

export const AccessoriesList: React.FC<AccessoriesListProps> = ({
  products,
}) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
