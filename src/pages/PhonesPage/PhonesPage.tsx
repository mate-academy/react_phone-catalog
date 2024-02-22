import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';
import './PhonesPage.scss';

export const PhonesPage = () => {
  const { products } = useContext(StateStore);

  const phonesProducts = getProductsByCategory(products, 'phones');

  return (
    <div className="phonesPage">
      <ProductsPage
        title="Mobile phones"
        products={phonesProducts}
      />
    </div>
  );
};
