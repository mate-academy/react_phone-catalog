import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';
import './TabletsPage.scss';

export const TabletsPage = () => {
  const { products } = useContext(StateStore);

  const tabletsProducts = getProductsByCategory(products, 'tablets');

  return (
    <div className="tabletsPage">
      <ProductsPage
        title="Tablets"
        products={tabletsProducts}
      />
    </div>
  );
};
