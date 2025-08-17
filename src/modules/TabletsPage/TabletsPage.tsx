import React from 'react';
import { ProductPageLayout } from '../../styles/ProductPageLayout';
import { ProductsList } from '../../component/ProductList/ProductList';
import { useProducts } from '../../hooks/useProducts';

export const TabletsPage: React.FC = () => {
  const { products, loading, error } = useProducts('tablets');

  if (loading) {
    return <p>Loading tablets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ProductPageLayout title="Tablets">
      <ProductsList products={products} />
    </ProductPageLayout>
  );
};
