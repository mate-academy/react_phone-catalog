import { FunctionComponent } from 'react';

// Components
import { ProductsPage } from '../ProductsPage';

export const AccessoriesPage: FunctionComponent = () => {
  const accessories = JSON.parse(localStorage.getItem('accessories') || '[]');

  return (
    <ProductsPage
      title="Accessories"
      products={accessories}
    />
  );
};
