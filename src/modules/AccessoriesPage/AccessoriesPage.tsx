/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { ProductPageContent } from '../shared/components/productPageContent';
import { ProductPageTop } from '../../types/ProductPageTop';

export const AccessoriesPage: React.FC = () => {
  const pageTop: ProductPageTop = {
    title: 'Accessories page',
    page: 'Accessories',
  };

  return <ProductPageContent pageTop={pageTop} productsName={'accessories'} />;
};
