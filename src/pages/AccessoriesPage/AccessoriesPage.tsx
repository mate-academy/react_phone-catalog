import { useContext } from 'react';
import { AppContext } from '../../store/AppProvider';
import { getAccessories } from '../../api/products';

import './AccessoriesPage.scss';
import { ProductCategoryPage } from '../ProductCategoryPage';

export const AccessoriesPage = () => {
  const { products } = useContext(AppContext);

  return (
    <ProductCategoryPage
      pageTitle="Accessories"
      linkTitle="Accessories"
      products={getAccessories(products)}
    />
  );
};
