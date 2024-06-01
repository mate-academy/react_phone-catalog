import React from 'react';
import { ProductsPage } from '../ProductsPage';
import { PageTitles, ProductCategory } from '../../../types/types';

export const PhonesPage: React.FC = () => {
  return (
    <ProductsPage category={ProductCategory.Phones} title={PageTitles.Phones} />
  );
};
