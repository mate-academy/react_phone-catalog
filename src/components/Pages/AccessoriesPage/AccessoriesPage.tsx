import React from 'react';
import { ProductsPage } from '../ProductsPage';
import { PageTitles, ProductCategory } from '../../../types/types';

export const AccessoriesPage: React.FC = () => {
  return (
    <ProductsPage
      category={ProductCategory.Accessories}
      title={PageTitles.Accessories}
    />
  );
};
