import { useAppSelector } from '../../store/hooks';
import { getAccessories } from '../../api/products';

import { ProductCategoryPage } from '../ProductCategoryPage';

import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const { items: products } = useAppSelector(state => state.products);

  return (
    <ProductCategoryPage
      pageTitle="Accessories"
      linkTitle="Accessories"
      products={getAccessories(products)}
    />
  );
};
