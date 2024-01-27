import { useAppSelector } from '../../store/hooks';
import { getTablets } from '../../api/products';

import './TabletsPage.scss';
import { ProductCategoryPage } from '../ProductCategoryPage';

export const TabletsPage = () => {
  const { items: products } = useAppSelector(state => state.products);

  return (
    <ProductCategoryPage
      pageTitle="Tablets"
      linkTitle="Tablets"
      products={getTablets(products)}
    />
  );
};
