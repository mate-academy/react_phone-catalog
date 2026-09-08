import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductPageLayout } from '../../styles/ProductPageLayout';

export const TabletsPage: React.FC = () => {
  const { products, loading, error } = useProducts('tablets');

  if (loading) {
    return <p>Loading tablets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <ProductPageLayout title="Tablets" products={products} />;
};
