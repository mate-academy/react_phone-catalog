import { ProductsPage } from '../../components/ProductsPage';
import { fetchAccessories } from '../../api';

export const AccessoriesPage = () => {
  return (
    <ProductsPage
      category="Accessories"
      fetchProducts={fetchAccessories}
    />
  );
};
