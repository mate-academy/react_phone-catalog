import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import { useProducts } from '../../hooks/useProducts';
import { Loader } from '../Loader';

export const AccessoriesPage = () => {
  const { data, isLoading } = useProducts('accessories');

  if (isLoading || !data) {
    return <Loader />;
  }

  return <ProductCatalog title={'Accessories'} products={data} />;
};
