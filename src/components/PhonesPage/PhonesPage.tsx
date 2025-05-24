import React from 'react';
import { ProductCatalog } from '../ProductCatalog';
import { useProducts } from '../../hooks/useProducts';
import { Loader } from '../Loader';

export const PhonesPage = () => {
  const { data, isLoading } = useProducts('phones');

  if (isLoading || !data) {
    return <Loader />;
  }

  return <ProductCatalog title={'Mobile phones'} products={data} />;
};
