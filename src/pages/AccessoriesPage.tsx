import React from 'react';
import '../styles/style.scss';
import { PageStructure } from '../components/PageStructure';
import { useProductsByCategory } from '../utils/getProductByCategory';

export const AccessoriesPage = () => {
  const { products, loading, error } = useProductsByCategory('accessories');

  return (
    <PageStructure
      product={products}
      title="Accessories"
      loading={loading}
      error={error}
    />
  );
};
