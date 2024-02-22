import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const { products } = useContext(StateStore);

  const accessoriesProducts = getProductsByCategory(products, 'accessories');

  return (
    <div className="accessoriesPage">
      <ProductsPage
        title="Accessories"
        products={accessoriesProducts}
      />
    </div>
  );
};
