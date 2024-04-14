import { useContext } from 'react';
import './PhonesPage.scss';
import { ProductState } from '../../store/storeContext';
import { getProductsByCategory } from '../../helpers/helpers';
import { ProductsPage } from '../ProductsPage/ProductsPage';

export const PhonesPage = () => {
  const { products } = useContext(ProductState);

  const phones = getProductsByCategory(products, 'phones');

  return (
    <div className="phonesPage">
      <ProductsPage title="Mobile phones" products={phones} />
    </div>
  );
};
