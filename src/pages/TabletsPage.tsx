import { getTablets } from '../api/products';
import { ProductsPage } from '../components/ProductsPage/ProductsPage';

export const TabletsPage = () => {
  return <ProductsPage title="Tablets page" loadProducts={getTablets} />;
};
