import React from 'react';
import { ProductPage } from '../shared/ProductPage';

export const TabletsPage = React.memo(() => {
  return <ProductPage title="Tablets" typeOfProduct="tablets" />;
});
