import { useContext } from 'react';
import { AppContext } from '../../store/AppProvider';
import { getPhones } from '../../api/products';

import './PhonesPage.scss';
import { ProductCategoryPage } from '../ProductCategoryPage';

export const PhonesPage = () => {
  const { products } = useContext(AppContext);

  return (
    <ProductCategoryPage
      pageTitle="Mobile phones"
      linkTitle="Phones"
      products={getPhones(products)}
    />
  );
};
