import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductPageLayout } from '../../styles/ProductPageLayout';
import { ProductsList } from '../../component/ProductList/ProductList';

export const PhonesPage: React.FC = () => {
  const { products, loading, error } = useProducts('phones');

  if (loading) {
    return <p>Loading phones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ProductPageLayout title="Mobile phones">
      <ProductsList products={products} />
    </ProductPageLayout>
  );
};
