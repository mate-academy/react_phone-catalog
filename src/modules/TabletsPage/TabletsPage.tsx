/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { ProductPageContent } from '../shared/components/productPageContent';
import { ProductPageTop } from '../../types/ProductPageTop';

export const TabletsPage: React.FC = () => {
  const pageTop: ProductPageTop = {
    title: 'Tablets page',
    page: 'Tablets',
  };

  return <ProductPageContent pageTop={pageTop} productsName={'tablets'} />;
};
