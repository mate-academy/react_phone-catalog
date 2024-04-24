import React from 'react';
import { ProductPage } from '../shared/ProductPage';

export const AccessoriesPage = React.memo(() => {
  return <ProductPage title="Accessories" typeOfProduct="accessories" />;
});
