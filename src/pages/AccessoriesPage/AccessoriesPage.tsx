import { ProductsPage } from '../../components/ProductsPage';
import { fetchAccessories } from '../../api';

export const AccessoriesPage = () => {
  return (
    <ProductsPage
      title="Accessories"
      fetchProducts={fetchAccessories}
    />
  );
};
