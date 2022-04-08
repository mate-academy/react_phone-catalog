import { FunctionComponent } from 'react';

// Components
import { ProductsPage } from '../ProductsPage';

export const PhonesPage: FunctionComponent = () => {
  const phones = JSON.parse(localStorage.getItem('phones') || '[]');

  return (
    <ProductsPage
      title="Mobile phones"
      products={phones}
    />
  );
};
