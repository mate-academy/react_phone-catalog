import React, { useContext } from 'react';
import { ProductPage } from '../shared/ProductPage';
import { ProductContext } from '../../store/ProductContext';

export const PhonesPage = React.memo(() => {
  const { phones } = useContext(ProductContext);

  return (
    <ProductPage title="Mobile phones" routeTitle="Phones" phones={phones} />
  );
});
