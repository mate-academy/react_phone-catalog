import { ProductsPage } from '../../components/ProductsPage';
import { fetchAccessories } from '../../api';

export const AccessoriesPage = () => (
  <ProductsPage
    category="Accessories"
    fetchProducts={fetchAccessories}
  />
);
