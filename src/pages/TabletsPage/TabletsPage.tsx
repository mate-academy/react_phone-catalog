import { useContext } from 'react';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsBlock } from '../../components/ProductsBlock/ProductsBlock';

export const TabletsPage = () => {
  const { products } = useContext(StateStore);

  const tablets = getProductsByCategory(products, 'tablets');

  return (
    <div className="tabletsPage">
      <ProductsBlock title="Tablets" products={tablets} />
    </div>
  );
};
