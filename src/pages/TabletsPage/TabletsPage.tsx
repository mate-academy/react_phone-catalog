import { ProductsPage } from '../../components/ProductsPage';
import { fetchTablets } from '../../api';

export const TabletsPage = () => (
  <ProductsPage
    category="Tablets"
    fetchProducts={fetchTablets}
  />
);
