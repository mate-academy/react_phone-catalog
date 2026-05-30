import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductPageLayout } from '../../styles/ProductPageLayout';

export const AccessoriesPage: React.FC = () => {
  const { products, loading, error } = useProducts('accessories');

  if (loading) {
    return <p>Loading accessories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <ProductPageLayout title="Accessories" products={products} />;
};
