import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import { Loader } from '../Loader';
import { useProducts } from '../../hooks/useProducts';

export const TabletsPage = () => {
  const { data, isLoading } = useProducts('tablets');

  if (isLoading || !data) {
    return <Loader />;
  }

  return <ProductCatalog title={'Tablets'} products={data} />;
};
