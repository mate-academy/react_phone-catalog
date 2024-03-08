import { useContext } from 'react';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsBlock } from '../../components/ProductsBlock/ProductsBlock';

export const AccessoriesPage = () => {
  const { products } = useContext(StateStore);

  const accessories = getProductsByCategory(products, 'accessories');

  return (
    <div className="accessoriesPage">
      <ProductsBlock title="Accessories" products={accessories} />
    </div>
  );
};
