import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductProvider';
import { ProductPage } from '../ProductPage';

export const AccessoriesPage: React.FC = () => {
  const { accessories } = useContext(ProductsContext);

  return (
    <ProductPage
      products={accessories}
      title="Accessories"
    />
  );
};
