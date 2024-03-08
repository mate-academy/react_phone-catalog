import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';

import './index.scss';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsBlock } from '../../components/ProductsBlock/ProductsBlock';

export const PhonesPage = () => {
  const { products } = useContext(StateStore);

  const phones = getProductsByCategory(products, 'phones');

  return (
    <div className="phonesPage">
      <ProductsBlock title="Mobile phones" products={phones} />
    </div>
  );
};
