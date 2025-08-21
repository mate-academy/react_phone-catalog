import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductPageLayout } from '../../styles/ProductPageLayout';

export const PhonesPage: React.FC = () => {
  const { products, loading, error } = useProducts('phones');

  if (loading) {
    return <p>Loading phones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <ProductPageLayout title="Mobile phones" products={products} />;
};
