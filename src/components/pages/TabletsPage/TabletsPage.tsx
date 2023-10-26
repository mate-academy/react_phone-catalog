import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductProvider';
import { ProductPage } from '../ProductPage';

export const TabletsPage: React.FC = () => {
  const { tablets } = useContext(ProductsContext);

  return (
    <ProductPage
      products={tablets}
      title="Tablets"
    />
  );
};
