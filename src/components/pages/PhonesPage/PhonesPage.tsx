import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductProvider';
import { ProductPage } from '../ProductPage';

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(ProductsContext);

  return (
    <ProductPage
      products={phones}
      title="Mobile phones"
    />
  );
};
