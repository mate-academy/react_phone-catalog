import React from 'react';
import '../../styles/style.scss';
import { PageStructure } from '../../components/PageStructure';
import { useProductsByCategory } from '../../utils/getProductByCategory';

export const PhonesPage = () => {
  const { products, loading, error } = useProductsByCategory('phones');

  return (
    <PageStructure
      product={products}
      loading={loading}
      error={error}
      title="Phones"
      mobTitle="Mobile Phones"
    />
  );
};
