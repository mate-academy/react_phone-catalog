import React from 'react';
import '../styles/style.scss';
import { PageStructure } from '../components/PageStructure';
import { useProductsByCategory } from '../utils/getProductByCategory';

export const TabletsPage = () => {
  const { products, loading, error } = useProductsByCategory('tablets');

  return (
    <PageStructure
      product={products}
      title="Tablets"
      loading={loading}
      error={error}
    />
  );
};
