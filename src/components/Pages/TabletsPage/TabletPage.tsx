import React from 'react';
import { ProductsPage } from '../ProductsPage';
import { PageTitles, ProductCategory } from '../../../types/types';

export const TabletPage: React.FC = () => {
  return (
    <ProductsPage
      category={ProductCategory.Tablets}
      title={PageTitles.Tablets}
    />
  );
};
