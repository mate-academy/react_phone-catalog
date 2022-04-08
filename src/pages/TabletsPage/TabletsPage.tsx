import { FunctionComponent } from 'react';

// Components
import { ProductsPage } from '../ProductsPage';

export const TabletsPage: FunctionComponent = () => {
  const tablets = JSON.parse(localStorage.getItem('tablets') || '[]');

  return (
    <ProductsPage
      title="Tablets"
      products={tablets}
    />
  );
};
