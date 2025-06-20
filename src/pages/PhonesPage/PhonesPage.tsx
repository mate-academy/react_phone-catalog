import React from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const PhonesPage: React.FC = () => {
  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Phones' }]} />
      <ProductsList productsCategory={ProductsCategory.PHONES} />
    </div>
  );
};