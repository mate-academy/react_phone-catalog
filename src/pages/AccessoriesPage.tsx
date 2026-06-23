import { getAccessories } from '../api/products';
import { ProductsPage } from '../components/ProductsPage/ProductsPage';

export const AccessoriesPage = () => {
  return (
    <ProductsPage title="Accessories page" loadProducts={getAccessories} />
  );
};
