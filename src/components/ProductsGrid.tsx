import React from 'react';
import { Product } from './Product';
import { useSearch } from './hooks/useSearch';

export const ProductsGrid = () => {
  const { searchedProducts } = useSearch();

  return (
    <div className="main-grid">
      {searchedProducts.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};
