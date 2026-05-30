import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import { Products } from '../../components/Products';
// eslint-disable-next-line max-len
import { filterProductsByCategory } from '../../utils/functions/filterProductsByCategory';

export const TabletsPage = () => {
  const { state } = useContext(ProductsContext);
  const { products } = state;

  const preparedProducts = filterProductsByCategory(products, 'tablets');

  return <Products products={preparedProducts} />;
};
