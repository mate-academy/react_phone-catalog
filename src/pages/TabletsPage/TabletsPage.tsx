import { useContext } from 'react';
import { AppContext } from '../../store/AppProvider';
import { getTablets } from '../../api/products';

import './TabletsPage.scss';
import { ProductCategoryPage } from '../ProductCategoryPage';

export const TabletsPage = () => {
  const { products } = useContext(AppContext);

  return (
    <ProductCategoryPage
      pageTitle="Tablets"
      linkTitle="Tablets"
      products={getTablets(products)}
    />
  );
};
