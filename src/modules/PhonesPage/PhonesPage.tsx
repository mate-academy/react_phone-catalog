/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { ProductPageContent } from '../shared/components/productPageContent';
import { ProductPageTop } from '../../types/ProductPageTop';

export const PhonesPage: React.FC = () => {
  const pageTop: ProductPageTop = {
    title: 'Phones page',
    page: 'Phones',
  };

  return <ProductPageContent pageTop={pageTop} productsName={'phones'} />;
};
