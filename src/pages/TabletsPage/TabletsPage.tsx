import { useContext } from 'react';
import './TabletsPage.scss';
import { ProductState } from '../../store/storeContext';
import { getProductsByCategory } from '../../helpers/helpers';
import { ProductsPage } from '../ProductsPage/ProductsPage';

export const TabletsPage = () => {
  const { products } = useContext(ProductState);

  const tablets = getProductsByCategory(products, 'tablets');

  return (
    <div className="tabletsPage">
      <ProductsPage title="Tablets" products={tablets} />
    </div>
  );
};
