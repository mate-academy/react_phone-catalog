import React from 'react';
import { ProductPage } from '../shared/ProductPage';

export const PhonesPage = React.memo(() => {
  return <ProductPage title="Mobile phones" typeOfProduct="phones" />;
});
