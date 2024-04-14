import { useContext } from 'react';
import './AccessoriesPage.scss';
import { ProductState } from '../../store/storeContext';
import { getProductsByCategory } from '../../helpers/helpers';
import { ProductsPage } from '../ProductsPage/ProductsPage';

export const AccessoriesPage = () => {
  const { products } = useContext(ProductState);

  const accessories = getProductsByCategory(products, 'accessories');

  return (
    <div className="accessoriesPage">
      <ProductsPage title="Accessories" products={accessories} />
    </div>
  );
};
