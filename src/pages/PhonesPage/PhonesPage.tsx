import { useAppSelector } from '../../store/hooks';
import { getPhones } from '../../api/products';

import './PhonesPage.scss';
import { ProductCategoryPage } from '../ProductCategoryPage';

export const PhonesPage = () => {
  const { items: products } = useAppSelector(state => state.products);

  return (
    <ProductCategoryPage
      pageTitle="Mobile phones"
      linkTitle="Phones"
      products={getPhones(products)}
    />
  );
};
